import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Context = createContext();

export default function ContextApi({ children }) {
  const [products, setProducts] = useState([]);

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

  return (
    <Context.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
      }}
    >
      {children}
    </Context.Provider>
  );
}
