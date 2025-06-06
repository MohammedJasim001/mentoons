import { createSlice } from "@reduxjs/toolkit";
import { sentRequest } from "./connectionThunk";

const connectionSlice = createSlice({
  name: "connection",
  initialState: {
    message: null,
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sentRequest.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(sentRequest.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(sentRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default connectionSlice.reducer
