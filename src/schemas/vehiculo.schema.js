import Joi from "joi";

export const vehiculoSchema = Joi.object({
  id: Joi.string()
    .length(6) 
    .regex(/^[A-Za-z0-9]+$/)
    .required()
    .messages({
      "string.base": "La placa debe ser un texto",
      "string.empty": "La placa no puede estar vacía",
      "string.length": "La placa debe tener exactamente 6 caracteres",
      "string.pattern.base": "La placa solo puede contener letras y números",
      "any.required": "La placa es obligatoria",
    }),

  parqueadero_id: Joi.number()
    .integer()
    .allow(null)
    .messages({
      "number.base": "El parqueadero_id debe ser un número o null",
    }),
});

export function validarVehiculo(req, res, next) {
  const { error } = vehiculoSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      mensajes: error.details.map((d) => d.message),
    });
  }

  next();
}
