import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ProductFormCard from "../../Components/ProductFormCard.jsx";
import {
  useProductDispatch,
  useProductState,
} from "../../context/productContext.jsx";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function AddProduct() {
  const { products } = useProductState();
  const { addProduct } = useProductDispatch();
  const navigate = useNavigate();

  const categories = [
    ...new Set(products?.map((product) => product.category).filter(Boolean)),
  ];

  async function handleSaveProduct(productData) {
    const result = await addProduct(productData);

    if (result) {
      await Swal.fire({
        title: "Product Updated!",
        text: `"${productData.name}" has been updated successfully.`,
        icon: "success",
        iconColor: "var(--color-primary)",
        confirmButtonText: "OK",
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

      navigate("/Dashboard/ProductList");
    } else {
      await Swal.fire({
        title: "Error!",
        text: "Something went wrong while updating the product.",
        icon: "error",
        iconColor: "var(--color-error)",
        confirmButtonText: "OK",
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
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-surface px-6 py-8 font-body"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="mb-8 flex items-start justify-between"
      >
        <div>
          <h1 className="font-display text-headline-lg text-on-surface">
            Create New Product
          </h1>

          <p className="mt-1 text-body-sm text-on-surface-variant">
            Add a new item to your catalog.
          </p>
        </div>

        {/* Cancel */}
        <Link
          to="/Dashboard/ProductList"
          className="rounded-md border border-outline-variant bg-surface-container-lowest px-5 py-2.5 text-label-lg text-on-surface transition hover:bg-surface-container"
        >
          Cancel
        </Link>
      </motion.div>

      {/* Form */}
      <motion.div variants={itemVariants}>
        <ProductFormCard categories={categories} onSubmit={handleSaveProduct} />
      </motion.div>
    </motion.div>
  );
}
