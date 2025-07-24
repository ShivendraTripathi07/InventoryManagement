const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  const newProduct = await Product.create(req.body);
  res.status(201).json({ product_id: newProduct._id, data: newProduct });
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Products
exports.getAllProducts = async (req, res) => {
  let { page = 1, limit = 10 } = req.query;

  // Convert to integers
  page = parseInt(page);
  limit = parseInt(limit);

  try {
    const products = await Product.find({})
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Product.countDocuments();

    res.json({
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      data: products,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get One Product by ID
exports.getOneProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET /analytics/top-products
exports.getTopProducts = async (req, res) => {
  try {
    const topProducts = await Product.find({}).sort({ quantity: -1 }).limit(5); // Top 5 most stocked products

    res.json(topProducts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
