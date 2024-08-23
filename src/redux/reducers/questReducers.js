import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  question: null,
};

const questionSlicer = createSlice({
  name: "question",
  initialState,
  reducers: {
    setQuestion: (state, action) => {
      state.question = action.payload;
    },
  },
});

export const { setQuestion } = questionSlicer.actions;

export default questionSlicer.reducer;
