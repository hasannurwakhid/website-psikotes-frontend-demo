import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { questions } from "../../redux/actions/allCategoryAction";

function EditQuestions() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState({
    categoryName: "",
  });
  const questionList = useSelector((auth) => auth?.allCategory?.questions);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    console.log("location.state", location.state);
    if (location.state && location.state.category) {
      setSelectedValue({
        categoryName: location.state.category || "",
      });
    }
  }, [location.state]);

  useEffect(() => {
    if (selectedValue.categoryName) {
      const categoryId = selectedValue.categoryName.id; // Ambil ID dari kategori
      console.log("categoryId", categoryId); // Verifikasi ID yang dikirimkan
      dispatch(questions(categoryId));
    }
  }, [dispatch, selectedValue.categoryName]);

  console.log("selectedValue", selectedValue.categoryName.category);
  console.log("questionList", questionList);

  return (
    <div className="flex flex-col maxsm:bg-gray-100">
      <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {/* Sidebar and Main Content */}
      <div className="relative flex flex-grow">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <main className="flex-grow lg:ml-[250px] p-8 mt-[63px] lg:mt-20 z-10">
          <div className="bg-white shadow-lg rounded-lg p-4">
            <div className="flex justify-between items-center mb-3 pl-1 pr-1">
              <div className="ml-2 text-xl flex justify-between">
                <label className="font-bold mt-1">Kategori Soal: </label>
                <input
                  type="text"
                  placeholder="Kategori Soal"
                  value={selectedValue.categoryName.category || ""}
                  onChange={(e) =>
                    setSelectedValue({
                      ...selectedValue,
                      categoryName: e.target.value,
                    })
                  }
                  className="border rounded-lg px-4 py-2 w-[200px] h-8 ml-2 mt-[2px] font-semibold"
                />
              </div>
              <div className="flex justify-between">
                <button className="flex justify-center items-center w-[120px] h-10 bg-red-600 text-white hover:bg-red-700 hover:text-gray-100 rounded-lg shadow font-bold">
                  Tambah Soal
                </button>
              </div>
            </div>

            {questionList.map((question, index) => (
              <div key={index} className="bg-while p-3 mb-4 rounded-xl shadow">
                <div className="border border-gray-300 rounded-xl bg-white p-2 mb-2">
                  <textarea
                    className="pl-1 w-full h-12 p-2 border-none focus:outline-none text-md placeholder-gray-500"
                    placeholder="Tulis Pertanyaan"
                    readOnly
                  />
                </div>

                {questionList.map((question, index) => (
                  <div
                    key={index}
                    className="bg-white p-3 mb-4 rounded-xl shadow"
                  >
                    <div className="border border-gray-300 rounded-xl bg-white p-2 mb-2">
                      <textarea
                        className="pl-1 w-full h-12 p-2 border-none focus:outline-none text-md placeholder-gray-500"
                        placeholder="Tulis Pertanyaan"
                        value={question.text} // Assuming the question has a text property
                        readOnly
                      />
                    </div>

                    {question.options.map((option, idx) => (
                      <div
                        key={idx}
                        className="flex items-center bg-white p-1 rounded-full shadow-md w-full"
                      >
                        <div className="ml-2 w-5 h-5 rounded-full border border-gray-400 flex-shrink-0"></div>
                        <label className="ml-2 text-gray-400 text-ms">
                          {`Opsi ${idx + 1}`}
                        </label>
                        <input
                          type="text"
                          className="ml-6 flex-1 bg-transparent border-b-2 border-gray-400 focus:outline-none focus:border-gray-600 text-ms"
                          placeholder="Masukkan opsi"
                          value={option.text} // Assuming each option has a text property
                          readOnly
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}

            <div className="flex justify-end m-4 space-x-2">
              <button
                className="text-gray-400 hover:text-gray-500 mt-[1px]"
                onClick={() => handleEditClick(admin)}
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
              <button
                className="text-gray-400 hover:text-gray-500"
                onClick={() => {
                  setSelectedAdmin(admin);
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
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default EditQuestions;
