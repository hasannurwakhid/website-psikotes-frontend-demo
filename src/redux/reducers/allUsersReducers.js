// reducers/authReducer.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  users: [],
  error: "",
  averageScore: 0,
  doneCount: 0,
};

const allUsersSlicer = createSlice({
  name: "allUsers",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setAverageScore: (state, action) => {
      state.averageScore = action.payload;
      state.loading = false;
    },
    setDoneCount: (state, action) => {
      state.doneCount =  action.payload;
    },
  },
});

export const { setLoading, setUsers, setError, setAverageScore, setDoneCount } = allUsersSlicer.actions;

export default allUsersSlicer.reducer;
