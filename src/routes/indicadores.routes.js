import Router from "express";
import {
  topVehiculos,
  topVehiculos10,
  primera,
  ganancias,
  buscarVehiculosParqueados,
} from "../controller/indicadores.controller.js";
import { soloSocio } from "../middleware/verificacion.js";

const router = Router();

router.get("/top10", topVehiculos10);

router.get("/top", topVehiculos);

router.get("/primera", primera);

router.post("/ganancias/:parqueadero_id",soloSocio, ganancias);

router.get("/buscar", buscarVehiculosParqueados);

export default router;