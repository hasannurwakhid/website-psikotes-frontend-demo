import axios from "axios";
import {
  setPoint,
  setQuestions,
  setsubmittedAnswer,
  setTimer,
} from "../reducers/questReducers";
import { toast } from "react-toastify";
import { checkIsDone, getUserProfile } from "./authActions";

export const getPesertaQuestion = (navigate) => async (dispatch, getState) => {
  const token = getState().auth.token;
  try {
    const response = await axios.get(
      `https://backend-production-8357.up.railway.app/api/peserta/getPesertaQuestions`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const question = response.data.data.shuffledData;
    const timer = response.data.data;
    dispatch(setQuestions(question));
    dispatch(setTimer(timer));
    navigate("/quest");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else {
        toast.error(error.message);
      }
    } else {
      toast.error(error.message);
    }
  }
};

export const answerQuestion = (data, token) => async (dispatch, getState) => {
  console.log("data answerQuestion", data);
  const multipleChoiceId = String(data.multipleChoiceId).trim();
  console.log("multipleChoiceId", multipleChoiceId);
  const requestData = { multipleChoiceId };
  try {
    const response = await axios.post(
      `https://backend-production-8357.up.railway.app/api/peserta/answerQuestion`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const submittedAnswer = response.data.data;
    console.log("submittedAnswer", submittedAnswer);
    dispatch(setsubmittedAnswer(submittedAnswer));
    console.log("data answerQuestion", data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
      return;
    }
  }
};
export const submitTest = (navigate) => async (dispatch, getState) => {
  const token = getState().auth.token;
  try {
    const response = await axios.get(
      `https://backend-production-8357.up.railway.app/api/peserta/submit`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response submitTest", response.data.data);
    await dispatch(setPoint(response.data.data));
    await dispatch(checkIsDone(token, toast, navigate));
    await dispatch(getUserProfile());
    navigate("/result");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
      return;
    }
  }
};
