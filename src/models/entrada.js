import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

//modelo de entrada
const Entrada = sequelize.define("entradas", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  vehiculo_id: {
    type: DataTypes.STRING,
  },
  parqueadero_id: {
    type: DataTypes.INTEGER,
  },
  horaEntrada: {
    type: DataTypes.DATE,
  },
  horaSalida: {
    type: DataTypes.DATE,
  },
  costo: {
    type: DataTypes.INTEGER,
  },
}, {
  tableName: "entradas", 
  timestamps: false    
});

export { Entrada };