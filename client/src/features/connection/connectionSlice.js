import { createSlice } from "@reduxjs/toolkit";
import { acceptRequest, connections, sentRequest } from "./connectionThunk";

const connectionSlice = createSlice({
  name: "connection",
  initialState: {
    createMessage: null,
    acceptMessage: null,
    error: null,
    loading: false,
    successMessage: "",
    success: false,
    acceptSuccess:false,
    friends : [],
    connectionLoading:false
  },
  reducers: {
    resetconnectionState: (state) => {
      (state.createMessage = null),
        (state.loading = false),
        (state.error = null),
        (state.acceptMessage = ""),
        (state.success = false),
        (state.successMessage = ""),
        (state.acceptSuccess = false),
        (state.connectionLoading = false)
    },
  
  },
  extraReducers: (builder) => {
    builder
      .addCase(sentRequest.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(sentRequest.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.createMessage = action.payload;
        state.success = true;
        state.successMessage = action.payload.message;
      })
      .addCase(sentRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(acceptRequest.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(acceptRequest.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.acceptMessage = action.payload;
        state.acceptSuccess = true;
        state.successMessage = action.payload.message;
      })
      .addCase(acceptRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(connections.pending, (state) => {
        state.error = null;
        state.connectionLoading = true;
      })
      .addCase(connections.fulfilled, (state, action) => {
        state.error = null;
        state.connectionLoading = false;
        state.friends = action.payload
      })
      .addCase(connections.rejected, (state, action) => {
        state.connectionLoading = false;
        state.error = action.payload;
      });
  },
});

export default connectionSlice.reducer;
export const { resetconnectionState } = connectionSlice.actions;
