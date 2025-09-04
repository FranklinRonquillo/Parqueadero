import jwt from "jsonwebtoken";

function asegurarSesion(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          mensaje: "No se pudo verificar la sesión",
        });
      }
      req.usuario = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      mensaje: "No se encontro el token de autenticación",
    });
  }
}

function soloAdmin(req, res, next) {
  if (req.usuario.rol !== "Admin") {
    return res.status(403).json({
      mensaje: "Acceso denegado: solo administradores",
    });
  }
  next();
}

function soloSocio(req, res, next) {
  if (req.usuario.rol !== "Socio") {
    return res.status(403).json({
      mensaje: "Acceso denegado: solo socios",
    });
  }
  next();
}

export {asegurarSesion, soloAdmin, soloSocio };