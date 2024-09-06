import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  questions: [],
  answerKey: null,
};

const allCategorySlicer = createSlice({
  name: "allCategory",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.categories = action.payload;
    },
    setAddCategory(state, action) {
      state.categories.push(action, payload);
    },
    setUpdateCategory(state, action) {
      const index = state.categories.findIndex(
        (categories) => categories.id === action.payload.id
      );
      if (index !== -1) {
        state.categories[index] = {
          ...state.categories[index],
          ...action.payload,
        };
      }
    },
    setDeleteCategory(state, action) {
      state.categories = state.categories.filter(
        (categories) => categories.id !== action.payload
      );
    },

    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setAddQuestions(state, action) {
      state.questions.push(action, payload);
    },
    setUpdateQuestions(state, action) {
      const index = state.questions.findIndex(
        (questions) => questions.id === action.payload.id
      );
      if (index !== -1) {
        state.questions[index] = {
          ...state.questions[index],
          ...action.payload,
        };
      }
    },
    setDeleteQuestions(state, action) {
      state.questions = state.questions.filter(
        (questions) => questions.id !== action.payload
      );
    },
    setAnswerKey(state, action) {
      state.answerKey = action.payload;
    },
  },
});

export const {
  setCategory,
  setAddCategory,
  setUpdateCategory,
  setDeleteCategory,
  setQuestions,
  setAddQuestions,
  setUpdateQuestions,
  setDeleteQuestions,
  setAnswerKey,
} = allCategorySlicer.actions;
export default allCategorySlicer.reducer;
