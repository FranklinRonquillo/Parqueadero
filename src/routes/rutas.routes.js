import express from "express";

import "../models/relaciones.js";
import loginRoutes from "./login.routes.js";
import usuariosRoutes from "./usuarios.routes.js";
import vehiculosRoutes from "./vehiculos.routes.js";
import parqueaderosRoutes from "./parqueaderos.routes.js";
import entradasRoutes from "./entradas.routes.js";
import indicadoresRoutes from "./indicadores.routes.js";
import mailRoutes from "./mail.routes.js";

import {
  asegurarSesion,
  soloAdmin,
} from "../middleware/verificacion.js";

import { errorHandler } from "../middleware/errorHandler.js";

const app = express();

// Rutas
app.use("/autenticacion", loginRoutes);

app.use("/usuarios", asegurarSesion, soloAdmin, usuariosRoutes);
app.use("/vehiculos", asegurarSesion, vehiculosRoutes);
app.use("/parqueaderos", asegurarSesion, parqueaderosRoutes);
app.use("/entradas", asegurarSesion, entradasRoutes);
app.use("/indicadores", asegurarSesion, indicadoresRoutes);
app.use("/mail", asegurarSesion, mailRoutes);

app.use(errorHandler);

export default app;
