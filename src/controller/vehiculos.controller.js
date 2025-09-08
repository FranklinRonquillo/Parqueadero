import {
  crearVehiculoService,
  obtenerVehiculosService,
  obtenerVehiculosPorParqueaderoService,
} from "../services/vehiculos.service.js";

export const crearVehiculo = async (req, res, next) => {
  try {
    const { id } = req.body;

    const vehiculo = await crearVehiculoService({ id });

    res.status(201).json({
      mensaje: "Vehículo creado correctamente",
      vehiculo,
    });
  } catch (error) {
    next(error);
  }
};

export const obtenerVehiculos = async (req, res, next) => {
  try {
    const vehiculos = await obtenerVehiculosService();

    res.status(200).json({
      mensaje: "Vehículos obtenidos correctamente",
      vehiculos,
    });
  } catch (error) {
    next(error);
  }
};

export const obtenerVehiculosPorParqueadero = async (req, res, next) => {
  try {
    const { nombre } = req.params;

    if (!nombre) {
      return res.status(400).json({
        mensaje: "El parámetro 'id' del parqueadero es obligatorio",
      });
    }

    const vehiculosConEntrada = await obtenerVehiculosPorParqueaderoService(nombre);

    res.status(200).json({
      mensaje: "Vehículos obtenidos correctamente",
      vehiculos: vehiculosConEntrada,
    });
  } catch (error) {
    next(error);
  }
};
