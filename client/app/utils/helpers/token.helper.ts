import { jwtDecode } from "jwt-decode";

interface jwtPayload {
  user_id: string | null;
  exp: number;
  iat: number;
}

export const extractedTokenData = (token: string | null): string | null => {
  if (!token) {
    return null;
  }
  const decoded: jwtPayload = jwtDecode(token);
  return decoded.user_id;
};
