import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Plus, ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { usePagination } from "@mantine/hooks";
import {
  useProductDispatch,
  useProductState,
} from "../../context/productContext.jsx";
import ProductCard from "../../Components/ProductCard.jsx";
import ProductCardSkeleton from "../../Components/ProductCardSkeleton.jsx";
import EmptyState from "../../Components/EmptyState.jsx";
import ErrorState from "../../Components/ErrorState.jsx";

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
  hidden: { opacity: 0, y: -15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export default function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStock, setSelectedStock] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Default products to empty array safely
  const productState = useProductState() || {};
  const products = productState.products || [];
  const loading = productState.loading || false;
  const error = productState.error || null;

  const { getProducts, deleteProduct } = useProductDispatch();
  const stockOptions = ["All", "In Stock", "Out of Stock"];

  async function handleDelete(product) {
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
      buttonsStyling: false,
    });

    if (result.isConfirmed) {
      deleteProduct(product.id);
      if (!error) {
        await Swal.fire({
          title: "Deleted!",
          text: `"${product.name}" has been deleted successfully.`,
          icon: "success",
          iconColor: "var(--color-primary)",
          confirmButtonText: "OK",
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
  }

  const categories = [
    "All",
    ...new Set(
      products
        .map((product) => product?.category)
        .filter((category) => Boolean(category)),
    ),
    "No Category",
  ];

  // Guaranteed Array filtering
  const filteredProducts = products.filter((product) => {
    if (!product) return false;

    const matchesCategory =
      selectedCategory === "All" ||
      (selectedCategory === "No Category" && !product.category) ||
      product.category === selectedCategory;

    const matchesStock =
      selectedStock === "All" ||
      (selectedStock === "In Stock" && product.stock > 0) ||
      (selectedStock === "Out of Stock" && product.stock === 0);

    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      product.name?.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query) ||
      product.category?.toLowerCase().includes(query);

    return matchesCategory && matchesStock && matchesSearch;
  });

  // --- Safe Pagination Calculation ---
  const ITEMS_PER_PAGE = 6;
  const calculatedPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const totalPages = calculatedPages > 0 ? calculatedPages : 1;

  const pagination = usePagination({
    total: totalPages,
    initialPage: 1,
  });

  // Reset page when filters change
  useEffect(() => {
    pagination.setPage(1);
  }, [selectedCategory, selectedStock, searchQuery]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pagination.active]);

  const paginatedProducts = filteredProducts.slice(
    (pagination.active - 1) * ITEMS_PER_PAGE,
    pagination.active * ITEMS_PER_PAGE,
  );

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-surface px-6 py-8 font-body"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <h1 className="font-display text-headline-lg text-on-surface">
            Premium Inventory
          </h1>

          <p className="mt-1 text-body-sm text-on-surface-variant">
            Manage your products, pricing, and stock information.
          </p>
        </div>

        <motion.span
          key={products.length}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="rounded-full bg-primary-fixed px-4 py-2 text-label-sm text-on-primary-fixed"
        >
          {products.length} Products
        </motion.span>
      </motion.div>

      {/* Products Toolbar */}
      <motion.div
        variants={itemVariants}
        className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
      >
        {/* Search Bar Component */}
        <div className="relative w-full lg:max-w-xs">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-outline-variant bg-surface-container-lowest pl-10 pr-9 py-2.5 text-body-sm text-on-surface placeholder:text-on-surface-variant/60 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filters & Actions Group */}
        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto lg:justify-end">
          {/* Category Sort */}
          <div className="flex items-center gap-3">
            <label
              htmlFor="category"
              className="text-label-lg text-on-surface-variant whitespace-nowrap"
            >
              Sort by:
            </label>

            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-md border border-outline-variant bg-surface-container-lowest px-4 py-2.5 text-body-sm text-on-surface outline-none focus:border-primary cursor-pointer"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Stock Filter Pills */}
          <div className="flex items-center gap-2">
            <span className="text-label-lg text-on-surface-variant mr-1 hidden sm:inline">
              Stock:
            </span>
            {stockOptions.map((option) => {
              const isActive = selectedStock === option;
              return (
                <button
                  key={option}
                  onClick={() => setSelectedStock(option)}
                  className={`relative rounded-full px-4 py-2.5 text-label-sm transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? "bg-primary text-on-primary shadow-sm font-medium"
                      : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface border border-outline-variant"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* Add Product Button */}
          <Link
            to="/Dashboard/addproduct"
            className="flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-label-lg text-on-primary transition hover:bg-primary-container whitespace-nowrap w-full sm:w-auto"
          >
            <Plus size={18} /> Add New Product
          </Link>
        </div>
      </motion.div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={`skeleton-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ProductCardSkeleton />
              </motion.div>
            ))
          : paginatedProducts.map((product, i) => (
              <ProductCard
                key={product.id}
                index={i}
                product={product}
                handleDelete={handleDelete}
              />
            ))}
      </div>

      {/* Pagination Controls */}
      {!loading && totalPages > 1 && (
        <motion.div
          variants={itemVariants}
          className="mt-10 flex items-center justify-center gap-2"
        >
          <button
            onClick={pagination.previous}
            disabled={pagination.active === 1}
            className="flex items-center justify-center rounded-lg border border-outline-variant bg-surface-container-lowest p-2.5 text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface disabled:opacity-40 disabled:hover:bg-surface-container-lowest cursor-pointer disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} />
          </button>

          {(pagination.range || []).map((page, index) => {
            if (page === "dots") {
              return (
                <span
                  key={`dots-${index}`}
                  className="px-3 py-2 text-label-lg text-on-surface-variant"
                >
                  ...
                </span>
              );
            }

            const isCurrent = page === pagination.active;
            return (
              <button
                key={`page-${page}`}
                onClick={() => pagination.setPage(page)}
                className={`min-w-[40px] h-[40px] rounded-lg text-label-lg font-medium transition cursor-pointer ${
                  isCurrent
                    ? "bg-primary text-on-primary shadow-sm"
                    : "border border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={pagination.next}
            disabled={pagination.active === totalPages}
            className="flex items-center justify-center rounded-lg border border-outline-variant bg-surface-container-lowest p-2.5 text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface disabled:opacity-40 disabled:hover:bg-surface-container-lowest cursor-pointer disabled:cursor-not-allowed"
          >
            <ChevronRight size={18} />
          </button>
        </motion.div>
      )}

      {/* Error State */}
      {!loading && error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <ErrorState />
        </motion.div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <EmptyState isFilteredProductsEmpty={0} />
        </motion.div>
      )}
    </motion.div>
  );
}
