import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
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

  return (
    <div className="">
      {/* Content  */}
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <img src=".\src\assets\logo-center.svg" alt="" className="w-[25%]" />
        <div className="bg-white flex flex-col items-center rounded-xl w-[50%] py-12 px-16 shadow-xl">
          <p className="text-4xl">
            <strong>Terima Kasih</strong>
          </p>
          <p className="m-4 text-center">
            Selamat Anda telah menyelesaikan Tes Psikotes. Berikut ini merupakan
            nilai yang anda dapatkan.
          </p>
          <p className="pb-6">Tetap semangat</p>
          <div className="flex bg-red-200 py-3 px-4 rounded-xl gap-4">
            <p>{formatDate()}</p>
            <p>|</p>
            <p>{time}</p>
          </div>
          <div className="p-8  border border-black  rounded m-4">
            <p>Nilai Anda</p>
            <p className="text-center text-2xl">
              <strong>90</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
