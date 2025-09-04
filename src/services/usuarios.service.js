import { Usuario } from "../models/usuario.js";
import { ConflictError } from "../utils/errors.js";

export const crearUsuarioService = async ({ nombre, usuario, pass }) => {
  
  const usuarioExistente = await Usuario.findOne({ where: { usuario } });

  if (usuarioExistente) {
    throw new ConflictError("El usuario ya existe");
  }

  const usuarioNuevo = await Usuario.create({
    nombre,
    usuario,
    pass,
    rol: "Socio",
  });

  return usuarioNuevo;
};

export const obtenerUsuariosService = async () => {
  const usuarios = await Usuario.findAll();
  return usuarios;
};
