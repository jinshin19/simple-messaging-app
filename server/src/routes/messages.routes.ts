import { Router } from "express";
import {
  createMessage,
  getMessage,
  getMessages,
} from "../controllers/messages.controller";

const router = Router();

router.get("/conversations", getMessages);
router.get("/conversations/:receiver_id", getMessage);
router.post("/conversations", createMessage);

export default router;
