import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  notificationRead,
  notificationThunk,
} from "../features/notification/notificationThunk";

const NotificationModal = ({ isOpen, onClose, data = [], loading, error }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      dispatch(notificationRead()).then(() => {
        dispatch(notificationThunk());
      });
    }
  }, [dispatch, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end items-start p-4 pointer-events-none">
      <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-lg animate-slide-in pointer-events-auto mt-20 mr-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-gray-800">Notifications</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            ✕
          </button>
        </div>

        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {data.length === 0 && !loading && (
          <p className="text-gray-600">No notifications</p>
        )}

        <ul className="space-y-2 max-h-64 overflow-y-auto">
          {data.map((notification) => (
            <li
              key={notification._id}
              className={`p-3 rounded-lg border ${
                notification.read
                  ? "bg-gray-100"
                  : "bg-yellow-50 border-yellow-300"
              }`}
            >
              <p className="text-sm text-gray-800">{notification.message}</p>
              <p className="text-xs text-gray-500">
                {new Date(notification.date).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotificationModal;
