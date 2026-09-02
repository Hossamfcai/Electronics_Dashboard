import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import Swal from "sweetalert2";
import productService from "../services/productService";

const getProductId = (product) => product?.id ?? product?._id;

const getInitialForm = (product) => ({
  name: product?.name ?? "",
  category: product?.category ?? "",
  price: product?.price ?? "",
  stock: product?.stock ?? "",
  description: product?.description ?? "",
});

export default function EditProductModal({
  product,
  isOpen,
  onClose,
  onSuccess,
}) {
  const [formData, setFormData] = useState(getInitialForm(product));
  const [saving, setSaving] = useState(false);

  // Always load the selected product into the form when the modal opens
  // or when another product is selected.
  useEffect(() => {
    if (isOpen && product) {
      setFormData(getInitialForm(product));
    }
  }, [isOpen, product]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape" && !saving) {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, saving, onClose]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (saving) return;

    const productId = getProductId(product);
    const price = Number(formData.price);
    const stock = Number(formData.stock);

    if (!productId) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Product ID is missing.",
      });
      return;
    }

    if (!formData.name.trim()) {
      await Swal.fire({
        icon: "error",
        title: "Missing name",
        text: "Product name is required.",
      });
      return;
    }

    if (!Number.isFinite(price) || price < 0) {
      await Swal.fire({
        icon: "error",
        title: "Invalid price",
        text: "Price must be a valid non-negative number.",
      });
      return;
    }

    if (!Number.isInteger(stock) || stock < 0) {
      await Swal.fire({
        icon: "error",
        title: "Invalid stock",
        text: "Stock must be a non-negative whole number.",
      });
      return;
    }

    try {
      setSaving(true);

      const response = await productService.updateProduct(productId, {
        name: formData.name.trim(),
        category: formData.category.trim(),
        price,
        stock,
        description: formData.description.trim(),
      });

      const updatedProduct = response?.data ?? response;

      onSuccess?.(updatedProduct);
      onClose();

      await Swal.fire({
        icon: "success",
        title: "Product Updated",
        text: "The product has been updated successfully.",
        confirmButtonColor: "#00685f",
        timer: 1600,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error("Error updating product:", error);

      await Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          error.response?.data?.message ||
          "Failed to update the product.",
        confirmButtonColor: "#ba1a1a",
      });
    } finally {
      setSaving(false);
    }
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && product && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-product-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close edit product modal"
            className="absolute inset-0 h-full w-full cursor-default border-0 bg-black/45 backdrop-blur-[2px]"
            onClick={() => !saving && onClose()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal card */}
          <motion.div
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest shadow-2xl"
            initial={{ opacity: 0, y: 25, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          >
            <div className="flex items-start justify-between border-b border-outline-variant px-6 py-5">
              <div>
                <p className="text-label-sm text-primary">PRODUCT MANAGEMENT</p>
                <h2
                  id="edit-product-title"
                  className="mt-1 font-display text-headline-md text-on-surface"
                >
                  Edit Product
                </h2>
                <p className="mt-1 text-body-sm text-on-surface-variant">
                  Update the product information below.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                disabled={saving}
                aria-label="Close"
                className="rounded-md p-2 text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="max-h-[65vh] space-y-5 overflow-y-auto px-6 py-6">
                <div>
                  <label
                    htmlFor="edit-product-name"
                    className="mb-2 block text-body-sm font-semibold text-on-surface"
                  >
                    Product Name
                  </label>
                  <input
                    id="edit-product-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    autoFocus
                    className="w-full rounded-md border border-outline-variant bg-surface-container-low px-4 py-3 text-body-md text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                  />
                </div>

                <div>
                  <label
                    htmlFor="edit-product-category"
                    className="mb-2 block text-body-sm font-semibold text-on-surface"
                  >
                    Category
                  </label>
                  <input
                    id="edit-product-category"
                    name="category"
                    type="text"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-md border border-outline-variant bg-surface-container-low px-4 py-3 text-body-md text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="edit-product-price"
                      className="mb-2 block text-body-sm font-semibold text-on-surface"
                    >
                      Price ($)
                    </label>
                    <input
                      id="edit-product-price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full rounded-md border border-outline-variant bg-surface-container-low px-4 py-3 text-body-md text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="edit-product-stock"
                      className="mb-2 block text-body-sm font-semibold text-on-surface"
                    >
                      Stock
                    </label>
                    <input
                      id="edit-product-stock"
                      name="stock"
                      type="number"
                      min="0"
                      step="1"
                      value={formData.stock}
                      onChange={handleChange}
                      className="w-full rounded-md border border-outline-variant bg-surface-container-low px-4 py-3 text-body-md text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="edit-product-description"
                    className="mb-2 block text-body-sm font-semibold text-on-surface"
                  >
                    Description
                  </label>
                  <textarea
                    id="edit-product-description"
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full resize-none rounded-md border border-outline-variant bg-surface-container-low px-4 py-3 text-body-md text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                  />
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-outline-variant bg-surface-container-low px-6 py-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={saving}
                  className="rounded-md border border-outline-variant px-5 py-2.5 text-body-sm font-semibold text-on-surface transition hover:bg-surface-container-high disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-body-sm font-bold text-on-primary transition hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving && <Loader2 size={17} className="animate-spin" />}
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
