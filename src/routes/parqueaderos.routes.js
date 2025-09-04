import Router from "express";

import {
  crearParqueadero,
  obtenerParqueaderos,
  agregarSocio,
  listarParqueaderosSocio,
  listarVehiculosDeParqueadero,
  editarParqueadero,
  eliminarParqueadero,
} from "../controller/parqueaderos.controller.js";

import { soloSocio,soloAdmin } from "../middleware/verificacion.js";
import { validarParqueadero } from "../schemas/parqueadero.schema.js";

const router = Router();

router.get("/get",soloAdmin, obtenerParqueaderos);

router.post("/create", validarParqueadero , soloAdmin, crearParqueadero);

router.post("/editar/:id", validarParqueadero, soloAdmin, editarParqueadero);

router.put("/delete/:id/:habilitado", soloAdmin, eliminarParqueadero);

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
