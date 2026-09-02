import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/ContextApi.jsx";
import Swal from "sweetalert2";

export default function ProductList() {
  const { products, deleteProduct } = useContext(Context);

  const [selectedCategory, setSelectedCategory] = useState("All");

  async function handleDelete(product) {
    const result = await Swal.fire({
      title: "Delete Product",
      text: `Are you sure you want to delete "${product.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete Product",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      const success = await deleteProduct(product.id);

      if (success) {
        await Swal.fire({
          title: "Deleted!",
          text: `"${product.name}" has been deleted successfully.`,
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        await Swal.fire({
          title: "Error!",
          text: "Something went wrong while deleting the product.",
          icon: "error",
          confirmButtonText: "OK",
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
        {filteredProducts?.map((product) => (
          <div
            key={product.id}
            className={`overflow-hidden rounded-lg shadow-sm ring-1 transition-all duration-300 hover:-translate-y-3 hover:shadow-lg ${
              product.stock > 0
                ? "bg-surface-container-lowest ring-outline-variant/40"
                : "bg-error-container/30 ring-error/40"
            }`}
          >
            {/* Image */}
            <div className="h-52 w-full overflow-hidden bg-surface-container">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
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
                  <i className="fa-solid fa-pen text-sm"></i>
                </Link>

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => handleDelete(product)}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-outline-variant bg-surface-container-low text-error transition-all duration-200 hover:bg-error hover:text-on-error hover:scale-105"
                >
                  <i className="fa-solid fa-trash text-sm"></i>
                </button>
              </div>

              {/* View Details */}
              <Link
                to={`/dashboard/productdetails/${product.id}`}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-label-lg text-on-primary transition hover:bg-primary-container"
              >
                View Product Details
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {(!products || products.length === 0) && (
        <div className="flex min-h-80 flex-col items-center justify-center text-center">
          <i className="fa-solid fa-box-open text-4xl text-outline"></i>

          <h2 className="mt-4 font-display text-headline-md text-on-surface">
            No Products Found
          </h2>

          <p className="mt-1 text-body-sm text-on-surface-variant">
            There are no products to display.
          </p>
        </div>
      )}
    </div>
  );
}



