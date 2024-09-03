import axios from "axios";
import { setUsers, setLoading, setError } from "../reducers/allUsersReducers";

export const allUsers = () => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const token = getState().auth.token || localStorage.getItem("token");
  try {
    const response = await axios.get(
      `https://backend-production-8357.up.railway.app/api/admin/auth/peserta`,
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
      dispatch(setError(error.response?.data?.message || 'Terjadi kesalahan'));
    } else {
        console.error("Terjadi kesalahan:", error);
      dispatch(setError('Terjadi kesalahan yang tidak diketahui'));
    }
  } finally {
    dispatch(setLoading(false));
  }
};