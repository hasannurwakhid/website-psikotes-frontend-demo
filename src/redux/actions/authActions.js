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
    const user = response.data.data.user;
    const token = response.data.data.token;
    dispatch(setToken(token));
    dispatch(setUser(user));
    await toast.success("Berhasil Login");
    navigate("/");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response.data.message);
    }
  }
};

export const register =
  (data, navigate, toast) => async (dispatch, getState) => {
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
      await toast.success("Berhasil Register");
      navigate("/login");
    } catch (error) { 
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data.message);
        return;
      }
    }
  };

export const getUserProfile = () => async (dispatch, getState) => {
  const token = getState().auth.token;
  try {
    const response = await axios.get(
      `https://backend-production-8357.up.railway.app/api/peserta/auth/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Log hasil respons
      const data = response?.data?.data;
      dispatch(setIsDone(data));
      dispatch(getUserProfile());
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 403) {
          toast.error("Anda tidak memiliki akses");
          dispatch(logout(navigate, toast));
          navigate("/login");
        } else {
          toast.error(error);
        }
      } else {
        toast.error(error);
      }
    }
  };

export const logout = (navigate, toast) => (dispatch) => {
  try {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("question");
    navigate("/");
    toast.success("Berhasil log out.");
  } catch (error) {
    toast.error(error?.message);
  }
};

// Fungsi login untuk admin
export const loginadmin = (data, navigate) => async (dispatch) => {
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
