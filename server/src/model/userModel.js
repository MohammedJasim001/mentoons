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
});

const User = mongoose.model("User", userSchema);
export default User;
