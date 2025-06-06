import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequestApi } from "./connectionApi";

export const sentRequest = createAsyncThunk('request/sent',async(receiverId,{rejectWithValue}) => {
    try {
        const res = await sendRequestApi(receiverId)
        console.log(res,'res');
        return res.data
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message)
    }
})