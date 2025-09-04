import { autenticarUsuario } from "../services/login.service.js";

import { BadRequestError } from "../utils/errors.js";

export const login = async (req, res, next) => {
  try {
    const { usuario, pass } = req.body;

    if (!usuario || !pass) {
      throw new BadRequestError("Faltan credenciales: usuario y contraseña son requeridos");
    }

    const { token } = await autenticarUsuario(usuario, pass);

    res.status(200).json({
      
      mensaje: "Usuario logueado correctamente",
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.status(200).json({
    
    mensaje: "Sesión cerrada.",
  });
};
