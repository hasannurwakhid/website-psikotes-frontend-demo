import React, { useState, useEffect } from "react";

function Image() {
  // State untuk melacak tombol mana yang diklik
  const [selectedButton, setSelectedButton] = useState(null);

  // Fungsi untuk mengubah status saat tombol diklik
  const handleClick = (buttonIndex) => {
    setSelectedButton(buttonIndex);
  };
  return (
    <div className="border w-[70%]  rounded-xl">
      <div className="flex flex-col items-center justify-center p-3 h-[80px] border">
        <p>Pertanyaan 1</p>
      </div>
      <hr />
      <div className="p-12">
        <p className="pb-12 flex items-center justify-center">
          <img src=".\src\assets\soal1.png" className="w-[150px]" />
        </p>
        <div className="grid grid-cols-2 gap-4">
          {["a", "b", "c", "d", "e"].map((option, index) => (
            <button
              key={option}
              className={`border rounded-xl py-2 w-[100%] flex justify-center text-start px-12 ${
                selectedButton === index
                  ? "bg-yellow-200"
                  : "hover:bg-yellow-100"
              }`}
              onClick={() => handleClick(index)}
            >
              <img
                src={`./src/assets/${option}.png`}
                alt=""
                className="w-[75px]"
              />
            </button>
          ))}
        </div>
        <div className="pt-8 flex justify-between ">
          <button className="p-2 px-12 border border-red-600 text-red-600 hover:bg-red-700 hover:text-white rounded-xl">
            Kembali
          </button>
          <button className="p-2 px-12 bg-red-600 hover:bg-red-700 text-white rounded-xl">
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
}

export default Image;
