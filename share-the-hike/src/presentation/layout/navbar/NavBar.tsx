import css from "./NavBar.module.css";
import logoMountain from "./logo-mountain.png";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { toggleAreYouSureModal } from "presentation/redux/visibilitySlice";
import UserButton from "presentation/components/userButton/UserButton";
import AreYouSure from "presentation/components/areYouSure/AreYouSure";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector((state: any) => state.user.userName);

  // Safety measure to prevent accidental reset
  const handlePreResetClick = () => {
    dispatch(toggleAreYouSureModal(true));
  };

  // Callback function for AreYouSure component that resets posts and users
  const handleResetClick = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/server/initialize`,
        {},
        { withCredentials: true }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Failed to initialize", error);
    }
  };

  return (
    <nav className={css.navBar}>
      <div className={css.logoContainer} onClick={() => navigate("/")}>
        <img src={logoMountain} alt="Logo" className={css.logo} />
        <h2 className={css.logoText}>Share the Hike</h2>
      </div>
      <div className={css.navLinks}>
        <div className={css.initialize} onClick={handlePreResetClick}>
          {` ❗ Initialize`}
        </div>
        <Link to="/posts" className={css.link}>
          Posts
        </Link>
        <Link to="/user" className={css.link}>
          User
        </Link>
      </div>
      <div className={css.spacer}>
        <UserButton />
        {userName && <p className={css.userName}>{userName}</p>}
      </div>
      <AreYouSure
        message="This will re-initialize all posts and users. It is meant for development purposes only."
        onYes={handleResetClick}
      />
    </nav>
  );
};

export default NavBar;
