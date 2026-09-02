import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Context = createContext(undefined);

function ContextApiProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Backend API base URL from environment or default to localhost
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  async function getAllProducts() {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/products`);

      console.log("Products fetched:", response.data);

      // Backend returns { success, count, data: [...] }
      const productsData = response.data.data || [];
      setProducts(Array.isArray(productsData) ? productsData : []);
      setError(null);
    } catch (error) {
      console.error("Error fetching products:", error.message);
      setError(error.message);
      setProducts([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  const value = { products, loading, error, getAllProducts };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}

export default ContextApiProvider;