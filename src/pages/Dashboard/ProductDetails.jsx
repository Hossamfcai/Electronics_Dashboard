import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import productService from "../../services/productService";

import ProductDetailsHeader from "../../Components/ProductDetailsHeader";
import ProductGallery from "../../Components/ProductGallery";
import ProductSummary from "../../Components/ProductSummary";
import ProductAttributes from "../../Components/ProductAttributes";
import { Context } from "../../context/contextApi";

export default function ProductDetails() {
  const { id } = useParams();
  const { getAllProducts } = useContext(Context) || {};

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await productService.getProductById(id);

        // Backend response:
        // { success: true, data: {...} }
        const productData = response?.data ?? response;

        setProduct(productData);
      } catch (err) {
        console.error("Error loading product:", err);

        setError(
          err.response?.data?.message || "Failed to load product details.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleProductUpdated = (updatedProduct) => {
    if (updatedProduct) {
      setProduct((current) => ({
        ...current,
        ...updatedProduct,
      }));
    }

    // Keep Product List data synchronized with the backend.
    getAllProducts?.();
  };

  const handleProductDeleted = () => {
    getAllProducts?.();
  };

  if (loading) {
    return (
      <motion.div
        className="flex min-h-125 items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent"
        />
        <p className="ml-4 text-body-md text-on-surface-variant">
          Loading product details...
        </p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="flex min-h-125 items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="rounded-lg border border-error bg-error-container px-6 py-4"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <p className="text-body-md text-error">{error}</p>
        </motion.div>
      </motion.div>
    );
  }

  if (!product) {
    return (
      <motion.div
        className="flex min-h-125 items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <p className="text-body-md text-on-surface-variant">
            Product not found.
          </p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <ProductDetailsHeader
          product={product}
          onProductUpdated={handleProductUpdated}
          onProductDeleted={handleProductDeleted}
        />
      </motion.div>

      {/* Gallery and Summary */}
      <motion.div
        className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          <ProductGallery product={product} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          <ProductSummary product={product} />
        </motion.div>
      </motion.div>

      {/* Attributes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <ProductAttributes product={product} />
      </motion.div>
    </motion.div>
  );
}
