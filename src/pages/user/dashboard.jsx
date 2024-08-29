import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPesertaQuestion } from "../../redux/actions/questAction";

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

  // Fungsi untuk menambahkan angka nol di depan jika angka kurang dari 10
  const padZero = (number) => {
    return number < 10 ? `0${number}` : number;
  };

  // Fungsi untuk mendapatkan format waktu
  const formatTime = () => {
    const today = new Date();
    const hours = padZero(today.getHours());
    const minutes = padZero(today.getMinutes());
    const seconds = padZero(today.getSeconds());

    return `${hours} : ${minutes} : ${seconds}`;
  };

  const [time, setTime] = useState(formatTime());

  useEffect(() => {
    // Update waktu setiap detik
    const interval = setInterval(() => {
      setTime(formatTime());
    }, 1000);

    // Cleanup interval saat komponen di-unmount
    return () => clearInterval(interval);
  }, []);

  const handleClick = async (e) => {
    if (token === null) {
      navigate("/login");
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
          className="w-[25%] max-lg:w-[50%]"
        />
        <div className="flex flex-col bg-white   items-center rounded-xl w-[50%] max-lg:w-[80%] text-center max-lg:text-sm py-12 max-lg:py-6 px-16 max-lg:px-2 shadow-xl">
          <p className="text-4xl max-lg:text-2xl">
            <strong>Selamat Datang,</strong>
          </p>
          <p className="text-4xl max-lg:text-2xl ">
            <strong>Peserta Seleksi Tahap Psikotes</strong>
          </p>
          <p className="m-4 ">
            Selamat Anda telah sampai pada seleksi tahap psikotes Dinas
            Kependudukan Dan Pencatatan Sipil Kota Semarang. Anda akan
            mengerjakan sebanyak <strong>90 Soal</strong> dibagi dalam beberapa
            sub-test.
          </p>
          <p className="pb-6">Selamat Mengerjakan</p>
          <div className="flex bg-red-200 py-3 px-4 rounded-xl gap-4">
            <p>{formatDate()}</p>
            <p>|</p>
            <p>{time}</p>
          </div>
          <div className="mt-5">
            <p>Total Waktu Pengerjaan</p>
            <p>
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
                    dispatch(getPesertaQuestion(navigate));
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
