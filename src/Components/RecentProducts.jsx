import { Armchair, Headphones, Laptop, Package } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const fallbackProducts = [
  {
    id: 1,
    name: "Pro Laptop M3 Max",
    sku: "LAP-2024-M3",
    category: "Electronics",
    icon: Laptop,
  },
  {
    id: 2,
    name: "Ergonomic Office Chair X",
    sku: "FURN-ERGO-X",
    category: "Furniture",
    icon: Armchair,
  },
  {
    id: 3,
    name: "Noise Cancelling Pro",
    sku: "AUD-NC-PRO",
    category: "Audio",
    icon: Headphones,
  },
];

export default function RecentProducts({ products = [] }) {
  const navigate = useNavigate();
  const displayProducts =
    products.length > 0 ? products.slice(0, 6) : fallbackProducts;

  return (
    <motion.section
      className="overflow-hidden rounded-xl border border-outline-variant/60 bg-surface-container-lowest shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ boxShadow: "0 10px 25px -5rgba(0, 0, 0, 0.1)" }}
    >
      {/* Header */}
      <motion.div
        className="flex items-center justify-between border-b border-outline-variant/50 px-4 py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <h2 className="text-sm font-bold text-on-surface">
          Recent Products Added
        </h2>

        <motion.button
          type="button"
          onClick={() => navigate("/Dashboard/ProductList")}
          className="text-xs font-bold text-primary transition hover:opacity-70"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View All
        </motion.button>
      </motion.div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[550px]">
          <thead>
            <motion.tr
              className="bg-surface-container-low"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.3 }}
            >
              <th className="px-4 py-3 text-left text-[9px] font-bold tracking-wide text-on-surface-variant">
                PRODUCT
              </th>

              <th className="px-4 py-3 text-left text-[9px] font-bold tracking-wide text-on-surface-variant">
                SKU
              </th>

              <th className="px-4 py-3 text-left text-[9px] font-bold tracking-wide text-on-surface-variant">
                CATEGORY
              </th>

              <th className="px-4 py-3 text-left text-[9px] font-bold tracking-wide text-on-surface-variant">
                ACTION
              </th>
            </motion.tr>
          </thead>

          <motion.tbody
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2,
                },
              },
            }}
          >
            {displayProducts.map((product, index) => {
              const Icon = product.icon || Package;

              return (
                <motion.tr
                  key={product.id || index}
                  className="border-t border-outline-variant/40"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{
                    backgroundColor: "rgba(63, 81, 181, 0.05)",
                    paddingLeft: 12,
                  }}
                >
                  {/* Product */}
                  <td className="px-4 py-3">
                    <motion.div
                      className="flex items-center gap-3"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <motion.div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary-container text-secondary"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <Icon size={15} />
                      </motion.div>

                      <span className="whitespace-nowrap text-xs font-semibold text-on-surface">
                        {product.name || product.title || "Unnamed Product"}
                      </span>
                    </motion.div>
                  </td>

                  {/* SKU */}
                  <td className="px-4 py-3 text-xs text-on-surface-variant">
                    {product.sku || product.SKU || `PROD-${1000 + index}`}
                  </td>

                  {/* Category */}
                  <td className="px-4 py-3 text-xs text-on-surface-variant">
                    {product.category || "Electronics"}
                  </td>

                  {/* Action */}
                  <td className="px-4 py-3">
                    <motion.button
                      type="button"
                      onClick={() =>
                        navigate(`/Dashboard/ProductList/${product.id}`)
                      }
                      className="text-xs font-semibold text-primary hover:underline"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View
                    </motion.button>
                  </td>
                </motion.tr>
              );
            })}
          </motion.tbody>
        </table>
      </div>
    </motion.section>
  );
}
