import Router from "express";
import {
  registrarIngreso,
  registrarSalida,
} from "../controller/entradas.controller.js";
import { validarEntrada } from "../schemas/entrada.schema.js";

const router = Router();

router.post("/registreIngreso", validarEntrada, registrarIngreso);

router.post("/registreSalida", validarEntrada, registrarSalida);

export default router;
