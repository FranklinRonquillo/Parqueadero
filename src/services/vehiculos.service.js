import { Vehiculo } from "../models/vehiculo.js";
import { Entrada } from "../models/entrada.js";

export const crearVehiculoService = async ({ id, usuario_id }) => {

  if (!id || id.length !== 6 || !/^[A-Za-z0-9]+$/.test(id)) {
    const error = new Error("La placa debe tener 6 caracteres alfanuméricos");
    error.status = 400;
    throw error;
  }

  const vehiculoExistente = await Vehiculo.findOne({ where: { id } });
  if (vehiculoExistente) {
    const error = new Error("Esta placa ya está registrada");
    error.status = 400;
    throw error;
  }

  return await Vehiculo.create({ id, usuario_id });
};

export const obtenerVehiculosService = async () => {
  return await Vehiculo.findAll();
};

export const obtenerVehiculosPorParqueaderoService = async (parqueadero_id) => {
  const vehiculos = await Vehiculo.findAll({
    where: { parqueadero_id },
  });

  if (!vehiculos.length) {
    return [];
  }

  const entradas = await Entrada.findAll({
    where: {
      vehiculo_id: vehiculos.map((v) => v.id),
      horaSalida: null,
    },
  });

  return vehiculos.map((vehiculo) => {
    const entradaVehiculo = entradas.find(
      (e) => e.vehiculo_id === vehiculo.id
    );
    return {
      placa: vehiculo.id,
      horaEntrada: entradaVehiculo ? entradaVehiculo.horaEntrada : null,
    };
  });
};
