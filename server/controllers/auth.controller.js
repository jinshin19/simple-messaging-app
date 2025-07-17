import { JWT } from "../constants/constants.js";
import { validateTokens } from "../helper/helper.js";

export const validateAuthorization = async (req, res) => {
  try {
    const headers = req.headers;
    const authorization = headers?.authorization ?? null;
    const accessToken = authorization?.replace("Bearer ", "") ?? null;
    const cookies = req.cookies;
    const refreshToken = cookies?.refreshToken ?? null;

    const validatedTokens = validateTokens(accessToken, refreshToken);

    if (validatedTokens.status === JWT.STATUS.ERROR) {
      return res.status(401).send({
        ok: false,
        data: null,
        message: "Unauthorized",
      });
    }

    return res.status(200).send({
      ok: true,
      data: validatedTokens.data,
      message: null,
    });
  } catch (error) {
    console.log("Error found:", {
      file_path: "auth.controllers.js",
      method: "validateAuthorization",
      message: error,
    });
    throw new error(error);
  }
};
