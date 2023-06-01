import css from "./PostCard.module.css";
import { IPostCard } from "global-types/postTypes";
import { useState } from "react";
import axios from "axios";

const PostCard: React.FC<IPostCard> = ({
  userName,
  _id,
  title,
  body,
  nrOfLikes,
  doesUserLike,
}) => {
  const [likes, setLikes] = useState(nrOfLikes);
  const [userLikes, setUserLikes] = useState(doesUserLike);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLikeClick = async () => {
    setUserLikes(!userLikes);
    setLikes(userLikes ? likes - 1 : likes + 1);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}server/posts/like/${_id}`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      setUserLikes(userLikes);
      setLikes(likes);
      alert("Error liking post");
    }
  };

  return (
    <div className={css.container}>
      <div className={css.postCard} onClick={() => setIsExpanded(!isExpanded)}>
        <h2>{title}</h2>
        {isExpanded && <p>{body}</p>}
        <div className={css.userName}>{userName}</div>
      </div>
      <div className={css.likes}>
        <div className={css.postLiking}>
          <div className={css.heart} onClick={handleLikeClick}>
            {userLikes ? `❤️` : nrOfLikes > 0 ? `🤎` : `🤍`}
          </div>
          <div
            className={css.likeCount}
            style={{
              color: userLikes ? "rgb(157 34 68)" : "black",
              fontWeight: userLikes ? "bold" : "normal",
            }}
          >
            {likes}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
