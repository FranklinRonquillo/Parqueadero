import { Parqueadero } from "../models/parqueadero.js";
import { Entrada } from "../models/entrada.js";
import { Vehiculo } from "../models/vehiculo.js";

export const crearParqueadero = async (req, res) => {
  try {
    const { capacidad, costo_hora } = req.body;

    if (capacidad==null || costo_hora==null){
      return res.status(400).json({
        mensaje: "Los campos 'capacidad' y 'costo_hora' son obligatorios",
      });
    }
    const parqueaderoNuevo = await Parqueadero.create({
      capacidad,
      costo_hora,
    });

    res.status(200).json({
      error: false,
      mensaje: "Parqueadero creado correctamente",
      parqueadero: parqueaderoNuevo,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear el parqueadero",
      error,
    });
    return;
  }
};

export const obtenerParqueaderos = async (req, res) => {
  try {
    const parqueaderos = await Parqueadero.findAll();

    res.status(200).json({
      error: false,
      mensaje: "parqueaderos obtenidos correctamente",
      parqueaderos,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los parqueaderos",
      error,
    });
    return;
  }
};

export const agregarSocio = async (req, res) => {
  try {
    const { id, usuario_id } = req.body;
    console.log(req.body);

    const parqueadero = await Parqueadero.findByPk(id);
    if (!parqueadero) {
      return res.status(404).json({
        mensaje: "Parqueadero no encontrado",
      });
    }

    await parqueadero.update({ usuario_id: usuario_id });

    res.status(200).json({
      error: false,
      mensaje: "Socio agregado correctamente al parqueadero",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al agregar el socio al parqueadero",
      error,
    });
    return;
  }
};

export const listarParqueaderosSocio = async (req, res) => {
  try {
    const socioId = req.usuario.id; 

    const parqueaderos = await Parqueadero.findAll({
      where: { usuario_id: socioId },
    });

    res.json(parqueaderos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los parqueaderos" });
  }
};

export const listarVehiculosDeParqueadero = async (req, res) => {
  try {
    const socioId = req.usuario.id; 
    const { parqueadero_id } = req.params;

    const parqueadero = await Parqueadero.findOne({
      where: { id: parqueadero_id, usuario_id: socioId },
    });

    if (!parqueadero) {
      return res
        .status(403)
        .json({ error: "No tienes acceso a este parqueadero" });
    }

    const entradas = await Entrada.findAll({
      where: { parqueadero_id, horaSalida: null },
      include: [
        {
          model: Vehiculo,
          as: "vehiculo",
        },
      ],
    });

    const vehiculos = entradas.map((e) => ({
      id: e.vehiculo.id,
      placa: e.vehiculo.placa,
      tipo: e.vehiculo.tipo,
      horaEntrada: e.horaEntrada,
    }));

    res.json(vehiculos);

  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener vehículos del parqueadero" });
  }
};
