import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./database/db.js";
import jwt from "jsonwebtoken";

import loginRoutes from "./routes/login.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import parqueaderosRoutes from "./routes/parqueaderos.routes.js";
import vehiculosRoutes from "./routes/vehiculos.routes.js";
import entradasRoutes from "./routes/entradas.routes.js";

dotenv.config();

db.authenticate()
  .then(() => console.log("Databse connection successful"))
  .catch((error) => console.log("Connection error: ", error));

const app = express();

app.use(morgan("dev"));

app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("funciona");
});

// Rutas
app.use("/api", loginRoutes);

app.get("/protegido", asegurarSesion, (req, res) => {
  res.send("API funcionando");
});

function asegurarSesion(req, res, next) {
  console.log(req.headers);
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        return res.status(401).json({
          error: true,
          mensaje: "No se pudo verificar la sesión",
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      error: true,
      mensaje: "No se encontro el token de autenticación",
    });
  }
}

app.use("/usuarios", asegurarSesion, usuariosRoutes);
app.use("/parqueaderos", asegurarSesion, parqueaderosRoutes);
app.use("/vehiculos", asegurarSesion, vehiculosRoutes);
app.use("/entradas", entradasRoutes);

app.post("/enviar-correo", asegurarSesion, (req, res) => {
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

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
