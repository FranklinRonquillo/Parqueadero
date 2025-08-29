import Router from "express";
import {
  topVehiculos,
  topVehiculos10,
  primera,
  ganancias,
  buscarVehiculosParqueados,
} from "../controller/indicadores.controller.js";

const indicadoresRoutes = Router();

indicadoresRoutes.get("/top10", topVehiculos10);

indicadoresRoutes.get("/top", topVehiculos);

indicadoresRoutes.get("/primera", primera);

indicadoresRoutes.post("/ganancias/:parqueadero_id", ganancias);

indicadoresRoutes.get("/buscar", buscarVehiculosParqueados);

export default indicadoresRoutes;