import Joi from "joi";

export const entradaSchema = Joi.object({
  id: Joi.number().integer().optional(), // auto_increment, no se pasa al crear

  vehiculo_id: Joi.string().length(6).alphanum().required().messages({
    "string.base": "El vehiculo_id debe ser texto",
    "string.length": "La placa debe tener exactamente 6 caracteres",
    "string.alphanum": "La placa solo puede contener letras y números",
    "any.required": "El vehiculo_id es obligatorio",
  }),

  parqueadero_id: Joi.number().integer().required().messages({
    "number.base": "El parqueadero_id debe ser un número",
    "any.required": "El parqueadero_id es obligatorio",
  }),

  horaEntrada: Joi.date().iso().optional().messages({
    "date.base": "La horaEntrada debe ser una fecha válida en formato ISO",
  }),

  horaSalida: Joi.date().iso().allow(null).optional().messages({
    "date.base": "La horaSalida debe ser una fecha válida en formato ISO",
  }),

  costo: Joi.number().integer().min(0).allow(null).optional().messages({
    "number.base": "El costo debe ser un número",
    "number.min": "El costo no puede ser negativo",
  }),
});

// Middleware de validación
export function validarEntrada(req, res, next) {
  const { error } = entradaSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      mensajes: error.details.map((d) => d.message),
    });
  }

  next();
}
