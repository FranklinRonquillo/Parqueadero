import axios from "axios";

export const notificarUsuario = async (req, res) => {
  const { email, nombre } = req.body;

  try {
    const response = await axios.post("http://localhost:4000/enviarCorreo", {
      to: email,
      subject: "Bienvenido",
      message: `Hola ${nombre}, gracias por registrarte`
    });

    res.json({
      ok: true,
      correo: response.data
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: "No se pudo contactar el servicio de correo"
    });
  }
};
