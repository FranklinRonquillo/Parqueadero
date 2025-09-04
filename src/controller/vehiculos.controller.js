import {
  crearVehiculoService,
  obtenerVehiculosService,
  obtenerVehiculosPorParqueaderoService,
} from "../services/vehiculos.service.js";

export const crearVehiculo = async (req, res) => {
  try {
    const { id, usuario_id } = req.body;

    if (!id || !usuario_id) {
      return res.status(400).json({
        
        mensaje: "Los campos 'id' (placa) y 'usuario_id' son obligatorios",
      });
    }

    const vehiculo = await crearVehiculoService({ id, usuario_id });

    res.status(201).json({
      
      mensaje: "Vehículo creado correctamente",
      vehiculo,
    });
  } catch (error) {
    console.error("Error en crearVehiculo:", error);
    res.status(error.status || 500).json({
      
      mensaje: error.message || "Error interno al crear vehículo",
    });
  }
};

export const obtenerVehiculos = async (req, res) => {
  try {
    const vehiculos = await obtenerVehiculosService();

    res.status(200).json({
      
      mensaje: "Vehículos obtenidos correctamente",
      vehiculos,
    });
  } catch (error) {
    console.error("Error en obtenerVehiculos:", error);
    res.status(error.status || 500).json({
      
      mensaje: error.message || "Error interno al obtener vehículos",
    });
  }
};

export const obtenerVehiculosPorParqueadero = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        
        mensaje: "El parámetro 'id' del parqueadero es obligatorio",
      });
    }

    const vehiculosConEntrada = await obtenerVehiculosPorParqueaderoService(id);

    res.status(200).json({
      
      mensaje: "Vehículos obtenidos correctamente",
      vehiculos: vehiculosConEntrada,
    });
  } catch (error) {
    console.error("Error en obtenerVehiculosPorParqueadero:", error);
    res.status(error.status || 500).json({
      
      mensaje: error.message || "Error interno al obtener vehículos por parqueadero",
    });
  }
};
