import express from "express";
import "../models/relaciones.js";
import loginRoutes from "./login.routes.js";
import usuariosRoutes from "./usuarios.routes.js";
import parqueaderosRoutes from "./parqueaderos.routes.js";
import vehiculosRoutes from "./vehiculos.routes.js";
import entradasRoutes from "./entradas.routes.js";
import indicadoresRoutes from "./indicadores.routes.js";
import {
  asegurarSesion,
  soloAdmin,
} from "../middleware/verificacion.js";

const app = express();

// Rutas
app.use("/autenticacion", loginRoutes);

app.use("/usuarios", asegurarSesion, soloAdmin, usuariosRoutes);
app.use("/parqueaderos", asegurarSesion, parqueaderosRoutes);
app.use("/vehiculos", asegurarSesion, vehiculosRoutes);
app.use("/entradas", asegurarSesion, entradasRoutes);
app.use("/indicadores", asegurarSesion, indicadoresRoutes);

app.post("/enviar-correo", asegurarSesion, soloAdmin, (req, res) => {
  const { email, placa, mensaje, parqueaderoNombre } = req.body;

  // Imprimir en log la solicitud recibida
  console.log("Solicitud recibida:");
  console.log(`Email: ${email}`);
  console.log(`Placa: ${placa}`);
  console.log(`Mensaje: ${mensaje}`);
  console.log(`Parqueadero: ${parqueaderoNombre}`);

  // Respuesta
  res.status(200).json({
    mensaje: "Correo Enviado",
  });
});

export default app;
