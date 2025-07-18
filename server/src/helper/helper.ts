import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "dotenv";
config();
import { JWT } from "../constants/constants";
import {
  CustomTokenResponseI,
  CustomTokenSuccessParameterI,
  extractTokenDataI,
  generateCookieI,
  status_type_enum,
  token_type_enum,
  validateTokenI,
  validateTokensI,
} from "./typesAndInterfaces";
import { v4 as uuid } from "uuid";
import { Request } from "express";

const customTokenSuccess = <T>({
  type,
  data,
  message,
  forSignData,
}: CustomTokenSuccessParameterI<T>): CustomTokenResponseI => {
  const token =
    type === JWT.TYPE.ACCESS_TOKEN
      ? {
          accessToken: data,
        }
      : {
          refreshToken: data,
        };

  return {
    status: status_type_enum.SUCCESS,
    token_type: type ?? null,
    data: token ?? null,
    forSignData: forSignData ?? null,
    message: message ?? null,
  };
};
const customTokenError = (message?: string): CustomTokenResponseI => {
  return {
    status: status_type_enum.ERROR,
    token_type: null,
    data: null,
    forSignData: null,
    message: message ?? null,
  };
};

export const generateAccessToken = <T>(data: NonNullable<T>) => {
  try {
    const accessToken = jwt.sign(
      data,
      process.env.SIMPLE_MESSAGING_APP_JWT_SECRET!,
      {
        expiresIn: "15m",
      }
    );
    return customTokenSuccess({
      type: token_type_enum.ACCESS_TOKEN,
      data: accessToken,
    });
  } catch (error) {
    console.log("Error found:", {
      file_path: "helper.js",
      method: "generateAccessToken",
      message: error,
    });
    return customTokenError();
  }
};

export const getAccessToken = (req: Request) => {
  const headers = req.headers;
  const authorization = headers?.authorization ?? null;
  const accessToken = authorization?.replace("Bearer ", "") ?? null;
  return accessToken;
};

export const getRefreshToken = (req: Request) => {
  const cookies = req.cookies;
  const refreshToken = cookies?.refreshToken ?? null;
  return refreshToken;
};

export const generateRefreshToken = <T>(data: NonNullable<T>) => {
  try {
    const refreshToken = jwt.sign(
      data,
      process.env.SIMPLE_MESSAGING_APP_JWT_SECRET!,
      {
        expiresIn: "30m",
      }
    );
    return customTokenSuccess({
      type: token_type_enum.REFRESH_TOKEN,
      data: refreshToken,
    });
  } catch (error) {
    console.log("Error found:", {
      file_path: "helper.js",
      method: "generateRefreshToken",
      message: error,
    });
    return customTokenError();
  }
};

export const validateToken = ({ type, token }: validateTokenI) => {
  try {
    const verfiedToken: any = jwt.verify(
      token,
      process.env.SIMPLE_MESSAGING_APP_JWT_SECRET!
    );
    if (type === JWT.TYPE.ACCESS_TOKEN) {
      return customTokenSuccess({
        type: token_type_enum.ACCESS_TOKEN,
        data: token,
        message: null,
        forSignData: verfiedToken?.user_id,
      });
    }
    if (type === JWT.TYPE.REFRESH_TOKEN) {
      return customTokenSuccess({
        type: token_type_enum.REFRESH_TOKEN,
        data: token,
        message: null,
        forSignData: verfiedToken?.user_id,
      });
    }
  } catch (error) {
    console.log("Error found:", {
      file_path: "helper.js",
      method: "validateToken",
      message: error,
    });
    return customTokenError();
  }
};

export const extractTokenData = ({
  token,
}: extractTokenDataI): JwtPayload | null => {
  try {
    const decodedToken: JwtPayload | null = jwt.decode(token, {
      complete: false,
      json: true,
    });
    return decodedToken;
  } catch (error) {
    console.log("Error found:", {
      file_path: "helper.js",
      method: "validateToken",
      message: error,
    });
    return customTokenError();
  }
};

export const validateTokens = ({
  accessToken,
  refreshToken,
}: validateTokensI) => {
  if (!accessToken && !refreshToken) {
    return customTokenError(JWT.COMMON.NO_TOKENS);
  } else {
    if (accessToken && !refreshToken) {
      const verifyAccessToken = validateToken({
        type: token_type_enum.ACCESS_TOKEN,
        token: accessToken,
      });
      if (verifyAccessToken?.status === JWT.STATUS.ERROR) {
        return verifyAccessToken;
      } else {
        return verifyAccessToken;
      }
    }
    if (refreshToken && !accessToken) {
      const verifyRefreshToken = validateToken({
        type: token_type_enum.REFRESH_TOKEN,
        token: refreshToken,
      });
      if (verifyRefreshToken?.status === JWT.STATUS.ERROR) {
        return verifyRefreshToken;
      } else {
        const generatedAccessToken = generateAccessToken({
          user_id: verifyRefreshToken?.forSignData,
        });
        return customTokenSuccess({
          type: token_type_enum.REFRESH_TOKEN,
          data: generatedAccessToken.data,
        });
      }
    }

    const verifyAccessToken = validateToken({
      type: token_type_enum.ACCESS_TOKEN,
      token: accessToken as string,
    });

    if (verifyAccessToken?.status === JWT.STATUS.SUCCESS) {
      return customTokenSuccess({
        type: token_type_enum.ACCESS_TOKEN,
        data: accessToken,
      });
    }

    const verifyRefreshToken = validateToken({
      type: token_type_enum.REFRESH_TOKEN,
      token: refreshToken!,
    });

    const generatedAccessToken = generateAccessToken({
      user_id: verifyRefreshToken?.forSignData,
    });

    if (verifyRefreshToken?.status === JWT.STATUS.SUCCESS) {
      return customTokenSuccess({
        type: token_type_enum.ACCESS_TOKEN,
        data: generatedAccessToken.data?.accessToken,
      });
    }

    return customTokenError();
  }
};

export const generateCookie = ({
  res,
  value_name,
  value,
  maxAge,
}: generateCookieI) => {
  return res.cookie(value_name, value, {
    httpOnly: true,
    secure: false,
    path: "/",
    sameSite: "lax",
    maxAge:
      maxAge === null
        ? 0
        : typeof maxAge === "string"
        ? parseInt(maxAge)
        : maxAge,
  });
};

export const generateUUID = () => {
  return uuid();
};
