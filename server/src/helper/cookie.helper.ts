import { config } from "dotenv";
import { generateCookieI } from "../utils/types/cookie.types";
config();

export const generateCookie = ({ res, value_name, value }: generateCookieI) => {
  res.cookie(value_name, value, {
    httpOnly: true,
    secure: false,
    path: "/",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
