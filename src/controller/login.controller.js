import jwt from "jsonwebtoken";
import { Usuario } from "../models/usuario.js";

export const login = async (req, res) => {
  try {
    const { usuario, pass } = req.body;

    const usuarioLogeado = await Usuario.findOne({
      where: { usuario, pass },
    });

    if (!usuarioLogeado) {
      return res.status(401).json({
        error: true,
        mensaje: "Usuario o contraseña incorrectos",
      });
    }

    const token = jwt.sign(
      { id: usuarioLogeado.id, rol: usuarioLogeado.rol },
      "secret",
      { expiresIn: "6h" }
    );

    res.status(200).json({
      error: false,
      mensaje: "Usuario logueado correctamente",
      token,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al loguear el usuario",
      error,
    });
  }
};

export const logout = (req, res) => {
  res.status(200).json({
    error: false,
    mensaje: "Sesión cerrada.",
  });
};