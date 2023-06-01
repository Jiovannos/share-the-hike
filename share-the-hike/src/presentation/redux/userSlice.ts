import { createSlice } from "@reduxjs/toolkit";
// import { checkScaleForChords } from "./scaleHelper";

const initialState = {
  userId: "",
  userName: "",
  postsLiked: [],
  postsCreated: [],
  isAuthenticated: false,
  theme: "dark",
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      state.postsLiked = action.payload.postsLiked;
      state.postsCreated = action.payload.postsCreated;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    logoutUser: (state) => {
      state.userId = "";
      state.userName = "";
    },
    toggleTheme: (state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      return { ...state, theme: newTheme };
    },
    setPreferences: (state, action) => {
      let newState = { ...state, ...action.payload };
      return newState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginUser, logoutUser, toggleTheme, setPreferences } =
  userSlice.actions;

export default userSlice.reducer;
