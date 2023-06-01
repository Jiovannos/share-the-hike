import axios from "axios";
import { loginUser } from "presentation/redux/userSlice";
import { AppDispatch } from "../../store";
import { AnyAction } from "redux";

export const checkinUser =
  () =>
  async (dispatch: AppDispatch): Promise<AnyAction | undefined> => {
    try {
      const res = await axios.get<any>("http://localhost:8000/auth/checkin", {
        withCredentials: true,
      });
      const { isAuthenticated, userId, userName, postsLiked, postsCreated } =
        res.data;

      if (isAuthenticated && userId && userName) {
        return dispatch(
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
