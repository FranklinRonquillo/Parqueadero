import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./database/db.js";

import "./models/relaciones.js";
import loginRoutes from "./routes/login.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import parqueaderosRoutes from "./routes/parqueaderos.routes.js";
import vehiculosRoutes from "./routes/vehiculos.routes.js";
import entradasRoutes from "./routes/entradas.routes.js";
import indicadoresRoutes from "./routes/indicadores.routes.js";
import {
  asegurarSesion,
  soloAdmin,
  soloSocio,
} from "./middleware/verificacion.js";

dotenv.config();

db.authenticate()
  .then(() => {
    console.log("Database connection successful");
    return db.sync(); // sincroniza modelos
  })
  .then(() => crearAdmin()) // crea admin si no existe
  .catch((error) => console.log("Connection error: ", error));

import { Usuario } from "./models/usuario.js";

// Verificar si existe admin, si no, crearlo
async function crearAdmin() {
  try {
    const existeAdmin = await Usuario.findOne({
      where: { usuario: "admin@mail.com" },
    });

    if (!existeAdmin) {
      await Usuario.create({
        usuario: "admin@mail.com",
        pass: "admin", // 👈 luego lo ideal sería encriptar con bcrypt
        rol: "Admin",
      });
      console.log("✅ Usuario admin creado: admin@mail.com / admin");
    } else {
      console.log("ℹ️ Usuario admin ya existe");
    }
  } catch (error) {
    console.error("❌ Error al crear admin:", error);
  }
}

const app = express();

app.use(morgan("dev"));

app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("funciona");
});

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

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
