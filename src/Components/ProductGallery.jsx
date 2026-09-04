import { motion } from "framer-motion";
import defaultImage from "../assets/images/screen.png";
export default function ProductGallery({ product }) {
  return (
    <motion.section
      className="rounded-lg border border-outline-variant bg-surface-container-lowest p-5"
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Main Image */}
      <div className="flex h-105 items-center justify-center overflow-hidden rounded-lg bg-surface-container-low">
        <img
          loading="lazy"
          src={product.image !== "" ? product.image : defaultImage}
          alt={product.name || "Product"}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Thumbnails */}
    </motion.section>
  );
}
