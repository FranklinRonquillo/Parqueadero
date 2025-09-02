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
    { id: usuarioLogeado.id, rol: usuarioLogeado.rol },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "6h" }
  );

  return { usuarioLogeado, token };
};