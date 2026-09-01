import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Context = createContext();

export default function ContextApi({ children }) {
  const [products, setProducts] = useState([]);

  async function getAllProducts() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/products",
      );

      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteProduct(id) {
    try {
      await axios.delete(
        `http://localhost:5000/api/products/${id}`,
      );

      // Remove deleted product from state
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
        deleteProduct,
      }}
    >
      {children}
    </Context.Provider>
  );
}
