import dotenv from "dotenv";

dotenv.config();

export default {
  apiKey: process.env.BYBIT_API_KEY,
  apiSecret: process.env.BYBIT_API_SECRET,
  baseUrl: process.env.BYBIT_BASE_URL,
};
