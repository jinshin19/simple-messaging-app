import { Response } from "express";

export interface generateCookieI {
  res: Response;
  value_name: string;
  value: string;
}

export interface clearCookieI {
  res: Response;
  value_name: string;
}
