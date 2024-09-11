import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function HeaderUser({ sidebarOpen, toggleSidebar }) {
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
    <div className="fixed z-50 w-full bg-white shadow-md">
      <div className="container mx-auto flex lg:py-2 px-6">
        <div className="flex w-full justify-between">
          <img src="\img\logo.svg" className="lg:w-[350px] max-lg:w-1/2 py-4" />
          <div
            className="flex justify-center items-center gap-3 max-lg:gap-2 relative max-lg:text-sm"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <p>{user.name.split(" ")[0]}</p>
            <img
              src="\img\icon_profil.svg"
              className="lg:w-[32px] max-lg:w-[24px] md:w-[28px]"
            />
            {dropdownOpen && (
              <div className="absolute right-0 lg:mt-[200px] max-lg:mt-[150px] bg-white shadow-lg border rounded-md w-56 z-40">
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

export default HeaderUser;
