import { createAsyncThunk } from "@reduxjs/toolkit";
import { acceptRequesApi, connectionApi, sendRequestApi } from "./connectionApi";

export const sentRequest = createAsyncThunk(
  "request/sent",
  async (receiverId, { rejectWithValue }) => {
    try {
      const res = await sendRequestApi(receiverId);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const acceptRequest = createAsyncThunk(
  "request/accept",
  async (senderId, { rejectWithValue }) => {
    try {
      const res = await acceptRequesApi(senderId);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const connections = createAsyncThunk(
  "connection",
  async (_, { rejectWithValue }) => {
    try {
      const res = await connectionApi();
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);
