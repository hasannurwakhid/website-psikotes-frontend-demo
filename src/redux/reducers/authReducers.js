// reducers/authReducer.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
};

const authSlicer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setToken, setUser } = authSlicer.actions;

export default authSlicer.reducer;
