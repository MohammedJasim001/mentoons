import { createAsyncThunk } from "@reduxjs/toolkit";
import { getNotificationApi, readNotification } from "./notificationApi";

export const notificationThunk = createAsyncThunk(
  "notification/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getNotificationApi();
      return res.data.result;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const notificationRead = createAsyncThunk(
  "notification/read",
  async (_, { rejectWithValue }) => {
    try {
      const res = await readNotification();
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);
