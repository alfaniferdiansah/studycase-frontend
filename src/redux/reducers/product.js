import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const productReducer = createReducer(initialState, {
  getAllProductRequest: (state) => {
    state.isLoading = true;
  },
  getAllProductSuccess: (state, action) => {
    state.isLoading = false;
    state.allProduct = action.payload;
  },
  getAllProductFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
