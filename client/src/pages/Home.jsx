import React, { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/user/userThunk";
import Button from "../components/Button";
import { FaUser } from "react-icons/fa";
import { GrFormNextLink } from "react-icons/gr";
import { sentRequest } from "../features/connection/connectionThunk";
import Navbar from "../components/Navbar";
import socket from "../utils/socket";

const Home = () => {
  const dispatch = useDispatch();
  const { data: users, error, loading, currentUser } = useSelector((state) => state.users);
  const {
    message,
    error: connectionError,
    loading: connectionLoading,
  } = useSelector((state) => state.connection);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

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

  const handleConnect = (receiver) => {
    socket.emit('connection_request',{
      from:currentUser?._id,
      to: receiver._id,
      message: `${receiver.firstName} ${receiver.lastName} sent you a connection request`
    })
    dispatch(sentRequest(receiver._id));
    console.log(message,'message');
  };

  return (
    <div className="flex flex-col items-center  min-h-screen bg-gray-100 ">
     <Navbar/>
      <div className="flex items-center justify-center mt-10 p-4 bg-white max-w-md border-b border-gray-200 w-full rounded-lg hover:bg-[#F7941D] text-[#F7941D] hover:text-white text-xl transition-all duration-300">
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
              onClick={() => handleConnect(user)}
            >
              Connect
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
