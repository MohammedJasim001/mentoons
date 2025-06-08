import { createAsyncThunk } from "@reduxjs/toolkit";
import { messageApi } from "./messageApi";

export const messageThunk = createAsyncThunk(
  "messages/get",
  async (receiverId, { rejectWithValue }) => {
    try {
      const res = await messageApi(receiverId);
      return res.data
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);