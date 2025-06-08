import { createSlice } from "@reduxjs/toolkit";
import {
  blockUser,
  currentUserThunk,
  getSingleuser,
  getUsers,
  requestedUsers,
} from "./userThunk";

const userSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
    currentUser: null,
    data: [],
    requestUsers: [],
    error: null,
    loading: false,
    blockMessage: "",
    blockSuccess:false,
    
  },
  reducers: {
    resetUserState: (state) => {
      (state.data = []),
        (state.currentUser = null),
        (state.loading = false),
        (state.error = null),
        (state.requestUsers = []),
        (state.user = null),
        (state.blockMessage = ""),
        (state.blockSuccess = false);
    },
    updateSentRequest: (state, action) => {
      const receiverId = action.payload;
      const receiver = state.data.find((u) => u._id === receiverId);
      if (receiver && !state.currentUser.sentRequests.includes(receiverId)) {
        state.currentUser.sentRequests.push(receiverId);
      }
    },
    updateAcceptedRequest: (state, action) => {
      const senderId = action.payload;
      if (state.requestUsers?.result) {
        state.requestUsers.result = state.requestUsers.result.filter(
          (user) => user._id !== senderId
        );
      }
      if (senderId && !state.currentUser.connections.includes(senderId)) {
        state.currentUser.connections.push(senderId);
      }
    },
  },
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
      })

      .addCase(requestedUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestedUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.requestUsers = action.payload;
      })
      .addCase(requestedUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getSingleuser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleuser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getSingleuser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(blockUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        state.loading = false;
        state.blockSuccess = true
        state.blockMessage = action.payload;
      })
      .addCase(blockUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
export const {
  resetUserState,
  updateSentRequest,
  updateAcceptedRequest,
  removeRequest,
} = userSlice.actions;
