import css from "./PostPage.module.css";
import { IPost } from "global-types/postTypes";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "presentation/redux/userSlice";
import PostCard from "presentation/components/postCard/PostCard";
import PostFunctionalities from "./functionalities/PostFunctionalities";
import PleaseLogIn from "presentation/components/pleaseLogIn/PleaseLogIn";

const PostPage: React.FC = () => {
  const dispatch = useDispatch();
  const [originalPosts, setOriginalPosts] = useState<IPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>(originalPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const user = useSelector((state: any) => state.user);
  const sortField = useSelector((state: any) => state.post.sortField);
  const sortOrder = useSelector((state: any) => state.post.sortOrder);
  const filters = useSelector((state: any) => state.post.filters);

  // Checks in the user to retrieve the latest user data
  useEffect(() => {
    const checkinUser = async () => {
      try {
        const res = await axios.get<any>("http://localhost:8000/auth/checkin", {
          withCredentials: true,
        });
        const { isAuthenticated, userId, userName, postsLiked, postsCreated } =
          res.data;
        if (isAuthenticated && userId && userName) {
          dispatch(
            loginUser({
              userId,
              userName,
              postsLiked,
              postsCreated,
              isAuthenticated,
            })
          );
        }
      } catch (error) {
        console.log("Error checking in user:", error);
      }
    };
    checkinUser();
  }, []);

  useEffect(() => {
    // Start with the originalPosts
    let newPosts = [...originalPosts];

    // Apply filters
    if (filters.title) {
      newPosts = newPosts.filter((post) =>
        post.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    }

    if (filters.body) {
      newPosts = newPosts.filter((post) =>
        post.body.toLowerCase().includes(filters.body.toLowerCase())
      );
    }

    if (filters.user) {
      newPosts = newPosts.filter((post) =>
        post.userName.toLowerCase().includes(filters.user.toLowerCase())
      );
    }

    // Apply sort
    newPosts.sort((a: any, b: any) => {
      if (sortField === "title" || sortField === "userName") {
        const aValue = a[sortField].toLowerCase();
        const bValue = b[sortField].toLowerCase();

        if (sortOrder === "asc") {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      } else if (sortField === "createdAt") {
        const aValue = new Date(a[sortField]);
        const bValue = new Date(b[sortField]);

        if (sortOrder === "asc") {
          return aValue.getTime() - bValue.getTime();
        } else {
          return bValue.getTime() - aValue.getTime();
        }
      }
    });
    // Set the filtered and sorted posts
    setFilteredPosts(newPosts);
  }, [
    filters.title,
    filters.body,
    filters.user,
    sortField,
    sortOrder,
    originalPosts,
  ]);

  // Fetch posts from the server only if the user is authenticated
  useEffect(() => {
    if (!user.isAuthenticated) {
      return;
    }
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:8000/posts/");
      setOriginalPosts(res.data);
    };
    fetchPosts();
  }, [user.isAuthenticated]);

  if (!user.isAuthenticated) {
    return <PleaseLogIn />;
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredPosts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Handler for previous and next page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <PostFunctionalities />
      <div className={css.postPage}>
        {currentPosts.map((post: IPost) => (
          <PostCard
            key={post._id.toString()}
            userName={post.userName}
            _id={post._id.toString()}
            title={post.title}
            body={post.body}
            nrOfLikes={post.likes.length}
            doesUserLike={user.postsLiked?.includes(post._id.toString())}
          />
        ))}
        <div className={css.pageNumbers}>
          <div className={css.number} onClick={handlePreviousPage}>
            Prev
          </div>
          {pageNumbers.map((number) => (
            <div
              className={css.number}
              key={number}
              onClick={() => setCurrentPage(number)}
              style={{ fontWeight: currentPage === number ? "bold" : "normal" }}
            >
              {number}
            </div>
          ))}
          <div className={css.number} onClick={handleNextPage}>
            Next
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPage;
