import Router from "express";

import {
  crearParqueadero,
  obtenerParqueaderos,
  agregarSocio,
  listarParqueaderosSocio,
  listarVehiculosDeParqueadero,
} from "../controller/parqueaderos.controller.js";

import { soloSocio,soloAdmin } from "../middleware/verificacion.js";
import { validarParqueadero } from "../schemas/parqueadero.schema.js";

const router = Router();

router.post("/create", validarParqueadero , soloAdmin, crearParqueadero);

router.get("/get",soloAdmin, obtenerParqueaderos);

router.post("/addSocio",soloAdmin, agregarSocio);

//listar parqueaderos socio
router.get(
  "/mis-parqueaderos",
  soloSocio,
  listarParqueaderosSocio
);

router.get(
  "/:parqueadero_id",
  soloSocio,
  listarVehiculosDeParqueadero
);

export default router;
