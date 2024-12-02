const {
  register,
  login,
  addProduct,
} = require("../../controllers/users.controller");
const { checkToken } = require("../../middlewares/users.middleware");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.put("/add-product/:productId", checkToken, addProduct);

module.exports = router;
