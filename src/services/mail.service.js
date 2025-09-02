import axios from "axios";
import { Vehiculo } from "../models/vehiculo.js";

export const notificarUsuarioService = async ({
  email,
  id,
  mensaje,
  parqueaderoId,
}) => {

  const vehiculo = await Vehiculo.findOne({ where: { id } });

  if (!vehiculo) {
    const error = new Error(
      `El vehículo con id ${id} no está registrado en la base de datos`
    );
    error.status = 404;
    throw error;
  }

  const response = await axios.post("http://localhost:4000/enviarCorreo", {
    email,
    id,
    mensaje,
    parqueaderoId,
  });

  return response.data;
};
