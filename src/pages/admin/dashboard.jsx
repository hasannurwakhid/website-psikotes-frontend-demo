import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { allUsers } from "../../redux/actions/allUsersActions";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[800px] relative">
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

function DashboardAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDetailAccOpen, setIsDetailAccOpen] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const users = useSelector((state) => state.allUsers.users);
  const [selectedUser, setSelectedUser] = useState(null);

  const toggleDetailAcc = () => {
    setIsDetailAccOpen(!isDetailAccOpen);
  };

  useEffect(() => {
    dispatch(allUsers());
  }, []);

  useEffect(() => {
    console.log("Users from Redux store:", users);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleDetailClick = (user) => {
    setSelectedUser({
      ...user,
    });
    toggleDetailAcc();
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
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-gray-500">Jumlah Kategori Soal</div>
              <div className="flex w-full justify-between">
                <div className="text-6xl font-bold">10</div>
                <img src=".\src\assets\jks.svg" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-gray-500">Rata Rata Nilai Peserta</div>
              <div className="flex w-full justify-between">
                <div className="text-6xl font-bold">89</div>
                <img src=".\src\assets\rnp.svg" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-gray-500">Batas Minimal Nilai</div>
              <div className="flex w-full justify-between">
                <div className="text-6xl font-bold">80</div>
                <img src=".\src\assets\bmn.svg" />
              </div>{" "}
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow">
            <div className="text-2xl font-bold mb-4">Daftar Peserta</div>
            <table className="min-w-full table-auto">
              <thead>
                <tr className="text-left">
                  <th className="py-2 px-4 font-medium text-gray-600">NIK</th>
                  <th className="py-2 px-4 font-medium text-gray-600">
                    Nama Lengkap
                  </th>
                  <th className="py-2 px-4 font-medium text-gray-600">Nilai</th>
                  <th className="py-2 px-4 font-medium text-gray-600">
                    Status
                  </th>
                  <th className="py-2 px-4 font-medium text-gray-600">
                    Detail
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4">{user.nik || "-"}</td>
                    <td className="py-2 px-4">{user.name || "-"}</td>
                    <td className="py-2 px-4">{user.score || "-"}</td>
                    <td className="py-2 px-4">{user.note || "-"}</td>
                    <td className="py-3 px-7">
                      <button
                        className="text-gray-500 hover:text-red-700"
                        onClick={() => handleDetailClick(user)}
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
                    </td>
                  </tr>
                ))}
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

          {/* Detail Account Modal */}
          <Modal isOpen={isDetailAccOpen} onClose={toggleDetailAcc}>
            {selectedUser && (
              <form className="pt-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Left "Sheet" */}
                <div className="p-4 bg-white shadow-md rounded-lg">
                  <div className="text-lg font-bold mb-1">Profil Peserta</div>
                  {/* Pembatas */}
                  <div className="mb-4">
                    <hr className="border-gray-300"/>
                  </div>
                  <div className="mb-4 flex">
                    <span className="text-gray-700 text-sm font-bold w-32">NIK</span>
                    <span className="text-gray-700 text-sm font-bold mr-2">:</span>
                    <span>{selectedUser.nik}</span>
                  </div>
                  <div className="mb-4 flex">
                    <span className="text-gray-700 text-sm font-bold w-32">Nama</span>
                    <span className="text-gray-700 text-sm font-bold mr-2">:</span>
                    <span>{selectedUser.name}</span>
                  </div>
                  <div className="mb-4 flex">
                    <span className="text-gray-700 text-sm font-bold w-32">Email</span>
                    <span className="text-gray-700 text-sm font-bold mr-2">:</span>
                    <span>{selectedUser.email}</span>
                  </div>
                  <div className="mb-4 flex">
                    <span className="text-gray-700 text-sm font-bold w-32">No Telp</span>
                    <span className="text-gray-700 text-sm font-bold mr-2">:</span>
                    <span>{selectedUser.phoneNumber}</span>
                  </div>
                </div>
                
                {/* Right "Sheet" */}
                <div className="p-4 bg-white shadow-md rounded-lg">
                  <div className="text-lg font-bold mb-1">Detail Tes</div>
                  {/* Pembatas */}
                  <div className="mb-4">
                    <hr className="border-gray-300"/>
                  </div>
                  <div className="mb-4 flex">
                    <span className="text-gray-700 text-sm font-bold w-32">Waktu Mulai Tes</span>
                    <span className="text-gray-700 text-sm font-bold mr-2">:</span>
                    <span>{selectedUser.startTime}</span>
                  </div>
                  <div className="mb-4 flex">
                    <span className="text-gray-700 text-sm font-bold w-32">Waktu Selesai Tes</span>
                    <span className="text-gray-700 text-sm font-bold mr-2">:</span>
                    <span>{selectedUser.endTime}</span>
                  </div>
                  <div className="mb-4 flex">
                    <span className="text-gray-700 text-sm font-bold w-32">Total Waktu Tes</span>
                    <span className="text-gray-700 text-sm font-bold mr-2">:</span>
                    <span>{selectedUser.totalTime}</span>
                  </div>
                  <div className="mb-4 flex">
                    <span className="text-gray-700 text-sm font-bold w-32">Total Point</span>
                    <span className="text-gray-700 text-sm font-bold mr-2">:</span>
                    <span>{selectedUser.totalPoint}</span>
                  </div>
                </div>
              </div>
            </form>
            
            
            )}
          </Modal>
        </main>
      </div>
    </div>
  );
}

export default DashboardAdmin;
