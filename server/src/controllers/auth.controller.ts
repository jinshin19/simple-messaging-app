import { Request, Response } from "express";
import { validateTokens } from "../helper/helper";
import { JWT } from "../constants/constants";

export const validateAuthorization = async (req: Request, res: Response) => {
  try {
    const headers: Headers | any = req.headers;
    const authorization = headers?.authorization ?? null;
    const accessToken = authorization?.replace("Bearer ", "") ?? null;
    const cookies = req.cookies;
    const refreshToken = cookies?.refreshToken ?? null;

    const validatedTokens = validateTokens({ accessToken, refreshToken });

    if (validatedTokens?.status === JWT.STATUS.ERROR) {
      return res.status(401).send({
        ok: false,
        data: null,
        message: "Unauthorized",
      });
    }

    return res.status(200).send({
      ok: true,
      data: validatedTokens?.data,
      message: null,
    });
  } catch (error: unknown) {
    console.log("Error found:", {
      file_path: "auth.controllers.js",
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
