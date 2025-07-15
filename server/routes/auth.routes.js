import { Router } from "express";
import passport from "passport";
import { database } from "../database/database.js";
import { v4 as uuid } from "uuid";

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
      const user = req.user;
      const raw = JSON.parse(user?._raw);

      const result = await database(
        "insert into users (user_id, given_name, family_name, picture, email, is_verified, refresh_token) values (?, ?, ?, ?, ?, ?, ?)",
        [
          uuid(),
          raw?.given_name,
          raw?.family_name,
          raw?.picture,
          raw?.email,
          raw?.is_verified,
          "dawdadadasw",
        ]
      );

      if (result?.affectedRows <= 0) {
        return res.status(400).send({
          ok: false,
          data: null,
          message: "Failed to signin",
        });
      }

      res.status(200).send({
        ok: true,
        data: null,
        message: "Signed in successfully",
      });
    } catch (error) {
      console.log("Error found:", {
        file_path: "auth.routes.js",
        message: error,
      });
    }
  }
);

export default router;
