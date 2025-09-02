import Router from "express";
import {
  crearVehiculo,
  obtenerVehiculos,
  obtenerVehiculosPorParqueadero,
} from "../controller/vehiculos.controller.js";
import { soloAdmin } from "../middleware/verificacion.js";

const router = Router();

router.post("/create", crearVehiculo);

router.get("/get", soloAdmin, obtenerVehiculos);

router.get("/get/:id", soloAdmin, obtenerVehiculosPorParqueadero);

export default router;
