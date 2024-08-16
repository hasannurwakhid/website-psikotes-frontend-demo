import React, { useState, useEffect } from "react";

function Login() {
  return (
    <div className="flex">
      {/* Sisi Kiri  */}
      <div className="w-[720px] p-12">
        <img src=".\src\assets\logo.svg" className="" />
        <div className="my-10 flex flex-col gap-2">
          <p className="text-red-600 text-4xl">
            <strong>Selamat Datang,</strong>
          </p>
          <p className="text-4xl">
            <strong>Peserta Ujian Psikotes</strong>
          </p>
        </div>
        <form action="" className="flex flex-col gap-5">
          <input
            type="text"
            className=" bordered p-3 rounded-xl border"
            placeholder="NIK"
          />
          <input
            type="password"
            className=" bordered p-3 rounded-xl border"
            placeholder="Password"
          />
          <div className="">
            <input type="checkbox" className="" />
            <p>Ingat saya</p>
          </div>
        </form>

        <button className="bg-red-600 px-12 py-2 m-5 text-white rounded-xl hover:bg-red-700 ">
          Masuk
        </button>
      </div>
      {/* Sisi Kanan  */}
      <div className="flex justify-start">
        <img src=".\src\assets\bg_red.jpg" className="h-screen" />
      </div>
    </div>
  );
}

export default Login;
