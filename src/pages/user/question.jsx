import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import Text from "../../components/text_based";
import Image from "../../components/image_based";

function Question() {
  const [selectedNumber, setSelectedNumber] = useState(1); // To track the selected question number
  const navigate = useNavigate();

  const handleNumberClick = (number) => {
    setSelectedNumber(number);
  };

  return (
    <div className="">
      <Header />
      <div className="container mx-auto flex px-6 pt-6 gap-6">
        <div className="border w-[30%] rounded-xl">
          <div className="flex flex-col items-center bg-red-200 justify-center m-2 py-2 rounded-xl border">
            <p className="text-sm">Sisa Waktu</p>
            <p>
              <strong>1 Jam 30 Menit 12 Detik</strong>{" "}
            </p>
            {/* Susunan angka  */}
          </div>
          <hr />
          {/* Number Grid */}
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-7 gap-2 p-4">
              {[...Array(50).keys()].map((_, index) => {
                const number = index + 1;
                return (
                  <button
                    key={number}
                    onClick={() => handleNumberClick(number)}
                    className={`h-10 w-10 rounded-lg border ${
                      selectedNumber === number ? "bg-gray-300" : "bg-white"
                    }`}
                  >
                    {number}
                  </button>
                );
              })}
            </div>
            <button
              className="py-2 bg-red-600 w-[75%] text-white hover:bg-red-700 rounded-xl"
              onClick={(e) => {
                navigate("/result");
              }}
            >
              Kumpulkan
            </button>
          </div>
        </div>
        <Text />
      </div>
    </div>
  );
}

export default Question;
