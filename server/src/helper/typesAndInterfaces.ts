export type token_typeT = "access_token" | "refresh_token";
export type status_typeT = "success" | "error";
export enum token_type_enum {
  ACCESS_TOKEN = "access_token",
  REFRESH_TOKEN = "refresh_token",
}
export enum status_type_enum {
  SUCCESS = "success",
  ERROR = "error",
}

export interface CustomTokenSuccessParameterI<T> {
  type: token_typeT;
  data?: T;
  forSignData?: T;
  message?: string | null;
}

export interface CustomTokenResponseI {
  status: status_typeT | null;
  token_type: token_typeT | null;
  data: any | null;
  forSignData: any | null;
  message: string | null;
}

export interface validateTokenI {
  type: token_typeT;
  token: string;
}

export interface extractTokenDataI {
  token: string;
}

export interface validateTokensI {
  accessToken: string | null | undefined;
  refreshToken: string | null | undefined;
}

export interface generateCookieI {
  res: any;
  value_name: string;
  value: string;
  maxAge: string | number | null;
}

export interface tokenResult {
  user_id: string;
  iat: number;
  exp: number;
}
