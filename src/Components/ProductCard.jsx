import { Link } from "react-router-dom";
import { Trash2, Pencil } from "lucide-react";
import { motion } from "framer-motion";
import defaultImage from "../assets/screen.png";
import { useEffect, useState } from "react";
export default function ProductCard({ product, handleDelete, index }) {
  const [previewSrc, setPreviewSrc] = useState("");
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.08,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };
  useEffect(() => {
    console.log(product.image);
    // Check if image is a File or Blob object
    if (product.image instanceof Blob) {
      const url = URL.createObjectURL(product.image);
      setPreviewSrc(url);
      console.log(url);
      console.log(URL.revokeObjectURL(url));
      // Clean up memory when product.image changes or component unmounts
      return () => URL.revokeObjectURL(url);
    }

    // If it's already a standard URL string
    if (typeof product.image === "string") {
      setPreviewSrc(product.image);
    }
  }, [product.image]);
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ y: -8 }}
      className={`flex flex-col justify-between overflow-hidden rounded-lg shadow-sm ring-1 transition-all duration-300 hover:-translate-y-3 hover:shadow-lg ${
        product.stock > 0
          ? "bg-surface-container-lowest ring-outline-variant/40"
          : "bg-error-container/30 ring-error/40"
      }`}
    >
      {/* Image */}
      <div className=" w-full overflow-hidden bg-surface-container">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          src={product.image !== "" ? product.image : defaultImage} //handle image
          alt={product.name}
          className=" w-full object-cover"
        />
      </div>

      {/* Card Content */}
      <div className="p-5">
        {/* Category + Stock */}
        <div className="mb-3 flex items-center justify-between">
          <span className="text-label-sm uppercase text-outline">
            {product.category}
          </span>

          <span
            className={`rounded-full px-3 py-1 text-label-sm ${
              product.stock > 0
                ? "bg-primary-fixed text-on-primary-fixed"
                : "bg-error-container text-on-error-container"
            }`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Product Name */}
        <h2 className="font-display text-headline-md text-on-surface">
          {product.name}
        </h2>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-body-sm text-on-surface-variant">
          {product.description}
        </p>

        {/* Price + Stock */}
        <div className="mt-5 grid grid-cols-2 gap-4 border-y border-outline-variant/50 py-4">
          <div>
            <span className="text-label-sm text-outline">PRICE</span>

            <p className="mt-1 font-display text-xl font-bold text-primary">
              ${product.price}
            </p>
          </div>

          <div>
            <span className="text-label-sm text-outline">STOCK</span>

            <p className="mt-1 font-display text-xl font-bold text-on-surface">
              {product.stock}
            </p>
          </div>
        </div>

        {/* Created At */}
        <div className="mt-4 flex items-center gap-2 text-body-sm text-outline">
          <i className="fa-regular fa-calendar"></i>

          <span>
            Created at {new Date(product.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center gap-2">
          {/* Edit */}
          <Link
            to={`/dashboard/editproduct/${product.id}`}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-outline-variant bg-surface-container-low text-primary transition-all duration-200 hover:scale-105 hover:bg-primary hover:text-on-primary"
          >
            <Pencil />
          </Link>

          {/* Delete */}
          <button
            type="button"
            onClick={() => handleDelete(product)}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-outline-variant bg-surface-container-low text-error transition-all duration-200 hover:bg-error hover:text-on-error hover:scale-105"
          >
            <Trash2 />
          </button>
        </div>

        {/* View Details */}
        <Link
          to={`/dashboard/ProductList/${product.id}`}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-label-lg text-on-primary transition hover:bg-primary-container"
        >
          View Product Details
          <i className="fa-solid fa-arrow-right text-xs"></i>
        </Link>
      </div>
    </motion.div>
  );
}
