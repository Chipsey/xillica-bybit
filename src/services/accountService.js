import bybitService from "./bybitService.js";
import { getApiKeyById, getApiSecretById } from "./userService.js";

export const accInfoServe = async (req, endPoint) => {
  try {
    const apiKey = await getApiKeyById(req.user.id);
    const apiSecret = await getApiSecretById(req.user.id);

    const tradeParams = handleTradeParams(endPoint, req);

    const accInfo = await bybitService.sendRequest(
      apiKey,
      apiSecret,
      `/v5/account/${endPoint}`,
      "GET",
      tradeParams
    );

    console.log("accInfo: ", accInfo);

    return accInfo;
  } catch (error) {
    throw new Error(error.message);
  }
};

const handleTradeParams = (endPoint, req) => {
  switch (endPoint) {
    case "wallet-balance":
      return {
        accountType: "UNIFIED",
      };
      break;
    case "withdrawal":
      if (!req.query.coinName) throw new Error("coinName is not defined!");
      return {
        accountType: "UNIFIED",
        coinName: req.query.coinName,
      };
      break;
    default:
      return {};
  }
};
