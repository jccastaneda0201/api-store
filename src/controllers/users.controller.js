const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/users.model");

// Route handlers for users

const register = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 12); // Generar un usuario con la password encriptada
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  try {
    //Existe el email en la BD
    if (!user) {
      return res.status(401).json({ message: "Error en email y/o contraseña" });
    }
    //Coinciden las password?
    const iguales = await bcrypt.compare(req.body.password, user.password);

    if (!iguales) {
      return res.status(401).json({ message: "Error en email y/o contraseña" });
    }
    //Login correcto
    res.json({
      message: "Login Correcto 🎉 🎊",
      token: jwt.sign({ user_id: user._id }, "clavesecreta"),
    });
  } catch (error) {
    next(error);
  }
};

const addProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    req.user.cart.push(productId);
    const user = await req.user.save();
    res.json(req.user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  addProduct,
};
