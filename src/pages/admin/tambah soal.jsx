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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Tes Gambar</h1>
          <button className="bg-red-700 text-white p-3 rounded-full shadow">
            ➕
          </button>
        </div>

        {/* Question Form */}
        <QuestionForm />
        <QuestionForm />
        {/* Add more QuestionForm components as needed */}
      </div>
    </div>
  );
}

function QuestionForm() {
  return (
    <div className="bg-white p-6 mb-6 rounded-md shadow">
      <div className="border border-gray-300 rounded-md p-4 mb-4">
        <textarea
          className="w-full h-20 p-2 border-none focus:outline-none text-lg placeholder-gray-500"
          placeholder="Tulis Pertanyaan"
        />
        <div className="flex items-center mt-2 space-x-4">
          <button className="font-bold">B</button>
          <button className="italic">I</button>
          <button>📷</button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            name="option1"
            className="form-radio text-red-700"
          />
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none"
            placeholder="Opsi 1"
          />
          <button>📷</button>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            name="option2"
            className="form-radio text-red-700"
          />
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none"
            placeholder="Opsi 1"
          />
          <button>📷</button>
        </div>
        <button className="flex items-center text-red-700">
          ➕ Tambah Opsi
        </button>
      </div>

      <div className="flex justify-end mt-4 space-x-2">
        <button className="p-2 bg-gray-300 text-gray-800 rounded">💾</button>
        <button className="p-2 bg-gray-300 text-gray-800 rounded">🗑️</button>
      </div>
    </div>
  );
}

export default App;
