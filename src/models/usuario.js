import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

//modelo de usuario
const Usuario = sequelize.define("usuarios", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pass: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.ENUM("admin", "socio"),
    allowNull: false,
  },
}, {
  tableName: "usuarios",   // asegura que Sequelize use tu tabla real
  timestamps: false        // evita errores con createdAt / updatedAt
});

export { Usuario };
