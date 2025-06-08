import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { currentUserThunk } from "../features/user/userThunk";
import socket from "../utils/socket";
import NotificationModal from "../modals/NotifictionModal";
import { HiMiniUsers } from "react-icons/hi2";
import RequestModal from "../modals/RequestModal";
import ProfileModal from "../modals/ProfileModal";
import { notificationThunk } from "../features/notification/notificationThunk";

const Navbar = () => {
  const [notificationModal, setNotificationModal] = useState(false);
  const [requestModal, setRequestModal] = useState(false);
  const [profleModal, setProfileModal] = useState(false);
  

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);
  const { data, error, loading, unreadCount } = useSelector(
    (state) => state.notification
  );

  useEffect(() => {
    if (currentUser) {
      dispatch(notificationThunk());
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (!currentUser) {
      dispatch(currentUserThunk());
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (currentUser) {
      socket.connect();
      socket.emit("register", currentUser._id);
      socket.on("receive_connection_request", (data) => {
        console.log(data)
        dispatch(currentUserThunk());
        dispatch(notificationThunk());
      });
    }
    return () => {
      socket.off("receive_connection_request");
      socket.disconnect();
    };
  }, [currentUser, dispatch]);

  return (
    <div className="w-full bg-[#F7941D] flex justify-between px-6 md:px-12 items-center relative">
      <img src="icon.png" alt="logo" className="w-42 h-20" />
      <div className="gap-5 flex items-center justify-center">
        <div
          onClick={() => setRequestModal(true)}
          className="relative cursor-pointer"
        >
          <HiMiniUsers className="text-3xl " />
          {currentUser?.receivedRequests?.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {currentUser.receivedRequests.length}
            </span>
          )}
        </div>

        <div
          className="relative cursor-pointer"
          onClick={() => setNotificationModal(true)}
        >
          <IoMdNotifications className="text-3xl" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>

        <FaUser className="text-2xl" onClick={() => setProfileModal(true)} />
      </div>
      <NotificationModal
        isOpen={notificationModal}
        onClose={() => setNotificationModal(false)}
        data={data}
        loading={loading}
        error={error}
      />
      <RequestModal
        isOpen={requestModal}
        onClose={() => setRequestModal(false)}
        currentUser={currentUser}
      />
      <ProfileModal
        currentUser={currentUser}
        isOpen={profleModal}
        onClose={() => setProfileModal(false)}
      />
    </div>
  );
};

export default Navbar;
