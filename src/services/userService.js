import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bybitService from "./bybitService.js";
import { encrypt, decrypt } from "../utils/encript.js";

//Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register user
export const registerUser = async (name, email, password) => {
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("User Already Exists!");

  const newUser = new User({ name, email, password });
  newUser.save();
  return {
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    token: generateToken(newUser._id),
  };
};

// Login user
export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new Error("Invalid email or password!");
  }
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  };
};

// Bybit data update
export const updateBybit = async (userId, data) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found!");
    const bybitResMessage = await checkAccount(data.apiKey, data.apiSecret);
    if (bybitResMessage != "OK")
      throw new Error("Invalid apiKey or apiSecret!");
    user.apiKey = encrypt(data.apiKey); // Encrypt the apiKey and apiSecret before saving
    user.apiSecret = encrypt(data.apiSecret);
    const updatedUser = await user.save();
    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

const checkAccount = async (apiKey, apiSecret) => {
  const response = await bybitService.sendRequest(
    apiKey,
    apiSecret,
    "/v5/account/wallet-balance",
    "GET",
    { accountType: "UNIFIED", coin: "USDT" }
  );
  return response?.retMsg;
};

export const getApiKeyById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found!");
    return decrypt(user.apiKey);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getApiSecretById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found!");
    return decrypt(user.apiSecret);
  } catch (error) {
    throw new Error(error.message);
  }
};
