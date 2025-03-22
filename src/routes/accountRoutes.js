import express from "express";
import { accountInfoControl } from "../controllers/accountController.js";

const router = express.Router();

router.get("/:endPoint", accountInfoControl);

export default router;
