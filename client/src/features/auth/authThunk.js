import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, logoutApi, registerApi } from "./authApi";

export const registerUser = createAsyncThunk(
  "register/user",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await registerApi(userData);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "login/user",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await loginApi(userData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const logoutuser = createAsyncThunk(
  "logout/user",
  async (_, { rejectWithValue }) => {
    try {
      const res = await logoutApi();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
)