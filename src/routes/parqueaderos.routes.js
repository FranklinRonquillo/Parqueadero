import Router from "express";

import {
  crearParqueadero,
  obtenerParqueaderos,
  agregarSocio,
} from "../controller/parqueaderos.controller.js";

const parqeuaderoRoutes = Router();

parqeuaderoRoutes.get("/", (req, res) => {
  res.send("Parqueaderos");
});

//crear parqueadero

parqeuaderoRoutes.post("/create", crearParqueadero);

//obtener parqueaderos
parqeuaderoRoutes.get("/get", obtenerParqueaderos);

//agregar socio al parqueadero
parqeuaderoRoutes.post("/addSocio", agregarSocio);

export default parqeuaderoRoutes;
