import { Usuario } from "../models/usuario.js";
import { ConflictError } from "../utils/errors.js";
import bcrypt from "bcrypt";

export const crearUsuarioService = async ({ nombre, usuario, pass }) => {
  const usuarioExistente = await Usuario.findOne({ where: { usuario } });

  if (usuarioExistente) {
    throw new ConflictError("El usuario ya existe");
  }

  const hashedPassword = await bcrypt.hash(pass, 10);

  const usuarioNuevo = await Usuario.create({
    nombre,
    usuario,
    pass: hashedPassword,
    rol: "socio",
  });

  return usuarioNuevo;
};

export const obtenerUsuariosService = async () => {
  const usuarios = await Usuario.findAll();
  return usuarios;
};
