import css from "./LoginModal.module.css";
import { UserLoginData } from "./types";
import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleLoginModal,
  toggleSignupModal,
} from "presentation/redux/visibilitySlice";

const LoginModal: React.FC = () => {
  const dispatch = useDispatch();
  const open = useSelector((state: any) => state.visibility.loginModal.open);
  const [loginData, setLoginData] = useState<UserLoginData>({
    userName: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const closeModal = () => {
    dispatch(toggleLoginModal(false));
  };

  const handleNoAccountClick = () => {
    dispatch(toggleLoginModal(false));
    dispatch(toggleSignupModal(true));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/auth/login",
        loginData,
        { withCredentials: true }
      );
      if (res.status === 200) {
        alert("Login successful");
        window.location.reload();
      }
    } catch (error: any) {
      setErrorMsg(error.response.data.message);
    }
  };

  return (
    <div
      style={{ display: open ? "flex" : "none" }}
      className={css.backdrop}
      onClick={closeModal}
    >
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="userName"
            placeholder="Username"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <button type="submit">Log In</button>
        </form>
        {errorMsg && <p className={css.errorMessage}>{errorMsg}</p>}
        <h5 onClick={handleNoAccountClick} className={css.changeMode}>
          I don't have an account. Sign Up
        </h5>
      </div>
    </div>
  );
};

export default LoginModal;
