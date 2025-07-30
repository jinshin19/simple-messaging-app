import { Request } from "express";
import { database } from "../database/database";
import {
  generateAccessToken,
  generateRefreshToken,
  validateToken,
} from "./token.helper";
import {
  isUserAlreadyRegisteredResultI,
  signUserInI,
  signUserUpI,
  userAlreadyRegisteredDataI,
} from "../utils/types/auth.types";
import { generateCookie } from "./cookie.helper";
import { JWT } from "../constants/constants";
import { API } from "../constants/api.contants";
import { generateUUID } from "../utils/common.utils";
import { USERS_SCRIPT } from "../scripts/users.script";

export const isUserAlreadyRegistered = async (
  req: Request
): Promise<isUserAlreadyRegisteredResultI> => {
  try {
    const user: any = req.user;
    const raw = JSON.parse(user?._raw);

    const isAlreadyRegistered: userAlreadyRegisteredDataI[] = await database(
      USERS_SCRIPT.USER.GET_USER_BY_EMAIL_AND_VERIFIED,
      [raw?.email, raw?.email_verified]
    );

    if (!isAlreadyRegistered.length) {
      return {
        status: false,
        data: null,
      };
    }
    return {
      status: true,
      data: isAlreadyRegistered[0],
    };
  } catch (error) {
    console.log("Error found:", {
      file_path: "auth.helpers.ts",
      method: "isUserAlreadyRegistered",
      message: error,
    });
  }
  return {
    status: false,
    data: null,
  };
};

export const signUserIn = async ({ user, res }: signUserInI) => {
  try {
    const validatedToken = validateToken({
      type: "refresh_token",
      token: user.refresh_token,
    });

    const accessToken = generateAccessToken({
      user_id: user.user_id,
      given_name: user.given_name,
      family_name: user.family_name,
      picture: user.picture,
    });

    const refreshToken =
      validatedToken?.status === JWT.STATUS.ERROR
        ? generateRefreshToken({
            user_id: user.user_id,
            given_name: user.given_name,
            family_name: user.family_name,
            picture: user.picture,
          }).data?.refreshToken
        : user.refresh_token;

    if (validatedToken?.status === JWT.STATUS.ERROR) {
      await database(USERS_SCRIPT.USER.UPDATE_USER_REFRESH_TOKEN, [
        refreshToken,
        user.user_id,
      ]);
    }

    // Used to development only to pass this in postman
    console.log("sign in refreshToken", refreshToken);
    // ------------------------------------------------
    generateCookie({
      res,
      value_name: `SMA-${JWT.NORMALIZE.ACCESS_TOKEN}`,
      value: accessToken?.data?.accessToken,
    });

    generateCookie({
      res,
      value_name: JWT.NORMALIZE.REFRESH_TOKEN,
      value: refreshToken,
      httpOnly: true,
    });

    return res.status(API.SIGNIN.CODE).redirect(`http://localhost:3000/`);
  } catch (error) {
    console.log("Error found:", {
      file_path: "auth.helpers.ts",
      method: "signUserIn",
      message: error,
    });
    return {
      status: false,
      data: null,
    };
  }
};

export const signUserUp = async ({ user, res }: signUserUpI) => {
  try {
    const user_id = generateUUID();
    const refreshTokenResult = generateRefreshToken({
      user_id,
      given_name: user.given_name,
      family_name: user.family_name,
      picture: user.picture,
    });
    const accessTokenResult = generateAccessToken({
      user_id,
      given_name: user.given_name,
      family_name: user.family_name,
      picture: user.picture,
    });
    const accessToken = accessTokenResult.data?.accessToken ?? null;
    const refreshToken = refreshTokenResult.data?.refreshToken ?? null;

    const result = await database(USERS_SCRIPT.USER.SIGN_UP_USER, [
      user_id,
      user.given_name,
      user.family_name,
      user.picture,
      user.email,
      user.email_verified,
      refreshToken,
    ]);

    if (result?.affectedRows <= 0) {
      return res.status(API.UNAUTHORIZED.CODE).send({
        ok: false,
        data: null,
        message: API.UNAUTHORIZED.MESSAGE,
      });
    }

    generateCookie({
      res,
      value_name: `SMA-${JWT.NORMALIZE.ACCESS_TOKEN}`,
      value: accessToken,
    });

    generateCookie({
      res,
      value_name: JWT.NORMALIZE.REFRESH_TOKEN,
      value: refreshToken,
      httpOnly: true,
    });

    // Used to development only to pass this in postman
    console.log("sign up refreshToken", refreshToken);
    // ------------------------------------------------
    return res.status(API.SIGNUP.CODE).redirect(`http://localhost:3000/`);
  } catch (error) {
    console.log("Error found:", {
      file_path: "auth.helpers.ts",
      method: "signUserUp",
      message: error,
    });
    return {
      status: false,
      data: null,
    };
  }
};
