import Router from "express";
import { login, logout } from "../controller/login.controller.js";

const router = Router();

router.post("/login", login);
router.post("/logout", logout);

export default router;