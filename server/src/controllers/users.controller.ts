import { Request, Response } from "express";
import { database } from "../database/database";
import { SCRIPTS } from "../scripts/users.script";
import { API } from "../constants/api.contants";
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await database(SCRIPTS.USER.GET_USERS, "");
    return res.status(API.GET.SUCCESS.CODE).send({
      ok: true,
      data: users,
      message: API.GET.SUCCESS.MESSAGE,
    });
  } catch (error) {
    console.log("Error found:", {
      file_path: "getUsers.controller.ts",
      method: "getUsers",
      message: error,
    });
    return res.status(API.GET.ERROR.CODE).send({
      ok: false,
      data: null,
      message: API.GET.ERROR.MESSAGE,
    });
  }
};
