import axios from "axios";
import {
  setAdmin,
  setAddAdmin,
  setUpdateAdmin,
  setDeleteAdmin,
} from "../reducers/allAdminReducers";

export const admin = () => async (dispatch, getState) => {
  const token = getState().auth.token || localStorage.getItem("token");
  try {
    const response = await axios.get(
      "https://backend-production-8357.up.railway.app/api/superadmin/auth/admin",
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Respons lengkap dari server:", response);
    const admins = response.data.data;
    console.log("Data Admin", admins);
    dispatch(setAdmin(admins));
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
  }
};

export const addAdmin = (data, toast) => async (dispatch, getState) => {
  const token = getState().auth.token || localStorage.getItem("token");
  try {
    const response = await axios.post(
      `https://backend-production-8357.up.railway.app/api/superadmin/auth/admin`,
      data,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Tambah Akun Berhasil", response);
    toast.success("Berhasil menambah akun admin");
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error during add account:", error.response.data);
    } else {
      console.error("Error during add account:", error.message);
    }
  }
};

export const updateAdmin = (id, data, toast) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token || localStorage.getItem("token");
    console.log(data);
    try {
      const response = await axios.put(
        `https://backend-production-8357.up.railway.app/api/superadmin/auth/admin/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Pastikan token disertakan di sini
          },
        }
      );

      console.log("Edit Akun Berhasil", response.data);
      dispatch(setUpdateAdmin(response.data.data));
      toast.success("Berhasil update data admin");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error during update account:", error.response.data);
      } else {
        console.error("Error during update account:", error.message);
      }
    }
  };
};

export const deleteAdmin = (id) => async (dispatch, getState) => {
  const token = getState().auth.token || localStorage.getItem("token");
  try {
    await axios.delete(
      `https://backend-production-8357.up.railway.app/api/superadmin/auth/admin/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pastikan token disertakan di sini
        },
      }
    );
    console.log("Hapus Akun Berhasil");
    dispatch(setDeleteAdmin(id));
    toast.success("Berhasil hapus akun admin");
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error during delete account:", error.response.data);
    } else {
      console.error("Error during delete account:", error.message);
    }
  }
};
