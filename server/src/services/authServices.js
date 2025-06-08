import User from "../model/userModel.js";
import { passwordCompare, passwordHash } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwtToken.js";

export const userRegister = async (userData) => {
  const { firstName, lastName, email, password } = userData;
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    const error = new Error("Email already exists");
    error.statusCode = 400;
    throw error;
  }
  const hashedPassword = await passwordHash(password);
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  return user;
};

export const userLogin = async (userData) => {
  const { email, password } = userData;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    const error = new Error("Invalid Email Id");
    error.statusCode = 400;
    throw error;
  }
  const validPassword = await passwordCompare(password, existingUser.password);
  if (!validPassword) {
    const error = new Error("Invalid Password");
    error.statusCode = 400;
    throw error;
  }
  const accessToken = generateToken(existingUser._id);
  return {
    _id: existingUser._id,
    email: existingUser.email,
    accessToken,
  };
};

