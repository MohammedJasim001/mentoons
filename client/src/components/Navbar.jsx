import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { currentUserThunk } from "../features/user/userThunk";
import socket from "../utils/socket";
import NotificationModal from "../modals/NotifictionModal";
import { data } from "react-router-dom";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);
  useEffect(() => {
    if (!currentUser) {
      dispatch(currentUserThunk());
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (currentUser) {
      socket.connect();
      socket.emit("register", currentUser._id);
      socket.on('receive_connection_request', (data) => {
        console.log(data,'data');
      })
    }
  }, [currentUser]);

  

  return (
    <div className="w-full bg-[#F7941D] flex justify-between px-6 md:px-12 items-center relative">
      <img src="icon.png" alt="logo" className="w-42 h-20" />
      <div className="gap-5 flex items-center justify-center">
        <IoMdNotifications
          className="text-3xl"
          onClick={() => setIsModalOpen(true)}
        />
        <FaUser className="text-2xl" />
      </div>
      <NotificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Connection Request Sent"
        message="Your connection request has been successfully sent."
      />
    </div>
  );
};

export default Navbar;
