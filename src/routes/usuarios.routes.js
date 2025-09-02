import Router from "express";
import {
  crearUsuario,
  obtenerUsuarios,
} from "../controller/usuarios.controller.js";

const router = Router();

router.post("/create", crearUsuario);

router.get("/get", obtenerUsuarios);

export default router;
