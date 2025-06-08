import axios from "axios";
import {
  setCategory,
  setUpdateCategory,
  setDeleteCategory,
  setQuestions,
} from "../reducers/allCategoryReducers";

export const category = () => async (dispatch, getState) => {
  const token = getState().auth.token || localStorage.getItem("token");
  try {
    const response = await axios.get(
      "https://backend-ancient-water-1319.fly.dev/api/peserta/categories",
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
      `https://backend-ancient-water-1319.fly.dev/api/admin/categories`,
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
        `https://backend-ancient-water-1319.fly.dev/api/admin/categories/${id}`,
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
      `https://backend-ancient-water-1319.fly.dev/api/admin/categories/${id}`,
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
      "https://backend-ancient-water-1319.fly.dev/api/admin/categories/questions",
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

  // Buat FormData
  let formData = new FormData();

  // Tambahkan data ke dalam FormData
  formData.append("question", data.question);
  if (data.imageQuestion) {
    formData.append("imageQuestion", data.imageQuestion); // Tambahkan file gambar jika ada
  }
  formData.append("point", data.point);
  formData.append("categoryId", data.categoryId);
  formData.append("multipleChoice1", data.multipleChoice1);
  formData.append("multipleChoice2", data.multipleChoice2);
  formData.append("multipleChoice3", data.multipleChoice3);
  formData.append("multipleChoice4", data.multipleChoice4);
  formData.append("multipleChoice5", data.multipleChoice5);

  if (data.multipleChoiceImg1) {
    formData.append("multipleChoiceImg1", data.multipleChoiceImg1); // Tambahkan file gambar untuk pilihan jawaban jika ada
  }
  if (data.multipleChoiceImg2) {
    formData.append("multipleChoiceImg2", data.multipleChoiceImg2);
  }
  if (data.multipleChoiceImg3) {
    formData.append("multipleChoiceImg3", data.multipleChoiceImg3);
  }
  if (data.multipleChoiceImg4) {
    formData.append("multipleChoiceImg4", data.multipleChoiceImg4);
  }
  if (data.multipleChoiceImg5) {
    formData.append("multipleChoiceImg5", data.multipleChoiceImg5);
  }

  formData.append("correctAnswer", data.correctAnswer);

  try {
    // Mengirim data menggunakan axios
    const response = await axios.post(
      "https://backend-ancient-water-1319.fly.dev/api/admin/questions",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Tidak perlu set "Content-Type", browser akan otomatis menetapkannya
        },
        maxBodyLength: Infinity, // Mengizinkan body yang lebih besar jika dibutuhkan
      }
    );

    console.log("Tambah Soal Berhasil", response);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error during add question:", error.response.data);
    } else {
      console.error("Error during add question:", error.message);
    }
  }
};

export const updateQuestion = (data, id) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token || localStorage.getItem("token");
    console.log(data);
    try {
      const response = await axios.put(
        `https://backend-ancient-water-1319.fly.dev/api/admin/questions/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Pastikan token disertakan di sini
          },
        }
      );

      console.log("Edit Question Berhasil", response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error during update account:", error.response.data);
      } else {
        console.error("Error during update account:", error.message);
      }
    }
  };
};

export const updateMultipleChoices = (data, id) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token || localStorage.getItem("token");
    console.log(data);
    try {
      const response = await axios.put(
        `https://backend-ancient-water-1319.fly.dev/api/admin/questions/multipleChoice/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Pastikan token disertakan di sini
          },
        }
      );

      console.log("Edit MultipleChoices Berhasil", response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error during update account:", error.response.data);
      } else {
        console.error("Error during update account:", error.message);
      }
    }
  };
};

export const updateAnswerKey =
  (id, dataAnswerKey) => async (dispatch, getState) => {
    const token = getState().auth.token || localStorage.getItem("token");
    const data = { multipleChoiceId: dataAnswerKey };
    console.log("data", data);
    console.log("id", id);
    console.log("token", token);
    try {
      await axios.put(
        `https://backend-ancient-water-1319.fly.dev/api/admin/answerKeys/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Pastikan token disertakan di sini
          },
        }
      );

      console.log("Update Answer Key Soal Berhasil");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(
          "Error during updateAnswerKey account:",
          error.response.data
        );
      } else {
        console.error("Error during updateAnswerKey account:", error.message);
      }
    }
  };

export const deleteQuestion = (id) => async (dispatch, getState) => {
  const token = getState().auth.token || localStorage.getItem("token");
  try {
    await axios.delete(
      `https://backend-ancient-water-1319.fly.dev/api/admin/questions/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pastikan token disertakan di sini
        },
      }
    );

    console.log("Hapus Soal Berhasil");
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error during delete account:", error.response.data);
    } else {
      console.error("Error during delete account:", error.message);
    }
  }
};
