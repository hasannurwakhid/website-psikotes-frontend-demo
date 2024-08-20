import React from 'react';

function App() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-1/5 bg-red-800 text-white flex flex-col p-6">
        <div className="flex items-center mb-8">
          <img
            src="https://via.placeholder.com/40"
            alt="Logo"
            className="h-10 mr-4"
          />
          <div>
            <h1 className="text-lg font-semibold">Dinas Kependudukan Dan Pencatatan Sipil</h1>
            <h2 className="text-sm">Kota Semarang</h2>
          </div>
        </div>
        <nav>
          <ul>
            <li className="mb-4">
              <a href="#" className="flex items-center text-white">
                <span className="mr-2">🏠</span>
                Beranda
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center text-white">
                <span className="mr-2">📂</span>
                Kumpulan Soal
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center text-white">
                <span className="mr-2">➕</span>
                Tambah Akun
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100">
        <div className="bg-red-800 text-white text-center py-3 mb-6 rounded-md shadow">
          <button className="flex items-center justify-center">
            <span className="mr-2">➕</span> Tambah Soal
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Card title="Tes Sinonim" totalQuestions={40} duration="15 Menit" />
          <Card title="Tes Antonim" totalQuestions={40} duration="90 Menit" />
          <Card title="Tes Gambar" totalQuestions={40} duration="15 Menit" />
          <Card title="Tes Diagram" totalQuestions={40} duration="15 Menit" />
          <Card title="Tes Matrix" totalQuestions={40} duration="15 Menit" />
          <Card title="Tes Peletakan Titik" totalQuestions={40} duration="15 Menit" />
        </div>
      </div>
    </div>
  );
}

function Card({ title, totalQuestions, duration }) {
  return (
    <div className="bg-white p-6 rounded-md shadow text-center">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p>Total Soal: {totalQuestions}</p>
      <p>Waktu Pengerjaan: {duration}</p>
    </div>
  );
}

export default App;
