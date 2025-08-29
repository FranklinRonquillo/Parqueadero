import { Entrada } from "../models/entrada.js";
import { Vehiculo } from "../models/vehiculo.js";
import { Parqueadero } from "../models/parqueadero.js";
import { Sequelize, fn, col, Op } from "sequelize";

export const topVehiculos10 = async (req, res) => {
  try {
    const top10 = await Entrada.findAll({
      attributes: [
        "vehiculo_id",
        [
          Sequelize.fn("COUNT", Sequelize.col("vehiculo_id")),
          "total_registros",
        ],
      ],
      include: [
        {
          model: Vehiculo,
          attributes: ["id"],
        },
      ],
      group: ["vehiculo_id", "vehiculo.id"],
      order: [[Sequelize.literal("total_registros"), "DESC"]],
      limit: 10,
    });

    res.status(200).json(top10);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al obtener los vehículos más registrados",
      error,
    });
  }
};

export const topVehiculos = async (req, res) => {
  try {
    const resultados = await Entrada.findAll({
      attributes: [
        "vehiculo_id",
        [fn("COUNT", col("vehiculo_id")), "total_registros"], // cuántas veces aparece
      ],
      include: [
        {
          model: Vehiculo,
          attributes: ["id"], // si usas `id` como placa, aquí va
        },
        {
          model: Parqueadero,
          attributes: ["id", "capacidad", "costo_hora"], // opcional: info del parqueadero
        },
      ],
      group: ["vehiculo_id", "vehiculo.id", "parqueadero.id"], // agrupar por vehículo y parqueadero
      order: [[fn("COUNT", col("vehiculo_id")), "DESC"]], // orden descendente
      limit: 10,
    });

    res.json(resultados);
  } catch (error) {
    console.error("Error en topVehiculos:", error);
    res.status(500).json({ error: "Error al obtener el top de vehículos" });
  }
};

export const primera = async (req, res) => {
  try {
    const resultados = await Entrada.findAll({
      where: {
        horaSalida: null, // actualmente parqueados
        // excluir los que ya tuvieron alguna entrada en el mismo parqueadero
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

    res.json(resultados);
  } catch (error) {
    console.error("Error en vehiculosPrimeraVez:", error);
    res
      .status(500)
      .json({ error: "Error al verificar vehículos en primera vez" });
  }
};

export const ganancias = async (req, res) => {
  try {
    const { parqueadero_id } = req.params;

    const hoy = new Date();
    const inicioDia = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    const inicioSemana = new Date(hoy);
    inicioSemana.setDate(hoy.getDate() - hoy.getDay()); // Lunes
    const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    const inicioAnio = new Date(hoy.getFullYear(), 0, 1);

    // Función auxiliar para obtener la suma
    const calcularGanancia = async (inicio, fin) => {
      return await Entrada.sum("costo", {
        where: {
          parqueadero_id,
          horaSalida: {
            [Op.between]: [inicio, fin],
          },
        },
      });
    };

    const ganancias = {
      hoy: await calcularGanancia(inicioDia, hoy),
      semana: await calcularGanancia(inicioSemana, hoy),
      mes: await calcularGanancia(inicioMes, hoy),
      anio: await calcularGanancia(inicioAnio, hoy),
    };

    res.json(ganancias);
  } catch (error) {
    console.error("Error en gananciasParqueadero:", error);
    res.status(500).json({ error: "Error al calcular ganancias" });
  }
};

export const buscarVehiculosParqueados = async (req, res) => {
  try {
    const { id } = req.query; // ejemplo: /vehiculos/buscar?placa=HT

    if (!id) {
      return res.status(400).json({ error: "Debe enviar una placa para buscar" });
    }

    // Filtrar vehículos que estén parqueados (sin horaSalida)
    const vehiculos = await Vehiculo.findAll({
      include: [
        {
          model: Entrada,
          where: {
            horaSalida: null, // solo los que siguen parqueados
          },
        },
      ],
      where: {
        id: {
          [Op.like]: `%${id}%`, // coincidencia parcial
        },
      },
    });

    res.json(vehiculos);
  } catch (error) {
    console.error("Error en buscarVehiculosParqueados:", error);
    res.status(500).json({ error: "Error al buscar vehículos" });
  }
};