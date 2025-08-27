import express from 'express';
import morgan from "morgan";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./database/db.js";

import loginRoutes from "./routes/login.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import parqueaderosRoutes from "./routes/parqueaderos.routes.js";
import vehiculosRoutes from "./routes/vehiculos.routes.js";

dotenv.config();

db.authenticate()
  .then(() => console.log("Databse connection successful"))
  .catch((error) => console.log("Connection error: ", error));

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());

app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Rutas
app.use("/login", loginRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/parqueaderos", parqueaderosRoutes);
app.use("/vehiculos", vehiculosRoutes);


app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});