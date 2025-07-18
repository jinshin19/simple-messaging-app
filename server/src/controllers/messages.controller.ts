import { Request, Response } from "express";
import { database } from "../database/database";
import { extractTokenData, getAccessToken } from "../helper/helper";

export const getMessages = async (req: Request, res: Response) => {
  try {
    const result = await database("select * from messages", "");
    return res.status(200).send({
      ok: true,
      data: result,
      message: "Fetched sucessfully",
    });
  } catch (error) {
    console.log("Error found:", {
      file_path: "messages.controller.ts",
      method: "getMessages",
      message: error,
    });
    return res.status(400).send({
      ok: false,
      data: null,
      message: "Failed to fetch data",
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
      `
            select
             messages.id as message_id,
             messages.sender_id as sender_id,
             messages.receiver_id as receiver_id,
             sender.given_name as sender_name,
             receiver.given_name as receiver_name,
             messages.message as message
            from messages 
            join users sender on messages.sender_id = sender.user_id
            join users receiver on messages.receiver_id = receiver.user_id 
            where (messages.sender_id = ? and messages.receiver_id = ?) 
            or (messages.sender_id = ? and messages.receiver_id = ?)
        `,
      [sender_id, receiver_id, receiver_id, sender_id]
    );

    return res.status(200).send({
      ok: true,
      data: conversation,
      message: "Fetched sucessfully",
    });
  } catch (error) {
    console.log("Error found:", {
      file_path: "messages.controller.ts",
      method: "getMessage",
      message: error,
    });
    return res.status(400).send({
      ok: false,
      data: null,
      message: "Failed to fetch data",
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

    const result = await database(
      `
            insert into messages (sender_id, receiver_id, message)
            values (?, ? , ?)
        `,
      [sender_id, body?.receiver_id, body?.message]
    );

    if (result?.affectedRows <= 0) {
      return res.status(400).send({
        ok: false,
        data: null,
        message: "Failed to send the message",
      });
    }

    return res.status(200).send({
      ok: true,
      data: null,
      message: "Sent sucessfully",
    });
  } catch (error) {
    console.log("Error found:", {
      file_path: "messages.controller.ts",
      method: "getMessage",
      message: error,
    });
    return res.status(400).send({
      ok: false,
      data: null,
      message: "Failed to send the message",
    });
  }
};

interface createMessageI {
  receiver_id: string;
  message: string;
}
