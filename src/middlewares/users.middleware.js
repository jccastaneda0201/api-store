//Importaciones Librerias
const jwt = require("jsonwebtoken");

//Importaciones propias

const User = require("../models/users.model");

const checkToken = async (req, res, next) => {
  // Esta el token incluido en las cabeceras? Authorization donde se incluyen
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Debes incluir el token" });
  }
  // Verifica el token usando el algoritmo de JWT (JSON Web Tokens)
  let data;
  try {
    data = jwt.verify(token, "clavesecreta"); // 'clavesecreta' es la clave con la que se encripto el token en helpers.
  } catch (error) {
    return res.status(401).json({ message: "El token es incorrecto" });
  }
  //console.log(data);

  // Verifica si el usuario existe en la base de datos
  const user = await User.findById(data.user_id);
  if (!user) {
    return res.status(401).json({ message: "El usuario no existe" });
  }
  //Enlazar el usuario con la peticion activa
  req.user = user; //Enganchar los datos de el usuario que esta haciendo la peticion

  //Siempre que la peticion atraviese con exito el middleware checktoken, tenemos disponible req.user con los datos de el usuario logado.

  next();
};

module.exports = {
  checkToken,
};
