import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (userId) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  return jwt.sign({ userId }, secretKey, { expiresIn: "1d" });
};
