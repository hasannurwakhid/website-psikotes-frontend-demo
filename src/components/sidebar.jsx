import React, { useState, useEffect } from "react";

function Sidebar({ sidebarOpen }) {
  return (
    <aside
      className={`fixed lg:fixed transform top-0 left-0 h-full w-64 bg-red-700 text-white lg:translate-x-0 p-8 transition-transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } z-30`} // Added z-index for sidebar
    >
      <nav className="mt-[80px] lg:mt-20">
        <ul>
          <li className="lg:hidden mb-4 bg-red-700 rounded-lg p-2 hover:bg-red-800">
            <div className="flex items-center ml-4">
              <img src=".\src\assets\icon_profil_white.svg" className="mr-5 w-7 h-7" />
              <p>
                <strong>Hasan Nur Wakhid</strong>
              </p>
            </div>
          </li>
          <li className="mb-4 bg-red-700 rounded-lg p-2 hover:bg-red-800">
            <a href="#beranda" className="flex items-center ml-4">
              <img
                src="\src\assets\beranda.svg"
                alt="Beranda"
                className="mr-5 w-6 h-6"
              />
              <span>Beranda</span>
            </a>
          </li>
          <li className="mb-4 bg-red-700 rounded-lg p-2 hover:bg-red-800">
            <a href="#kumpulan_soal" className="flex items-center ml-4">
              <img
                src="\src\assets\kumpulan_soal.svg"
                alt="Kumpulan Soal"
                className="mr-5 w-6 h-6"
              />
              <span>Kumpulan Soal</span>
            </a>
          </li>
          <li className="mb-4 bg-red-800 rounded-lg p-2">
            <a href="#akun" className="flex items-center ml-4">
              <img
                src="\src\assets\tambah_akun.svg"
                alt="Tambah Akun"
                className="mr-5 w-6 h-6"
              />
              <span>Tambah Akun</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
