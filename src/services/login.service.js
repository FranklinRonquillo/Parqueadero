import jwt from "jsonwebtoken";
import { Usuario } from "../models/usuario.js";

import { AuthError } from "../utils/errors.js";

export const autenticarUsuario = async (usuario, pass) => {
  const usuarioLogeado = await Usuario.findOne({ where: { usuario, pass } });

  if (!usuarioLogeado) {
    throw new AuthError("Usuario o contraseña incorrectos");
  }

  const token = jwt.sign(
    { 
      id: usuarioLogeado.id, 
      email: usuarioLogeado.usuario, 
      rol: usuarioLogeado.rol 
    },
    process.env.JWT_SECRET,
    { expiresIn: "6h" }
  );

  return { usuarioLogeado, token };
};
