import bybitService from "./bybitService.js";

const tradeService = {
  async placeTrade(symbol, side, orderType, qty, price) {
    try {
      const tradeParams = {
        category: "linear",
        symbol,
        side,
        orderType,
        qty,
        price,
        timeInForce: "GTC",
      };

      const response = await bybitService.sendRequest(
        "/v2/private/order/create",
        "POST",
        tradeParams
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default tradeService;
