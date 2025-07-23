import { Router } from "express";
import passport from "passport";
import { API } from "../constants/api.contants";
import {
  isUserAlreadyRegistered,
  signUserIn,
  signUserUp,
} from "../helper/auth.helper";
import {
  authenticatedGoogleUserI,
  isUserAlreadyRegisteredResultI,
} from "../utils/types/auth.types";
import { validateAuthorization } from "../controllers/auth.controller";

const router = Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:3000/signin",
  }),
  async (req, res) => {
    try {
      const user: any = req.user;
      const raw: authenticatedGoogleUserI = JSON.parse(user?._raw);

      const isUserExistedAlready: isUserAlreadyRegisteredResultI =
        await isUserAlreadyRegistered(req);

      if (isUserExistedAlready.status) {
        return await signUserIn({
          user: isUserExistedAlready.data!,
          res,
        });
      }

      return await signUserUp({ user: raw, req, res });
    } catch (error) {
      console.log("Error found:", {
        file_path: "auth.routes.ts",
        method: "auth/google/callback",
        message: error,
      });
      return res.status(API.SOMETHINGWENTWRONG.CODE).send({
        ok: false,
        data: null,
        message: API.SOMETHINGWENTWRONG.MESSAGE,
      });
    }
  }
);

router.get("/validate", validateAuthorization);

export default router;
