import User from "../model/userModel.js";

//Current user
export const currentUser = async (userId) => {
  const user = await User.findById(userId);
  return user;
};

//singleUser
export const getSingleuser = async (userId) => {
  const user = await User.findById(userId);
  return user;
};

//fetch other users
export const getUsers = async (userId) => {
  const users = await User.find({ _id: { $ne: userId } }).select("-password");
  return users;
};

//sent connection request
export const sentRequest = async (receiverId, currentUserId) => {
  const sender = await User.findById(currentUserId);
  const receiver = await User.findById(receiverId);

  if (!receiver) {
    const error = new Error("User not found");
    error.statusCode = 400;
    throw error;
  }

  if (
    receiver.receivedRequests.includes(sender._id) ||
    receiver.connections.includes(sender._id)
  ) {
    const error = new Error("Already requested or connected");
    error.statusCode = 400;
    throw error;
  }

  await User.findByIdAndUpdate(receiverId, {
    $addToSet: { receivedRequests: sender._id },
  });

  await User.findByIdAndUpdate(sender._id, {
    $addToSet: { sentRequests: receiverId },
  });

  return {
    message: "Connection request sent",
    receiverId,
    senderId: sender._id,
  };
};

//accept the request
export const acceptRequest = async (receiverId, senderId) => {
  const receiver = await User.findById(receiverId);
  const sender = await User.findById(senderId);

  if (!receiver || !sender) {
    const error = new Error("User not found");
    error.statusCode = 400;
    throw error;
  }

  if (
    sender.connections.includes(receiver._id) &&
    receiver.connections.includes(sender._id)
  ) {
    const error = new Error("You are already connected");
    error.statusCode = 400;
    throw error;
  }

  await User.findByIdAndUpdate(receiverId, {
    $pull: { receivedRequests: senderId },
    $addToSet: { connections: senderId },
  });

  await User.findByIdAndUpdate(senderId, {
    $pull: { sentRequests: receiverId },
    $addToSet: { connections: receiverId },
  });

  return {
    message: "Connection request accepted",
    receiverId,
    senderId,
  };
};

//connection requests
export const requestes = async (userId) => {
  const users = await User.findById(userId, "receivedRequests").populate(
    "receivedRequests",
    "firstName lastName "
  );
  return users.receivedRequests;
};

export const getNotifications = async (userId) => {
  const user = await User.findById(userId, "notifications");
  const sortedNotifications = user.notifications
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return sortedNotifications;
};

export const readNotification = async (userId) => {
  const user = await User.findById(userId);

  user.notifications.forEach((element) => {
    element.isRead = true;
  });

  await user.save();

  return {
    message: "read the notification",
  };
};

export const friends = async (userId) => {
  const user = await User.findById(userId, "connections").populate(
    "connections",
    "firstName lastName"
  );
  return user.connections;
};
