import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Context = createContext(undefined);

function ContextApiProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Backend API base URL from environment or default to localhost
  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  async function getAllProducts() {
    try {
      const response = await axios.get("http://localhost:5000/api/products");

      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function addProduct(productData) {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/products",
        productData,
      );

      // Add the newly created product to state
      setProducts((prevProducts) => [...prevProducts, response.data.data]);

      return {
        success: true,
        data: response.data.data,
      };
    } catch (error) {
      console.log(error);

      return {
        success: false,
        error,
      };
    }
  }

  async function updateProduct(id, productData) {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/${id}`,
        productData,
      );

      const updatedProduct = response.data.data;

      setProducts((prev) =>
        prev.map((product) =>
          product.id.toString() === id.toString() ? updatedProduct : product,
        ),
      );

      return {
        success: true,
        data: updatedProduct,
      };
    } catch (error) {
      console.log(error);

      return {
        success: false,
        error,
      };
    }
  }

  async function deleteProduct(id) {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id),
      );

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  const value = { products, loading, error, getAllProducts };

  return (
    <Context.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        updateProduct,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextApiProvider;
