import { registrarIngresoService, registrarSalidaService } from "../services/entradas.service.js";

export const registrarIngreso = async (req, res) => {
  try {
    const { vehiculo_id, parqueadero_id } = req.body;

    const ingreso = await registrarIngresoService(vehiculo_id, parqueadero_id);

    return res.status(201).json({
      
      mensaje: "Ingreso registrado correctamente",
      ingreso,
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      tipo: err.tipo || "ErrorServidor",
      mensaje: err.mensaje || "Error al registrar el ingreso",
    });
  }
};

export const registrarSalida = async (req, res) => {
  try {
    const { vehiculo_id, parqueadero_id } = req.body;

    const { costo, horas } = await registrarSalidaService(vehiculo_id, parqueadero_id);

    return res.status(200).json({
      
      mensaje: "Salida registrada correctamente",
      costo,
      horas,
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      tipo: err.tipo || "ErrorServidor",
      mensaje: err.mensaje || "Error al registrar la salida",
    });
  }
};
