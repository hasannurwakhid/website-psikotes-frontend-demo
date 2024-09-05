import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPesertaQuestion } from "../../redux/actions/questAction";
import { checkIsDone } from "../../redux/actions/authActions";
import { toast } from "react-toastify";

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.auth?.token);
  const user = useSelector((state) => state?.auth?.user);
  const isDone = useSelector((state) => state?.auth?.profil?.isDone);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    console.log("user", user);
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

  const handleClick = async (e) => {
    if (token === null) {
      navigate("/login");
    } else if (isDone === true || user.isDone === true) {
      navigate("/result");
    } else {
      openModal();
    }
  };

  return (
    <div className="">
      {/* Content  */}
      <div className="container mx-auto flex flex-col items-center justify-center p-3 h-screen gap-4">
        <img
          src="\img\logo-center.svg"
          alt=""
          className="w-[25%] max-lg:w-[65%]"
        />
        <div className="flex flex-col bg-white   items-center rounded-xl w-[50%] max-lg:w-[88%] text-center max-lg:text-sm py-12 max-lg:py-6 px-16 max-lg:px-2 shadow-xl">
          <p className="text-4xl max-lg:text-2xl">
            <strong>Selamat Datang,</strong>
          </p>
          <p className="text-4xl max-lg:text-2xl ">
            <strong>Peserta Seleksi Tahap Psikotes</strong>
          </p>
          <p className="mx-4 mt-3 mb-2 ">
            Selamat Anda telah sampai pada seleksi tahap psikotes Dinas
            Kependudukan Dan Pencatatan Sipil Kota Semarang. Anda akan
            mengerjakan sebanyak <strong>90 Soal</strong> dibagi dalam beberapa
            sub-test.
          </p>
          <p className="pb-6">Selamat Mengerjakan</p>
          <div className="px-8 py-3 text-center bg-red-200 rounded mx-4 my-2">
            <p>{formatDate()}</p>
          </div>
          <div className="px-8 py-4 text-center flex flex-col gap-1 rounded mx-4">
            <p className="text-sm">Durasi Pengerjaan</p>
            <p className="text-center text-xl">
              <strong>1 jam 30 Menit</strong>
            </p>
          </div>
          <button
            className="bg-red-600 rounded-xl text-white p-2 px-12 hover:bg-red-700 mt-5"
            onClick={(e) => {
              handleClick();
            }}
          >
            Masuk
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
                  className="bg-gray-300 text-gray-700 rounded-md px-4 py-2 mr-2"
                  onClick={closeModal}
                >
                  Batal
                </button>
                <button
                  className="bg-red-600 text-white rounded-md px-4 py-2"
                  onClick={() => {
                    setLoading(true);
                    dispatch(checkIsDone(token, toast, navigate));
                    setLoading(false);
                    closeModal();
                  }}
                >
                  Mulai
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
