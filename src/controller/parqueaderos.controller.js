import { Parqueadero } from "../models/parqueadero.js";

export const crearParqueadero = async (req, res) => {
  try {
    const parqueaderoNuevo = await Parqueadero.create({});

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
