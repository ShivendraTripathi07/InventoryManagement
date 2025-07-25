const express = require("express");
const {
  addProduct,
  updateProduct,
  getAllProducts,
  getOneProduct,
  getTopProducts,
  getTopTypes,
  getStockSummary,
  getRecentProducts,
  getLowStockProducts,
} = require("../controllers/productController");
const auth = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/products", auth, addProduct);
router.put("/products/:id", auth, updateProduct);

router.get("/products", auth, getAllProducts);

router.get("/products/:id", auth, getOneProduct);
router.get("/analytics/top-products", auth, getTopProducts);
router.get("/analytics/top-types", auth, getTopTypes);
router.get("/analytics/stock-summary", auth, isAdmin, getStockSummary);
router.get("/analytics/recent", auth, getRecentProducts);

module.exports = router;
