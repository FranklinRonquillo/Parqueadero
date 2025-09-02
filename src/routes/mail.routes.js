
import { Router } from "express";

import { notificarUsuario } from "../controller/mail.controller.js";

const router = Router();

router.post("/", notificarUsuario);

export default router;