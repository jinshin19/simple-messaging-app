import { config } from "dotenv";
import { generateCookieI } from "../utils/types/cookie.types";
config();

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
