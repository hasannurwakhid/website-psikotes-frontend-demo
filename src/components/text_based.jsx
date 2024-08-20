import React, { useState } from "react";

function Text() {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleClick = (buttonIndex) => {
    setSelectedButton(buttonIndex);
  };

  return (
    <div className="border w-[70%] rounded-xl">
      <div className="flex flex-col items-center justify-center p-3 h-[80px] border">
        <p>Pertanyaan 1</p>
      </div>
      <hr />
      <div className="p-12">
        <p className="pb-12">Manakah yang tidak termasuk kelompoknya?</p>
        <div className="flex flex-col gap-4">
          {["USAP", "BELAI", "PEGANG", "JINJING", "PANGGUL"].map(
            (text, index) => (
              <button
                key={text}
                className={`border rounded-xl py-2 w-[100%] text-start px-12 ${
                  selectedButton === index
                    ? "bg-yellow-200"
                    : "hover:bg-yellow-100"
                }`}
                onClick={() => handleClick(index)}
              >
                {text}
              </button>
            )
          )}
        </div>
        <div className="pt-8 flex justify-between">
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

export default Text;
