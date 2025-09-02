import jwt from "jsonwebtoken";
import { Usuario } from "../models/usuario.js";

export const autenticarUsuario = async (usuario, pass) => {
  const usuarioLogeado = await Usuario.findOne({ where: { usuario, pass } });

  if (!usuarioLogeado) {
    const error = new Error("Usuario o contraseña incorrectos");
    error.status = 401;
    throw error;
  }
  // Generar token
  const token = jwt.sign(
  { id: usuario.id, email: usuario, rol: usuario.rol },
  process.env.JWT_SECRET,
  { expiresIn: "6h" }
);

  return { usuarioLogeado, token };
};