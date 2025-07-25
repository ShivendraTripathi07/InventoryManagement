import { useState, useContext } from "react";
import axios from "axios";
import { API } from "../utils";
import { AuthContext } from "../contexts/AuthContext";
import uplpoadImage from "../utils/uplpoadImage"; // Import the Cloudinary upload function

const ProductForm = ({ product = null, onAddProduct }) => {
  const [formData, setFormData] = useState(
    product || {
      name: "",
      type: "",
      sku: "",
      image_url: "",
      description: "",
      quantity: 0,
      price: 0,
    }
  );
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const { token } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const response = await uplpoadImage(file);
      if (response.secure_url) {
        setFormData({ ...formData, image_url: response.secure_url });
      } else {
        setError("Failed to upload image");
      }
    } catch (err) {
      setError("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (product) {
        await axios.put(API.PRODUCTS.UPDATE(product._id), formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(API.PRODUCTS.ADD, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      onAddProduct();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save product");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">
        {product ? "Edit Product" : "Add Product"}
      </h3>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Type</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">SKU</label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
            disabled={uploading}
          />
          {uploading && <p className="text-blue-500">Uploading...</p>}
          {formData.image_url && (
            <img
              src={formData.image_url}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded"
            />
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image URL (Manual)</label>
          <input
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Or enter image URL manually"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="0"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="0"
            step="0.01"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={uploading}
        >
          {product ? "Update Product" : "Add Product"}
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
