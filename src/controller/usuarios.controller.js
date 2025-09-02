import {
  crearUsuarioService,
  obtenerUsuariosService,
} from "../services/usuarios.service.js";

export const crearUsuario = async (req, res) => {
  try {
    const { nombre, usuario, pass } = req.body;

    if (!nombre || !usuario || !pass) {
      return res.status(400).json({
        error: true,
        mensaje: "Faltan datos: nombre, usuario y contraseña son obligatorios",
      });
    }

    const usuarioNuevo = await crearUsuarioService({ nombre, usuario, pass });

    res.status(201).json({
      error: false,
      mensaje: "Usuario creado correctamente",
      usuario: usuarioNuevo,
    });
  } catch (error) {
    console.error("Error en crearUsuario:", error);

    res.status(error.status || 500).json({
      error: true,
      mensaje: error.message || "Error interno al crear el usuario",
    });
  }
};

export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await obtenerUsuariosService();

    res.status(200).json({
      error: false,
      mensaje: "Usuarios obtenidos correctamente",
      usuarios,
    });
  } catch (error) {
    console.error("Error en obtenerUsuarios:", error);

    res.status(error.status || 500).json({
      error: true,
      mensaje: error.message || "Error interno al obtener los usuarios",
    });
  }
};
