import { config } from "dotenv";
import { JWT } from "../constants/constants";
import {
  CustomTokenResponseI,
  CustomTokenSuccessParameterI,
  status_type_enum,
} from "./types/token.types";
config();

export const customTokenSuccess = <T>({
  type,
  data,
  message,
  forSignData,
}: CustomTokenSuccessParameterI<T>): CustomTokenResponseI => {
  const token =
    type === JWT.TYPE.ACCESS_TOKEN
      ? {
          accessToken: data,
        }
      : {
          refreshToken: data,
        };

  return {
    status: status_type_enum.SUCCESS,
    token_type: type ?? null,
    data: token ?? null,
    forSignData: forSignData ?? null,
    message: message ?? null,
  };
};
export const customTokenError = (message?: string): CustomTokenResponseI => {
  return {
    status: status_type_enum.ERROR,
    token_type: null,
    data: null,
    forSignData: null,
    message: message ?? null,
  };
};
