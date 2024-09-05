import axios from "axios";
import {
  setCategory,
  setAddCategory,
  setUpdateCategory,
  setDeleteCategory,
  setQuestions,
  setAddQuestions,
  setUpdateQuestions,
  setDeleteQuestions,
} from "../reducers/allCategoryReducers";

export const category = () => async (dispatch, getState) => {
  const token = getState().auth.token || localStorage.getItem("token");
  try {
    const response = await axios.get(
      "https://backend-production-8357.up.railway.app/api/peserta/categories",
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Respons lengkap dari server:", response);
    const categories = response.data.data;
    console.log("Data Kategori Soal", categories);
    dispatch(setCategory(categories));
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
  }
};

export const addCategory = (data) => async (dispatch, getState) => {
  const token = getState().auth.token || localStorage.getItem("token");
  try {
    const response = await axios.post(
      `https://backend-production-8357.up.railway.app/api/admin/categories`,
      data,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Tambah Kategori Soal Berhasil", response);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error during add category:", error.response.data);
    } else {
      console.error("Error during add category:", error.message);
    }
  }
};

export const updateCategory = (id, data) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token || localStorage.getItem("token");
    console.log(data);
    try {
      const response = await axios.put(
        `https://backend-production-8357.up.railway.app/api/admin/categories/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Pastikan token disertakan di sini
          },
        }
      );

      console.log("Edit Kategori Soal Berhasil", response.data);
      dispatch(setUpdateCategory(response.data.data));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error during update category:", error.response.data);
      } else {
        console.error("Error during update category:", error.message);
      }
    }
  };
};

export const deleteCategory = (id) => async (dispatch, getState) => {
  const token = getState().auth.token || localStorage.getItem("token");
  try {
    await axios.delete(
      `https://backend-production-8357.up.railway.app/api/admin/categories/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pastikan token disertakan di sini
        },
      }
    );

    console.log("Hapus Kategori Soal Berhasil");
    dispatch(setDeleteCategory(id));
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error during delete category:", error.response.data);
    } else {
      console.error("Error during delete category:", error.message);
    }
  }
};

export const questions = (categoryId) => async (dispatch, getState) => {
  const token = getState().auth.token || localStorage.getItem("token");

  try {
    const response = await axios.post(
      "https://backend-production-8357.up.railway.app/api/admin/categories/questions",
      { categoryId: String(categoryId) },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Header Authorization
          "Content-Type": "application/json", // Content-Type untuk JSON
        },
      }
    );

    console.log("Respons lengkap dari server:", response);
    console.log("Response Data:", response.data);
    const questions = response.data.data;
    console.log("Data Soal:", questions);
    // Dispatch data yang diterima dari API ke Redux store
    dispatch(setQuestions(questions));

    return questions; // Mengembalikan data untuk keperluan lain jika diperlukan
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error Response Data:", error.response.data);
    } else {
      console.error("Error Message:", error.message);
    }
  }
};

export const addQuestions = (data) => async (dispatch, getState) => {
  const token = getState().auth.token || localStorage.getItem("token");
  try {
    const response = await axios.post(``, data, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Tambah Soal Berhasil", response);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error during add question:", error.response.data);
    } else {
      console.error("Error during add question:", error.message);
    }
  }
};

export const deleteQuestion = (data) => async (dispatch, getState) => {
  const token = getState().auth.token || localStorage.getItem("token");
  try {
    const response = await axios.post(``, data, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Tambah Soal Berhasil", response);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error during add question:", error.response.data);
    } else {
      console.error("Error during add question:", error.message);
    }
  }
};
