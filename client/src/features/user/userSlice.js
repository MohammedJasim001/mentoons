import { createSlice } from "@reduxjs/toolkit";
import {  currentUserThunk, getUsers } from "./userThunk";

const userSlice = createSlice({
  name: "users",
  initialState: {
    currentUser:null,
    data: [],
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.users;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(currentUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(currentUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(currentUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
