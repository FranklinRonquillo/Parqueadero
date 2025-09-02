import { registrarIngresoService, registrarSalidaService } from "../services/entradas.service.js";

export const registrarIngreso = async (req, res) => {
  try {
    const { vehiculo_id, parqueadero_id } = req.body;

    if (!vehiculo_id || !parqueadero_id) {
      return res.status(400).json({
        error: true,
        tipo: "DatosInvalidos",
        mensaje: "Se requieren 'vehiculo_id' y 'parqueadero_id'",
      });
    }

    const ingreso = await registrarIngresoService(vehiculo_id, parqueadero_id);

    return res.status(201).json({
      error: false,
      mensaje: "Ingreso registrado correctamente",
      ingreso,
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      error: true,
      tipo: err.tipo || "ErrorServidor",
      mensaje: err.mensaje || "Error al registrar el ingreso",
    });
  }
};

export const registrarSalida = async (req, res) => {
  try {
    const { vehiculo_id, parqueadero_id } = req.body;

    if (!vehiculo_id || !parqueadero_id) {
      return res.status(400).json({
        error: true,
        tipo: "DatosInvalidos",
        mensaje: "Se requieren 'vehiculo_id' y 'parqueadero_id'",
      });
    }

    const { costo, horas } = await registrarSalidaService(vehiculo_id, parqueadero_id);

    return res.status(200).json({
      error: false,
      mensaje: "Salida registrada correctamente",
      costo,
      horas,
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      error: true,
      tipo: err.tipo || "ErrorServidor",
      mensaje: err.mensaje || "Error al registrar la salida",
    });
  }
};
