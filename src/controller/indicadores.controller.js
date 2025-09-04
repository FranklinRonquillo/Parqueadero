import {
  getTopVehiculos10,
  getTopVehiculos,
  getVehiculosPrimeraVez,
  getGanancias,
  buscarVehiculosParqueadosService,
} from "../services/indicadores.service.js";
import { BadRequestError } from "../utils/errors.js";

export const topVehiculos10 = async (req, res, next) => {
  try {
    const data = await getTopVehiculos10();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const topVehiculos = async (req, res, next) => {
  try {
    const data = await getTopVehiculos();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const primera = async (req, res, next) => {
  try {
    const data = await getVehiculosPrimeraVez();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const ganancias = async (req, res, next) => {
  try {
    const { parqueadero_id } = req.params;
    if (!parqueadero_id) {
      throw new BadRequestError("Debe enviar parqueadero_id");
    }

    const data = await getGanancias(parqueadero_id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const buscarVehiculosParqueados = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) {
      throw new BadRequestError("Debe enviar la placa para buscar");
    }

    const data = await buscarVehiculosParqueadosService(id);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
