import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { API } from "../utils";
import { AuthContext } from "../contexts/AuthContext";

const Admin = () => {
  const [stockSummary, setStockSummary] = useState({
    totalQuantity: 0,
    totalValue: 0,
  });
  const { token, user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.role !== "admin") return;
    const fetchStockSummary = async () => {
      try {
        const res = await axios.get(API.ANALYTICS.STOCK_SUMMARY, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStockSummary(res.data);
      } catch (err) {
        console.error("Error fetching stock summary:", err);
      }
    };
    if (token) fetchStockSummary();
  }, [token, user]);

  if (user?.role !== "admin") {
    return (
      <div className="container mx-auto text-red-500">
        Admin access required
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Stock Summary</h3>
        <p>Total Quantity: {stockSummary.totalQuantity}</p>
        <p>Total Value: ${stockSummary.totalValue.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Admin;
