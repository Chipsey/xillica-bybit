import express from "express";
import { executeTrade } from "../controllers/tradeController.js";

const router = express.Router();

router.post("/", executeTrade);

export default router;
