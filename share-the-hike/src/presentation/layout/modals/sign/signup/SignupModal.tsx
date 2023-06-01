import css from "./SignupModal.module.css";
import { UserSignupData } from "./types";
import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleLoginModal,
  toggleSignupModal,
} from "presentation/redux/visibilitySlice";

const SignupModal: React.FC = () => {
  const dispatch = useDispatch();
  const open = useSelector((state: any) => state.visibility.signupModal.open);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupData, setSignupData] = useState<UserSignupData>({
    userName: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const closeModal = () => {
    dispatch(toggleSignupModal(false));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}server/auth/signup`,
        signupData
      );
      if (res.status === 200) {
        console.log("Signup successful");
        setErrorMsg("");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setErrorMsg("User already exists.");
      } else {
        console.log(error);
        setErrorMsg("An unknown error occurred.");
      }
    }
  };

  const handleIHaveAccountClick = () => {
    dispatch(toggleSignupModal(false));
    dispatch(toggleLoginModal(true));
  };

  return (
    <div
      style={{ display: open ? "flex" : "none" }}
      className={css.backdrop}
      onClick={closeModal}
    >
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Sign Up</h2>
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
          <input type="password" placeholder="Confirm Password" />
          <button type="submit">Sign Up</button>
        </form>
        {errorMsg && <p className={css.errorMessage}>{errorMsg}</p>}
        <h5 onClick={handleIHaveAccountClick} className={css.changeMode}>
          I already have an account. Log In
        </h5>
      </div>
    </div>
  );
};

export default SignupModal;
