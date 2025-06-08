import { Server } from "socket.io";
import Message from "../model/messageModel.js";
import User from "../model/userModel.js";
import dotenv from 'dotenv'

dotenv.config()

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL ,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(` User connected: ${socket.id}`);

    socket.on("register", async (userId) => {
      await User.findByIdAndUpdate(userId, { socketId: socket.id });
    });

    socket.on("private_message", async ({ from, to, message }) => {
      console.log(from, to, message);
      const receiver = await User.findById(to);

      const savedMessage = await Message.create({ from, to, message });
      console.log(savedMessage.createdAt,'saveddd')

      if (receiver?.socketId) {
        io.to(receiver.socketId).emit("receive_private_message", {
          from,
          message,
          createdAt: savedMessage.createdAt,
        });
      }
    });

    socket.on("connection_request", async ({ from, to, message }) => {
      try {
        const receiver = await User.findById(to);
        const sender = await User.findById(from);

        if (!receiver || !sender) return;

        if (
          receiver.connections.includes(from) ||
          receiver.receivedRequests.includes(from)
        ) {
          return;
        }
        console.log(from, to, message, "message");
        receiver.notifications.push({
          from: from,
          message: message,
        });
        await receiver.save();

        if (receiver?.socketId) {
          io.to(receiver.socketId).emit("receive_connection_request", {
            from,
            message,
          });
        }
      } catch (error) {
        console.error("Error handling connection request:", error);
      }
    });

    socket.on("disconnect", async () => {
      await User.findOneAndUpdate({ socketId: socket.id }, { socketId: null });
    });
  });
};
