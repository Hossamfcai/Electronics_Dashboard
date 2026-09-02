import { motion } from "framer-motion";

export default function ProductAttributes({ product }) {
  const attributes = [
    {
      label: "SKU",
      value: product.sku || "N/A",
    },
    {
      label: "CATEGORY",
      value: product.category || "N/A",
    },
    {
      label: "BRAND",
      value: product.brand || "N/A",
    },
    {
      label: "STOCK",
      value: product.stock ?? 0,
    },
    {
      label: "PRICE",
      value: `$${Number(product.price ?? 0).toFixed(2)}`,
    },
    {
      label: "PRODUCT ID",
      value: product.id || product._id || "N/A",
    },
  ];

  return (
    <motion.section
      className="rounded-lg border border-outline-variant bg-surface-container-lowest p-6"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <h2 className="mb-5 font-display text-headline-md text-on-surface">
        Product Information
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {attributes.map((attribute) => (
          <div
            key={attribute.label}
            className="rounded-lg border border-outline-variant bg-surface-container-low p-4"
          >
            <p className="text-label-sm text-on-surface-variant">
              {attribute.label}
            </p>

            <p className="mt-2 text-body-md font-semibold text-on-surface">
              {attribute.value}
            </p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}