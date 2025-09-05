import { Entrada } from "../models/entrada.js";
import { Vehiculo } from "../models/vehiculo.js";
import { Parqueadero } from "../models/parqueadero.js";
import { Sequelize, fn, col, Op } from "sequelize";

export const getTopVehiculos10 = async (usuario) => {
  if (usuario.rol === "admin") {
    return await Entrada.findAll({
      attributes: [
        "vehiculo_id",
        [
          Sequelize.fn("COUNT", Sequelize.col("vehiculo_id")),
          "total_registros",
        ],
      ],
      include: [{ model: Vehiculo, attributes: ["id"] }],
      group: ["vehiculo_id", "vehiculo.id"],
      order: [[Sequelize.literal("total_registros"), "DESC"]],
      limit: 10,
    });
  }

  if (usuario.rol === "socio") {
    return await Entrada.findAll({
      attributes: [
        "vehiculo_id",
        [
          Sequelize.fn("COUNT", Sequelize.col("vehiculo_id")),
          "total_registros",
        ],
      ],
      include: [{ model: Vehiculo, attributes: ["id"] }],
      where: {
        parqueadero_id: {
          [Op.in]: Sequelize.literal(
            `(SELECT id FROM parqueaderos WHERE usuario_id = ${usuario.id})`
          ),
        },
      },
      group: ["vehiculo_id", "vehiculo.id"],
      order: [[Sequelize.literal("total_registros"), "DESC"]],
      limit: 10,
    });
  }

  return [];
};

export const getTopVehiculos = async (usuario) => {
  if (usuario.rol === "admin") {
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
  }

  if (usuario.rol === "socio") {
    return await Entrada.findAll({
      attributes: [
        "vehiculo_id",
        [fn("COUNT", col("vehiculo_id")), "total_registros"],
      ],
      include: [
        { model: Vehiculo, attributes: ["id"] },
        {
          model: Parqueadero,
          attributes: ["id", "capacidad", "costo_hora"],
          where: { usuario_id: usuario.id },
        },
      ],
      group: ["vehiculo_id", "vehiculo.id", "parqueadero.id"],
      order: [[fn("COUNT", col("vehiculo_id")), "DESC"]],
      limit: 10,
    });
  }

  return [];
};

export const getVehiculosPrimeraVez = async (usuario) => {
  const whereCondition = {
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
  };

  return await Entrada.findAll({
    where: whereCondition,
    include: [
      { model: Vehiculo, attributes: ["id"] },
      {
        model: Parqueadero,
        attributes: ["id", "nombre"],
        ...(usuario.rol === "socio" && {
          where: { usuario_id: usuario.id },
        }),
      },
    ],
  });
};

export const getGanancias = async (parqueadero_id, usuario) => {
  const parqueadero = await Parqueadero.findOne({
    where: { id: parqueadero_id, usuario_id: usuario.id },
  });

  if (!parqueadero) {
    return { mensaje: "Información no disponible" };
  }

  const hoy = new Date();
  const inicioDia = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  const inicioSemana = new Date(hoy);
  inicioSemana.setDate(hoy.getDate() - hoy.getDay());
  const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  const inicioAnio = new Date(hoy.getFullYear(), 0, 1);

  const calcularGanancia = async (inicio, fin) => {
    return (
      (await Entrada.sum("costo", {
        where: {
          parqueadero_id,
          horaSalida: { [Op.between]: [inicio, fin] },
        },
      })) || 0
    );
  };

  return {
    hoy: await calcularGanancia(inicioDia, hoy),
    semana: await calcularGanancia(inicioSemana, hoy),
    mes: await calcularGanancia(inicioMes, hoy),
    anio: await calcularGanancia(inicioAnio, hoy),
  };
};

export const buscarVehiculosParqueadosService = async (placa, usuario) => {
  return await Vehiculo.findAll({
    where: { id: { [Op.like]: `%${placa}%` } },
    include: [
      {
        model: Entrada,
        where: { horaSalida: null },
        include: [
          {
            model: Parqueadero,
            ...(usuario.rol === "socio" && {
              where: { usuario_id: usuario.id },
            }),
          },
        ],
      },
    ],
  });
};
