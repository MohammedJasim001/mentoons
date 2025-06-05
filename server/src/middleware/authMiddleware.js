import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import dotenv from "dotenv";

dotenv.config();

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      const error = new Error("Access denied, token missing!");
      error.statusCode = 401;
      throw error;
    }

    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      const error = new Error("JWT Key missing!");
      error.statusCode = 500;
      throw error;
    }

    const decoded = jwt.verify(token, secretKey);
    const user = await User.findById(decoded.userId);
    if (!user) {
      const error = new Error("Access Forbidden");
      error.statusCode = 403;
      throw error;
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default userAuth;
