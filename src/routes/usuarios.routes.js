import Router from "express";
import { Usuario } from "../models/usuario.js";

const usuariosRoutes = Router();

usuariosRoutes.get("/", (req, res) => {
    res.send("Usuarios");
});

//crear usuario solo si tienes el rol admin

usuariosRoutes.post("/create", async (req, res) => {
  try {
    const { nombre, usuario, pass} = req.body;

    const usuarioNuevo = await Usuario.create({
      nombre,
      usuario,
      pass,
      rol:"Socio",
    });

    res.status(200).json({
      error: false,
      mensaje: "Usuario creado correctamente",
      usuario: usuarioNuevo,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear el usuario",
      error,
    });
    return;
  } 
});

//obtener usuarios
usuariosRoutes.get("/get",async (req, res) => {
    try {
    const usuarios = await Usuario.findAll();

    res.status(200).json({
      error: false,
      mensaje: "usuarios obtenidos correctamente",
      usuarios,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los usuarios",
      error,
    });
    return;
  }
});

export default usuariosRoutes;