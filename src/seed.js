import bcrypt from "bcrypt";
import { Usuario } from "./models/usuario.js";

export async function seedData() {
  try {
    const hashedPassword = await bcrypt.hash("admin", 10);

    const [admin, created] = await Usuario.findOrCreate({
      where: { usuario: "admin@mail.com" },
      defaults: {
        nombre: "Admin",
        pass: hashedPassword,
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
