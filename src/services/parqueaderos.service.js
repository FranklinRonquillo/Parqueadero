import { Parqueadero } from "../models/parqueadero.js";
import { Entrada } from "../models/entrada.js";
import { Vehiculo } from "../models/vehiculo.js";
import { Usuario } from "../models/usuario.js";
import {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} from "../utils/errors.js";

export const crearParqueaderoService = async ({
  nombre,
  capacidad,
  costo_hora,
}) => {
  const parqueadero = await Parqueadero.findOne({ where: { nombre } });
  if (parqueadero) {
    throw new BadRequestError("El parqueadero ya existe");
  }
  return await Parqueadero.create({ nombre, capacidad, costo_hora });
};

export const editarParqueaderoService = async ({
  nombreParam,
  nombre,
  capacidad,
  costo_hora,
}) => {
  const parqueadero = await Parqueadero.findOne({ where: { nombre:nombreParam } });

  if (!parqueadero) {
    throw new NotFoundError("Parqueadero no encontrado");
  }

  if (nombre && nombre !== parqueadero.nombre) {
    const existente = await Parqueadero.findOne({ where: { nombre } });
    if (existente) {
      throw new BadRequestError("Ya existe otro parqueadero con ese nombre");
    }
  }

  if (capacidad && capacidad < parqueadero.capacidad) {
    const vehiculosOcupando = await Vehiculo.count({
      where: { parqueadero_id: parqueadero.id },
    });

    if (vehiculosOcupando > capacidad) {
      throw new BadRequestError(
        `No se puede reducir la capacidad a ${capacidad}. Actualmente hay ${vehiculosOcupando} vehículos dentro.`
      );
    }
  }

  parqueadero.nombre = nombre || parqueadero.nombre;
  parqueadero.capacidad = capacidad || parqueadero.capacidad;
  parqueadero.costo_hora = costo_hora || parqueadero.costo_hora;

  await parqueadero.save();

  return parqueadero;
};


export const eliminarParqueaderoService = async (nombre, habilitado) => {
  const parqueadero = await Parqueadero.findOne({ where: { nombre } });

  if (!parqueadero) {
    throw new NotFoundError("Parqueadero no encontrado");
  }

  if (habilitado === "1") {
    await parqueadero.update({ habilitado: true });
  } else {
    await parqueadero.update({ habilitado: false });
  }

  return parqueadero;
};

export const obtenerParqueaderosService = async () => {
  return await Parqueadero.findAll();
};

export const agregarSocioService = async ({ nombre, usuario_id }) => {
  const parqueadero = await Parqueadero.findOne({ where: { nombre } });
  if (!parqueadero) {
    throw new NotFoundError("Parqueadero no encontrado");
  }
  const usuarioExistente = await Usuario.findOne({
    where: { id: usuario_id },
  });
  if (!usuarioExistente) {
    throw new NotFoundError("Usuario no encontrado");
  }

  await parqueadero.update({ usuario_id });
  return parqueadero;
};

export const listarParqueaderosSocioService = async (socioId) => {
  return await Parqueadero.findAll({
    where: { usuario_id: socioId, habilitado: true },
  });
};

export const listarVehiculosDeParqueaderoService = async ({
  socioId,
  nombre
}) => {
  const parqueadero = await Parqueadero.findOne({
    where: { nombre, usuario_id: socioId, habilitado: true },
  });

  if (!parqueadero) {
    throw new ForbiddenError("No tienes acceso a este parqueadero");
  }

  const entradas = await Entrada.findAll({
    where: { parqueadero_id: parqueadero.id, horaSalida: null },
    include: [{ model: Vehiculo, as: "vehiculo" }],
  });

  return entradas.map((e) => ({
    id: e.vehiculo.id,
    nombre: e.vehiculo.nombre,
    placa: e.vehiculo.placa,
    tipo: e.vehiculo.tipo,
    horaEntrada: e.horaEntrada,
  }));
};
