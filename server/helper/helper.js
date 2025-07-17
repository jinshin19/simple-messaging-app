import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
import { JWT } from "../constants/constants.js";

const customTokenSuccess = (type, data, message, forSignData) => {
  const token =
    type === JWT.TYPE.ACCESS_TOKEN
      ? {
          accessToken: data,
        }
      : {
          refreshToken: data,
        };

  return {
    status: JWT.STATUS.SUCCESS ?? null,
    token_type: type ?? null,
    data: token ?? null,
    forSignData: forSignData ?? null,
    message: message ?? null,
  };
};
const customTokenError = (message) => {
  return {
    status: JWT.STATUS.ERROR ?? null,
    token_type: null,
    data: null,
    message: message ?? null,
  };
};

export const generateAccessToken = (data) => {
  try {
    const accessToken = jwt.sign(
      data,
      process.env.SIMPLE_MESSAGING_APP_JWT_SECRET,
      {
        expiresIn: process.env.SIMPLE_MESSAGING_APP_JWT_ACCESS_TOKEN_EXPIRATION,
      }
    );
    return customTokenSuccess(JWT.TYPE.ACCESS_TOKEN, accessToken);
  } catch (error) {
    console.log("Error found:", {
      file_path: "helper.js",
      method: "generateAccessToken",
      message: error,
    });
    return customTokenError();
  }
};

export const generateRefreshToken = (data) => {
  try {
    const refreshToken = jwt.sign(
      data,
      process.env.SIMPLE_MESSAGING_APP_JWT_SECRET,
      {
        expiresIn:
          process.env.SIMPLE_MESSAGING_APP_JWT_REFRESH_TOKEN_EXPIRATION,
      }
    );
    return customTokenSuccess(JWT.TYPE.REFRESH_TOKEN, refreshToken);
  } catch (error) {
    console.log("Error found:", {
      file_path: "helper.js",
      method: "generateRefreshToken",
      message: error,
    });
    return customTokenError();
  }
};

export const validateToken = (type, token) => {
  try {
    const verfiedToken = jwt.verify(
      token,
      process.env.SIMPLE_MESSAGING_APP_JWT_SECRET
    );
    if (type === JWT.TYPE.ACCESS_TOKEN) {
      return customTokenSuccess(
        JWT.TYPE.ACCESS_TOKEN,
        token,
        null,
        verfiedToken?.email
      );
    }
    if (type === JWT.TYPE.REFRESH_TOKEN) {
      return customTokenSuccess(
        JWT.TYPE.REFRESH_TOKEN,
        token,
        null,
        verfiedToken?.email
      );
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

export const validateTokens = (accessToken, refreshToken) => {
  if (!accessToken && !refreshToken) {
    return customTokenError("No tokens found");
  } else {
    if (accessToken && !refreshToken) {
      const verifyAccessToken = validateToken(
        JWT.TYPE.ACCESS_TOKEN,
        accessToken
      );
      if (verifyAccessToken.status === JWT.STATUS.ERROR) {
        return verifyAccessToken;
      } else {
        return verifyAccessToken;
      }
    }
    if (refreshToken && !accessToken) {
      const verifyRefreshToken = validateToken(
        JWT.TYPE.REFRESH_TOKEN,
        refreshToken
      );
      if (verifyRefreshToken.status === JWT.STATUS.ERROR) {
        return verifyRefreshToken;
      } else {
        const generatedAccessToken = generateAccessToken({
          email: verifyRefreshToken.forSignData,
        });
        return customTokenSuccess(
          JWT.TYPE.REFRESH_TOKEN,
          generatedAccessToken.data
        );
      }
    }
    const verifyAccessToken = validateToken(JWT.TYPE.ACCESS_TOKEN, accessToken);
    if (verifyAccessToken.status === JWT.STATUS.SUCCESS) {
      return customTokenSuccess(JWT.TYPE.ACCESS_TOKEN, accessToken);
    }

    const verifyRefreshToken = validateToken(
      JWT.TYPE.REFRESH_TOKEN,
      refreshToken
    );

    const generatedAccessToken = generateAccessToken({
      email: verifyRefreshToken.forSignData,
    });

    if (verifyRefreshToken.status === JWT.STATUS.SUCCESS) {
      return customTokenSuccess(
        generatedAccessToken.token_type,
        generatedAccessToken.data?.accessToken
      );
    }

    return customTokenError();
  }
};

export const generateCookie = (res, value_name, value, maxAge) => {
  return res.cookie(value_name, value, {
    httpOnly: true,
    secure: false,
    path: "/",
    sameSite: "lax",
    maxAge: typeof maxAge === "string" ? parseInt(maxAge) : maxAge,
  });
};
