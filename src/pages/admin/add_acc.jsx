import React, { useState, useEffect } from "react";
import Header from "../../components/header";

function add_acc() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      {/* Sidebar and Main Content */}
      <div className="container mx-auto flex flex-grow">
        {/* Sidebar */}
        <aside
          className={`fixed md:relative transform top-0 left-0 h-full w-64 bg-red-700 text-white md:translate-x-0 p-6 transition-transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav>
            <ul>
              <li className="mb-4 bg-red-700 rounded-lg p-2 hover:bg-red-800">
                <a href="#beranda" className="flex items-center ml-4">
                  <img
                    src="\src\assets\beranda.svg"
                    alt="Beranda"
                    className="mr-5 w-6 h-6"
                  />
                  <span>Beranda</span>
                </a>
              </li>
              <li className="mb-4 bg-red-700 rounded-lg p-2 hover:bg-red-800">
                <a href="#kumpulan_soal" className="flex items-center ml-4">
                  <img
                    src="\src\assets\kumpulan_soal.svg"
                    alt="Kumpulan Soal"
                    className="mr-5 w-6 h-6"
                  />
                  <span>Kumpulan Soal</span>
                </a>
              </li>
              <li className="mb-4 bg-red-800 rounded-lg p-2">
                <a href="#akun" className="flex items-center ml-4">
                  <img
                    src="\src\assets\tambah_akun.svg"
                    alt="Tambah Akun"
                    className="mr-5 w-6 h-6"
                  />
                  <span>Tambah Akun</span>
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <header className="flex justify-between items-center mb-6">
              <div className="flex-1 text-left">
                <h1 className="text-2xl font-bold text-gray-900">
                  Daftar Akun
                </h1>
                <p className="text-gray-600">Jumlah akun terdaftar: 138</p>
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
              <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700" onClick={toggleModal}>
                Tambah akun
              </button>
            </header>

            <table className="min-w-full text-left">
              <thead>
                <tr>
                  <th className="py-3 px-6 font-medium text-gray-600">Nama</th>
                  <th className="py-3 px-6 font-medium text-gray-600">
                    Alamat Email
                  </th>
                  <th className="py-3 px-6 font-medium text-gray-600">
                    Pilihan
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="py-3 px-6">abcde fghih klmno</td>
                  <td className="py-3 px-6">abcdefghijklmno@gmail.com</td>
                  <td className="py-3 px-6 flex items-center space-x-3">
                    <button
                      className="text-gray-500 hover:text-red-700"
                      onClick={toggleModal}
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
                          d="M11 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M15.586 4.586a2 2 0 112.828 2.828L10 15.828l-4 1 1-4 8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button className="text-gray-500 hover:text-red-700">
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
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

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <button
                  className="absolute top-2 right-2 text-gray-500"
                  onClick={toggleModal}
                >
                  &times;
                </button>
                <form>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      placeholder="Nama Lengkap"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      NIP
                    </label>
                    <input
                      type="text"
                      placeholder="NIP"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Alamat Email
                    </label>
                    <input
                      type="email"
                      placeholder="Alamat Email"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Kata Sandi
                    </label>
                    <input
                      type="password"
                      placeholder="Kata Sandi"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
                  >
                    Simpan
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default add_acc;
