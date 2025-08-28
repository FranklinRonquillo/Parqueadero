import { Entrada } from "../models/entrada.js";
import { Vehiculo } from "../models/vehiculo.js";
import { Parqueadero } from "../models/parqueadero.js";

export const registrarIngreso = async (req, res) => {
  try {
    const { vehiculo_id, parqueadero_id } = req.body;

    // verificar si el parqueadero existe
    const parqueadero = await Parqueadero.findByPk(parqueadero_id);
    if (!parqueadero) {
      return res.status(400).json({
        mensaje: "No se puede Registrar Ingreso, no existe el parqueadero",
      });
    }

    // verificar si el vehículo ya tiene un ingreso activo
    const entradaExistente = await Entrada.findOne({
      where: {
        vehiculo_id,
        horaSalida: null,
      },
    });
    if (entradaExistente) {
      return res.status(400).json({
        mensaje:
          "No se puede Registrar Ingreso, ya existe la placa en este u otro parqueadero",
      });
    }

    // contar cuántos vehículos hay actualmente en el parqueadero
    const ocupados = await Entrada.count({
      where: {
        parqueadero_id,
        horaSalida: null,
      },
    });

    if (ocupados >= parqueadero.capacidad) {
      return res.status(400).json({
        mensaje: "No se puede Registrar Ingreso, el parqueadero está lleno",
      });
    }

    // verificar que el vehículo exista
    const vehiculo = await Vehiculo.findByPk(vehiculo_id);
    if (!vehiculo) {
      return res.status(400).json({
        mensaje: "No se puede Registrar Ingreso, no existe el vehiculo",
      });
    }

    // actualizar el parqueadero_id en el vehículo
    await vehiculo.update({
      parqueadero_id,
    });

    // registrar el ingreso
    const ingreso = await Entrada.create({
      vehiculo_id,
      parqueadero_id,
      horaEntrada: new Date(),
      horaSalida: null,
    });

    res.status(201).json({
      id: ingreso.id,
      mensaje: "Ingreso registrado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al registrar el ingreso",
      error,
    });
  }
};

export const registrarSalida = async (req, res) => {
  try {
    const { vehiculo_id, parqueadero_id } = req.body;

    const parqueadero = await Parqueadero.findByPk(parqueadero_id);
    if (!parqueadero) {
      return res.status(400).json({
        mensaje: "No se puede Registrar Salida, no existe el parqueadero",
      });
    }
    const vehiculo = await Vehiculo.findOne({
      where: {
        id: vehiculo_id,
      },
    });

    if (vehiculo.dataValues.parqueadero_id == null) {
      return res.status(400).json({
        mensaje:
          "No se puede Registrar Salida, no existe la placa en el parqueadero",
      });
    }
    console.log("hola");

    const salidaExistente = await Entrada.findOne({
      where: {
        vehiculo_id,
        parqueadero_id,
        horaSalida: null,
      },
    });

    const diferenciaMs = new Date() - salidaExistente.horaEntrada; // diferencia en ms
    const horas = Math.ceil(diferenciaMs / (1000 * 60 * 60)); // redondea hacia arriba

    const costo = parqueadero.dataValues.costo_hora*horas;

    salidaExistente.update({
      horaSalida: new Date(),
      costo,
    });
    vehiculo.update({
      parqueadero_id: null,
    });

    res.status(200).json({
      mensaje: "Salida registrada",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al registrar la salida",
      error,
    });
    return;
  }
};

