import express from "express";
import {
  register,
  login,
  updateBybitControl,
} from "../controllers/userController.js";
import {
  validateBybit,
  validateLogin,
  validateRegister,
} from "../validation/userValidate.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.put("/bybit", protect, validateBybit, updateBybitControl);

export default router;
