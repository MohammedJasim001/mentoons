import React from "react";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { logoutuser } from "../features/auth/authThunk";
import { useEffect } from "react";
import toast from "react-hot-toast";

const ProfileModal = ({ isOpen, onClose, currentUser }) => {
  const dispatch = useDispatch();
  const { error, loading, successMessage, isSuccess } = useSelector((state)=>state.auth);

  const handleLogout = () => {
    dispatch(logoutuser());
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isSuccess) {
      localStorage.removeItem('token')
      toast.success(successMessage);
      window.location.href = "/login";
    }
  }, [error, isSuccess, successMessage]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end items-start p-4 pointer-events-none">
      <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-lg animate-slide-in pointer-events-auto mt-20 mr-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-gray-800 ">
            {currentUser.firstName} {currentUser.lastName}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            ✕
          </button>
        </div>
        <Button
          className="border border-[#F7941D] text-[#F7941D] hover:bg-[#F7941D] hover:text-white transition-all duration-300"
          onClick={handleLogout}
        >
          {loading ? "loading.." : "Logout"}
        </Button>
      </div>
    </div>
  );
};

export default ProfileModal;
