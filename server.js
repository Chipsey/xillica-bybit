import express from "express";
import bybitService from "./src/services/bybitService.js";

const app = express();
const PORT = 3000;

app.get("/balance", async (req, res) => {
  try {
    const response = await bybitService.sendRequest(
      "/v5/account/wallet-balance",
      "GET",
      { accountType: "UNIFIED", coin: "BTC" }
    );
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
