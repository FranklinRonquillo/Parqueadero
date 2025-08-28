import Router from "express";
import {
  crearVehiculo,
  obtenerVehiculos,
} from "../controllers/vehiculos.controllers.js";

const vehiculosRoutes = Router();

vehiculosRoutes.get("/", (req, res) => {
  res.send("Vehiculos");
});

//crear vehiculo

vehiculosRoutes.post("/create", crearVehiculo);

//obtener vehiculos
vehiculosRoutes.get("/get", obtenerVehiculos);

export default vehiculosRoutes;
