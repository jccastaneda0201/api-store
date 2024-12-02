const {
  getAll,
  create,
  update,
  deleteProduct,
  getById,
  getByPrice,
  getAvailableProducts,
} = require("../../controllers/products.controller");
const { checkToken } = require("../../middlewares/users.middleware");

const router = require("express").Router();

// Route handlers for products

router.get("/", getAll);

router.get("/price/:min/:max", getByPrice);

router.get("/actives", getAvailableProducts);

router.get("/:productId", getById);

router.post("/", checkToken, create);

router.put("/:productId", update);

router.delete("/:productId", deleteProduct);

module.exports = router;
