import { useContext } from "react";
import { Context } from "../../context/ContextApi.jsx";

export default function ProductList() {
  const { products } = useContext(Context);

  console.log(products);

  return <div className="text-black">ProductList</div>;
}
