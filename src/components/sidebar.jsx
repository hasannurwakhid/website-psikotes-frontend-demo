import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar({ sidebarOpen, toggleSidebar }) {
  const navigate = useNavigate();
  return (
    <aside
      className={`fixed lg:fixed transform top-0 left-0 h-full w-64 bg-red-700 text-white lg:translate-x-0 p-8 transition-transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } z-30`} // Added z-index for sidebar
    >
      {/* Only show the close button when sidebar is open */}
      {sidebarOpen && (
        <button
          className="lg:hidden flex items-center text-red-600 hover:text-red-700 rounded-full absolute top-[58px] right-[10px] pt-6 pb-6"
          onClick={toggleSidebar}
        >
          <svg
            className="w-6 h-6 text-white hover:text-gray-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}

      <nav className="container mx-auto mt-[80px] lg:mt-20">
        <ul>
          <li className="lg:hidden mb-4 bg-red-700 rounded-lg p-2 hover:bg-red-800">
            <div className="flex items-center ml-4">
              <img
                src=".\src\assets\icon_profil_white.svg"
                className="mr-5 w-7 h-7"
              />
              <p>
                <strong>Hasan Nur Wakhid</strong>
              </p>
            </div>
          </li>
          <li
            className="mb-4 bg-red-700 rounded-lg p-2 hover:bg-red-800"
            onClick={() => navigate("/DashboardAdmin")}
          >
            <a href="#beranda" className="flex items-center ml-4">
              <img
                src="\src\assets\beranda.svg"
                alt="Beranda"
                className="mr-5 w-6 h-6"
              />
              <span>Beranda</span>
            </a>
          </li>
          <li
            className="mb-4 bg-red-700 rounded-lg p-2 hover:bg-red-800"
            onClick={() => navigate("/questions")}
          >
            <a href="#kumpulan_soal" className="flex items-center ml-4">
              <img
                src="\src\assets\kumpulan_soal.svg"
                alt="Kumpulan Soal"
                className="mr-5 w-6 h-6"
              />
              <span>Kumpulan Soal</span>
            </a>
          </li>
          <li
            className="mb-4 bg-red-700 rounded-lg p-2"
            onClick={() => navigate("/AddAcc")}
          >
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
