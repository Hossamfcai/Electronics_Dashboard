import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { Context } from "../../context/contextApi";
import ProductFormCard from "../../Components/ProductFormCard.jsx";

export default function EditProduct() {
  const { products, updateProduct } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products?.find((product) => product.id.toString() === id);

  const categories = [
    ...new Set(products?.map((product) => product.category).filter(Boolean)),
  ];

  async function handleUpdateProduct(productData) {
    const result = await updateProduct(id, productData);

    if (result.success) {
      await Swal.fire({
        title: "Product Updated!",
        text: `"${productData.name}" has been updated successfully.`,
        icon: "success",
        confirmButtonText: "OK",
      });

      navigate("/dashboard/productlist");
    } else {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while updating the product.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-surface px-6 py-8">
        <h1 className="text-headline-lg text-on-surface">Product Not Found</h1>

        <Link
          to="/dashboard/productlist"
          className="mt-4 inline-block rounded-md bg-primary px-5 py-3 text-on-primary"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface px-6 py-8 font-body">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="font-display text-headline-lg text-on-surface">
            Edit Product
          </h1>

          <p className="mt-1 text-body-sm text-on-surface-variant">
            Update the product information below.
          </p>
        </div>

        <Link
          to="/dashboard/productlist"
          className="rounded-md border border-outline-variant bg-surface-container-lowest px-5 py-2.5 text-label-lg text-on-surface transition hover:bg-surface-container"
        >
          Cancel
        </Link>
      </div>

      {/* Same Form */}
      <ProductFormCard
        initialData={product}
        categories={categories}
        onSubmit={handleUpdateProduct}
        isEdit={true}
      />
    </div>
  );
}
