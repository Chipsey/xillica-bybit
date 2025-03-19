import axios from "axios";
import config from "../config/dotenv.js";
import crypto from "crypto";

const { baseUrl } = config;

// Function to generate the signature for authentication
const generateSignature = (params, apiSecret) => {
  const orderedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  return crypto
    .createHmac("sha256", apiSecret)
    .update(orderedParams)
    .digest("hex");
};

// Function to send signed requests to Bybit API
const sendRequest = async (
  apiKey,
  apiSecret,
  endpoint,
  method = "GET",
  params = {}
) => {
  try {
    params.api_key = apiKey;
    params.timestamp = Date.now();
    params.sign = generateSignature(params, apiSecret);

    const response = await axios({
      method,
      url: `${baseUrl}${endpoint}`,
      data: method === "POST" ? params : null,
      params: method === "GET" ? params : null,
    });

    return response.data;
  } catch (error) {
    console.error("Bybit API Error:", error.response?.data || error.message);
    throw error;
  }
};

export default { sendRequest };
