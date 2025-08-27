import Router from "express";

const vehiculosRoutes = Router();

vehiculosRoutes.get("/", (req, res) => {
    res.send("Vehiculos");
});

//crear vehiculo

vehiculosRoutes.post("/create", async (req, res) => {
  try {
    const { usuario_id, marca, modelo, color, anio, cilindrada, potencia, tipo, cantidad, precio } = req.body;

    const vehiculoNuevo = await Vehiculo.create({
      usuario_id,
      marca,
      modelo,
      color,
      anio,
      cilindrada,
      potencia,
      tipo,
      cantidad,
      precio,
    });

    res.status(200).json({
      error: false,
      mensaje: "Vehiculo creado correctamente",
      vehiculo: vehiculoNuevo,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear el vehiculo",
      error,
    });
    return;
  } 
});

//obtener vehiculos
vehiculosRoutes.get("/get",async (req, res) => {
    try {
    const vehiculos = await Vehiculo.findAll();

    res.status(200).json({
      error: false,
      mensaje: "vehiculos obtenidos correctamente",
      vehiculos,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los vehiculos",
      error,
    });
    return;
  }
});

export default vehiculosRoutes; 