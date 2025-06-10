import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUserThunk, requestedUsers } from "../features/user/userThunk";
import { FaUser } from "react-icons/fa";
import Button from "../components/Button";
import socket from "../utils/socket";
import { acceptRequest } from "../features/connection/connectionThunk";
import { updateAcceptedRequest } from "../features/user/userSlice";
import { resetconnectionState } from "../features/connection/connectionSlice";

const RequestModal = ({ isOpen, onClose, currentUser }) => {
  const dispatch = useDispatch();
  const { requestUsers, loading } = useSelector((state) => state.users);
  const { acceptMessage } = useSelector((state) => state.connection);

  useEffect(() => {
    if (!requestUsers || requestUsers.length === 0) {
      dispatch(requestedUsers());
      dispatch(currentUserThunk())
    }
  }, [dispatch, requestUsers]);

  if (!isOpen) return null;

  if (loading) {
    return <div>loading...</div>;
  }

  const handleAccept = async (sender) => {
    socket.emit("connection_request", {
      from: currentUser?._id,
      to: sender._id,
      message: `${currentUser.firstName} ${currentUser.lastName} accepted your connection request`,
    });
    const res = await dispatch(acceptRequest(sender._id));
    if (res.meta.requestStatus === "fulfilled") {
      dispatch(updateAcceptedRequest(sender._id));
    }
    dispatch(resetconnectionState());
    dispatch(currentUserThunk());

    console.log(acceptMessage, "message");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end items-start p-4 pointer-events-none">
      <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-lg animate-slide-in pointer-events-auto mt-20 mr-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-gray-800 ">Requests</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            ✕
          </button>
        </div>
        {requestUsers.result.length === 0 && <div>No connection requests</div>}
        <ul>
          {requestUsers.result.map((user) => (
            <li
              key={user._id}
              className="p-4 flex items-center justify-between"
            >
              <div className="flex items-center justify-center gap-5">
                {user.profileImage ? (
                  <img src={user?.profileImage} alt="" />
                ) : (
                  <FaUser />
                )}
                <span className="text-gray-800 font-medium">
                  {user.firstName} {user.lastName}
                </span>
              </div>
              <Button
                className="border border-[#F7941D] text-[#F7941D] hover:bg-[#F7941D] hover:text-white transition-all duration-300 rounded px-4 py-1"
                onClick={() => handleAccept(user)}
              >
                {loading ? "Laoding.." : " Accept"}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RequestModal;
