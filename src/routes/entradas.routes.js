import Router from "express";
import {
  registrarIngreso,
  registrarSalida,
} from "../controller/entradas.controller.js";

const router = Router();

router.post("/registreIngreso", registrarIngreso);

router.post("/registreSalida", registrarSalida);

export default router;
