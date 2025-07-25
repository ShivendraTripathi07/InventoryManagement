import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { API } from "../utils";
import { AuthContext } from "../contexts/AuthContext";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import {
  Plus,
  Search,
  Filter,
  Package,
  DollarSign,
  TrendingUp,
  Grid,
  List,
} from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const { token } = useContext(AuthContext);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${API.PRODUCTS.GET_ALL}?page=${page}&limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    if (token) fetchProducts();
  }, [page, token]);

  const handleAddProduct = () => {
    fetchProducts();
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  // Calculate stats
  const totalProducts = products.length;
  const totalStock = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );
  const totalValue = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  const lowStockProducts = products.filter(
    (product) => product.quantity < 10
  ).length;

  // Filter products based on search
  const filteredProducts = products.filter(
    (product) =>
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Products
              <span className="text-lg font-normal text-gray-500 ml-2">
                ({totalProducts} items)
              </span>
            </h1>
            <p className="text-gray-600 text-lg">
              Manage your product inventory and track stock levels
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products, SKU, type..."
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-80 bg-white/70 backdrop-blur-sm shadow-sm"
              />
            </div>

            {/* View Toggle */}
            <div className="flex bg-white/70 backdrop-blur-sm rounded-xl border border-gray-300 p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Add Product Button */}
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </button>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Total Products
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {totalProducts}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  +12% from last month
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <Package className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Total Stock
                </p>
                <p className="text-3xl font-bold text-gray-900">{totalStock}</p>
                <p className="text-xs text-green-600 mt-1">Well stocked</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Total Value
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  ${totalValue.toFixed(2)}
                </p>
                <p className="text-xs text-blue-600 mt-1">Inventory worth</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-xl">
                <DollarSign className="w-8 h-8 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Low Stock Alert
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {lowStockProducts}
                </p>
                <p className="text-xs text-amber-600 mt-1">Items below 10</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-xl">
                <Filter className="w-8 h-8 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-white/40 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Product Inventory
              {searchTerm && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  ({filteredProducts.length} results for "{searchTerm}")
                </span>
              )}
            </h2>

            {filteredProducts.length === 0 && searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear search
              </button>
            )}
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onUpdate={fetchProducts}
                  onEdit={handleEditProduct}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? "No products found" : "No products yet"}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm
                  ? `No products match "${searchTerm}". Try adjusting your search.`
                  : "Get started by adding your first product to the inventory."}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors duration-200 font-medium"
                >
                  <Plus className="w-5 h-5" />
                  Add Your First Product
                </button>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-6">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="flex items-center gap-2 px-6 py-3 bg-white/70 backdrop-blur-sm border border-gray-300 rounded-xl hover:bg-white hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
            >
              ← Previous
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                      page === pageNum
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-white/70 backdrop-blur-sm text-gray-600 hover:bg-white hover:shadow-md"
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="flex items-center gap-2 px-6 py-3 bg-white/70 backdrop-blur-sm border border-gray-300 rounded-xl hover:bg-white hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      <ProductForm
        product={editingProduct}
        onAddProduct={handleAddProduct}
        isOpen={showForm}
        onClose={handleCloseForm}
      />
    </div>
  );
};

export default Products;
