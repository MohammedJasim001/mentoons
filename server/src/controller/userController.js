import * as userService from "../services/userServices.js";
import catchAsync from "../utils/catchAsync.js";

export const currentUser = catchAsync(async(req, res) => {
    const user = await userService.currentUser(req.user.id)
    res.status(200).json(user)
})

export const getUsers = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const users = await userService.getUsers(userId);
  res.status(200).json({message:"user fetched", users})
});


export const sentRequest = catchAsync(async (req,res)=> {
    const result = await userService.sentRequest(req.params.receiverId, req.user)
    res.status(201).json(result)
})

export const acceptRequest = catchAsync(async (req,res)=> {
    const result = await userService.acceptRequest(req.user,req.params.senderId)
    res.status(201).json(result)
})