import Router from "express";
import { registrarIngreso, registrarSalida } from "../controller/entradas.controller.js";
import e from "express";

const entradasRoutes = Router();

entradasRoutes.get("/", (req, res) => {
  res.send("Entradas");
});

entradasRoutes.post("/registreIngreso", registrarIngreso);

entradasRoutes.post("/registreSalida", registrarSalida);

export default entradasRoutes;