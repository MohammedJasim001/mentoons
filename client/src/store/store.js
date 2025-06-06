import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import connectionReducer from '../features/connection/connectionSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    connection: connectionReducer
  },
});
