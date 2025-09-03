import Router from "express";
import {
  crearVehiculo,
  obtenerVehiculos,
  obtenerVehiculosPorParqueadero,
} from "../controller/vehiculos.controller.js";
import { soloAdmin } from "../middleware/verificacion.js";
import { validarVehiculo } from "../schemas/vehiculo.schema.js";

const router = Router();

router.post("/create", validarVehiculo, crearVehiculo);

router.get("/get", soloAdmin, obtenerVehiculos);

router.get("/get/:id", soloAdmin, obtenerVehiculosPorParqueadero);

export default router;
