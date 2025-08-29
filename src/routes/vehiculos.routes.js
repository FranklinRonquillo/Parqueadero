import Router from "express";
import {
  crearVehiculo,
  obtenerVehiculos,
  obtenerVehiculosPorParqueadero,
} from "../controller/vehiculos.controller.js";
import { soloAdmin } from "../middleware/verificacion.js";

const vehiculosRoutes = Router();

vehiculosRoutes.get("/", (req, res) => {
  res.send("Vehiculos");
});

//crear vehiculo

vehiculosRoutes.post("/create", crearVehiculo);

//obtener vehiculos
vehiculosRoutes.get("/get", soloAdmin, obtenerVehiculos);

//obtener vehiculos por parqueadero
vehiculosRoutes.get("/get/:id", soloAdmin, obtenerVehiculosPorParqueadero);

export default vehiculosRoutes;
