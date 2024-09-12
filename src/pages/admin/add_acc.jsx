import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  admin,
  addAdmin,
  updateAdmin,
  deleteAdmin,
} from "../../redux/actions/allAdminActions";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

import Modal from "../../modal/modal";

function AddAcc() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAddAccOpen, setIsAddAccOpen] = useState(false);
  const [isEditAccOpen, setIsEditAccOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State untuk menyimpan query pencarian
  const [currentPage, setCurrentPage] = useState(1); // State untuk halaman saat ini
  const accountsPerPage = 10; // Jumlah akun per halaman
  const dispatch = useDispatch();
  const token = useSelector((state) => state.allAdmin.token);
  const admins = useSelector((state) => state.allAdmin.admins);
  const [nip, setNip] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleAddAcc = () => {
    setIsAddAccOpen(!isAddAccOpen);
  };

  const toggleEditAcc = () => {
    setIsEditAccOpen(!isEditAccOpen);
  };

  const toggleConfirm = () => {
    setIsConfirmOpen(!isConfirmOpen);
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleShowEditPassword = () => {
    setShowEditPassword((prevShowEditPassword) => !prevShowEditPassword);
  };

  useEffect(() => {
    dispatch(admin(token));
  }, [dispatch, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      nip,
      name,
      email,
      phoneNumber,
      password,
    };
    dispatch(addAdmin(data, toast)).then(() => {
      setIsAddAccOpen(false);
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (selectedAdmin) {
      const data = {
        nip: selectedAdmin.nip,
        name: selectedAdmin.name,
        email: selectedAdmin.email,
        phoneNumber: selectedAdmin.phoneNumber,
        password: selectedAdmin.password,
      };
      dispatch(updateAdmin(selectedAdmin.id, data, toast)).then(() => {
        toggleEditAcc();
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const handleEditClick = (admin) => {
    setSelectedAdmin({
      ...admin,
    });
    toggleEditAcc();
  };

  const handleDeleteClick = () => {
    if (selectedAdmin) {
      dispatch(deleteAdmin(selectedAdmin.id, token, toast));
      dispatch(admin(token));
      toggleConfirm();
    }
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  // Filter admins berdasarkan input pencarian
  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.nip.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Menghitung total halaman
  const totalPages = Math.ceil(filteredAdmins.length / accountsPerPage);

  // Menentukan data yang akan ditampilkan pada halaman saat ini
  const indexOfLastAccount = currentPage * accountsPerPage;
  const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
  const currentAdmins = filteredAdmins.slice(
    indexOfFirstAccount,
    indexOfLastAccount
  );

  // Fungsi untuk mengubah halaman
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col max-sm:bg-gray-100">
      <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="relative flex flex-grow">
        <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-grow lg:ml-[250px] p-8 mt-[63px] lg:mt-20 z-10">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full">
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
            <header className="flex justify-between items-center mb-6">
              <div className="flex-1 text-left">
                <h1 className="text-2xl font-bold text-gray-900">
                  Daftar Akun
                </h1>
                <p className="text-gray-600">
                  Total akun terdaftar: {filteredAdmins.length}
                </p>
              </div>
              <div className="flex-1 flex justify-end items-center">
                <div className="relative w-3/4 max-w-md mr-10">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
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
                onClick={toggleAddAcc}
              >
                Tambah akun
              </button>
            </header>

            <table className="min-w-full text-left">
              <thead>
                <tr className="flex">
                  <th className="w-1/5 py-3 font-medium text-gray-600">NIP</th>
                  <th className="w-1/5 py-3 px-6 font-medium text-gray-600">
                    Nama
                  </th>
                  <th className="w-2/5 py-3 px-6 font-medium text-gray-600">
                    Alamat Email
                  </th>
                  <th className="w-1/5 py-3 font-medium text-gray-600 text-center">
                    <div className="flex justify-center">
                      <span>Edit</span>
                    </div>
                  </th>
                  <th className="w-1/5 py-3 font-medium text-gray-600 text-center">
                    <div className="flex justify-center">
                      <span>Hapus</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentAdmins.map((admin, index) => (
                  <tr key={index} className="flex">
                    <td className="w-1/5 py-3 whitespace-nowrap overflow-hidden text-ellipsis">
                      {admin.nip}
                    </td>
                    <td className="w-1/5 py-3 px-6 whitespace-nowrap overflow-hidden text-ellipsis">
                      {admin.name}
                    </td>
                    <td className="w-2/5 py-3 px-6 whitespace-nowrap overflow-hidden text-ellipsis">
                      {admin.email}
                    </td>
                    <td className="w-1/5 py-3 flex justify-center">
                      <button
                        className="text-gray-500 hover:text-red-700 items-center"
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
                    </td>
                    <td className="w-1/5 py-3 flex justify-center">
                      <button
                        className="text-gray-600 hover:text-red-700"
                        onClick={() => {
                          setSelectedAdmin(admin);
                          toggleConfirm();
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end items-center mt-6">
              <p className="text-sm font-semibold text-gray-500 mr-2">
                Halaman {currentPage} dari {totalPages}
              </p>
              <div className="flex items-center">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`px-2 py-1 font-bold text-gray-500 hover:text-red-700 ${
                    currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                  }`}
                >
                  &lt;
                </button>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-2 py-1 font-bold text-gray-500 hover:text-red-700 ${
                    currentPage === totalPages
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }`}
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>

          {/* Add Account Modal */}
          <Modal isOpen={isAddAccOpen} onClose={toggleAddAcc}>
            <form className="pt-1" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  NIP
                </label>
                <input
                  type="text"
                  placeholder="NIP"
                  onChange={(e) => setNip(e.target.value)}
                  className="border rounded-lg px-4 py-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Nama
                </label>
                <input
                  type="text"
                  placeholder="Nama"
                  onChange={(e) => setName(e.target.value)}
                  className="border rounded-lg px-4 py-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded-lg px-4 py-2 w-full"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  No Telp
                </label>
                <input
                  type="phoneNumber"
                  placeholder="No Telp"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="border rounded-lg px-4 py-2 w-full"
                  autoComplete="phoneNumber"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="border rounded-lg px-4 py-2 w-full"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-red-700"
                  >
                    {showPassword ? (
                      <svg
                        fill="black"
                        className="w-4 h-4 hover:fill-black"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                      >
                        <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm51.3 163.3l-41.9-33C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5zm-88-69.3L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8z" />
                      </svg>
                    ) : (
                      <svg
                        fill="black"
                        className="w-4 hover:fill-black"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Simpan
              </button>
            </form>
          </Modal>

          {/* Edit Account Modal */}
          <Modal isOpen={isEditAccOpen} onClose={toggleEditAcc}>
            {selectedAdmin && (
              <form className="pt-1" onSubmit={handleEditSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    NIP
                  </label>
                  <input
                    type="text"
                    placeholder="NIP"
                    value={selectedAdmin.nip}
                    onChange={(e) =>
                      setSelectedAdmin({
                        ...selectedAdmin,
                        nip: e.target.value,
                      })
                    }
                    className="border rounded-lg px-4 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Nama
                  </label>
                  <input
                    type="text"
                    placeholder="Nama"
                    value={selectedAdmin.name}
                    onChange={(e) =>
                      setSelectedAdmin({
                        ...selectedAdmin,
                        name: e.target.value,
                      })
                    }
                    className="border rounded-lg px-4 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={selectedAdmin.email}
                    onChange={(e) =>
                      setSelectedAdmin({
                        ...selectedAdmin,
                        email: e.target.value,
                      })
                    }
                    className="border rounded-lg px-4 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    No Telp
                  </label>
                  <input
                    type="phoneNumber"
                    placeholder="No Telpm"
                    value={selectedAdmin.phoneNumber}
                    onChange={(e) =>
                      setSelectedAdmin({
                        ...selectedAdmin,
                        phoneNumber: e.target.value,
                      })
                    }
                    className="border rounded-lg px-4 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showEditPassword ? "text" : "password"}
                      placeholder="Password"
                      onChange={(e) =>
                        setSelectedAdmin({
                          ...selectedAdmin,
                          password: e.target.value,
                        })
                      }
                      className="border rounded-lg px-4 py-2 w-full"
                    />
                    <button
                      type="button"
                      onClick={toggleShowEditPassword}
                      className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-red-700"
                    >
                      {showEditPassword ? (
                        <svg
                          fill="black"
                          className="w-4 h-4 hover:fill-black"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 640 512"
                        >
                          <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm51.3 163.3l-41.9-33C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5zm-88-69.3L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8z" />
                        </svg>
                      ) : (
                        <svg
                          fill="black"
                          className="w-4 hover:fill-black"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Simpan
                </button>
              </form>
            )}
          </Modal>

          {/* Confirm Delete Modal */}
          <Modal isOpen={isConfirmOpen} onClose={toggleConfirm}>
            <p>Apakah Anda yakin ingin menghapus akun ini?</p>
            <div className="flex justify-end mt-4">
              <button
                className="mr-2 bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-lg"
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

export default AddAcc;
