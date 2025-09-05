import { notificarUsuarioService } from "../services/mail.service.js";
import { BadRequestError } from "../utils/errors.js";

export const notificarUsuario = async (req, res, next) => {
  const { id, destinatario, mensaje, parqueaderoId } = req.body;

  const email = req.usuario.email;

  if (!email || !id || !destinatario || !mensaje || !parqueaderoId) {
    throw new BadRequestError(
      "Faltan datos obligatorios (id, destinatario, mensaje, parqueaderoId)"
    );
  }

  try {
    const result = await notificarUsuarioService({
      email,
      id,
      destinatario,
      mensaje,
      parqueaderoId,
    });
    res.json({ ok: true, correo: result });
  } catch (error) {
    next(error);
  }
};
