import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

//modelo de parqueadero
const Parqueadero = sequelize.define("parqueaderos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
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
  habilitado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: "parqueaderos", 
  timestamps: false    
});

export { Parqueadero };