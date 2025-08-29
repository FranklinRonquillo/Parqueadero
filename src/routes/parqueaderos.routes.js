import Router from "express";

import {
  crearParqueadero,
  obtenerParqueaderos,
  agregarSocio,
  listarParqueaderosSocio,
  listarVehiculosDeParqueadero,
} from "../controller/parqueaderos.controller.js";

import { soloSocio,soloAdmin } from "../middleware/verificacion.js";

const parqueaderoRoutes = Router();

parqueaderoRoutes.get("/", (req, res) => {
  res.send("Parqueaderos");
});

//crear parqueadero
parqueaderoRoutes.post("/create",soloAdmin, crearParqueadero);

//obtener parqueaderos
parqueaderoRoutes.get("/get",soloAdmin, obtenerParqueaderos);

//agregar socio al parqueadero
parqueaderoRoutes.post("/addSocio",soloAdmin, agregarSocio);

//listar parqueaderos socio
parqueaderoRoutes.get(
  "/mis-parqueaderos",
  soloSocio,
  listarParqueaderosSocio
);

parqueaderoRoutes.get(
  "/:parqueadero_id",
  soloSocio,
  listarVehiculosDeParqueadero
);

export default parqueaderoRoutes;
