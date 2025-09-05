import jwt from "jsonwebtoken";

import { AuthError, ForbiddenError } from "../utils/errors.js";

function asegurarSesion(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        throw new AuthError("No se pudo verificar la sesión");
      }
      req.usuario = decoded;
      next();
    });
  } else {
    throw new AuthError("No se encontro el token de autenticación");
  }
}

function soloAdmin(req, res, next) {
  if (req.usuario.rol !== "admin") {
    throw new ForbiddenError("Acceso denegado: solo administradores");
  }
  next();
}

function soloSocio(req, res, next) {
  if (req.usuario.rol !== "socio") {
    throw new ForbiddenError("Acceso denegado: solo socios");
  }
  next();
}

export { asegurarSesion, soloAdmin, soloSocio };
