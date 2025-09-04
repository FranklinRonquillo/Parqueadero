import { registrarIngresoService, registrarSalidaService } from "../services/entradas.service.js";

export const registrarIngreso = async (req, res, next) => {
  try {
    const { vehiculo_id, parqueadero_id } = req.body;

    const ingreso = await registrarIngresoService(vehiculo_id, parqueadero_id);

    return res.status(201).json({
      
      mensaje: "Ingreso registrado correctamente",
      ingreso,
    });
  } catch (err) {
    next(err);
  }
};

export const registrarSalida = async (req, res, next) => {
  try {
    const { vehiculo_id, parqueadero_id } = req.body;

    const { costo, horas } = await registrarSalidaService(vehiculo_id, parqueadero_id);

    return res.status(200).json({
      
      mensaje: "Salida registrada correctamente",
      costo,
      horas,
    });
  } catch (err) {
    next(err);
  }
};
