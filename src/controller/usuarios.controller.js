import { Usuario } from "../models/usuario.js";

export const crearUsuario = async (req, res) => {
  try {
    const { nombre, usuario, pass } = req.body;
    
    const usuarioExistente = await Usuario.findOne({
      where: { usuario },
    }); 
    if(usuarioExistente){
      return res.status(400).json({
        mensaje: "El usuario ya existe",
      });
    }

    const usuarioNuevo = await Usuario.create({
      nombre,
      usuario,
      pass,
      rol: "Socio",
    });

    res.status(200).json({
      error: false,
      mensaje: "Usuario creado correctamente",
      usuario: usuarioNuevo,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear el usuario",
      error,
    });
    return;
  }
};

export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();

    res.status(200).json({
      error: false,
      mensaje: "usuarios obtenidos correctamente",
      usuarios,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los usuarios",
      error,
    });
    return;
  }
};
