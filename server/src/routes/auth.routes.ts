import { Router } from "express";
import passport from "passport";
import { database } from "../database/database";
import { v4 as uuid } from "uuid";
import { validateAuthorization } from "../controllers/auth.controller";
import {
  generateAccessToken,
  generateCookie,
  generateRefreshToken,
} from "../helper/helper";
import { JWT } from "../constants/constants";

const router = Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  async (req, res) => {
    try {
      const user: any = req.user;
      const raw = JSON.parse(user?._raw);
      const refreshTokenResult = generateRefreshToken({
        email: raw?.email,
      });
      const accessTokenResult = generateAccessToken({
        email: raw?.email,
      });
      const accessToken = accessTokenResult.data?.accessToken ?? null;
      const refreshToken = refreshTokenResult.data?.refreshToken ?? null;

      const result = await database(
        "insert into users (user_id, given_name, family_name, picture, email, is_verified, refresh_token) values (?, ?, ?, ?, ?, ?, ?)",
        [
          uuid(),
          raw?.given_name,
          raw?.family_name,
          raw?.picture,
          raw?.email,
          raw?.is_verified,
          refreshToken,
        ]
      );

      if (result?.affectedRows <= 0) {
        return res.status(400).send({
          ok: false,
          data: null,
          message: "Failed to signin",
        });
      }

      generateCookie({
        res,
        value_name: JWT.NORMALIZE.REFRESH_TOKEN,
        value: refreshToken,
        maxAge: process.env.SIMPLE_MESSAGING_APP_COOKIE_EXPIRY ?? null,
      });

      // Used to development only to pass this in postman
      console.log("refreshToken", refreshToken);
      // ------------------------------------------------

      return res.status(200).send({
        ok: true,
        data: {
          accessToken,
        },
        message: "Signed in successfully",
      });
    } catch (error) {
      console.log("Error found:", {
        file_path: "auth.routes.js",
        method: "auth/google/callback",
        message: error,
      });
      return res.status(400).send({
        ok: false,
        data: null,
        message: "Failed to sign-in email might be used already",
      });
    }
  }
);

router.get("/auth/validate/tokens", validateAuthorization);

export default router;
