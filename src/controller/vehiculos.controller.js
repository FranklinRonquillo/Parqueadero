import { Vehiculo } from "../models/vehiculo.js";
import { Entrada } from "../models/entrada.js";

export const crearVehiculo = async (req, res) => {
  try {
    const { id, usuario_id } = req.body;

    if (!id || id.length !== 6 || !/^[A-Za-z0-9]+$/.test(id)) {
      return res.status(400).json({
        mensaje: "La placa del vehículo debe tener 6 caracteres alfanuméricos",
      });
    }

    const vehiculo = await Vehiculo.create({
      id,
      usuario_id,
    });
    res.status(200).json({
      error: false,
      mensaje: "vehiculo creado correctamente",
      vehiculo,
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

export const obtenerVehiculosPorParqueadero = async (req, res) => {
  try {
    const { id } = req.params;

    const vehiculos = await Vehiculo.findAll({
      where: {
        parqueadero_id: id,
      },
    });

    const entrada = await Entrada.findAll({
      where: {
        vehiculo_id: vehiculos.map((vehiculo) => vehiculo.id),
        horaSalida: null,
      },
    });

    // nuevo array con el id de los vehiculos y la horaEntrada

    const vehiculosConEntrada = vehiculos.map((vehiculo) => {
      const entradaVehiculo = entrada.find(
        (e) => e.vehiculo_id === vehiculo.id
      );

      return {
        placa: vehiculo.id,
        horaEntrada: entradaVehiculo ? entradaVehiculo.horaEntrada : null,
      };
    });

    res.status(200).json({
      error: false,
      mensaje: "vehiculos obtenidos correctamente",
      vehiculosConEntrada,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los vehiculos",
      error,
    });
    return;
  }
};
