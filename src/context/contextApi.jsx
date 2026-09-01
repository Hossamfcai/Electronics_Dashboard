import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Context = createContext();

export default function ContextApi({ children }) {
  const [products, setProducts] = useState([]);

  async function getAllProducts() {
    try {
      const response = await axios.get(
        "https://electronics-dashboard-backend.vercel.app/api/products"
      );

      console.log(response.data.data);

      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Context.Provider value={{ products }}>
      {children}
    </Context.Provider>
  );
}