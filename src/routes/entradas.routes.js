import Router from "express";
import {
  registrarIngreso,
  registrarSalida,
  topVehiculos,
  topVehiculos10,
  primera,
  ganancias,
  buscarVehiculosParqueados,
} from "../controller/entradas.controller.js";

const entradasRoutes = Router();

entradasRoutes.get("/", (req, res) => {
  res.send("Entradas");
});

entradasRoutes.post("/registreIngreso", registrarIngreso);

entradasRoutes.post("/registreSalida", registrarSalida);

export default entradasRoutes;
