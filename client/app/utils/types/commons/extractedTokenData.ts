import { JwtPayload } from "jwt-decode";

export interface extractedTokenDataI extends JwtPayload {
  user_id: string;
  given_name: string;
  family_name: string;
  picture: string;
}
