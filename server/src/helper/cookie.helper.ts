import { config } from "dotenv";
import { clearCookieI, generateCookieI } from "../utils/types/cookie.types";
config();

export const generateCookie = ({
  res,
  value_name,
  value,
  httpOnly = false,
}: generateCookieI) => {
  res.cookie(value_name, value, {
    httpOnly,
    secure: false,
    path: "/",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const clearCookie = ({ res, value_name }: clearCookieI) => {
  res.clearCookie(value_name, {
    httpOnly: true,
    secure: false,
    path: "/",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const getCookie = (cookie: any, name: string) => {
  let match = cookie?.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) return match[2];
  return null;
};
