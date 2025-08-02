import { Request, Response, NextFunction } from "express";
import {
  extractTokenData,
  getAccessToken,
  getRefreshToken,
  validateTokens,
} from "../helper/token.helper";
import { JWT } from "../constants/constants";
import { API } from "../constants/api.contants";
import { clearCookie, generateCookie } from "../helper/cookie.helper";
import {
  getCurrentUserRefreshToken,
  updateUserStatus,
} from "../helper/user.helper";

export const validateAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = getAccessToken(req);
    const refreshToken = getRefreshToken(req);
    let refreshTokenV2: string = refreshToken;

    if (!refreshToken) {
      const tokenData = extractTokenData({ token: accessToken! });
      const userRefreshToken = await getCurrentUserRefreshToken(
        tokenData?.user_id
      );
      refreshTokenV2 = userRefreshToken;
    }

    const validatedTokens = validateTokens({
      accessToken,
      refreshToken: refreshTokenV2,
    });

    if (validatedTokens?.status === JWT.STATUS.ERROR) {
      clearCookie({
        res,
        value_name: `SMA-${JWT.NORMALIZE.ACCESS_TOKEN}`,
      });

      clearCookie({
        res,
        value_name: JWT.NORMALIZE.REFRESH_TOKEN,
      });

      return res.status(API.UNAUTHORIZED.CODE).send({
        ok: false,
        data: null,
        message: API.UNAUTHORIZED.MESSAGE,
      });
    }

    const hasPropertyNameOfRefreshToken = Object.hasOwn(
      validatedTokens?.data,
      JWT.NORMALIZE.REFRESH_TOKEN
    );
    const token = !hasPropertyNameOfRefreshToken
      ? validatedTokens?.data?.accessToken
      : validatedTokens?.data?.refreshToken?.accessToken;

    const data = extractTokenData({ token });

    updateUserStatus(data?.user_id, true);

    generateCookie({
      res,
      value_name: `SMA-${JWT.NORMALIZE.ACCESS_TOKEN}`,
      value: token,
    });

    generateCookie({
      res,
      value_name: JWT.NORMALIZE.REFRESH_TOKEN,
      value: refreshTokenV2,
      httpOnly: true,
    });

    return next();
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
