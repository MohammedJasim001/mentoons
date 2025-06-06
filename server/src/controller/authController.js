import catchAsync from "../utils/catchAsync.js";
import * as authServices from "../services/authServices.js";

export const userRegister = catchAsync(async (req, res) => {
  const register = await authServices.userRegister(req.body);
  res.status(201).json({ message: "Registration Successfull", user: register });
});

export const userLogin = catchAsync(async (req, res) => {
  const login = await authServices.userLogin(req.body);
  res.cookie("token", login.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  res.status(200).json({ message: "Login Successfull", user: login });
});
