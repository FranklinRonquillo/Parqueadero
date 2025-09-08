import { Vehiculo } from "../models/vehiculo.js";
import { Entrada } from "../models/entrada.js";
import { Parqueadero } from "../models/parqueadero.js";
import { ConflictError, NotFoundError } from "../utils/errors.js";

export const crearVehiculoService = async ({ id }) => {
  const vehiculoExistente = await Vehiculo.findOne({ where: { id } });

  if (vehiculoExistente) {
    throw new ConflictError("Esta placa ya está registrada");
  }

  return await Vehiculo.create({ id });
};

export const obtenerVehiculosService = async () => {
  return await Vehiculo.findAll();
};

export const obtenerVehiculosPorParqueaderoService = async (nombre) => {
  const parqueadero = await Parqueadero.findOne({ where: { nombre } });
  if (!parqueadero) {
    throw new NotFoundError("No existe el parqueadero");
  }

  const vehiculos = await Vehiculo.findAll({
    where: { parqueadero_id: parqueadero.id },
  });

  if (!vehiculos.length) {
    return "No hay vehículos registrados en este parqueadero";
  }

  const entradas = await Entrada.findAll({
    where: {
      vehiculo_id: vehiculos.map((v) => v.id),
      horaSalida: null,
    },
  });

  return vehiculos.map((vehiculo) => {
    const entradaVehiculo = entradas.find((e) => e.vehiculo_id === vehiculo.id);
    return {
      placa: vehiculo.id,
      horaEntrada: entradaVehiculo ? entradaVehiculo.horaEntrada : null,
    };
  });
};
