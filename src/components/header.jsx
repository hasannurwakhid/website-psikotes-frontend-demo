import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Header({ sidebarOpen, toggleSidebar }) {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="fixed z-50 w-full bg-white shadow-md">
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
          <div className="flex justify-center items-center gap-3 max-lg:hidden">
            <p className="">
              <strong>{user.name}</strong>
            </p>
            <img src="\img\icon_profil.svg" className="w-[32px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
