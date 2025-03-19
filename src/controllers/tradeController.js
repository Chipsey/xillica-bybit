import tradeService from "../services/tradeService.js";

export const executeTrade = async (req, res) => {
  try {
    const { symbol, side, orderType, qty, price } = req.body;

    if (!symbol || !side || !orderType || !qty) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const response = await tradeService.placeTrade(
      symbol,
      side,
      orderType,
      qty,
      price
    );
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// app.get("/balance", async (req, res) => {
//   try {
//     const response = await bybitService.sendRequest(
//       "/v5/account/wallet-balance",
//       "GET",
//       { accountType: "UNIFIED", coin: "USDT" }
//     );
//     res.json(response);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
