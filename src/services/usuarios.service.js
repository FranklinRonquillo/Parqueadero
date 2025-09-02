import { Usuario } from "../models/usuario.js";

export const crearUsuarioService = async ({ nombre, usuario, pass }) => {
    
  const usuarioExistente = await Usuario.findOne({ where: { usuario } });

  if (usuarioExistente) {
    const error = new Error("El usuario ya existe");
    error.status = 400;
    throw error;
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
