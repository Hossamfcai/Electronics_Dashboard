import { motion } from "framer-motion";

export default function ProductSummary({ product }) {
  const price = Number(product.price ?? 0);
  const stock = Number(product.stock ?? 0);

  const isInStock = stock > 0;

  return (
    <motion.section
      className="rounded-lg border border-outline-variant bg-surface-container-lowest p-6"
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Category + Updated */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-secondary-container px-3 py-1 text-label-sm text-on-secondary-container">
          {product.category || "Uncategorized"}
        </span>

        {product.updatedAt && (
          <span className="text-body-sm text-on-surface-variant">
            Last updated{" "}
            {new Date(product.updatedAt).toLocaleDateString()}
          </span>
        )}
      </div>

      {/* Product Name */}
      <h2 className="mt-4 font-display text-headline-lg text-on-surface">
        {product.name || "Unnamed Product"}
      </h2>

      {/* Price */}
      <div className="mt-4 border-b border-outline-variant pb-5">
        <span className="font-display text-3xl font-bold text-primary">
          ${price.toFixed(2)}
        </span>

        <span className="ml-2 text-body-sm text-on-surface-variant">
          USD / unit
        </span>
      </div>

      {/* Description */}
      <div className="mt-6">
        <h3 className="mb-2 font-display text-headline-md text-on-surface">
          Description
        </h3>

        <p className="text-body-md leading-7 text-on-surface-variant">
          {product.description ||
            "No description available for this product."}
        </p>
      </div>

      {/* Inventory */}
      <div className="mt-6 rounded-lg bg-surface-container-low p-4">
        <div className="flex items-center justify-between gap-4">
          <span className="text-body-sm font-semibold text-on-surface">
            Inventory Status
          </span>

          <span
            className={`rounded-full px-3 py-1 text-label-sm ${
              isInStock
                ? "bg-primary-container text-on-primary-container"
                : "bg-error-container text-error"
            }`}
          >
            {isInStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-body-sm text-on-surface-variant">
            Available Quantity
          </span>

          <span className="font-display font-bold text-on-surface">
            {stock}
          </span>
        </div>
      </div>
    </motion.section>
  );
}