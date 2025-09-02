import { notificarUsuarioService } from "../services/mail.service.js";

export const notificarUsuario = async (req, res) => {
  const { id, mensaje, parqueaderoId } = req.body;

  const email = req.usuario.email;

  if (!email || !id || !mensaje || !parqueaderoId) {
    return res.status(400).json({
      ok: false,
      error:
        "Faltan datos obligatorios (id, mensaje, parqueaderoId)",
    });
  }

  try {
    const result = await notificarUsuarioService({
      email,
      id,
      mensaje,
      parqueaderoId,
    });
    res.json({ ok: true, correo: result });
  } catch (error) {
    res.status(error.status || 500).json({
      ok: false,
      error: error.message || "Error interno en notificarUsuario",
    });
  }
};
