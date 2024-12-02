const Product = require("../models/products.model");

const getAll = async (req, res, next) => {
  try {
    const products = await Product.find().populate(
      "creator",
      "-_id username email"
    );
    //-_id para que no se incluya a la hora de mostrar creator
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

const getByPrice = async (req, res, next) => {
  const { min, max } = req.params;
  try {
    const product = await Product.find({
      price: { $gte: min, $lte: max },
    });
    res.json(product);
  } catch (error) {
    next(error);
  }
};

//Recuperar todos los productos disponibles y su estock es mayor de 10
const getAvailableProducts = async (req, res, next) => {
  try {
    const products = await Product.find({
      available: true,
      stock: { $gte: 10 },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  req.body.creator = req.user._id;
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const prod = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
    });
    res.json(prod);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = (req, res) => {
  const { productId } = req.params;
  Product.findByIdAndDelete(productId)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
};

module.exports = {
  getAll,
  getById,
  getByPrice,
  getAvailableProducts,
  create,
  update,
  deleteProduct,
};
