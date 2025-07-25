import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { API } from "../utils";
import { AuthContext } from "../contexts/AuthContext";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
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
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-6">Products</h2>
      <ProductForm onAddProduct={handleAddProduct} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onUpdate={fetchProducts}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-center space-x-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
