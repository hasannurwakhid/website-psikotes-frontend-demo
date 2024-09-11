import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function EndTest({ setCloseModal }) {
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg lg:w-96 max-lg:w-[80%]">
        <h2 className="text-xl font-bold mb-4">Konfirmasi</h2>
        <p>Apakah Anda yakin ingin mengakhiri tes?</p>
        <div className="flex justify-end mt-6">
          <button
            className="bg-gray-300 text-gray-700 rounded-md px-4 py-2 mr-2"
            onClick={() => {
              setCloseModal(false);
            }}
          >
            Batal
          </button>
          <button
            className="bg-red-600 text-white rounded-md px-4 py-2"
            onClick={() => {
              dispatch(submitTest(navigate, toast));
              setCloseModal(false);
            }}
          >
            Ya, saya yakin
          </button>
        </div>
      </div>
    </div>
  );
}

export default EndTest;
