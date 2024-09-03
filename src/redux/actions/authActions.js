import axios from "axios";
import { setToken, setUser } from "../reducers/authReducers";

// Fungsi login untuk user biasa
export const login = (data, navigate) => async (dispatch) => {
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

    console.log("Login Berhasil", token);

    if (token && token.split('.').length === 3) {
      // Simpan token dan user di state Redux
      dispatch(setToken(token));
      dispatch(setUser(user));

      // Simpan token di localStorage
      localStorage.setItem("token", token);

      // Navigasi ke halaman utama setelah login berhasil
      navigate("/");
    } else {
      console.error("Token JWT tidak valid atau malformasi.");
    }

  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error during login:", error.response.data);
    } else {
      console.error("Error during login:", error.message);
    }
  }
};

// Fungsi register untuk user biasa
export const register = (data, navigate) => async () => {
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

    // Navigasi ke halaman login setelah registrasi berhasil
    navigate("/login");
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error during registration:", error.response.data);
    } else {
      console.error("Error during registration:", error.message);
    }
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

    if (token && token.split('.').length === 3) {
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

