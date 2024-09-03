// reducers/authReducer.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  users: [],
  error: '',
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
  },
});

export const { setLoading, setUsers, setError } = allUsersSlicer.actions;

export default allUsersSlicer.reducer;
