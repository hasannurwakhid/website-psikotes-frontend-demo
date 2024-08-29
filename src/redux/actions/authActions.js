import axios from "axios";
import { setToken, setUser } from "../reducers/authReducers";

export const login = (data, navigate) => async (dispatch, getState) => {
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
    navigate("/");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
      return;
    }
  }
};

export const register = (data, navigate) => async (dispatch, getState) => {
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
    navigate("/login");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
      return;
    }
  }
};
