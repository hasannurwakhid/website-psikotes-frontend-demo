import React, { useState } from "react";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

function Questions() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  function Card({ title, totalQuestions, duration }) {
    return (
      <nav className="bg-white hover:bg-gray-100 p-6 rounded-2xl shadow text-center">
        <h3 className="text-lg font-bold">{title}</h3>
        <div className="flex space-x-4 pt-2">
          <div className="bg-red-700 text-white py-4 px-4 flex-1 rounded-lg">
            <div className="text-[10px]">Total Soal</div>
            <div className="text-lg font-semibold">{totalQuestions}</div>
          </div>
          <div className="bg-red-700 text-white py-5 px-4 flex-1 rounded-lg">
            <div className="text-[9px]">Waktu Pengerjaan</div>
            <div className="text-lg font-semibold">{duration}</div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <div className="flex flex-col maxsm:bg-gray-100">
      <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {/* Sidebar and Main Content */}
      <div className="relative flex flex-grow">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}/>

        {/* Main Content */}
        <main className="flex-grow lg:ml-[250px] p-8 mt-[63px] lg:mt-20 z-10">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="bg-red-600 hover:bg-red-700 px-6 py-2 text-white text-center py-3 mb-6 rounded-2xl shadow">
              <button className="flex items-center w-full justify-between">
                <span className="text-xl font-bold">Tambah Soal</span>
                <img src=".\src\assets\ts.svg" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <Card
                title="Tes Sinonim"
                totalQuestions={40}
                duration="15 Menit"
              />
              <Card
                title="Tes Antonim"
                totalQuestions={40}
                duration="90 Menit"
              />
              <Card
                title="Tes Gambar"
                totalQuestions={40}
                duration="15 Menit"
              />
              <Card
                title="Tes Diagram"
                totalQuestions={40}
                duration="15 Menit"
              />
              <Card
                title="Tes Matrix"
                totalQuestions={40}
                duration="15 Menit"
              />
              <Card
                title="Tes Peletakan Titik"
                totalQuestions={40}
                duration="15 Menit"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Questions;
