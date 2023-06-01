import css from "./StartingPage.module.css";
import { useNavigate } from "react-router-dom";

const StartingPage: React.FC = () => {
  const navigate = useNavigate();

  const handlePostClick = () => {
    navigate("/posts");
  };

  const handleProfileClick = () => {
    navigate("/user");
  };

  return (
    <div className={css.startingPage}>
      <div className={css.card} onClick={handlePostClick}>
        <p>Explore</p>
      </div>
      <div className={css.card} onClick={handleProfileClick}>
        <p>Manage Your Posts</p>
      </div>
    </div>
  );
};

export default StartingPage;
