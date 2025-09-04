import {
  crearParqueaderoService,
  obtenerParqueaderosService,
  agregarSocioService,
  listarParqueaderosSocioService,
  listarVehiculosDeParqueaderoService,
  editarParqueaderoService,
  eliminarParqueaderoService,
} from "../services/parqueaderos.service.js";
import { BadRequestError } from "../utils/errors.js";

export const crearParqueadero = async (req, res, next) => {
  try {
    const { nombre, capacidad, costo_hora } = req.body;

    const parqueaderoNuevo = await crearParqueaderoService({
      nombre,
      capacidad,
      costo_hora,
    });

    res.status(201).json({
      mensaje: "Parqueadero creado correctamente",
      parqueadero: parqueaderoNuevo,
    });
  } catch (error) {
    next(error);
  }
};

export const editarParqueadero = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, capacidad, costo_hora } = req.body;

    if (nombre == null || capacidad == null || costo_hora == null) {
      throw new BadRequestError(
        "Los campos 'nombre', 'capacidad' y 'costo_hora' son obligatorios"
      );
    }

    const parqueaderoNuevo = await editarParqueaderoService({
      id,
      nombre,
      capacidad,
      costo_hora,
    });

    res.status(201).json({
      mensaje: "Parqueadero editado correctamente",
      parqueadero: parqueaderoNuevo,
    });
  } catch (error) {
    next(error);
  }
};

export const eliminarParqueadero = async (req, res, next) => {
  try {
    const { id, habilitado } = req.params;

    if (!id) {
      throw new BadRequestError("El parámetro 'id' del parqueadero es obligatorio");
    }

    const parqueadero = await eliminarParqueaderoService(id, habilitado);

    res.status(200).json({
      mensaje: "Parqueadero modificado correctamente",
      parqueadero,
    });
  } catch (error) {
    next(error);
  }
};

export const obtenerParqueaderos = async (req, res, next) => {
  try {
    const parqueaderos = await obtenerParqueaderosService();
    res.status(200).json({
      mensaje: "Parqueaderos obtenidos correctamente",
      parqueaderos,
    });
  } catch (error) {
    next(error);
  }
};

export const agregarSocio = async (req, res, next) => {
  try {
    const { id, usuario_id } = req.body;

    if (!id || !usuario_id) {
      throw new BadRequestError("Los campos 'id' y 'usuario_id' son obligatorios");
    }

    await agregarSocioService({ id, usuario_id });

    res.status(200).json({
      mensaje: "Socio agregado correctamente al parqueadero",
    });
  } catch (error) {
    next(error);
  }
};

export const listarParqueaderosSocio = async (req, res, next) => {
  try {
    const socioId = req.usuario.id;
    const parqueaderos = await listarParqueaderosSocioService(socioId);

    res.status(200).json({
      mensaje: "Parqueaderos del socio obtenidos correctamente",
      parqueaderos,
    });
  } catch (error) {
    next(error);
  }
};

export const listarVehiculosDeParqueadero = async (req, res, next) => {
  try {
    const socioId = req.usuario.id;
    const { parqueadero_id } = req.params;

    if (!parqueadero_id) {
      throw new BadRequestError("El campo 'parqueadero_id' es obligatorio");
    }

    const vehiculos = await listarVehiculosDeParqueaderoService({
      socioId,
      parqueadero_id,
    });

    res.status(200).json({
      mensaje: "Vehículos obtenidos correctamente",
      vehiculos,
    });
  } catch (error) {
    next(error);
  }
};
