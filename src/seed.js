import { Usuario } from "./models/usuario.js";

export async function seedData() {
  try {
    const [admin, created] = await Usuario.findOrCreate({
      where: { usuario: "admin@mail.com" },
      defaults: {
        nombre: "Admin",
        pass: "admin",
        rol: "Admin",
      },
    });

    if (created) {
      console.log("✅ Usuario admin creado");
    } else {
      console.log("ℹ️ Usuario admin ya existía");
    }
  } catch (error) {
    console.error("❌ Error en seedData:", error);
  }
}