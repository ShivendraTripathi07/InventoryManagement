const express = require("express");
const {
  addProduct,
  updateProduct,
  getAllProducts,
  getOneProduct,
  getTopProducts,
} = require("../controllers/productController");
const auth = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/products", auth, addProduct);
router.put("/products/:id", auth, updateProduct);

router.get("/products", auth, getAllProducts);

router.get("/products/:id", auth, getOneProduct);
router.get("/analytics/top-products", auth, isAdmin, getTopProducts);
module.exports = router;
