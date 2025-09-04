import {
  crearParqueaderoService,
  obtenerParqueaderosService,
  agregarSocioService,
  listarParqueaderosSocioService,
  listarVehiculosDeParqueaderoService,
  editarParqueaderoService,
  eliminarParqueaderoService,
} from "../services/parqueaderos.service.js";

export const crearParqueadero = async (req, res) => {
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
    console.error("Error en crearParqueadero:", error);
    res.status(error.status || 500).json({
      mensaje: error.message || "Error al crear el parqueadero",
    });
  }
};

export const editarParqueadero = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, capacidad, costo_hora } = req.body;

    if (nombre == null || capacidad == null || costo_hora == null) {
      return res.status(400).json({
        mensaje:
          "Los campos 'nombre', 'capacidad' y 'costo_hora' son obligatorios",
      });
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
    console.error("Error en crearParqueadero:", error);
    res.status(error.status || 500).json({
      mensaje: error.message || "Error al crear el parqueadero",
    });
  }
};

export const eliminarParqueadero = async (req, res) => {
  try {
    const { id, habilitado } = req.params;

    if (!id) {
      return res.status(400).json({
        mensaje: "El parámetro 'id' del parqueadero es obligatorio",
      });
    }

    const parqueadero = await eliminarParqueaderoService(id, habilitado);

    res.status(200).json({
      mensaje: "Parqueadero modificado correctamente",
      parqueadero,
    });
  } catch (error) {
    console.error("Error en eliminarParqueadero:", error);
    res.status(error.status || 500).json({
      mensaje: error.message || "Error al deshabilitar el parqueadero",
    });
  }
};

export const obtenerParqueaderos = async (req, res) => {
  try {
    const parqueaderos = await obtenerParqueaderosService();
    res.status(200).json({
      mensaje: "Parqueaderos obtenidos correctamente",
      parqueaderos,
    });
  } catch (error) {
    console.error("Error en obtenerParqueaderos:", error);
    res.status(error.status || 500).json({
      mensaje: error.message || "Error al obtener los parqueaderos",
    });
  }
};

export const agregarSocio = async (req, res) => {
  try {
    const { id, usuario_id } = req.body;

    if (!id || !usuario_id) {
      return res.status(400).json({
        mensaje: "Los campos 'id' y 'usuario_id' son obligatorios",
      });
    }

    await agregarSocioService({ id, usuario_id });

    res.status(200).json({
      mensaje: "Socio agregado correctamente al parqueadero",
    });
  } catch (error) {
    console.error("Error en agregarSocio:", error);
    res.status(error.status || 500).json({
      mensaje: error.message || "Error al agregar socio al parqueadero",
    });
  }
};

export const listarParqueaderosSocio = async (req, res) => {
  try {
    const socioId = req.usuario.id;
    const parqueaderos = await listarParqueaderosSocioService(socioId);

    res.status(200).json({
      mensaje: "Parqueaderos del socio obtenidos correctamente",
      parqueaderos,
    });
  } catch (error) {
    console.error("Error en listarParqueaderosSocio:", error);
    res.status(error.status || 500).json({
      mensaje: error.message || "Error al obtener los parqueaderos del socio",
    });
  }
};

export const listarVehiculosDeParqueadero = async (req, res) => {
  try {
    const socioId = req.usuario.id;
    const { parqueadero_id } = req.params;

    if (!parqueadero_id) {
      return res.status(400).json({
        mensaje: "El campo 'parqueadero_id' es obligatorio",
      });
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
    console.error("Error en listarVehiculosDeParqueadero:", error);
    res.status(error.status || 500).json({
      mensaje: error.message || "Error al obtener vehículos del parqueadero",
    });
  }
};
