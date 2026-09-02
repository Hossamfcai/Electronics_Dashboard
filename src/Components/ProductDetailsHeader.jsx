import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

import productService from "../services/productService";
import EditProductModal from "./EditProductModal";

export default function ProductDetailsHeader({ product, onProductUpdated, onProductDeleted }) {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const productId = product?.id ?? product?._id;

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Delete Product?",
      text: `Are you sure you want to delete "${product.name}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete Product",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ba1a1a",
    });

    if (!result.isConfirmed) return;

    try {
      await productService.deleteProduct(productId);

      onProductDeleted?.();

      await Swal.fire({
        title: "Deleted!",
        text: "Product has been deleted successfully.",
        icon: "success",
        confirmButtonColor: "#00685f",
        timer: 1600,
        timerProgressBar: true,
      });

      navigate("/Dashboard/ProductList", { replace: true });
    } catch (error) {
      console.error("Error deleting product:", error);

      Swal.fire({
        title: "Error",
        text:
          error.response?.data?.message ||
          "Failed to delete the product.",
        icon: "error",
      });
    }
  };

  return (
    <>
      {/* Keep the existing Product Details design exactly as it was. */}
      <motion.div
        className="flex flex-col gap-4 border-b border-outline-variant pb-5 md:flex-row md:items-end md:justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <div className="mb-2 flex items-center gap-2 text-body-sm text-on-surface-variant">
            <button
              type="button"
              onClick={() => navigate("/Dashboard/ProductList")}
              className="transition hover:text-primary"
            >
              Products
            </button>

            <span>&gt;</span>

            <span className="truncate">
              {product.name || "Product Details"}
            </span>
          </div>

          <h1 className="font-display text-headline-lg text-on-surface">
            Product Details
          </h1>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center gap-2 rounded-md border border-outline-variant bg-surface-container-lowest px-4 py-2 text-body-sm font-semibold text-on-surface transition hover:bg-surface-container-high"
          >
            <Edit size={16} />
            Edit Product
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center gap-2 rounded-md border border-error bg-surface-container-lowest px-4 py-2 text-body-sm font-semibold text-error transition hover:bg-error-container"
          >
            <Trash2 size={16} />
            Delete Product
          </button>
        </div>
      </motion.div>

      <EditProductModal
        product={product}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={(updatedProduct) => {
          onProductUpdated?.(updatedProduct);
        }}
      />
    </>
  );
}

