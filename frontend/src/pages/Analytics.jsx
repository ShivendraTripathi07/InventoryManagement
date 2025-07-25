import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { API } from "../utils";
import { AuthContext } from "../contexts/AuthContext";
import {
  TrendingUp,
  Package,
  Clock,
  BarChart3,
  Star,
  Calendar,
} from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Analytics Dashboard
            </h2>
          </div>
          <p className="text-gray-600">
            Track your inventory performance and insights
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Top Products Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Top Products
                    </h3>
                    <p className="text-emerald-100 text-sm">
                      Best performing items
                    </p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-white">
                  {topProducts.length}
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {topProducts.length > 0 ? (
                  topProducts.map((product, index) => (
                    <div
                      key={product._id}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-semibold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 truncate max-w-32">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-500">Product</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {product.quantity}
                        </p>
                        <p className="text-xs text-gray-500">Qty</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No data available</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Top Product Types Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Top Categories
                    </h3>
                    <p className="text-blue-100 text-sm">
                      Popular product types
                    </p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-white">
                  {topTypes.length}
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {topTypes.length > 0 ? (
                  topTypes.map((type, index) => (
                    <div
                      key={type._id}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 capitalize">
                            {type._id}
                          </p>
                          <p className="text-sm text-gray-500">Category</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {type.count}
                        </p>
                        <p className="text-xs text-gray-500">Items</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No data available</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Products Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Recent Additions
                    </h3>
                    <p className="text-purple-100 text-sm">
                      Newly added products
                    </p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-white">
                  {recentProducts.length}
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentProducts.length > 0 ? (
                  recentProducts.map((product) => (
                    <div
                      key={product._id}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Package className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 truncate max-w-32">
                            {product.name}
                          </p>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Calendar className="w-3 h-3" />
                            {new Date(product.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No recent products</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {topProducts.reduce(
                    (sum, product) => sum + product.quantity,
                    0
                  )}
                </p>
                <p className="text-gray-600">Total Top Product Quantity</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {topTypes.reduce((sum, type) => sum + type.count, 0)}
                </p>
                <p className="text-gray-600">Total Category Items</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {recentProducts.length}
                </p>
                <p className="text-gray-600">Recent Additions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
