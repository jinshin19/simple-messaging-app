import { jwtDecode } from "jwt-decode";
import { extractedTokenDataI } from "../types/commons/extractedTokenData";

export const extractedTokenData = (
  token: string | null
): extractedTokenDataI | null => {
  if (!token) {
    return null;
  }
  const decoded: extractedTokenDataI = jwtDecode(token);
  return decoded;
};
