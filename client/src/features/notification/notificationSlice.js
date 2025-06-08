import { createSlice } from "@reduxjs/toolkit";
import { notificationRead, notificationThunk } from "./notificationThunk";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    data: [],
    readMessage:'',
    unreadCount: 0,
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(notificationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(notificationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.unreadCount = action.payload.filter((n) => !n.isRead).length;
      })
      .addCase(notificationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(notificationRead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(notificationRead.fulfilled, (state, action) => {
        state.loading = false;
        state.readMessage = action.payload;
      })
      .addCase(notificationRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default notificationSlice.reducer;
