import axios from "axios";
import {
  setIsDone,
  setToken,
  setUser,
  setUserProfil,
} from "../reducers/authReducers";
import { getPesertaQuestion } from "./questAction";

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
  console.log("token GetUserProfile", token);
  try {
    const response = await axios.get(
      `https://backend-production-8357.up.railway.app/api/peserta/auth/profile`,
      {
        headers: {
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

export const checkIsDone =
  (token, toast, navigate) => async (dispatch, getState) => {
    try {
      const response = await axios.get(
        "https://backend-production-8357.up.railway.app/api/peserta/answerQuestion/isDone",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Log hasil respons
      const data = response.data.data;
      console.log("dataisdone", data);
      // Pastikan tipe data yang diperoleh adalah boolean

      // Cek tipe dan nilai data
      console.log("Data type:", typeof data, "Data value:", data);

      if (data === "true" || data === true) {
        navigate("/result");
        console.log("data true");
      } else if (data === false || data === "true") {
        dispatch(getPesertaQuestion(navigate));
        console.log("data false");
      } else {
        console.error("Unexpected data value:", data);
      }
      dispatch(getUserProfile());
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          toast.error("Sesi telah berakhir. check is done");
          navigate("/result");
        } else {
          toast.error(error);
        }
      } else {
        toast.error(error);
      }
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

export const logout = (navigate, toast) => (dispatch) => {
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

// Fungsi login untuk admin
export const loginadmin = (data, navigate) => async (dispatch) => {
  console.log(data);
  try {
    const response = await axios.post(
      `https://backend-production-8357.up.railway.app/api/admin/auth/login`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { user, token } = response.data.data;

    console.log("Admin Action", user);
    console.log("Login Berhasil", token);

    if (token && token.split(".").length === 3) {
      // Simpan token dan user di state Redux
      dispatch(setToken(token));
      dispatch(setUser(user));

      // Simpan token di localStorage
      localStorage.setItem("token", token);

      // Navigasi ke dashboard admin setelah login berhasil
      navigate("/DashboardAdmin");
    } else {
      console.error("Token JWT tidak valid atau malformasi.");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error during admin login:", error.response.data);
    } else {
      console.error("Error during admin login:", error.message);
    }
  }
};
