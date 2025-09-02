import { Entrada } from "../models/entrada.js";
import { Vehiculo } from "../models/vehiculo.js";
import { Parqueadero } from "../models/parqueadero.js";
import { Sequelize, fn, col, Op } from "sequelize";

// TOP 10 vehículos
export const getTopVehiculos10 = async () => {
  return await Entrada.findAll({
    attributes: [
      "vehiculo_id",
      [Sequelize.fn("COUNT", Sequelize.col("vehiculo_id")), "total_registros"],
    ],
    include: [{ model: Vehiculo, attributes: ["id"] }],
    group: ["vehiculo_id", "vehiculo.id"],
    order: [[Sequelize.literal("total_registros"), "DESC"]],
    limit: 10,
  });
};

// TOP vehículos con parqueadero
export const getTopVehiculos = async () => {
  return await Entrada.findAll({
    attributes: [
      "vehiculo_id",
      [fn("COUNT", col("vehiculo_id")), "total_registros"],
    ],
    include: [
      { model: Vehiculo, attributes: ["id"] },
      { model: Parqueadero, attributes: ["id", "capacidad", "costo_hora"] },
    ],
    group: ["vehiculo_id", "vehiculo.id", "parqueadero.id"],
    order: [[fn("COUNT", col("vehiculo_id")), "DESC"]],
    limit: 10,
  });
};

// Vehículos primera vez
export const getVehiculosPrimeraVez = async () => {
  return await Entrada.findAll({
    where: {
      horaSalida: null,
      vehiculo_id: {
        [Op.notIn]: Sequelize.literal(`(
          SELECT e2.vehiculo_id 
          FROM entradas e2 
          WHERE e2.vehiculo_id = entradas.vehiculo_id 
            AND e2.parqueadero_id = entradas.parqueadero_id 
            AND e2.id < entradas.id
        )`),
      },
    },
    include: [
      { model: Vehiculo, attributes: ["id"] },
      { model: Parqueadero, attributes: ["id"] },
    ],
  });
};

// Ganancias por periodo
export const getGanancias = async (parqueadero_id) => {
  const hoy = new Date();
  const inicioDia = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  const inicioSemana = new Date(hoy);
  inicioSemana.setDate(hoy.getDate() - hoy.getDay());
  const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  const inicioAnio = new Date(hoy.getFullYear(), 0, 1);

  const calcularGanancia = async (inicio, fin) => {
    return await Entrada.sum("costo", {
      where: { parqueadero_id, horaSalida: { [Op.between]: [inicio, fin] } },
    });
  };

  return {
    hoy: await calcularGanancia(inicioDia, hoy),
    semana: await calcularGanancia(inicioSemana, hoy),
    mes: await calcularGanancia(inicioMes, hoy),
    anio: await calcularGanancia(inicioAnio, hoy),
  };
};

// Buscar vehículos parqueados por placa
export const buscarVehiculosParqueadosService = async (placa) => {
  return await Vehiculo.findAll({
    include: [
      {
        model: Entrada,
        where: { horaSalida: null },
      },
    ],
    where: { id: { [Op.like]: `%${placa}%` } },
  });
};
