import { Server } from "socket.io";
import Message from "../model/messageModel.js";
import User from "../model/userModel.js";

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(` User connected: ${socket.id}`);

    socket.on("register", async (userId) => {
      await User.findByIdAndUpdate(userId, { socketId: socket.id });
    });

    socket.on("private_message", async ({ from, to, message }) => {
      const receiver = await User.findById(to);

      await Message.create({ from, to, message });

      if (receiver?.socketId) {
        io.to(receiver.socketId).emit("receive_private_message", {
          from,
          message,
        });
      }
    });

    socket.on("disconnect", async () => {
      await User.findOneAndUpdate({ socketId: socket.id }, { socketId: null });
    });
  });
};
