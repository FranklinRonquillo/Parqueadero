import Joi from "joi";

export const vehiculoSchema = Joi.object({
  id: Joi.string()
    .length(6) // exactamente 6 caracteres
    .regex(/^[A-Za-z0-9]+$/) // solo letras y números
    .required()
    .messages({
      "string.base": "La placa debe ser un texto",
      "string.empty": "La placa no puede estar vacía",
      "string.length": "La placa debe tener exactamente 6 caracteres",
      "string.pattern.base": "La placa solo puede contener letras y números",
      "any.required": "La placa es obligatoria",
    }),

  usuario_id: Joi.number().integer().required().messages({
    "number.base": "El usuario_id debe ser un número",
    "any.required": "El usuario_id es obligatorio",
  }),

  parqueadero_id: Joi.number()
    .integer()
    .allow(null) // porque en la tabla puede ser NULL
    .messages({
      "number.base": "El parqueadero_id debe ser un número o null",
    }),
});

// Middleware genérico para validar vehículos
export function validarVehiculo(req, res, next) {
  const { error } = vehiculoSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      mensajes: error.details.map((d) => d.message),
    });
  }

  next();
}
