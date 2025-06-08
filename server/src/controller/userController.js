import * as userService from "../services/userServices.js";
import catchAsync from "../utils/catchAsync.js";

export const currentUser = catchAsync(async(req, res) => {
    const user = await userService.currentUser(req.user.id)
    res.status(200).json(user)
})

export const getSingleuser = catchAsync(async(req,res) =>{
    const user = await userService.getSingleuser(req.params.userId)
    res.status(200).json({user})
})

export const getUsers = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const users = await userService.getUsers(userId);
  res.status(200).json({message:"user fetched", users})
});


export const sentRequest = catchAsync(async (req,res)=> {
    const result = await userService.sentRequest(req.params.receiverId, req.user._id)
    res.status(201).json(result)
})

export const acceptRequest = catchAsync(async (req,res)=> {
    const result = await userService.acceptRequest(req.user._id,req.params.senderId)
    res.status(201).json(result)
})

export const requestes = catchAsync(async(req,res)=> {
    const result = await userService.requestes(req.user.id)
    res.status(200).json({message:'Get the requested users',result})
})

export const getNotifications = catchAsync(async(req,res)=>{
    const result = await userService.getNotifications(req.user.id)
    res.status(200).json({message:'Fetched notification', result})
})

export const readNotification = catchAsync(async(req,res)=> {
    const result = await userService.readNotification(req.user.id)
    res.status(200).json(result)
})

export const friends = catchAsync (async(req,res)=> {
    const result = await userService.friends(req.user.id)
    res.status(200).json({message:'Fetched user friends', result})
})