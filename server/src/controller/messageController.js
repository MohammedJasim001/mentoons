import * as messageServices from "../services/messageServices.js";
import catchAsync from "../utils/catchAsync.js";

export const getMessages = catchAsync(async (req, res) => {
  const messages = await messageServices.getMessages(req.user.id,req.params.user2);
    res.status(200).json({message:"fetched messages", messages})
});

export const blockUser = catchAsync (async(req,res)=>{
    const result = await messageServices.blockUser(req.user.id,req.params.userId)
    res.status(200).json(result)
})