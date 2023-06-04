import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const categoryReducer = createReducer(initialState, {
  getAllCategoryRequest: (state) => {
    state.isLoading = true;
  },
  getAllCategorySuccess: (state, action) => {
    state.isLoading = false;
    state.allCategory = action.payload;
  },
  getAllCategoryFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
