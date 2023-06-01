import css from "./AreYouSure.module.css";
import { AreYouSureProps } from "./types";
import { useSelector, useDispatch } from "react-redux";
import { toggleAreYouSureModal } from "presentation/redux/visibilitySlice";

const AreYouSure: React.FC<AreYouSureProps> = ({ message, onYes }) => {
  const dispatch = useDispatch();
  const open = useSelector(
    (state: any) => state.visibility.areYouSureModal.open
  );
  const handleClose = () => {
    dispatch(toggleAreYouSureModal(false));
  };

  const handleYesClick = () => {
    onYes();
    handleClose();
  };

  return (
    <div
      style={{ display: open ? "flex" : "none" }}
      className={css.backdrop}
      onClick={handleClose}
    >
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Are You Sure?</h2>
        <p>{message}</p>
        <div className={css.buttons}>
          <button onClick={handleClose}>NO</button>
          <button onClick={handleYesClick}>YES</button>
        </div>
      </div>
    </div>
  );
};

export default AreYouSure;
