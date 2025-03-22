import express from "express";
import tradeRoutes from "./src/routes/tradeRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import accRoutes from "./src/routes/accountRoutes.js";
import dotenv from "dotenv";
import connectDB from "./src/config/dbConnect.js";
import { protect } from "./src/middleware/authMiddleware.js";

dotenv.config();

connectDB();

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/trade", protect, tradeRoutes);
app.use("/api/v1/account", protect, accRoutes);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
