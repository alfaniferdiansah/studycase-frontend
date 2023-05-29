import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    authenticate: false
}

export const userReducer = createReducer(initialState, {
    LoadUserRequest: (state) => {
      state.loading = true;
    },
    LoadUserSuccess: (state, action) => {
      state.authenticate = true;
      state.loading = false;
      state.user = action.payload;
    },
    LoadUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.authenticate = false;
    },
    clearMessages: (state) => {
        state.successMessage = null;
      },
});
  