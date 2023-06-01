import css from "./UserButton.module.css";
import axios from "axios";
import { Suspense, lazy } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleLoginModal } from "presentation/redux/visibilitySlice";

// Lazy import the modals
const Signup = lazy(
  () => import("presentation/layout/modals/sign/signup/SignupModal")
);
const Login = lazy(
  () => import("presentation/layout/modals/sign/login/LoginModal")
);

const UserButton: React.FC = () => {
  const isLoggedIn = useSelector((state: any) => state.user.userName !== "");
  const dispatch = useDispatch();

  // Open the login modal
  const handleLoginClick = () => {
    dispatch(toggleLoginModal(true));
  };

  const handleSignOutClick = async () => {
    try {
      await axios.post("http://localhost:8000/auth/logout", null, {
        withCredentials: true,
      });
      window.location.reload();
    } catch (err) {
      console.error("Error during logout", err);
    }
  };

  return (
    <>
      <button
        className={css.button}
        onClick={isLoggedIn ? handleSignOutClick : handleLoginClick}
      >
        {isLoggedIn ? "Sign Out" : "Login"}
      </button>
      <Suspense fallback={<div>Loading...</div>}>
        <Signup />
        <Login />
      </Suspense>
    </>
  );
};

export default UserButton;
