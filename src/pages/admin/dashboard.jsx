import React, { useState } from "react";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

function DashboardAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col maxsm:bg-gray-100">
      <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {/* Sidebar and Main Content */}
      <div className="relative flex flex-grow">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}/>

        {/* Main Content */}
        <main className="flex-grow lg:ml-[250px] p-8 mt-[63px] lg:mt-20 z-10">
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-gray-500">Jumlah Kategori Soal</div>
              <div className="flex w-full justify-between">
                <div className="text-6xl font-bold">10</div>
                <img src=".\src\assets\jks.svg"/>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-gray-500">Rata Rata Nilai Peserta</div>
              <div className="flex w-full justify-between">
                <div className="text-6xl font-bold">89</div>
                <img src=".\src\assets\rnp.svg"/>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-gray-500">Batas Minimal Nilai</div>
              <div className="flex w-full justify-between">
                <div className="text-6xl font-bold">80</div>
                <img src=".\src\assets\bmn.svg"/>
              </div>            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow">
            <div className="text-2xl font-bold mb-4">Daftar Peserta</div>
            <table className="min-w-full table-auto">
              <thead>
                <tr className="text-left">
                  <th className="py-2 px-4 font-medium text-gray-600">NIK</th>
                  <th className="py-2 px-4 font-medium text-gray-600">Nama Lengkap</th>
                  <th className="py-2 px-4 font-medium text-gray-600">Nilai</th>
                  <th className="py-2 px-4 font-medium text-gray-600">Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { nik: "12345678901234456", name: "Jhon", score: "90", note: "Lulus" },
                  { nik: "12345678901234456", name: "Smith", score: "85", note: "Lulus" },
                  { nik: "12345678901234456", name: "Marchel", score: "89", note: "Lulus" },
                  { nik: "12345678901234456", name: "Andrew", score: "-", note: "Tidak Lulus" },
                  { nik: "12345678901234456", name: "Kevin", score: "92", note: "Lulus" },
                ].map((participant, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4">{participant.nik}</td>
                    <td className="py-2 px-4">{participant.name}</td>
                    <td className="py-2 px-4">{participant.score}</td>
                    <td className="py-2 px-4">{participant.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end items-center mt-6">
              <p className="text-sm font-semibold text-gray-500 mr-2">
                1 dari 100
              </p>
              <div className="flex items-center">
                <button className="px-2 py-1 font-bold text-gray-500 hover:text-red-700">
                  &lt;
                </button>
                <button className="px-2 py-1 font-bold text-gray-500 hover:text-red-700">
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardAdmin;
