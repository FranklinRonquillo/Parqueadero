import Joi from "joi";

export const usuarioSchema = Joi.object({
  id: Joi.number().integer().min(1).optional(), // porque es AUTO_INCREMENT
  nombre: Joi.string().max(35).required().messages({
    "string.base": "El nombre debe ser un texto",
    "string.empty": "El nombre no puede estar vacío",
    "string.max": "El nombre no puede superar los 35 caracteres",
    "any.required": "El nombre es obligatorio"
  }),
  usuario: Joi.string().email().max(35).required().messages({
    "string.base": "El usuario debe ser un texto",
    "string.empty": "El usuario no puede estar vacío",
    "string.email": "El usuario debe ser un correo válido",
    "string.max": "El usuario no puede superar los 35 caracteres",
    "any.required": "El usuario es obligatorio"
  }),
  pass: Joi.string().max(35).required().messages({
    "string.base": "La contraseña debe ser un texto",
    "string.empty": "La contraseña no puede estar vacía",
    "string.max": "La contraseña no puede superar los 35 caracteres",
    "any.required": "La contraseña es obligatoria"
  })
});

// Middleware genérico para validar usuarios
export function validarUsuario(req, res, next) {
  const { error } = usuarioSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      error: true,
      mensajes: error.details.map(d => d.message)
    });
  }

  next();
}
