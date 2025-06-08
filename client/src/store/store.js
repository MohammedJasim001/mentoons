import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import connectionReducer from '../features/connection/connectionSlice'
import notificationReducer from '../features/notification/notificationSlice'
import messageReducer from '../features/messages/messageSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    connection: connectionReducer,
    notification:notificationReducer,
    messages:messageReducer
  },
});
