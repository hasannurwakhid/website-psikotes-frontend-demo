import axios from "axios";
import {
  setPoint,
  setQuestions,
  setsubmittedAnswer,
  setTimer,
} from "../reducers/questReducers";
import { toast } from "react-toastify";

export const getPesertaQuestion = (navigate) => async (dispatch, getState) => {
  const token = getState().auth.token;
  console.log("token", token);
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
    console.log("Question Berhasil", response.data.data.shuffledData);
    console.log("Timer Berhasil", response.data.data.remainingTime);
    dispatch(setQuestions(question));
    dispatch(setTimer(timer));
    navigate("/quest");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 401) {
        // Hapus token dari local storage
        localStorage.removeItem("token");

        // Beri tahu pengguna dan arahkan ke halaman login
        toast.error("Sesi telah berakhir. Silakan login kembali.");
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
  console.log("data", data);
  try {
    const response = await axios.post(
      `https://backend-production-8357.up.railway.app/api/peserta/answerQuestion`,
      data,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("respon answer question", response);
    const submittedAnswer = response.data.data;
    dispatch(setsubmittedAnswer(submittedAnswer));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
      return;
    }
  }
};

export const submitTest = (navigate) => async (dispatch, getState) => {
  // Mengambil seluruh state dari store Redux
  const state = getState();

  console.log("state", state);

  const token = state.auth.token;

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
    dispatch(setPoint(response.data.data));
    navigate("/result");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
      return;
    }
  }
};
