import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./database/db.js";

import rutas from "./routes/index.routes.js";

import { seedData } from "./seed.js";

dotenv.config();

async function init() {
  try {
    await db.authenticate();
    console.log("Database connection successful");
    // await db.sync({ alter: true });
    await seedData();
  } catch (error) {
    console.error("Connection error: ", error);
  }
}
init();

const app = express();

app.use(morgan("dev"));

app.use(bodyParser.json());

app.use(cors());

app.use("/", rutas);

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
