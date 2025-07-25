const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
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

exports.getAllProducts = async (req, res) => {
  let { page = 1, limit = 10 } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);

  try {
    const products = await Product.find({})
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({
        createdAt: -1,
      });

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

exports.getTopProducts = async (req, res) => {
  try {
    const topProducts = await Product.find({}).sort({ quantity: -1 }).limit(5);

    res.json(topProducts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTopTypes = async (req, res) => {
  try {
    const result = await Product.aggregate([
      { $match: { isDeleted: { $ne: true } } },
      { $group: { _id: "$type", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getStockSummary = async (req, res) => {
  try {
    const result = await Product.aggregate([
      { $match: { isDeleted: { $ne: true } } },
      {
        $group: {
          _id: null,
          totalQuantity: { $sum: "$quantity" },
          totalValue: { $sum: { $multiply: ["$price", "$quantity"] } },
        },
      },
    ]);
    res.json(result[0] || { totalQuantity: 0, totalValue: 0 });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getRecentProducts = async (req, res) => {
  const days = parseInt(req.query.days) || 1;
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  try {
    const products = await Product.find({
      createdAt: { $gte: cutoffDate },
      isDeleted: { $ne: true },
    }).sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

