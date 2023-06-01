import css from "./UserPage.module.css";
import { IPost } from "global-types/postTypes";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleAreYouSureModal } from "presentation/redux/visibilitySlice";
import { loginUser } from "presentation/redux/userSlice";
import PleaseLogIn from "presentation/components/pleaseLogIn/PleaseLogIn";
import PostCard from "presentation/components/postCard/PostCard";
import AreYouSure from "presentation/components/areYouSure/AreYouSure";

const UserPage: React.FC = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("myfavorites");
  const [posts, setPosts] = useState<IPost[]>([]);
  const user = useSelector((state: any) => state.user);

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
  }, [tab]);

  // Fetch User Posts
  useEffect(() => {
    const fetchPosts = async () => {
      if (!user.isAuthenticated) {
        return;
      }
      // If tab is myposts, fetch post created by the user
      // If tab is myfavorites, fetch post liked by the user
      try {
        const response = await axios.get(`http://localhost:8000/posts/${tab}`, {
          withCredentials: true,
        });
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, [tab, user.isAuthenticated]);

  // Safety measure to prevent accidental unlike all
  const handlePreUnlikeAllClick = () => {
    dispatch(toggleAreYouSureModal(true));
  };

  // Callback function for AreYouSure component that unlikes all posts
  const handleUnLikeAllClick = async () => {
    const postIds = posts.map((post) => post._id);
    try {
      const response = await axios.post(
        `http://localhost:8000/posts/unLikeAll`,
        { postIds, likeAll: false },
        { withCredentials: true }
      );
      setPosts([]);
    } catch (error) {
      console.error("Failed to unlike all posts", error);
    }
  };

  if (!user.isAuthenticated) {
    return <PleaseLogIn />;
  }

  return (
    <div className={css.userPage}>
      <div className={css.tabsPanel}>
        <div
          style={{
            backgroundColor:
              tab === "myposts" ? "var(--background-color-3)" : "unset",
            color:
              tab === "myposts"
                ? "var(--background-color-1)"
                : "var(--primary-color)",
          }}
          className={css.tab}
          onClick={() => setTab("myposts")}
        >
          My Posts
        </div>
        <div
          style={{
            backgroundColor:
              tab === "myfavorites" ? "var(--background-color-3)" : "unset",
            color:
              tab === "myfavorites"
                ? "var(--background-color-1)"
                : "var(--primary-color)",
          }}
          className={css.tab}
          onClick={() => setTab("myfavorites")}
        >
          My Favorites
        </div>

        <div
          style={{
            visibility:
              tab === "myfavorites" && posts.length > 0 ? "visible" : "hidden",
          }}
          className={css.likeAllHeart}
          onClick={handlePreUnlikeAllClick}
        >
          🤍 Unlike Everything
        </div>
      </div>
      <div className={css.myPosts}>
        {posts.map((post: IPost) => (
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
      </div>
      <AreYouSure
        message="This will unlike all your liked posts."
        onYes={handleUnLikeAllClick}
      />
    </div>
  );
};

export default UserPage;
