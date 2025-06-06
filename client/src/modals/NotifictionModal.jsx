import React from "react";

const NotificationModal = ({ isOpen, onClose, message, }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end items-start p-4 pointer-events-none">
      <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-lg animate-slide-in pointer-events-auto mt-20 mr-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-gray-800 ">Notifications</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            ✕
          </button>
        </div>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default NotificationModal;
