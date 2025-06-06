import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlegth: 6,
  },
  socketId: {
    type: String,
    default: null,
  },
  sentRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  receivedRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  notifications: [
    {
      type: { type: String },
      from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      message: String,
      date: {
        type: Date,
        default: Date.now,
      },
      isRead: { type: Boolean, default: false },
    },
  ],
});

const User = mongoose.model("User", userSchema);
export default User;
