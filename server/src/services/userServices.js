import User from "../model/userModel.js";

export const currentUser = async (userId) => {
    const user = await User.findById(userId)
    return user
}

export const getUsers = async (userId) => {
  const users = await User.find({ _id: { $ne: userId } }).select("-password");
  return users;
};

export const sentRequest = async (receiverId, currentUser) => {
  const senderId = currentUser._id;
  const receiver = await User.findById(receiverId);
  if (!receiver) {
    const error = new Error("User not found");
    error.statusCode = 400;
    throw error;
  }

  if (
    receiver.receivedRequests.includes(senderId) ||
    receiver.connections.includes(senderId)
  ) {
    const error = new Error("Already requested or connected");
    error.statusCode = 400;
    throw error;
  }

  receiver.receivedRequests.push(senderId);
  currentUser.sentRequests.push(receiverId);

//   receiver.notifications.push({
//     type: "connection",
//     from: senderId,
//     message: `${currentUser.firstName} ${currentUser.lastName} sent you a connection request`,
//   });

  await currentUser.save();
  await receiver.save();

  return {
    message: "Connection request sent",
    receiverId,
    senderId,
  };
};

export const acceptRequest = async (receiver, senderId) => {
  const receiverId = receiver._id;
  const sender = await User.findById(senderId);

  if (!sender) {
    const error = new Error("User not found");
    error.statusCode = 400;
    throw error;
  }

  receiver.receivedRequests = receiver.receivedRequests.filter((id)=>id!==senderId)
  sender.sentRequests = sender.sentRequests.filter((id)=>id!==receiverId)

  receiver.connections.push(senderId)
  sender.connections.push(receiverId)

  await receiver.save()
  await sender.save()

  return {
    message: "Connection request accepted",
    receiverId,
    senderId,
  };
};
