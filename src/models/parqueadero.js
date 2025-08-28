import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

//modelo de parqueadero
const Parqueadero = sequelize.define("parqueaderos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
  },
  capacidad: {
    type: DataTypes.INTEGER,
  },
  costo_hora: {
    type: DataTypes.INTEGER,
  },
}, {
  tableName: "parqueaderos", 
  timestamps: false    
});

export { Parqueadero };