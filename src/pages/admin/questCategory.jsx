import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  category,
  addCategory,
  deleteCategory,
} from "../../redux/actions/allCategoryAction";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          className="absolute top-1 right-3 text-gray-500 text-2xl hover:text-red-700 z-50"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body // Memastikan modal dirender di luar hierarki DOM komponen
  );
}

function QuestCategory() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.allCategory.token);
  const categories = useSelector((state) => state.allCategory.categories);
  const [categoryName, setCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleAddCategory = () => {
    setIsAddCategoryOpen(!isAddCategoryOpen);
  };

  const toggleConfirm = () => {
    setIsConfirmOpen(!isConfirmOpen);
  };

  useEffect(() => {
    dispatch(category(token));
  }, []);

  useEffect(() => {
    console.log("Category from redux store:", categories);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      category: categoryName,
    };
    dispatch(addCategory(data));
    dispatch(category(token));
    setIsAddCategoryOpen(false);
  };

  const handleEditClick = (category) => {
    console.log("Navigating to edit page for category:", category); // Log for debugging
    navigate(`/editQuestions/${category.id}`, { state: { category }});
  };

  const handleDeleteClick = () => {
    if (selectedCategory) {
      dispatch(deleteCategory(selectedCategory.id, token));
      dispatch(category(token));
      toggleConfirm();
    }
  };

  return (
    <div className="flex flex-col max-sm:bg-gray-100">
      <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="relative flex flex-grow">
        <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-grow lg:ml-[250px] p-8 mt-[63px] lg:mt-20 z-10">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <header className="flex justify-between items-center mb-6">
              <div className="flex-1 text-left">
                <h1 className="text-2xl font-bold text-gray-900">
                  Daftar Kategori Soal
                </h1>
                <p className="text-gray-600">Jumlah kategori soal: 138</p>
              </div>
              <div className="flex-1 flex justify-end items-center">
                <div className="relative w-3/4 max-w-md mr-10">
                  <input
                    type="text"
                    placeholder="Search"
                    className="border rounded-full px-4 py-1 w-full pr-10"
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm6-2l4 4"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              <button
                className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700"
                onClick={toggleAddCategory}
              >
                Tambah kategori
              </button>
            </header>

            <table className="min-w-full text-left">
              <thead>
                <tr>
                  <th className="py-3 px-6 font-medium text-gray-600">Kategori Soal</th>
                  <th className="py-3 px-6 font-medium text-gray-600">Jumlah soal</th>
                  <th className="py-3 px-6 font-medium text-gray-600">
                    Detail
                  </th>
                  <th className="py-3 px-6 font-medium text-gray-600">Hapus</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-6">{category.category}</td>
                    <td className="py-3 px-6">{category.questionCount}</td>
                    <td className="py-3 px-9">
                      <button
                        className="text-gray-500 hover:text-red-700"
                        onClick={() => handleEditClick(category)}
                      >
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M15.586 4.586a2 2 0 112.828 2.828L10 15.828l-4 1 1-4 8.586-8.586z"
                          />
                        </svg>
                      </button>
                    </td>
                    <td className="py-3 px-9">
                      <button
                        className="text-gray-500 hover:text-red-700"
                        onClick={() => {
                          setSelectedCategory(category);
                          toggleConfirm();
                        }}
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m2 0v14a2 2 0 01-2 2H8a2 2 0 01-2-2V6h12z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
                <tr className="border-t"></tr>
              </tbody>
            </table>

            <div className="flex justify-end items-center mt-6">
              <p className="text-sm font-semibold text-gray-500 mr-2">
                1 dari 100
              </p>
              <div className="flex items-center">
                <button className="px-2 py-1 font-bold text-gray-500 hover:text-red-700">
                  &lt;
                </button>
                <button className="px-2 py-1 font-bold text-gray-500 hover:text-red-700">
                  &gt;
                </button>
              </div>
            </div>
          </div>

          {/* Add Category Modal */}
          <Modal isOpen={isAddCategoryOpen} onClose={toggleAddCategory}>
            <form className="pt-4" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Kategori Soal
                </label>
                <input
                  type="text"
                  placeholder="Kategori Soal"
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="border rounded-lg px-4 py-2 w-full"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Simpan
              </button>
            </form>
          </Modal>

          {/* Confirm Delete Modal */}
          <Modal isOpen={isConfirmOpen} onClose={toggleConfirm}>
            <p>Apakah Anda yakin ingin menghapus seluruh soal dalam kategori ini?</p>
            <div className="flex justify-end mt-4">
              <button
                className="mr-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
                onClick={toggleConfirm}
              >
                Batal
              </button>
              <button
                onClick={handleDeleteClick}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </Modal>
        </main>
      </div>
    </div>
  );
}

export default QuestCategory;
