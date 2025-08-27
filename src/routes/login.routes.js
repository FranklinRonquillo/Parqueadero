import Router from "express";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/usuario.js";

const loginRoutes = Router();

const token = jwt.sign({ id: 1 }, "secret", { expiresIn: "6h" });
// busca el usuario y su contraseña

loginRoutes.post("/login", async (req, res) => {
  try {
    console.log(req);
    const { usuario, pass } = req.body;
    const usuarioLogeado = await Usuario.findOne({
      where: {
        usuario,
        pass,
      },
    });

    await Usuario.update(
      { token },
      {
        where: {
          id: usuarioLogeado.id,
        },
      }
    );

    if (usuarioLogeado) {
      res.status(200).json({
        error: false,
        mensaje: "Usuario logueado correctamente",
        token,
      });
    } else {
      res.status(401).json({
        error: true,
        mensaje: "Usuario o contraseña incorrectos",
      });
    }
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al loguear el usuario",
      error,
    });
    return;
  }
});

export default loginRoutes;