import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Header() {
  const user = useSelector((state) => state.auth.user);
  console.log("user", user);
  return (
    <div className=" shadow-md bg-white">
      <div className="container mx-auto flex justify-between py-4 px-6">
        <img src=".\src\assets\logo.svg" className="w-[25%]" />
        <div className="flex justify-center items-center gap-3">
          <p>
            <strong>{user.name}</strong>
          </p>
          <img src=".\src\assets\icon_profil.svg" className="w-[32px]" />
        </div>
      </div>
    </div>
  );
}

export default Header;
