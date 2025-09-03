import Joi from "joi";

export const parqueaderoSchema = Joi.object({
  id: Joi.number()
    .integer()
    .min(1)
    .optional(), // porque es AUTO_INCREMENT

  usuario_id: Joi.number()
    .integer()
    .allow(null)
    .messages({
      "number.base": "El usuario_id debe ser un número o null"
    }),

  capacidad: Joi.number()
    .integer()
    .min(1)
    .max(99) // porque en la tabla está como int(2)
    .required()
    .messages({
      "number.base": "La capacidad debe ser un número",
      "number.min": "La capacidad debe ser al menos 1",
      "number.max": "La capacidad no puede superar 99",
      "any.required": "La capacidad es obligatoria"
    }),

  costo_hora: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      "number.base": "El costo_hora debe ser un número",
      "number.min": "El costo_hora no puede ser negativo",
      "any.required": "El costo_hora es obligatorio"
    }),
});

// Middleware genérico para validar parqueaderos
export function validarParqueadero(req, res, next) {
  const { error } = parqueaderoSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      error: true,
      mensajes: error.details.map(d => d.message)
    });
  }

  next();
}
