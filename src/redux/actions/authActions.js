import axios from "axios";
import {
  setIsDone,
  setToken,
  setUser,
  setUserProfil,
} from "../reducers/authReducers";

export const login = (data, navigate, toast) => async (dispatch, getState) => {
  console.log(data);
  try {
    const response = await axios.post(
      `https://backend-production-8357.up.railway.app/api/peserta/auth/login`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("response", response);
    const user = response.data.data.user;
    console.log("user action", user);
    const token = response.data.data.token;
    console.log("Login Berhasil", token);
    dispatch(setToken(token));
    dispatch(setUser(user));
    await toast.success("Berhasil Login");
    navigate("/");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  }
};

export const register =
  (data, navigate, toast) => async (dispatch, getState) => {
    console.log(data);
    try {
      const response = await axios.post(
        `https://backend-production-8357.up.railway.app/api/peserta/auth/register`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Register Berhasil", response);
      await toast.success("Berhasil Register");
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response);
        toast.error(error.response.data.message);
        return;
      }
    }
  };

export const noAccessToken = (navigate) => async (dispatch, getState) => {
  const token = getState().auth.token;
  try {
    await axios.get(
      `https://backend-production-8357.up.railway.app/api/peserta/getPesertaQuestions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    dispatch(setToken(null));
    dispatch(setUser(null));
    toast.error("Token kadaluarsa.");
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 1500);
    toast.error(error);
  }
};

export const getUserProfile = () => async (dispatch, getState) => {
  const token = getState().auth.token;
  try {
    const response = await axios.get(
      `https://backend-production-8357.up.railway.app/api/peserta/auth/profile`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response", response.data.data);
    dispatch(setUserProfil(response.data.data));
  } catch (error) {
    console.log(error.message);
  }
};

export const checkIsDone = () => async (dispatch, getState) => {
  const token = getState().auth.token;
  console.log("token", token);
  try {
    const response = await axios.get(
      `https://backend-production-8357.up.railway.app/api/peserta/answerQuestion/isDone`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response", response.data);
    // dispatch(setIsDone());
  } catch (error) {
    console.log(error.message);
  }
};

export const checkToken = (navigate) => (dispatch, getState) => {
  const token = getState().auth.token;
  if (!token) {
    toast.error(
      "Ups.. tidak dapat mengakses halaman, silakan masuk terlebih dahulu."
    );
    navigate("/login");
  }
};

export const logout = (navigate) => (dispatch) => {
  try {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("question");

    if (navigate) {
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
    toast.success("Berhasil log out.");
  } catch (error) {
    toast.error(error?.message);
  }
};
