import { Request, Response } from "express";

export interface authenticatedGoogleUserI {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture?: string;
  email: string;
  email_verified: boolean;
}

export interface userAlreadyRegisteredDataI {
  id: number;
  user_id: string;
  given_name: string;
  family_name: string;
  picture?: string;
  email: string;
  is_verified: boolean;
  refresh_token: string;
}

export interface isUserAlreadyRegisteredResultI {
  status: boolean;
  data: userAlreadyRegisteredDataI | null;
}

export interface signUserInI {
  user: userAlreadyRegisteredDataI;
  res: Response;
}

export interface signUserUpI {
  user: authenticatedGoogleUserI;
  req: Request;
  res: Response;
}
