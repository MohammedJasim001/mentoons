import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import socket from "../utils/socket";
import { currentUserThunk, getSingleuser } from "../features/user/userThunk";
import { messageThunk } from "../features/messages/messageThunk";
import { GrFormPreviousLink } from "react-icons/gr";

const ChatPage = () => {
  const navigate = useNavigate();
  const { userId: receiverId } = useParams();
  const dispatch = useDispatch();

  const { currentUser, user } = useSelector((state) => state.users);
  const { data } = useSelector((state) => state.messages);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatRef = useRef(null);

  useEffect(() => {
    dispatch(currentUserThunk());
  }, [dispatch]);

  useEffect(() => {
    if (receiverId) {
      dispatch(messageThunk(receiverId));
      dispatch(getSingleuser(receiverId));
    }
  }, [dispatch, receiverId]);

  useEffect(() => {
    if (!currentUser) return;

    socket.connect();
    socket.emit("register", currentUser?._id);

        socket.on("receive_private_message", ({ from, message, createdAt }) => {
      if (from === receiverId) {
        setMessages((prev) => [
          ...prev,
          { from, to: currentUser?._id, message, createdAt }, 
        ]);
      }
    });

    return () => {
      socket.off("receive_private_message");
      socket.disconnect();
    };
  }, [receiverId, currentUser]);

  useEffect(() => {
    if (data?.messages) {
      setMessages(data.messages);
    }
  }, [data]);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const messageData = {
      from: currentUser?._id,
      to: receiverId,
      message: newMessage,
      createdAt: new Date().toISOString(),
    };

    socket.emit("private_message", messageData);
    setMessages((prev) => [...prev, messageData]);
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto bg-white border-x border-gray-200">
      <div className="flex items-center gap-3 px-4 py-3 shadow-md">
        <GrFormPreviousLink
          className="text-2xl cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h2 className="text-xl font-semibold">
          {user?.user?.firstName} {user?.user?.lastName}
        </h2>
      </div>

      <div 
        className="flex-1 overflow-y-auto px-4 py-3 space-y-2 hide-scrollbar"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col ${
              msg.from === currentUser?._id ? "items-end" : "items-start"
            }`}
          > 
            <span
              className={`max-w-xs px-4 py-2 rounded-2xl text-sm break-words ${
                msg.from === currentUser?._id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.message}
            </span>
            {msg.createdAt && (
              <p className="text-xs text-gray-500 mt-1">
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            )}
          </div>
        ))}
        <div ref={chatRef} />
      </div>

      <div className="flex items-center gap-2 border-t px-4 py-3">
        <input
          type="text"
          className="flex-grow border border-[#F7941D] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          placeholder= {user?.user?.whoBlocked?.includes(currentUser?._id)?"User Blocked you" :  "Type a message..."}
         
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          disabled = {currentUser?.blockedUsers?.includes(receiverId)}
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={handleSend}
          className="bg-[#F7941D] hover:bg-[#e28514] text-white px-5 py-2 rounded-full transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
