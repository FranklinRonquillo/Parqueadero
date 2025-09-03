import { AppError } from "../utils/errors.js";

export function errorHandler(err, req, res, next) {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
  }

  // Errores inesperados
  res.status(500).json({
    success: false,
    error: "Error interno del servidor",
  });
}