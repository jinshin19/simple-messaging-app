import { Router } from "express";
import { getUser, getUsers } from "../controllers/users.controller";
import { logout } from "../controllers/auth.controller";

const router = Router();

router.get("/users/logout", logout);
router.get("/users", getUsers);
router.get("/users/:user_id", getUser);

export default router;
