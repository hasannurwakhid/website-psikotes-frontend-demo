// reducers/authReducer.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  profil: null,
  isDone: false,
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
    setUserProfil: (state, action) => {
      state.profil = action.payload;
    },
    setIsDone: (state, action) => {
      state.isDone = action.payload;
    },
  },
});

export const { setToken, setUser, setUserProfil, setIsDone } =
  authSlicer.actions;

export default authSlicer.reducer;
