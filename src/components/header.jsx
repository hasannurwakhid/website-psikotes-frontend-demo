import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header({ sidebarOpen, toggleSidebar }) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // State untuk modal konfirmasi
  const user = useSelector((state) => state.auth.user);

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    setShowConfirmModal(true); // Tampilkan modal konfirmasi
  };

  const confirmLogout = () => {
    localStorage.clear(); // Hapus semua data dari localStorage
    window.location.reload(); // Refresh halaman
    navigate("/login");
  };

  const cancelLogout = () => {
    setShowConfirmModal(false); // Tutup modal konfirmasi
  };

  return (
    <div className="fixed z-30 w-full bg-white shadow-md">
      <div className="container mx-auto flex lg:py-2 px-6">
        {/* Only show the open button when sidebar is closed */}
        {!sidebarOpen && (
          <button
            className="lg:hidden flex items-center text-red-600 hover:text-red-700 p-6 rounded-full"
            onClick={toggleSidebar}
          >
            <svg
              className="w-6 h-6 ml-[-15px]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}

        <div className="flex w-full justify-between">
          <img src="\img\logo.svg" className="w-[350px] pt-2 pb-2" />
          <div
            className="flex justify-center items-center gap-3 max-lg:hidden relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <p>
              <strong>{user.name}</strong>
            </p>
            <img src="\img\icon_profil.svg" className="w-[32px]" />
            {dropdownOpen && (
              <div className="absolute right-0 mt-[200px] bg-white shadow-lg border rounded-md w-48 z-40">
                <div className="p-4">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                <hr />
                <button
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Konfirmasi</h2>
            <p>Apakah Anda yakin ingin logout?</p>
            <div className="flex justify-end mt-6">
              <button
                className="bg-gray-300 text-gray-700 rounded-md px-4 py-2 mr-2 hover:bg-gray-400 hover:text-gray-200"
                onClick={cancelLogout}
              >
                Batal
              </button>
              <button
                className="bg-red-600 text-white rounded-md px-4 py-2 hover:bg-red-700"
                onClick={confirmLogout}
              >
                Ya, Saya yakin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
