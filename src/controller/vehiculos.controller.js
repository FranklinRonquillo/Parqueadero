import { Vehiculo } from "../models/vehiculo.js";

export const crearVehiculo = async (req, res) => {
  try {
    const { usuario_id } = req.body;
    const vehiculoNuevo = await Vehiculo.create({
      usuario_id,
    });
    res.status(200).json({
      error: false,
      mensaje: "Vehiculo creado correctamente",
      vehiculo: vehiculoNuevo,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear el vehiculo",
      error,
    });
    return;
  }
};

export const obtenerVehiculos = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.findAll();

    res.status(200).json({
      error: false,
      mensaje: "vehiculos obtenidos correctamente",
      vehiculos,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los vehiculos",
      error,
    });
    return;
  }
};
