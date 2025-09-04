import {
  crearUsuarioService,
  obtenerUsuariosService,
} from "../services/usuarios.service.js";

export const crearUsuario = async (req, res, next) => {
  try {
    const { nombre, usuario, pass } = req.body;
    const usuarioNuevo = await crearUsuarioService({ nombre, usuario, pass });

    res.status(201).json({
      mensaje: "Usuario creado correctamente",
      usuario: usuarioNuevo,
    });
  } catch (error) {
    next(error);
  }
};

export const obtenerUsuarios = async (res, next) => {
  try {
    const usuarios = await obtenerUsuariosService();

    res.status(200).json({
      mensaje: "Usuarios obtenidos correctamente",
      usuarios,
    });
  } catch (error) {
    next(error);
  }
};
