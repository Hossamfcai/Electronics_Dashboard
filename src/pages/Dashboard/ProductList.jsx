import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useProductDispatch,
  useProductState,
} from "../../context/productContext.jsx";
import ProductCard from "../../Components/ProductCard.jsx";
import ProductCardSkeleton from "../../Components/ProductCardSkeleton.jsx";
import EmptyState from "../../Components/EmptyState.jsx";
import ErrorState from "../../Components/ErrorState.jsx";

export default function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { products, loading, error, productsState } = useProductState();

  const { getProducts, deleteProduct } = useProductDispatch();

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
      buttonsStyling: false, // Disables default SweetAlert2 button styles
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
        ?.map((product) => product.category)
        .filter((category) => category),
    ),
    "No Category",
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : selectedCategory === "No Category"
        ? products?.filter((product) => !product.category)
        : products?.filter((product) => product.category === selectedCategory);

  useEffect(() => {
    getProducts();
  }, []);
  console.log(useProductState());
  return (
    <div className="min-h-screen bg-surface px-6 py-8 font-body">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-headline-lg text-on-surface">
            Premium Inventory
          </h1>

          <p className="mt-1 text-body-sm text-on-surface-variant">
            Manage your products, pricing, and stock information.
          </p>
        </div>

        <span className="rounded-full bg-primary-fixed px-4 py-2 text-label-sm text-on-primary-fixed">
          {products?.length || 0} Products
        </span>
      </div>

      {/* Products Toolbar */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Category Sort */}
        <div className="flex items-center gap-3">
          <label
            htmlFor="category"
            className="text-label-lg text-on-surface-variant"
          >
            Sort by:
          </label>

          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-md border border-outline-variant bg-surface-container-lowest px-4 py-2.5 text-body-sm text-on-surface outline-none focus:border-primary"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Add Product */}
        <Link
          to="/dashboard/addproduct"
          className="flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-label-lg text-on-primary transition hover:bg-primary-container"
        >
          <i className="fa-solid fa-plus"></i>
          Add New Product
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : filteredProducts?.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  handleDelete={handleDelete}
                />
              );
            })}
      </div>
      {/* Empty State */}
      {products.length == 0 && error ? <ErrorState /> : ""}
      {/* Empty State */}
      {productsState == "isEmpty" ? <EmptyState /> : ""}
    </div>
  );
}
