import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { Context } from "../../context/ContextApi";
import ProductFormCard from "../../Components/ProductFormCard.jsx";

export default function AddProduct() {
  const { products, addProduct } = useContext(Context);
  const navigate = useNavigate();

  const categories = [
    ...new Set(products?.map((product) => product.category).filter(Boolean)),
  ];

  async function handleSaveProduct(productData) {
    const result = await addProduct(productData);

    if (result.success) {
      await Swal.fire({
        title: "Product Added!",
        text: `"${productData.name}" has been added successfully.`,
        icon: "success",
        confirmButtonText: "OK",
      });

      navigate("/dashboard/productlist");
    } else {
      await Swal.fire({
        title: "Error!",
        text: "Something went wrong while adding the product.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }

  return (
    <div className="min-h-screen bg-surface px-6 py-8 font-body">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="font-display text-headline-lg text-on-surface">
            Create New Product
          </h1>

          <p className="mt-1 text-body-sm text-on-surface-variant">
            Add a new item to your catalog.
          </p>
        </div>

        {/* Cancel */}
        <Link
          to="/dashboard/productlist"
          className="rounded-md border border-outline-variant bg-surface-container-lowest px-5 py-2.5 text-label-lg text-on-surface transition hover:bg-surface-container"
        >
          Cancel
        </Link>
      </div>

      {/* Form */}
      <ProductFormCard categories={categories} onSubmit={handleSaveProduct} />
    </div>
  );
}
