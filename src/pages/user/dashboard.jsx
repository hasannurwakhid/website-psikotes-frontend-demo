import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPesertaQuestion } from "../../redux/actions/questAction";
import { checkIsDone, getUserProfile } from "../../redux/actions/authActions";
import { toast } from "react-toastify";

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.auth?.token);
  const user = useSelector((state) => state?.auth?.user);
  const dataIsDone = useSelector((state) => state?.auth?.isDone);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(checkIsDone(token, toast, navigate));
  }, []);

  // Fungsi untuk mendapatkan nama hari dalam bahasa Indonesia
  const getDayName = (dayIndex) => {
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    return days[dayIndex];
  };

  // Fungsi untuk mendapatkan nama bulan dalam bahasa Indonesia
  const getMonthName = (monthIndex) => {
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    return months[monthIndex];
  };

  // Fungsi untuk mendapatkan tanggal dalam format yang diinginkan
  const formatDate = () => {
    const today = new Date();
    const dayName = getDayName(today.getDay());
    const day = today.getDate();
    const monthName = getMonthName(today.getMonth());
    const year = today.getFullYear();

    return `${dayName}, ${day} ${monthName} ${year}`;
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours} jam ${minutes} menit ${seconds} detik`;
  };

  const handleClick = async (e) => {
    if (token === null) {
      navigate("/login");
    } else if (dataIsDone?.isDone === true) {
      navigate("/result");
    } else {
      openModal();
    }
  };

  const handleStartTest = async () => {
    setLoading(true);
    if (dataIsDone?.isDone === "true" || dataIsDone?.isDone === true) {
      navigate("/result");
      window.location.reload();
    } else if (dataIsDone?.isDone === false || dataIsDone?.isDone === "false") {
      dispatch(getPesertaQuestion(navigate));
    } else {
      console.error("Unexpected data value:", data);
    }
    closeModal();
    setLoading(false);
  };

  return (
    <div className="py-6">
      {/* Content  */}
      <div className="container mx-auto flex flex-col items-center justify-center p-3 gap-4">
        <img src="\img\logo-center.svg" alt="" className="lg:w-[25%] w-[50%]" />
        <div className="flex flex-col bg-white items-center rounded-xl w-[50%] max-lg:w-[88%] max-lg:h-[80%] text-center max-lg:text-sm py-12 max-lg:py-6 px-16 max-lg:px-2 shadow-xl">
          <p className="text-4xl max-lg:text-2xl">
            <strong>Selamat Datang,</strong>
          </p>
          <p className="text-4xl max-lg:text-2xl ">
            <strong>Peserta Seleksi Tahap Psikotes</strong>
          </p>
          {user ? (
            <p className="mx-4 mt-3 mb-2 ">
              Selamat <strong>{user?.name.split(" ")[0]}</strong>, Anda telah
              sampai pada seleksi tahap psikotes Dinas Kependudukan Dan
              Pencatatan Sipil Kota Semarang. Anda akan mengerjakan Soal
              Psikotes sebanyak{" "}
              <strong>{dataIsDone?.questionCount} soal</strong> yang dibagi
              dalam beberapa sub-test.
            </p>
          ) : (
            <p className="mx-4 mt-3 mb-2 ">
              Selamat Anda telah sampai pada seleksi tahap psikotes Dinas
              Kependudukan Dan Pencatatan Sipil Kota Semarang. Anda akan
              mengerjakan soal yang dibagi dalam beberapa sub-test.
            </p>
          )}

          <p className="pb-6">Selamat Mengerjakan</p>
          <div className="px-8 py-3 text-center bg-red-200 rounded mx-4 my-2">
            <p>{formatDate()}</p>
          </div>
          {token && (
            <div className="px-8 py-4 text-center flex flex-col gap-1 rounded mx-4">
              {user?.isDone ? (
                <div>
                  <p className="text-sm">Waktu Pengerjaan</p>
                  <p className="text-center text-xl">
                    <strong>{formatTime(user?.totalTime)}</strong>
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-sm">Durasi Pengerjaan</p>
                  <p className="text-center text-xl">
                    <strong>{formatTime(dataIsDone?.remainingTime)}</strong>
                  </p>
                </div>
              )}
            </div>
          )}
          <button
            className="bg-red-600 rounded-xl text-white p-2 px-12 hover:bg-red-700 mt-5"
            onClick={(e) => {
              handleClick();
            }}
          >
            {user?.isDone ? (
              <div>
                <p className="text-sm">Lihat Skor</p>
              </div>
            ) : (
              <div>
                <p className="text-sm">Masuk</p>
              </div>
            )}
          </button>
        </div>
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Konfirmasi</h2>
              <p>Apakah Anda yakin ingin memulai tes?</p>
              <div className="flex justify-end mt-6">
                <button
                  className="bg-gray-400 hover:bg-gray-500 text-white rounded-md px-4 py-2 mr-2"
                  onClick={closeModal}
                >
                  Batal
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white rounded-md px-4 py-2"
                  onClick={handleStartTest}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M12 4V1M12 1v3m0 16v3M12 22v-3M6.293 6.293L4.879 4.879M4.879 4.879l1.414 1.414M18.364 18.364l1.414 1.414M19.778 19.778l-1.414-1.414M20 12a8 8 0 11-16 0 8 8 0 0116 0z" />
                      </svg>
                    </div>
                  ) : (
                    "Mulai"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
