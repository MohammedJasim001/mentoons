import Message from "../model/messageModel.js";
import User from "../model/userModel.js";

export const getMessages = async (from, to) => {
  const messages = await Message.find({
    $or: [
      { from: from, to: to },
      { from: to, to: from },
    ],
  }).sort({ createdAt: 1 });

  return messages;
};

export const blockUser = async (user1, user2) => {
  const user = await User.findById(user1);
  const otherUser = await User.findById(user2);

  if (!user || !otherUser) throw new Error("User not found");

  const index = user.blockedUsers.indexOf(user2);

  if (index === -1) {
    // Block: Add user2 to user1.blockedUsers
    user.blockedUsers.push(user2);

    // Add user1 to user2.whoBlocked
    if (!otherUser.whoBlocked.includes(user1)) {
      otherUser.whoBlocked.push(user1);
    }

    await user.save();
    await otherUser.save();

    return { status: "blocked", message: "User has been blocked" };
  } else {
    // Unblock: Remove user2 from user1.blockedUsers
    user.blockedUsers.splice(index, 1);

    // Remove user1 from user2.whoBlocked
    otherUser.whoBlocked = otherUser.whoBlocked.filter(
      (id) => id.toString() !== user1.toString()
    );

    await user.save();
    await otherUser.save();

    return { status: "unblocked", message: "User has been unblocked" };
  }
};
