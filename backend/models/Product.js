const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
    sku: String,
    image_url: String,
    description: String,
    quantity: Number,
    price: Number,
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
