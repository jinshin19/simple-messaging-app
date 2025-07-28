import { Request, Response } from "express";
import { database } from "../database/database";
import { USERS_SCRIPT } from "../scripts/users.script";
import { API } from "../constants/api.contants";
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await database(USERS_SCRIPT.USER.GET_USERS, "");
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

export const getUser = async (req: Request, res: Response) => {
  try {
    const params = req.params;
    const user_id = params?.user_id ?? null;

    if (!user_id) {
      return res.status(API.NOT_FOUND.CODE).send({
        ok: true,
        data: null,
        message: API.NOT_FOUND.MESSAGE,
      });
    }

    const user = await database(USERS_SCRIPT.USER.GET_USER, user_id);

    if (user?.length <= 0) {
      return res.status(API.NOT_FOUND.CODE).send({
        ok: true,
        data: null,
        message: API.NOT_FOUND.MESSAGE,
      });
    }

    return res.status(API.GET.SUCCESS.CODE).send({
      ok: true,
      data: user[0],
      message: API.GET.SUCCESS.MESSAGE,
    });
  } catch (error) {
    console.log("Error found:", {
      file_path: "getUsers.controller.ts",
      method: "getUser",
      message: error,
    });
    return res.status(API.GET.ERROR.CODE).send({
      ok: false,
      data: null,
      message: API.GET.ERROR.MESSAGE,
    });
  }
};
