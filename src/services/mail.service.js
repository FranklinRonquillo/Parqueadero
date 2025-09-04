import axios from "axios";
import { Vehiculo } from "../models/vehiculo.js";
import { NotFoundError } from "../utils/errors.js";

export const notificarUsuarioService = async ({
  email,
  id,
  mensaje,
  parqueaderoId,
}) => {

  const vehiculo = await Vehiculo.findOne({ where: { id } });

  if (!vehiculo) {
    throw new NotFoundError(
      `El vehículo con id ${id} no está registrado en la base de datos`
    );
  }

  const response = await axios.post(`${process.env.rutaMail}/enviarCorreo`, {
    email,
    id,
    mensaje,
    parqueaderoId,
  });

  return response.data;
};
