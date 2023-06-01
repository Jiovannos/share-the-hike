import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: { title: "", body: "", user: "" },
  sortField: "",
  sortOrder: "",
};
export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    updateFilters: (state, action) => {
      state.filters = action.payload;
    },
    updateSorting: (state, action) => {
      state.sortField = action.payload.sortField;
      state.sortOrder = action.payload.sortOrder;
    },
  },
});

export const { updateFilters, updateSorting } = postSlice.actions;

export default postSlice.reducer;
