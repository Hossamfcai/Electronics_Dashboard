import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ImageOff, Loader2, X } from "lucide-react";
import Swal from "sweetalert2";
import { useProductDispatch, useProductState } from "../context/productContext";
import { useParams } from "react-router-dom";

export default function EditProductModal({ isOpen, onClose }) {
  const { id } = useParams();
  const { specificProduct, loading } = useProductState();
  const { updateProduct, getSpecificProduct } = useProductDispatch();
  const [imageError, setImageError] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      category: "",
      price: 0,
      stock: 0,
      image: "",
      description: "",
    },
    validate: {
      name: (value) => (value.trim().length < 2 ? "Name is required" : null),
      price: (value) => (value < 0 ? "Price must be non-negative" : null),
      stock: (value) => (value < 0 ? "Stock cannot be negative" : null),
    },
  });

  useEffect(() => {
    if (isOpen && id && !specificProduct) {
      getSpecificProduct(id);
    }
  }, [isOpen, id, specificProduct, getSpecificProduct]);

  useEffect(() => {
    if (isOpen && specificProduct) {
      form.setValues({
        name: specificProduct.name || "",
        category: specificProduct.category || "",
        price: specificProduct.price || 0,
        stock: specificProduct.stock || 0,
        image: specificProduct.image || "",
        description: specificProduct.description || "",
      });
      setImageError(false);
    }
  }, [isOpen, specificProduct]);

  const onSubmit = async (values) => {
    const targetId = specificProduct?.id || id;
    const response = await updateProduct(values, targetId);

    if (response) {
      await Swal.fire({
        title: "Product Updated!",
        text: `"${specificProduct?.name || values.name}" has been updated successfully.`,
        icon: "success",
        iconColor: "var(--color-primary)",
        confirmButtonText: "OK",
        timer: 2000,
        timerProgressBar: true,
        heightAuto: false,
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
    } else {
      await Swal.fire({
        title: "Error!",
        text: "Something went wrong while updating the product.",
        icon: "error",
        iconColor: "var(--color-error)",
        confirmButtonText: "OK",
        timer: 3000,
        timerProgressBar: true,
        heightAuto: false,
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
    onClose();
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
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
            onClick={() => onClose()}
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
                aria-label="Close"
                className="rounded-md p-2 text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            {loading || !specificProduct ? (
              <div className="flex h-64 items-center justify-center">
                <Loader2 size={32} className="animate-spin text-primary" />
              </div>
            ) : (
              <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
                <div className="max-h-[65vh] space-y-5 overflow-y-auto px-6 py-6">
                  {/* Product Name */}
                  <div>
                    <label
                      htmlFor="edit-product-name"
                      className="mb-2 block text-body-sm font-semibold text-on-surface"
                    >
                      Product Name
                    </label>
                    <input
                      id="edit-product-name"
                      type="text"
                      autoFocus
                      className="w-full rounded-md border border-outline-variant bg-surface-container-low px-4 py-3 text-body-md text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                      {...form.getInputProps("name")}
                    />
                    {form.errors.name && (
                      <span className="mt-1 block text-xs text-red-500">
                        {form.errors.name}
                      </span>
                    )}
                  </div>

                  {/* Category */}
                  <div>
                    <label
                      htmlFor="edit-product-category"
                      className="mb-2 block text-body-sm font-semibold text-on-surface"
                    >
                      Category
                    </label>
                    <input
                      id="edit-product-category"
                      type="text"
                      className="w-full rounded-md border border-outline-variant bg-surface-container-low px-4 py-3 text-body-md text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                      {...form.getInputProps("category")}
                    />
                  </div>

                  {/* Price & Stock Row */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {/* Price */}
                    <div>
                      <label
                        htmlFor="edit-product-price"
                        className="mb-2 block text-body-sm font-semibold text-on-surface"
                      >
                        Price ($)
                      </label>
                      <input
                        id="edit-product-price"
                        type="number"
                        min="0"
                        step="0.01"
                        className="w-full rounded-md border border-outline-variant bg-surface-container-low px-4 py-3 text-body-md text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                        {...form.getInputProps("price")}
                      />
                      {form.errors.price && (
                        <span className="mt-1 block text-xs text-red-500">
                          {form.errors.price}
                        </span>
                      )}
                    </div>

                    {/* Stock */}
                    <div>
                      <label
                        htmlFor="edit-product-stock"
                        className="mb-2 block text-body-sm font-semibold text-on-surface"
                      >
                        Stock
                      </label>
                      <input
                        id="edit-product-stock"
                        type="number"
                        min="0"
                        step="1"
                        className="w-full rounded-md border border-outline-variant bg-surface-container-low px-4 py-3 text-body-md text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                        {...form.getInputProps("stock")}
                      />
                      {form.errors.stock && (
                        <span className="mt-1 block text-xs text-red-500">
                          {form.errors.stock}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Image URL Input Field */}
                  <div>
                    <label
                      htmlFor="edit-product-image"
                      className="mb-2 block text-body-sm font-semibold text-on-surface"
                    >
                      Image URL
                    </label>
                    <input
                      id="edit-product-image"
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      className="w-full rounded-md border border-outline-variant bg-surface-container-low px-4 py-3 text-body-md text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                      {...form.getInputProps("image")}
                      onChange={(e) => {
                        form.getInputProps("image").onChange(e);
                        setImageError(false);
                      }}
                    />

                    {/* Image Preview Window */}
                    {form.values.image && (
                      <div className="relative mt-3 flex h-40 w-full items-center justify-center overflow-hidden rounded-md border border-outline-variant bg-surface-container-low">
                        {imageError ? (
                          <div className="flex flex-col items-center gap-1 text-on-surface-variant">
                            <ImageOff size={24} />
                            <span className="text-xs">Invalid image URL</span>
                          </div>
                        ) : (
                          <img
                            src={form.values.image}
                            alt="Product preview"
                            className="h-full w-full object-contain px-4 py-2"
                            onError={() => setImageError(true)}
                          />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      htmlFor="edit-product-description"
                      className="mb-2 block text-body-sm font-semibold text-on-surface"
                    >
                      Description
                    </label>
                    <textarea
                      id="edit-product-description"
                      rows="4"
                      className="w-full resize-none rounded-md border border-outline-variant bg-surface-container-low px-4 py-3 text-body-md text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                      {...form.getInputProps("description")}
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col-reverse gap-3 border-t border-outline-variant bg-surface-container-low px-6 py-4 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md border border-outline-variant px-5 py-2.5 text-body-sm font-semibold text-on-surface transition hover:bg-surface-container-high disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-body-sm font-bold text-on-primary transition hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading && <Loader2 size={17} className="animate-spin" />}
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
