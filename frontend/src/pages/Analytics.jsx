import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { API } from "../utils";
import { AuthContext } from "../contexts/AuthContext";

const Analytics = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [topTypes, setTopTypes] = useState([]);

  const [recentProducts, setRecentProducts] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [topProductsRes, topTypesRes, recentRes] = await Promise.all([
          axios.get(API.ANALYTICS.TOP_PRODUCTS, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(API.ANALYTICS.TOP_TYPES, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(API.ANALYTICS.RECENT_PRODUCTS, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setTopProducts(topProductsRes.data);
        setTopTypes(topTypesRes.data);
        // setLowStock(lowStockRes.data.data);
        setRecentProducts(recentRes.data);
      } catch (err) {
        console.error("Error fetching analytics:", err);
      }
    };
    if (token) fetchAnalytics();
  }, [token]);

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-6">Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Top Products</h3>
          <ul>
            {topProducts.map((product) => (
              <li key={product._id} className="mb-2">
                {product.name} - Quantity: {product.quantity}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Top Product Types</h3>
          <ul>
            {topTypes.map((type) => (
              <li key={type._id} className="mb-2">
                {type._id} - Count: {type.count}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Products</h3>
          <ul>
            {recentProducts.map((product) => (
              <li key={product._id} className="mb-2">
                {product.name} - Added:{" "}
                {new Date(product.createdAt).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
