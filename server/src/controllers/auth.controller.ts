import { Request, Response } from "express";
import {
  extractTokenData,
  getAccessToken,
  getRefreshToken,
  validateTokens,
} from "../helper/token.helper";
import { JWT } from "../constants/constants";
import { API } from "../constants/api.contants";
import { clearCookie, generateCookie } from "../helper/cookie.helper";
import { getCurrentUserRefreshToken } from "../helper/user.helper";

export const validateAuthorization = async (req: Request, res: Response) => {
  try {
    const accessToken = getAccessToken(req);
    const refreshToken = getRefreshToken(req);

    const validatedTokens = validateTokens({ accessToken, refreshToken });

    if (validatedTokens?.status === JWT.STATUS.ERROR) {
      return res.status(API.UNAUTHORIZED.CODE).send({
        ok: false,
        data: null,
        message: API.UNAUTHORIZED.MESSAGE,
      });
    }

    if (!refreshToken) {
      const tokenData = extractTokenData({ token: accessToken! });
      const userRefreshToken = await getCurrentUserRefreshToken(
        tokenData?.user_id
      );
      generateCookie({
        res,
        value_name: JWT.NORMALIZE.REFRESH_TOKEN,
        value: userRefreshToken,
      });
    }

    return res.status(200).send({
      ok: true,
      data: validatedTokens?.data,
      message: null,
    });
  } catch (error: unknown) {
    console.log("Error found:", {
      file_path: "auth.controllers.ts",
      method: "validateAuthorization",
      message: error,
    });
    if (error instanceof Error) {
      throw new Error(error.stack);
    } else {
      throw new Error(error as any);
    }
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    clearCookie({
      res,
      value_name: JWT.NORMALIZE.REFRESH_TOKEN,
    });
    return res.status(API.OK.CODE).send({
      ok: true,
      data: null,
      message: API.OK.MESSAGE,
    });
  } catch (error) {
    console.log("Error found:", {
      file_path: "auth.controllers.ts",
      method: "logout",
      message: error,
    });
    if (error instanceof Error) {
      throw new Error(error.stack);
    } else {
      throw new Error(error as any);
    }
  }
};
