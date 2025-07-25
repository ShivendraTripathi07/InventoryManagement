import { useState } from "react";
import { Package, Edit3, MoreVertical, Eye, Trash2 } from "lucide-react";

const ProductCard = ({ product, onUpdate, onEdit }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleEdit = () => {
    onEdit(product);
    setShowMenu(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
      {/* Image Section */}
      <div className="relative aspect-w-16 aspect-h-12 bg-gradient-to-br from-gray-100 to-gray-200">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
        )}

        {/* Stock Status Badge */}
        <div className="absolute top-3 left-3">
          {product.quantity > 0 ? (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              In Stock
            </span>
          ) : (
            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
              Out of Stock
            </span>
          )}
        </div>

        {/* Actions Menu */}
        <div className="absolute top-3 right-3">
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200 shadow-sm"
            >
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => setShowMenu(false)}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                <button
                  onClick={() => setShowMenu(false)}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-200">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{product.type}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description || "No description available"}
        </p>

        {/* Product Details */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              SKU
            </span>
            <span className="text-sm font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded">
              {product.sku || "N/A"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Quantity
            </span>
            <span
              className={`text-sm font-semibold px-2 py-1 rounded ${
                product.quantity > 10
                  ? "text-green-700 bg-green-100"
                  : product.quantity > 0
                  ? "text-yellow-700 bg-yellow-100"
                  : "text-red-700 bg-red-100"
              }`}
            >
              {product.quantity}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Price
          </span>
          <div className="text-right">
            <span className="text-2xl font-bold text-gray-900">
              $
              {typeof product.price === "number"
                ? product.price.toFixed(2)
                : "0.00"}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleEdit}
          className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-200 font-medium flex items-center justify-center gap-2 group-hover:shadow-md"
        >
          <Edit3 className="w-4 h-4" />
          Edit Product
        </button>
      </div>

      {/* Click outside to close menu */}
      {showMenu && (
        <div className="fixed inset-0 z-0" onClick={() => setShowMenu(false)} />
      )}
    </div>
  );
};

export default ProductCard;
