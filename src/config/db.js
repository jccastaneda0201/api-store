// Requerimos la libreria
const mongoose = require("mongoose");

// Creamos la conexion a la base de datos
mongoose.connect(process.env.MONGO_URL);
