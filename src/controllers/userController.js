import {
  registerUser,
  loginUser,
  updateBybit,
} from "../services/userService.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await registerUser(name, email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const updateBybitControl = async (req, res) => {
  try {
    const { apiKey, apiSecret } = req.body;
    const user = await updateBybit(req.user.id, { apiKey, apiSecret });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
