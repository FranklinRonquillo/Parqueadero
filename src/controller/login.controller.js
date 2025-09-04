import { autenticarUsuario } from "../services/login.service.js";

export const login = async (req, res) => {
  try {
    const { usuario, pass } = req.body;

    if (!usuario || !pass) {
      return res.status(400).json({
        mensaje: "Faltan credenciales: usuario y contraseña son requeridos",
      });
    }

    const { token } = await autenticarUsuario(usuario, pass);

    res.status(200).json({
      
      mensaje: "Usuario logueado correctamente",
      token,
    });
  } catch (error) {
    console.error("Error en login:", error);

    res.status(error.status || 500).json({
      mensaje: error.message || "Error interno del servidor",
    });
  }
};

export const logout = (req, res) => {
  res.status(200).json({
    
    mensaje: "Sesión cerrada.",
  });
};
