import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  return (
    <div className="flex">
      {/* Sisi Kiri  */}
      <div className="w-[720px] px-12 pt-12">
        <img src=".\src\assets\logo.svg" className="" />
        <div className="mt-8 mb-3 flex flex-col gap-2">
          <p className="text-red-600 text-4xl">
            <strong>Selamat Datang,</strong>
          </p>
          <p className="text-4xl">
            <strong>Peserta Ujian Psikotes</strong>
          </p>
          <p className="">
            Silahkan masuk ke akun anda sebelum mengerjakan ujian psikotes
          </p>
        </div>
        <form action="" className="flex flex-col gap-3 mt-6">
          <input
            type="text"
            className=" bordered p-3 rounded-xl border"
            placeholder="NIK"
          />
          <input
            type="text"
            className=" bordered p-3 rounded-xl border"
            placeholder="Nama Lengkap"
          />
          <input
            type="text"
            className=" bordered p-3 rounded-xl border"
            placeholder="Email"
          />
          <input
            type="password"
            className=" bordered p-3 rounded-xl border"
            placeholder="Password"
          />
          <input
            type="password"
            className=" bordered p-3 rounded-xl border"
            placeholder="Konfirmasi Password"
          />
        </form>

        <div className="flex flex-col items-center gap-3 justify-center mt-4">
          <button
            className="bg-red-600 w-full py-2 mt-5 text-white rounded-xl hover:bg-red-700 "
            onClick={(e) => {
              navigate("/login");
            }}
          >
            Daftar
          </button>
          <button
            className="text-blue-600 hover:text-blue-700"
            onClick={(e) => {
              navigate("/login");
            }}
          >
            Masuk ke akun Anda
          </button>
        </div>
      </div>
      {/* Sisi Kanan  */}
      <div className="flex justify-start">
        <img src=".\src\assets\bg_red.jpg" className="h-screen" />
      </div>
    </div>
  );
}

export default Register;
