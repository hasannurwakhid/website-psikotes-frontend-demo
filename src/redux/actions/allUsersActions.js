import axios from "axios";
import {
  setUsers,
  setLoading,
  setError,
  setAverageScore,
  setDoneCount,
} from "../reducers/allUsersReducers";

export const allUsers = () => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const token = getState().auth.token || localStorage.getItem("token");
  try {
    const response = await axios.get(
      `https://backend-ancient-water-1319.fly.dev/api/admin/auth/peserta`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Respons lengkap dari server:", response);
    const users = response.data.data;
    console.log("Data Peserta", users);
    dispatch(setUsers(users));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("API Error Response:", error.respons);
      dispatch(setError(error.response?.data?.message || "Terjadi kesalahan"));
    } else {
      console.error("Terjadi kesalahan:", error);
      dispatch(setError("Terjadi kesalahan"));
    }
  } finally {
    dispatch(setLoading(false));
  }
};

export const getTotalPoint = () => async (dispatch, getState) => {
  const token = getState().auth.token || localStorage.getItem("token");
  try {
    const response = await axios.get(
      `https://backend-ancient-water-1319.fly.dev/api/admin/totalPoints/average`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const averageScore = response.data.data.averagePesertaPoints;
    console.log("average:", averageScore);
    dispatch(setAverageScore(averageScore));
    const doneCount = response.data.data.doneCount;
    console.log("doneCount:", doneCount);
    dispatch(setDoneCount(doneCount));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || "Gagal memuat"));
  }
};

export const getDeletePeserta = (id, toast) => async (dispatch, getState) => {
  const token = getState().auth.token || localStorage.getItem("token");
  try {
    const response = await axios.delete(
      `https://backend-ancient-water-1319.fly.dev/api/admin/auth/peserta/${id}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response", response);
    toast.success("Hapus Akun Berhasil!");
  } catch (error) {
    console.log("error delete Peserta ", error);
  }
};
