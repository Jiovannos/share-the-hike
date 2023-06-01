import "./App.css";
import { TUser } from "types";
import { useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "presentation/redux/userSlice";
import NavBar from "presentation/layout/navbar/NavBar";
import Footer from "presentation/layout/footer/Footer";
import StartingPage from "presentation/layout/pages/starting/StartingPage";
import PostPage from "presentation/layout/pages/posts/PostPage";
import UserPage from "presentation/layout/pages/user/UserPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkinUser = async () => {
      try {
        const res = await axios.get<TUser>(
          "http://localhost:8000/auth/checkin",
          {
            withCredentials: true,
          }
        );

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

  return (
    <div className="App">
      <NavBar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<StartingPage />} />
          <Route path="/posts" element={<PostPage />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
