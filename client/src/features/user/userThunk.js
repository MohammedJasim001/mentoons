import { createAsyncThunk } from "@reduxjs/toolkit";
import { blockApi, currentUserApi, requestsApi, singleUserApi, userApi } from "./userApi";

export const currentUserThunk = createAsyncThunk(
  "users/current",
  async (_, { rejectWithValue }) => {
    try {
      const res = await currentUserApi();
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const getUsers = createAsyncThunk(
  "users/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await userApi();
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const requestedUsers = createAsyncThunk(

  "users/requested",
  async (_, { rejectWithValue }) => {
    try {
      const res = await requestsApi();
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const getSingleuser = createAsyncThunk(
  "users/singleuser",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await singleUserApi(userId);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const blockUser = createAsyncThunk(
  "users/block",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await blockApi(userId);
      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);
