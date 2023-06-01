import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "presentation/redux/userSlice";
import visibilitySlice from "presentation/redux/visibilitySlice";
import postSlice from "presentation/redux/postSlice";
const rootReducer = combineReducers({});
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    user: userSlice,
    visibility: visibilitySlice,
    post: postSlice,
  },
});
