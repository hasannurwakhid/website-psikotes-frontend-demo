import React, { useState } from "react";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

function QuestionForm() {
  return (
    <div className="bg-gray-100 p-6 mb-6 rounded-3xl shadow">
      <div className="border border-gray-300 rounded-3xl bg-white p-4 mb-4">
        <textarea
          className="pl-1 w-full h-20 p-2 border-none focus:outline-none text-md placeholder-gray-500"
          placeholder="Tulis Pertanyaan"
        />
        <div className="flex items-center mt-2 space-x-4">
          <button>
            <img className="h-6 w-6" src=".\src\assets\bold.svg" />
          </button>
          <button>
            <img className="h-6 w-6" src=".\src\assets\italic.svg" />
          </button>
          <button>
            <img className="h-6 w-6" src=".\src\assets\picture.svg" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center bg-white p-2 rounded-full shadow-md w-full">
          <div className="w-7 h-7 rounded-full border border-gray-400 flex-shrink-0"></div>
          <label className="ml-4 text-gray-400 text-lg">Opsi 1</label>
          <input
            type="text"
            className="ml-6 flex-1 bg-transparent border-b-2 border-gray-400 focus:outline-none focus:border-gray-600 text-lg"
            placeholder="Masukkan opsi"
          />
          <button className="ml-2 mr-1">
            <img
              src=".\src\assets\picture.svg" // Replace with your image icon URL
              alt="icon"
              className="w-8 h-8"
            />
          </button>
        </div>
        <div className="flex items-center bg-white p-2 rounded-full shadow-md w-full">
          <div className="w-7 h-7 rounded-full border border-gray-400 flex-shrink-0"></div>
          <label className="ml-4 text-gray-400 text-lg">Opsi 2</label>
          <input
            type="text"
            className="ml-6 flex-1 bg-transparent border-b-2 border-gray-400 focus:outline-none focus:border-gray-600 text-lg"
            placeholder="Masukkan opsi"
          />
          <button className="ml-2 mr-1">
            <img
              src=".\src\assets\picture.svg" // Replace with your image icon URL
              alt="icon"
              className="w-8 h-8"
            />
          </button>
        </div>
        <button className="bg-gray-300 hover:bg-gray-400 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-8 h-8"
          >
            <path
              fillRule="evenodd"
              d="M12 4a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H5a1 1 0 110-2h6V5a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div className="flex justify-end mt-4 space-x-2">
        <button className="bg-gray-300 hover:bg-gray-400 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-7 h-7"
          >
            <path d="M12 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 6V3.5L18.5 8H14z" />
          </svg>
        </button>
        <button className="bg-gray-300 hover:bg-gray-400 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-8 h-8"
          >
            <path
              fillRule="evenodd"
              d="M12 4a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H5a1 1 0 110-2h6V5a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

function AddQuestions() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col maxsm:bg-gray-100">
      <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {/* Sidebar and Main Content */}
      <div className="relative flex flex-grow">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <main className="flex-grow lg:ml-[250px] p-8 mt-[63px] lg:mt-20 z-10">
          <div className="bg-white shadow-lg rounded-3xl p-6">
            <div className="flex justify-between items-center mb-6 pl-1 pr-1">
              <h1 className="text-3xl font-bold">Tes Gambar</h1>
              <button className="flex justify-center items-center w-[120px] h-12 bg-red-600 text-white hover:bg-red-700 hover:text-gray-100 rounded-lg shadow font-bold">
                Tambah Soal
              </button>
            </div>

            {/* Question Form */}
            <QuestionForm />
            
            {/* Add more QuestionForm components as needed */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddQuestions;
