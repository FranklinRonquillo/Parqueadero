import Router from "express";
import {
  crearUsuario,
  obtenerUsuarios,
} from "../controller/usuarios.controller.js";
import { validarUsuario } from "../schemas/usuario.schema.js";

const router = Router();

router.post("/create", validarUsuario, crearUsuario);

router.get("/get", obtenerUsuarios);

export default router;
