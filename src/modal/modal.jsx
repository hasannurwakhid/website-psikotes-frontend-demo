import React from "react";
import ReactDOM from "react-dom";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-124 relative">
        <button
          className="absolute top-1 right-3 text-gray-500 text-2xl hover:text-red-700 z-50"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body // Memastikan modal dirender di luar hierarki DOM komponen
  );
}

export default Modal;
