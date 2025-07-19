import { Request, Response, NextFunction } from "express";
import {
  getAccessToken,
  getRefreshToken,
  validateTokens,
} from "../helper/token.helper";
import { JWT } from "../constants/constants";
import { API } from "../constants/api.contants";

export const validateAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
