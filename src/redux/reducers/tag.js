import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const tagReducer = createReducer(initialState, {
  getAllTagRequest: (state) => {
    state.isLoading = true;
  },
  getAllTagSuccess: (state, action) => {
    state.isLoading = false;
    state.allTag = action.payload;
  },
  getAllTagFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
