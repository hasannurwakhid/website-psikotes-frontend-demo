import axios from "axios";
import { setQuestion } from "../reducers/questReducers";
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
    const question = response.data.data;
    console.log("Question Berhasil", response.data.data);
    dispatch(setQuestion(question));
    navigate("/quest");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.message);
      return;
    }
    toast.error(error.message);
  }
};
