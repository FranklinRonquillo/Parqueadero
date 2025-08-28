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

app.use("/usuarios", usuariosRoutes);
app.use("/parqueaderos", parqueaderosRoutes);
app.use("/vehiculos", vehiculosRoutes);

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
