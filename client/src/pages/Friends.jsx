import React, { useEffect } from "react";
import { resetUserState } from "../features/user/userSlice";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { connections } from "../features/connection/connectionThunk";
import { FaUser } from "react-icons/fa";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { blockUser, currentUserThunk } from "../features/user/userThunk";
import toast from "react-hot-toast";
import { GrFormPreviousLink } from "react-icons/gr";

const Friends = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { friends, loading } = useSelector((state) => state.connection);
  const { currentUser, blockMessage, blockSuccess } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(connections());
  }, [dispatch]);


  useEffect(() => {
    if (blockSuccess) {
      toast.success(blockMessage.message);
      dispatch(currentUserThunk());
      dispatch(resetUserState());
    }
  }, [blockMessage, blockSuccess, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetUserState());
    };
  }, [dispatch]);

  const handleBlock = (userId) => {
    dispatch(blockUser(userId));
  };

  return (
    <div className="flex flex-col items-center  min-h-screen bg-gray-100 ">
      <Navbar />
      <div className="flex items-center justify-center mt-10 p-4 bg-white max-w-md border-b border-gray-200 w-full rounded-lg  transition-all duration-300 text-[#F7941D]" onClick={()=>navigate(-1)}>
         <GrFormPreviousLink className="text-2xl " />
        <h2 className=" text-xl ">My Friends</h2>
      </div>
      {loading && <div>Loading...</div>}
      {friends?.result?.length === 0 && <div className="mt-10">No friends</div>}
      <ul className="w-full max-w-md bg-white shadow-lg rounded-lg divide-y divide-gray-200 ">
        {friends?.result?.map((user) => (
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
            <div className="flex gap-2">
              <Button
                className="border border-[#F7941D] text-[#F7941D] hover:bg-[#F7941D] hover:text-white transition-all duration-300 rounded px-4 py-1"
                onClick={() => navigate(`/chat/${user._id}`)}
              >
                Message
              </Button>
              <Button
                className="border border-[#F7941D] text-[#F7941D] hover:bg-[#F7941D] hover:text-white transition-all duration-300 rounded px-4 py-1"
                onClick={() => handleBlock(user._id)}
              >
                {currentUser?.blockedUsers?.includes(user._id)
                  ? "Unblock"
                  : "Block"}
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Friends;
