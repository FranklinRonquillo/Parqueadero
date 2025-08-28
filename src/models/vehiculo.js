import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

//modelo de vehiculo
const Vehiculo = sequelize.define("vehiculos", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
  },
  parqueadero_id: {
    type: DataTypes.INTEGER,
  },
}, {
  tableName: "vehiculos", 
  timestamps: false    
});

export { Vehiculo };