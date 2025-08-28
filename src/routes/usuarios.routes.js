import Router from "express";
import {
  crearUsuario,
  obtenerUsuarios,
} from "../controller/usuarios.controller.js";

const usuariosRoutes = Router();

usuariosRoutes.get("/", (req, res) => {
  res.send("Usuarios");
});

//crear usuario solo si tienes el rol admin
usuariosRoutes.post("/create", crearUsuario);

//obtener usuarios
usuariosRoutes.get("/get", obtenerUsuarios);

export default usuariosRoutes;
