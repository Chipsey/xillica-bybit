import { VALID_ENDPOINTS } from "../config/constants.js";
import { accInfoServe } from "../services/accountService.js";

export const accountInfoControl = async (req, res) => {
  try {
    const { endPoint } = req.params;
    if (!VALID_ENDPOINTS.includes(endPoint))
      throw new Error("Invalid endpoint!");

    const accInfo = await accInfoServe(req, endPoint);
    res.status(200).json(accInfo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
