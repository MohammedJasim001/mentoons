import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authThunk";


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    isSuccess: false,
    successMessage: "",
    errorMessage: "",
    token: null,
  },
  reducers: {
    resetAuthState: (state) => {
      state.loading = false;
      state.isSuccess = false;
      state.errorMessage = "";
      state.successMessage = "";
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.successMessage = action.payload.message;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.successMessage = action.payload.message;
        state.token = action.payload.user.accessToken
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
export const { resetAuthState } = authSlice.actions;
