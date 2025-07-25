import { useState, useContext } from "react";
import axios from "axios";
import { API } from "../utils";
import { AuthContext } from "../contexts/AuthContext";
import ProductForm from "./ProductForm";

const ProductCard = ({ product, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { token } = useContext(AuthContext);

  const handleUpdate = () => {
    setIsEditing(true);
  };

  const handleUpdateComplete = () => {
    setIsEditing(false);
    onUpdate();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      {isEditing ? (
        <ProductForm product={product} onAddProduct={handleUpdateComplete} />
      ) : (
        <>
          <img
            src={product.image_url || "https://via.placeholder.com/150"}
            alt={product.name}
            className="w-full h-40 object-cover rounded mb-4"
          />
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p>Type: {product.type}</p>
          <p>SKU: {product.sku}</p>
          <p>Price: ${product.price}</p>
          <p>Quantity: {product.quantity}</p>
          <p className="text-sm text-gray-600">{product.description}</p>
          <button
            onClick={handleUpdate}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default ProductCard;
