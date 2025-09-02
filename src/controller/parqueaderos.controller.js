import {
  crearParqueaderoService,
  obtenerParqueaderosService,
  agregarSocioService,
  listarParqueaderosSocioService,
  listarVehiculosDeParqueaderoService,
} from "../services/parqueaderos.service.js";

export const crearParqueadero = async (req, res) => {
  try {
    const { capacidad, costo_hora } = req.body;

    // 🔹 Validación en el controlador
    if (capacidad == null || costo_hora == null) {
      return res.status(400).json({
        error: true,
        mensaje: "Los campos 'capacidad' y 'costo_hora' son obligatorios",
      });
    }

    const parqueaderoNuevo = await crearParqueaderoService({ capacidad, costo_hora });

    res.status(201).json({
      error: false,
      mensaje: "Parqueadero creado correctamente",
      parqueadero: parqueaderoNuevo,
    });
  } catch (error) {
    console.error("Error en crearParqueadero:", error);
    res.status(error.status || 500).json({
      error: true,
      mensaje: error.message || "Error al crear el parqueadero",
    });
  }
};

export const obtenerParqueaderos = async (req, res) => {
  try {
    const parqueaderos = await obtenerParqueaderosService();
    res.status(200).json({
      error: false,
      mensaje: "Parqueaderos obtenidos correctamente",
      parqueaderos,
    });
  } catch (error) {
    console.error("Error en obtenerParqueaderos:", error);
    res.status(error.status || 500).json({
      error: true,
      mensaje: error.message || "Error al obtener los parqueaderos",
    });
  }
};

export const agregarSocio = async (req, res) => {
  try {
    const { id, usuario_id } = req.body;

    // 🔹 Validación en el controlador
    if (!id || !usuario_id) {
      return res.status(400).json({
        error: true,
        mensaje: "Los campos 'id' y 'usuario_id' son obligatorios",
      });
    }

    await agregarSocioService({ id, usuario_id });

    res.status(200).json({
      error: false,
      mensaje: "Socio agregado correctamente al parqueadero",
    });
  } catch (error) {
    console.error("Error en agregarSocio:", error);
    res.status(error.status || 500).json({
      error: true,
      mensaje: error.message || "Error al agregar socio al parqueadero",
    });
  }
};

export const listarParqueaderosSocio = async (req, res) => {
  try {
    const socioId = req.usuario.id;
    const parqueaderos = await listarParqueaderosSocioService(socioId);

    res.status(200).json({
      error: false,
      mensaje: "Parqueaderos del socio obtenidos correctamente",
      parqueaderos,
    });
  } catch (error) {
    console.error("Error en listarParqueaderosSocio:", error);
    res.status(error.status || 500).json({
      error: true,
      mensaje: error.message || "Error al obtener los parqueaderos del socio",
    });
  }
};

export const listarVehiculosDeParqueadero = async (req, res) => {
  try {
    const socioId = req.usuario.id;
    const { parqueadero_id } = req.params;

    // 🔹 Validación en el controlador
    if (!parqueadero_id) {
      return res.status(400).json({
        error: true,
        mensaje: "El campo 'parqueadero_id' es obligatorio",
      });
    }

    const vehiculos = await listarVehiculosDeParqueaderoService({ socioId, parqueadero_id });

    res.status(200).json({
      error: false,
      mensaje: "Vehículos obtenidos correctamente",
      vehiculos,
    });
  } catch (error) {
    console.error("Error en listarVehiculosDeParqueadero:", error);
    res.status(error.status || 500).json({
      error: true,
      mensaje: error.message || "Error al obtener vehículos del parqueadero",
    });
  }
};
