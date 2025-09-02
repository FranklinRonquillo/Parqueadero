import {
  getTopVehiculos10,
  getTopVehiculos,
  getVehiculosPrimeraVez,
  getGanancias,
  buscarVehiculosParqueadosService,
} from "../services/indicadores.service.js";

export const topVehiculos10 = async (req, res) => {
  try {
    const data = await getTopVehiculos10();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error en topVehiculos10:", error);
    res.status(500).json({ error: "Error al obtener el top 10" });
  }
};

export const topVehiculos = async (req, res) => {
  try {
    const data = await getTopVehiculos();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error en topVehiculos:", error);
    res.status(500).json({ error: "Error al obtener el top de vehículos" });
  }
};

export const primera = async (req, res) => {
  try {
    const data = await getVehiculosPrimeraVez();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error en primera:", error);
    res.status(500).json({ error: "Error al verificar vehículos" });
  }
};

export const ganancias = async (req, res) => {
  try {
    const { parqueadero_id } = req.params;
    if (!parqueadero_id) {
      return res.status(400).json({ error: "Debe enviar parqueadero_id" });
    }

    const data = await getGanancias(parqueadero_id);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error en ganancias:", error);
    res.status(500).json({ error: "Error al calcular ganancias" });
  }
};

export const buscarVehiculosParqueados = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: "Debe enviar la placa para buscar" });
    }

    const data = await buscarVehiculosParqueadosService(id);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error en buscarVehiculosParqueados:", error);
    res.status(500).json({ error: "Error al buscar vehículos" });
  }
};
