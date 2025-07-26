import { Router } from "express";
import { getUsers } from "../controllers/users.controller";

const router = Router();

router.get("/users", getUsers);

export default router;
