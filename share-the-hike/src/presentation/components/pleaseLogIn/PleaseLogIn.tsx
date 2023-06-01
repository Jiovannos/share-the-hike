import css from "./PleaseLogIn.module.css";
import UserButton from "presentation/components/userButton/UserButton";

const PleaseLogIn: React.FC = () => {
  return (
    <div className={css.page}>
      <div className={css.center}>
        <h2>Please Login to view this page</h2>
        <UserButton />
      </div>
    </div>
  );
};

export default PleaseLogIn;
