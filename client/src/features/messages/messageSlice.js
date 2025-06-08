import { createSlice } from "@reduxjs/toolkit";
import { messageThunk } from "./messageThunk";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    loading: false,
    error: null,
    data: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(messageThunk.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(messageThunk.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(messageThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default messageSlice.reducer;
