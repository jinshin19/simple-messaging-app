import { Request, Response } from "express";
import { database } from "../database/database";
import { extractTokenData, getAccessToken } from "../helper/token.helper";
import { API } from "../constants/api.contants";
import { SCRIPTS } from "../scripts/users.script";

export const getMessages = async (req: Request, res: Response) => {
  try {
    const result = await database(SCRIPTS.MESSAGE.GET_ALL_MESSAGES, "");
    return res.status(API.GET.SUCCESS.CODE).send({
      ok: true,
      data: result,
      message: API.GET.SUCCESS.MESSAGE,
    });
  } catch (error) {
    console.log("Error found:", {
      file_path: "messages.controller.ts",
      method: "getMessages",
      message: error,
    });
    return res.status(API.GET.ERROR.CODE).send({
      ok: false,
      data: null,
      message: API.GET.ERROR.MESSAGE,
    });
  }
};

export const getMessage = async (req: Request, res: Response) => {
  try {
    const params = req.params;
    const receiver_id = params?.receiver_id ?? null;

    const accessToken = getAccessToken(req);
    const extractedTokenData = extractTokenData({
      token: accessToken as string,
    });
    const sender_id = extractedTokenData?.user_id ?? null;

    const conversation = await database(
      SCRIPTS.MESSAGE.GET_ONE_ON_ONE_CONVERSATION,
      [sender_id, receiver_id, receiver_id, sender_id]
    );

    return res.status(API.GET.SUCCESS.CODE).send({
      ok: true,
      data: conversation,
      message: API.GET.SUCCESS.MESSAGE,
    });
  } catch (error) {
    console.log("Error found:", {
      file_path: "messages.controller.ts",
      method: "getMessage",
      message: error,
    });
    return res.status(API.GET.ERROR.CODE).send({
      ok: false,
      data: null,
      message: API.GET.ERROR.MESSAGE,
    });
  }
};

export const createMessage = async (req: Request, res: Response) => {
  try {
    const accessToken = getAccessToken(req);
    const extractedTokenData = extractTokenData({
      token: accessToken as string,
    });
    const sender_id = extractedTokenData?.user_id ?? null;
    const body: createMessageI = req.body;

    const result = await database(SCRIPTS.MESSAGE.SEND_MESSAGE, [
      sender_id,
      body?.receiver_id,
      body?.message,
    ]);

    if (result?.affectedRows <= 0) {
      return res.status(API.POST.ERROR.CODE).send({
        ok: false,
        data: null,
        message: API.POST.ERROR.MESSAGE,
      });
    }

    return res.status(API.POST.SUCCESS.CODE).send({
      ok: true,
      data: null,
      message: API.POST.SUCCESS.MESSAGE,
    });
  } catch (error) {
    console.log("Error found:", {
      file_path: "messages.controller.ts",
      method: "getMessage",
      message: error,
    });
    return res.status(API.POST.ERROR.CODE).send({
      ok: false,
      data: null,
      message: API.POST.ERROR.MESSAGE,
    });
  }
};

interface createMessageI {
  receiver_id: string;
  message: string;
}
