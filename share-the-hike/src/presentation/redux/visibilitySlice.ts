import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupModal: {
    open: false,
  },
  loginModal: {
    open: false,
  },
  filtersModal: {
    open: false,
  },
  areYouSureModal: {
    open: false,
  },
};
export const visibilitySlice = createSlice({
  name: "visibility",
  initialState,
  reducers: {
    toggleLoginModal: (state, action) => {
      state.loginModal.open = action.payload;
    },
    toggleSignupModal: (state, action) => {
      state.signupModal.open = action.payload;
    },
    toggleFiltersModal: (state, action) => {
      state.filtersModal.open = action.payload;
    },
    toggleAreYouSureModal: (state, action) => {
      state.areYouSureModal.open = action.payload;
    },
  },
});

export const {
  toggleLoginModal,
  toggleSignupModal,
  toggleFiltersModal,
  toggleAreYouSureModal,
} = visibilitySlice.actions;

export default visibilitySlice.reducer;
