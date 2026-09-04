import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import EditProductModal from "./EditProductModal";
import { useProductDispatch, useProductState } from "../context/productContext";

export default function ProductDetailsHeader({ product }) {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { deleteProduct } = useProductDispatch();
  const { error } = useProductState();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Delete Product",
      text: `Are you sure you want to delete "${product.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete Product",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      customClass: {
        popup:
          "bg-surface-container-lowest font-body rounded-xl border border-outline-variant text-on-surface",
        title: "font-display text-on-surface font-bold text-2xl",
        htmlContainer: "text-on-surface-variant text-sm",
        confirmButton:
          "bg-error text-on-error hover:bg-error/90 font-display font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm",
        cancelButton:
          "bg-surface-container hover:bg-surface-container-high text-on-surface font-display font-medium px-5 py-2.5 rounded-lg border border-outline-variant transition-colors",
        actions: "gap-3",
      },
      buttonsStyling: false, // Disables default SweetAlert2 button styles
    });

    if (result.isConfirmed) {
      deleteProduct(product.id);
      if (!error) {
        await Swal.fire({
          title: "Deleted!",
          text: `"${product.name}" has been deleted successfully.`,
          icon: "success",
          iconColor: "var(--color-primary)",
          timer: 800, // Closes after 2 seconds (2000ms)
          timerProgressBar: true,
          buttonsStyling: false,
          customClass: {
            popup:
              "bg-surface-container-lowest font-body rounded-xl border border-outline-variant text-on-surface p-6 shadow-lg",
            title: "font-display text-on-surface font-bold text-2xl mb-1",
            htmlContainer: "text-on-surface-variant text-sm",
            confirmButton:
              "bg-primary text-on-primary hover:bg-primary/90 font-display font-medium px-6 py-2.5 rounded-lg transition-colors shadow-sm cursor-pointer",
          },
        });
        navigate("/Dashboard/ProductList");
      } else {
        await Swal.fire({
          title: "Error!",
          text:
            typeof error === "string"
              ? error
              : "Something went wrong while deleting the product.",
          icon: "error",
          iconColor: "var(--color-error)",
          confirmButtonText: "OK",
          buttonsStyling: false,
          customClass: {
            popup:
              "bg-surface-container-lowest font-body rounded-xl border border-outline-variant text-on-surface p-6 shadow-lg",
            title: "font-display text-on-surface font-bold text-2xl mb-1",
            htmlContainer: "text-on-surface-variant text-sm",
            confirmButton:
              "bg-error text-on-error hover:bg-error/90 font-display font-medium px-6 py-2.5 rounded-lg transition-colors shadow-sm cursor-pointer",
          },
        });
      }
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
      />
    </>
  );
}
