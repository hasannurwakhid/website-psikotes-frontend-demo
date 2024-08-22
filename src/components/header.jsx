import React, { useState, useEffect } from "react";

function Header({ sidebarOpen, toggleSidebar }) {

  return (
    <div className="fixed z-50 w-full bg-white shadow-md">
      <div className="container mx-auto flex justify-between lg:py-4 px-6">
        {/* Hamburger Button */}
        <button
          className="lg:hidden text-red-600 hover:text-red-700 pt-12 rounded-full"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? (
            <svg
              className="w-6 h-6 transition-transform translate-x-[197px] translate-y-[35px] text-white hover:text-gray-200"
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
          ) : (
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
          )}
        </button>
        <img src=".\src\assets\logo.svg" className="w-[40%] ml-[-290px] lg:ml-[0px] lg:w-[25%]" />
        <div className="flex justify-center items-center gap-3">
          <p className="hidden md:block">
            <strong>Hasan Nur Wakhid</strong>
          </p>
          <img src=".\src\assets\icon_profil.svg" className="w-[32px] hidden md:block" />
        </div>
      </div>
    </div>
  );
}

export default Header;
