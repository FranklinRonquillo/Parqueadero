import { Parqueadero } from "../models/parqueadero.js";
import { Entrada } from "../models/entrada.js";
import { Vehiculo } from "../models/vehiculo.js";

export const crearParqueaderoService = async ({
  nombre,
  capacidad,
  costo_hora,
}) => {
  return await Parqueadero.create({ nombre, capacidad, costo_hora });
};

export const editarParqueaderoService = async ({
  id,
  nombre,
  capacidad,
  costo_hora,
}) => {
  const parqueadero = await Parqueadero.findByPk(id);

  if (!parqueadero) {
    const error = new Error("Parqueadero no encontrado");
    error.status = 404;
    throw error;
  }

  if (capacidad < parqueadero.capacidad) {

    const vehiculosOcupando = await Vehiculo.count({
      where: { parqueadero_id: id },
    });

    if (vehiculosOcupando > capacidad) {
      const error = new Error(
        `No se puede reducir la capacidad a ${capacidad}. Actualmente hay ${vehiculosOcupando} vehículos dentro.`
      );
      error.status = 400;
      throw error;
    }
  }

  await parqueadero.update({ nombre, capacidad, costo_hora });
  return parqueadero;
};

export const eliminarParqueaderoService = async (id, habilitado) => {
  const parqueadero = await Parqueadero.findByPk(id);

  if (!parqueadero) {
    const error = new Error("Parqueadero no encontrado");
    error.status = 404;
    throw error;
  }

  if (habilitado==="1") {
    await parqueadero.update({ habilitado: true });
  } else {
    await parqueadero.update({ habilitado: false });
  }

  return parqueadero;
};


export const obtenerParqueaderosService = async () => {
  return await Parqueadero.findAll();
};

export const agregarSocioService = async ({ id, usuario_id }) => {
  const parqueadero = await Parqueadero.findByPk(id);
  if (!parqueadero) {
    const error = new Error("Parqueadero no encontrado");
    error.status = 404;
    throw error;
  }

  await parqueadero.update({ usuario_id });
  return parqueadero;
};

export const listarParqueaderosSocioService = async (socioId) => {
  return await Parqueadero.findAll({ where: { usuario_id: socioId, habilitado: true } });
};

export const listarVehiculosDeParqueaderoService = async ({
  socioId,
  parqueadero_id,
}) => {
  const parqueadero = await Parqueadero.findOne({
    where: { id: parqueadero_id, usuario_id: socioId },
  });

  if (!parqueadero) {
    const error = new Error("No tienes acceso a este parqueadero");
    error.status = 403;
    throw error;
  }

  const entradas = await Entrada.findAll({
    where: { parqueadero_id, horaSalida: null },
    include: [{ model: Vehiculo, as: "vehiculo" }],
  });

  return entradas.map((e) => ({
    id: e.vehiculo.id,
    placa: e.vehiculo.placa,
    tipo: e.vehiculo.tipo,
    horaEntrada: e.horaEntrada,
  }));
};
