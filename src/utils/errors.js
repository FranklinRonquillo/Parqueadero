class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Para distinguir errores esperados de errores internos
  }
}

class ValidationError extends AppError {
  constructor(message = "Error de validación") {
    super(message, 400);
  }
}

class NotFoundError extends AppError {
  constructor(message = "Recurso no encontrado") {
    super(message, 404);
  }
}

class AuthError extends AppError {
  constructor(message = "No autorizado") {
    super(message, 401);
  }
}

class ConflictError extends AppError {
  constructor(message = "Conflicto en la operación") {
    super(message, 409);
  }
}

class ForbiddenError extends AppError {
  constructor(message = "Acceso prohibido") {
    super(message, 403);
  }
}

class DatabaseError extends AppError {
  constructor(message = "Error en la base de datos") {
    super(message, 503);
  }
}

class BadRequestError extends AppError {
  constructor(message = "Solicitud inválida") {
    super(message, 400);
  }
}

class TimeoutError extends AppError {
  constructor(message = "Tiempo de espera agotado") {
    super(message, 408);
  }
}



export { AppError, ValidationError, NotFoundError, AuthError, ConflictError, ForbiddenError, DatabaseError, BadRequestError, TimeoutError };
