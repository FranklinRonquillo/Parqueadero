import { Entrada } from "../models/entrada.js";
import { Vehiculo } from "../models/vehiculo.js";
import { Parqueadero } from "../models/parqueadero.js";

import { NotFoundError, ForbiddenError, ConflictError, BadRequestError } from "../utils/errors.js";

export const registrarIngresoService = async (vehiculo_id, parqueadero_id) => {
  const parqueadero = await Parqueadero.findByPk(parqueadero_id);
  if (!parqueadero) {
    throw new NotFoundError("No existe el parqueadero");
  }

  if (parqueadero.habilitado === false) {
    throw new ForbiddenError("El parqueadero está inactivo");
  }

  if (parqueadero.dataValues.usuario_id == null) {
    throw new ForbiddenError("El parqueadero no tiene un socio asignado");
  }

  const vehiculo = await Vehiculo.findByPk(vehiculo_id);
  if (!vehiculo) {
    throw new NotFoundError("No existe el vehículo");
  }

  const entradaExistente = await Entrada.findOne({
    where: { vehiculo_id, horaSalida: null },
  });
  if (entradaExistente) {
    throw new ConflictError("El vehículo ya tiene un ingreso activo");
  }

  const ocupados = await Entrada.count({
    where: { parqueadero_id, horaSalida: null },
  });
  if (ocupados >= parqueadero.capacidad) {
    throw new ForbiddenError("El parqueadero está lleno");
  }

  await vehiculo.update({ parqueadero_id });

  const ingreso = await Entrada.create({
    vehiculo_id,
    parqueadero_id,
    horaEntrada: new Date(),
    horaSalida: null,
  });

  return ingreso;
};

export const registrarSalidaService = async (vehiculo_id, parqueadero_id) => {
  const parqueadero = await Parqueadero.findByPk(parqueadero_id);
  if (!parqueadero) {
    throw new NotFoundError("No existe el parqueadero");
  }

  const vehiculo = await Vehiculo.findByPk(vehiculo_id);
  if (!vehiculo) {
    throw new NotFoundError("No existe el vehículo");
  }

  if (!vehiculo.parqueadero_id) {
    throw new BadRequestError("El vehículo no está registrado en ningún parqueadero");
  }

  const salidaExistente = await Entrada.findOne({
    where: { vehiculo_id, parqueadero_id, horaSalida: null },
  });

  if (!salidaExistente) {
    throw new NotFoundError("No se encontró un ingreso activo para este vehículo");
  }

  const diferenciaMs = new Date() - salidaExistente.horaEntrada;
  const horas = Math.ceil(diferenciaMs / (1000 * 60 * 60));
  const costo = parqueadero.costo_hora * horas;

  await salidaExistente.update({
    horaSalida: new Date(),
    costo,
  });

  await vehiculo.update({ parqueadero_id: null });

  return { costo, horas };
};
