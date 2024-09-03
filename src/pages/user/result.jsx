import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserProfile, logout } from "../../redux/actions/authActions";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const point = useSelector((state) => state?.auth?.profil?.pointTotal);
  const isDone = useSelector((state) => state?.auth?.profil?.isDone);
  const token = useSelector((state) => state?.auth?.token);

  useEffect(() => {
    dispatch(getUserProfile());
    if (isDone === false) {
      navigate("/");
    }
    if (!token) {
      navigate("/");
    }
  }, [dispatch, navigate]);

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

  // Fungsi untuk menghapus semua data di localStorage
  const handleLogOut = () => {
    localStorage.clear();
    dispatch(logout(navigate));
    navigate("/"); // Mengarahkan ke halaman lain setelah penghapusan data
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
        <div className="flex flex-col bg-white   items-center rounded-xl w-[50%] max-lg:w-[80%] text-center max-lg:text-sm py-12 max-lg:py-6 px-16 max-lg:px-2 shadow-xl">
          <p className="text-4xl max-lg:text-2xl">
            <strong>Terima Kasih</strong>
          </p>
          <p className="m-4 text-center">
            Selamat Anda telah menyelesaikan Tes Psikotes. Berikut ini merupakan
            nilai yang anda dapatkan.
          </p>
          <p className="pb-6">Tetap semangat</p>
          <div className="flex bg-red-200 py-3 px-4 rounded-xl gap-4">
            <p>{formatDate()}</p>
          </div>
          <div className="p-8 text-center  border border-black  rounded m-4">
            <p>Nilai Anda</p>
            <p className="text-center text-2xl">
              <strong>{point}</strong>
            </p>
          </div>
          <button
            className="bg-red-600 text-white rounded-md px-8 py-2"
            onClick={() => {
              handleLogOut();
            }}
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
