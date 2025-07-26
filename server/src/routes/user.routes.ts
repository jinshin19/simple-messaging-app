import { Router } from "express";
import { getUsers } from "../controllers/users.controller";
import { logout } from "../controllers/auth.controller";

const router = Router();

router.get("/users/logout", logout);
router.get("/users", getUsers);

export default router;
