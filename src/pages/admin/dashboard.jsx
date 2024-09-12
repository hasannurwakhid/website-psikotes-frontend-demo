import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { allUsers, getTotalPoint } from "../../redux/actions/allUsersActions";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import Modal from "../../modal/modal";

const timeFormat = (isoString) => {
  if (!isoString || isNaN(Date.parse(isoString))) return "-";
  const date = new Date(isoString);
  const formattedDate = date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return `${formattedDate} | ${formattedTime} WIB`;
};

const totalTime = (milliseconds) => {
  if (!milliseconds || milliseconds <= 0) return "0 detik";
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const total = [];
  if (hours > 0) total.push(`${hours} jam`);
  if (minutes > 0) total.push(`${minutes} menit`);
  if (seconds > 0) total.push(`${seconds} detik`);

  return total.join(", ");
};

function DashboardAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDetailAccOpen, setIsDetailAccOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const users = useSelector((state) => state.allUsers.users);
  const averageScore = useSelector((state) => state.allUsers.averageScore);
  const doneCount = useSelector((state) => state.allUsers.doneCount);
  const [selectedUser, setSelectedUser] = useState(null);

  const usersPerPage = 10;

  const toggleDetailAcc = () => {
    setIsDetailAccOpen(!isDetailAccOpen);
    setSidebarOpen(false);
  };

  useEffect(() => {
    if (sidebarOpen) {
      setIsDetailAccOpen(false);
    }
  }, [sidebarOpen]);

  useEffect(() => {
    dispatch(allUsers());
    dispatch(getTotalPoint());
  }, [dispatch]);

  useEffect(() => {
    console.log("Users from Redux store:", users);
  }, [users]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleDetailClick = (user) => {
    setSelectedUser({
      ...user,
    });
    toggleDetailAcc();
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const adjustedScore = typeof averageScore === "number" ? averageScore : 0;
  const angle = (adjustedScore / 100) * 180 - 90;

  // Filter users berdasarkan input pencarian
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.nik.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

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
    <div className="flex flex-col maxsm:bg-gray-100">
      <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {/* Sidebar and Main Content */}
      <div className="relative flex flex-grow">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <main className="flex-grow lg:ml-[250px] p-8 mt-[63px] lg:mt-20 z-10">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-white p-6 rounded-lg shadow flex-col">
              <div className="text-gray-500 flex">Total Peserta Terdaftar</div>
              <div className="flex w-full mt-3 justify-between">
                <div className="text-6xl font-bold">{filteredUsers.length}</div>
                <img
                  src="\img\jks.svg"
                  alt="icon"
                  className="h-[70px] w-[70px]"
                />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow flex-col">
              <div className="text-gray-500 flex">Total Peserta Selesai</div>
              <div className="flex w-full mt-3 justify-between">
                <div className="text-6xl font-bold">{doneCount || 0}</div>
                <img src="\img\tps.svg" alt="icon" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow flex-col">
              <div className="text-gray-500 flex">Rata Rata Nilai Peserta</div>
              <div className="flex w-full mt-3 justify-between">
                <div className="text-6xl font-bold">
                  {Math.round(averageScore) || "0"}
                </div>
                <div className="relative w-20 h-20">
                  <svg className="w-full h-full" viewBox="0 0 100 50">
                    <image
                      href="/img/pelangi.svg"
                      x="0"
                      y="-7"
                      width="100"
                      height="50"
                    />

                    <g transform={`rotate(${angle}, 50, 40)`}>
                      {" "}
                      <image
                        href="/img/jarum.svg"
                        x="44"
                        y="10"
                        width="12"
                        height="40"
                      />{" "}
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow">
            <header className="flex justify-between items-center mb-6">
              <div className="flex-1 text-left">
                <h1 className="text-2xl font-bold text-gray-900">
                  Daftar Peserta
                </h1>
              </div>
              <div className="flex-1 flex justify-end">
                <div className="relative flex justify-end w-3/5 max-w-md">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
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
            </header>
            <table className="min-w-full table-auto">
              <thead>
                <tr className="text-left align-top">
                  <th className="w-1/5 py-2 font-medium text-gray-600">NIK</th>
                  <th className="w-2/5 py-2 px-4 font-medium text-gray-600 ">
                    Nama Lengkap
                  </th>
                  <th className="w-1/5 py-2 px-4 font-medium text-gray-600 text-center">
                    Status Pengerjaan
                  </th>
                  <th className="w-1/5 py-2 px-4 font-medium text-gray-600 text-center">
                    Nilai
                  </th>
                  <th className="py-2 px-4 font-medium flex justify-end text-gray-600">
                    Detail
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                  <tr key={index} className="border-b align-top">
                    <td className="py-2">{user.nik || "-"}</td>
                    <td className="py-2 px-4">{user.name || "-"}</td>
                    <td
                      className={`flex justify-center text-center line-block mb-1 px-2 py-1 rounded-full ${
                        user.statusPengerjaan === "Belum dikerjakan"
                          ? "bg-gray-300"
                          : user.statusPengerjaan === "Sedang dikerjakan"
                          ? "bg-yellow-300"
                          : user.statusPengerjaan === "Sudah dikerjakan"
                          ? "bg-green-400"
                          : ""
                      }`}
                    >
                      {user.statusPengerjaan}
                    </td>
                    <td className="py-2 px-4 text-center">
                      {user.pointTotal !== null && user.pointTotal !== undefined
                        ? user.pointTotal
                        : "-"}
                    </td>
                    <td className="py-3 px-7 flex justify-end">
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

          {/* Detail Account Modal */}
          <Modal isOpen={isDetailAccOpen} onClose={toggleDetailAcc}>
            {selectedUser && (
              <form className="pt-4 h-full">
                <div className="flex flex-col md:flex-row justify-between gap-4 max-h-screen md:max-h-full overflow-y-auto">
                  <div className="p-4 bg-white shadow-md rounded-lg w-full md:w-[300px]">
                    <div className="text-lg font-bold mb-1">Profil Peserta</div>
                    <div className="mb-4">
                      <hr className="border-gray-300" />
                    </div>
                    <div className="mb-4 flex flex-col">
                      <span className="text-gray-700 text-sm font-bold w-32">
                        NIK
                      </span>
                      <span>{selectedUser.nik || "-"}</span>
                    </div>
                    <div className="mb-4 flex flex-col">
                      <span className="text-gray-700 text-sm font-bold w-32">
                        Nama
                      </span>
                      <span>{selectedUser.name || "-"}</span>
                    </div>
                    <div className="mb-4 flex flex-col">
                      <span className="text-gray-700 text-sm font-bold w-32">
                        Email
                      </span>
                      <span>{selectedUser.email || "-"}</span>
                    </div>
                    <div className="mb-4 flex flex-col">
                      <span className="text-gray-700 text-sm font-bold w-32">
                        No Telp
                      </span>
                      <span>{selectedUser.phoneNumber || "-"}</span>
                    </div>
                  </div>
                  <div className="p-4 bg-white shadow-md rounded-lg w-full md:w-[300px]">
                    <div className="text-lg font-bold mb-1">Detail Tes</div>
                    <div className="mb-4">
                      <hr className="border-gray-300" />
                    </div>
                    <div className="mb-4 flex flex-col">
                      <span className="text-gray-700 text-sm font-bold w-32">
                        Waktu Mulai Tes
                      </span>
                      <span>{timeFormat(selectedUser.startTime || "-")}</span>
                    </div>
                    <div className="mb-4 flex flex-col">
                      <span className="text-gray-700 text-sm font-bold w-32">
                        Waktu Selesai Tes
                      </span>
                      <span>{timeFormat(selectedUser.endTime || "-")}</span>
                    </div>
                    <div className="mb-4 flex flex-col">
                      <span className="text-gray-700 text-sm font-bold w-32">
                        Total Waktu Tes
                      </span>
                      <span>
                        {selectedUser.totalTime !== null &&
                        selectedUser.totalTime !== undefined
                          ? totalTime(selectedUser.totalTime)
                          : "-"}
                      </span>
                    </div>
                    <div className="mb-4 flex flex-col">
                      <span className="text-gray-700 text-sm font-bold w-32">
                        Nilai
                      </span>
                      <span>{selectedUser.pointTotal || "-"}</span>
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
