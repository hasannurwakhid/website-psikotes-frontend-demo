import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  question: null,
  timer: null,
  answers: null,
  submittedAnswer: null,
  point: null,
};

const questionSlicer = createSlice({
  name: "question",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.question = action.payload;
    },
    setTimer: (state, action) => {
      state.timer = action.payload;
    },
    setAnswer: (state, action) => {
      state.answers = action.payload;
    },
    setsubmittedAnswer: (state, action) => {
      state.submittedAnswer = action.payload;
    },
    setPoint: (state, action) => {
      state.point = action.payload;
    },
  },
});

export const {
  setQuestions,
  setTimer,
  setAnswer,
  setsubmittedAnswer,
  setPoint,
} = questionSlicer.actions;

export default questionSlicer.reducer;
