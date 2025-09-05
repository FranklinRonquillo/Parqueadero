import { Usuario } from "./usuario.js";
import { Parqueadero } from "./parqueadero.js";
import { Vehiculo } from "./vehiculo.js";
import { Entrada } from "./entrada.js";

/* =========================
   RELACIONES
   ========================= */

// Usuario - Parqueadero
Usuario.hasMany(Parqueadero, {
  foreignKey: "usuario_id",
  sourceKey: "id",
});
Parqueadero.belongsTo(Usuario, {
  foreignKey: "usuario_id",
  targetKey: "id",
});

// Parqueadero - Vehiculo
Parqueadero.hasMany(Vehiculo, {
  foreignKey: "parqueadero_id",
  sourceKey: "id",
});
Vehiculo.belongsTo(Parqueadero, {
  foreignKey: "parqueadero_id",
  targetKey: "id",
});

// Parqueadero - Entrada
Parqueadero.hasMany(Entrada, {
  foreignKey: "parqueadero_id",
  sourceKey: "id",
});
Entrada.belongsTo(Parqueadero, {
  foreignKey: "parqueadero_id",
  targetKey: "id",
});

// Vehiculo - Entrada
Vehiculo.hasMany(Entrada, {
  foreignKey: "vehiculo_id",
  sourceKey: "id",
});
Entrada.belongsTo(Vehiculo, {
  foreignKey: "vehiculo_id",
  targetKey: "id",
});

export { Usuario, Parqueadero, Vehiculo, Entrada };