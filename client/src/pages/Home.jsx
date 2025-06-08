import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUserThunk, getUsers } from "../features/user/userThunk";
import Button from "../components/Button";
import { FaUser } from "react-icons/fa";
import { GrFormNextLink } from "react-icons/gr";
import {
  acceptRequest,
  sentRequest,
} from "../features/connection/connectionThunk";
import Navbar from "../components/Navbar";
import socket from "../utils/socket";
import toast from "react-hot-toast";
import { resetconnectionState } from "../features/connection/connectionSlice";
import {
  updateAcceptedRequest,
  updateSentRequest,
} from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data: users,
    error,
    loading,
    currentUser,
  } = useSelector((state) => state.users);

  const {
    successMessage,
    success,
    error: connectionError,
    loading: connectionLoading,
  } = useSelector((state) => state.connection);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (connectionError) {
      toast.error(connectionError);
      dispatch(resetconnectionState());
    }
    if (success) {
      toast.success(successMessage);
      dispatch(resetconnectionState());
    }
  }, [connectionError, dispatch, success, successMessage]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600 font-semibold">Error: {error}</p>
      </div>
    );
  }

  if (!users?.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">No users found.</p>
      </div>
    );
  }

  const handleConnect = async (receiver) => {
    socket.emit("connection_request", {
      from: currentUser?._id,
      to: receiver._id,
      message: `${currentUser.firstName} ${currentUser.lastName} sent you a connection request`,
    });
    const res = await dispatch(sentRequest(receiver._id));

    if (res.meta.requestStatus === "fulfilled") {
      dispatch(updateSentRequest(receiver._id));
    }
    dispatch(resetconnectionState());
    // dispatch(currentUserThunk())
  };

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
  };

  return (
    <div className="flex flex-col items-center  min-h-screen bg-gray-100 ">
      <Navbar />
      <div
        className="flex items-center cursor-pointer justify-center mt-10 p-4 bg-white max-w-md border-b border-gray-200 w-full rounded-lg hover:bg-[#F7941D] text-[#F7941D] hover:text-white text-xl transition-all duration-300"
        onClick={() => navigate("/friends")}
      >
        <h2 className="">My Friends</h2>
        <GrFormNextLink className="text-xl " />
      </div>
      <ul className="w-full max-w-md bg-white shadow-lg rounded-lg divide-y divide-gray-200 ">
        {users.map((user) => (
          <li key={user._id} className="p-4 flex items-center justify-between">
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
              onClick={() => {
                if (currentUser?.receivedRequests?.includes(user._id)) {
                  handleAccept(user);
                } else {
                  handleConnect(user);
                }
              }}
              disabled={currentUser?.connections?.includes(user._id)}
            >
              {connectionLoading
                ? "Loading..."
                : currentUser?.connections?.includes(user._id)
                ? "Connected"
                : currentUser?.receivedRequests?.includes(user._id)
                ? "Accept"
                : currentUser?.sentRequests?.includes(user._id)
                ? "Requested"
                : "Connect"}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
