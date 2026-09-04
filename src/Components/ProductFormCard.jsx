import { useState, useEffect } from "react";
import { useProductState } from "../context/productContext";

export default function ProductFormCard({
  onSubmit,
  categories = [],
  initialData = null,
  isEdit = false,
}) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: 0,
    image: "",
    description: "",
  });
  const { loading } = useProductState();
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        category: initialData.category || "",
        price: initialData.price ?? "",
        stock: initialData.stock ?? 0,
        image: initialData.image || "",
        description: initialData.description || "",
      });
    }
  }, [initialData]);

  const [errors, setErrors] = useState({});
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  function validateForm() {
    const newErrors = {};

    // Name - Required
    if (!formData.name.trim()) {
      newErrors.name = "Product name is required.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Product name must be at least 2 characters.";
    }

    // Category - Optional
    if (formData.category.trim().length > 50) {
      newErrors.category = "Category must be less than 50 characters.";
    }

    // Price - Required
    if (formData.price === "") {
      newErrors.price = "Price is required.";
    } else if (Number.isNaN(Number(formData.price))) {
      newErrors.price = "Price must be a valid number.";
    } else if (Number(formData.price) < 0) {
      newErrors.price = "Price cannot be negative.";
    }

    // Image URL - Optional
    if (formData.image.trim()) {
      try {
        new URL(formData.image);
      } catch {
        newErrors.image = "Please enter a valid image URL.";
      }
    }

    // Description - Optional
    if (formData.description.length > 500) {
      newErrors.description = "Description must be less than 500 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) return;

    const productData = {
      name: formData.name.trim(),
      category: formData.category.trim(),
      price: Number(formData.price),
      stock: Number(formData.stock),
      description: formData.description.trim(),
    };

    if (formData.image.trim()) {
      productData.image = formData.image.trim();
    }
    console.log(productData);
    onSubmit?.(productData);
  }

  return (
    <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-5 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Product Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-label-sm text-on-surface"
          >
            Product Name <span className="text-error">*</span>
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Advanced Analytics Dashboard"
            className={`w-full rounded-md border bg-surface-container-lowest px-3 py-3 text-body-sm text-on-surface outline-none transition focus:border-primary ${
              errors.name ? "border-error" : "border-outline-variant"
            }`}
          />

          {errors.name && (
            <p className="mt-1 text-body-sm text-error">{errors.name}</p>
          )}
        </div>

        {/* Category + Price */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-label-sm text-on-surface"
            >
              Category
            </label>

            {!isAddingCategory ? (
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={(e) => {
                  if (e.target.value === "__new__") {
                    setIsAddingCategory(true);

                    setFormData((prev) => ({
                      ...prev,
                      category: "",
                    }));
                  } else {
                    handleChange(e);
                  }
                }}
                className={`w-full rounded-md border bg-surface-container-lowest px-3 py-3 text-body-sm text-on-surface outline-none transition focus:border-primary ${
                  errors.category ? "border-error" : "border-outline-variant"
                }`}
              >
                <option value="">Select category...</option>

                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}

                <option value="__new__">+ Add New Category</option>
              </select>
            ) : (
              <div className="flex gap-2">
                <input
                  id="category"
                  name="category"
                  type="text"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Enter new category..."
                  autoFocus
                  className={`min-w-0 flex-1 rounded-md border bg-surface-container-lowest px-3 py-3 text-body-sm text-on-surface outline-none transition focus:border-primary ${
                    errors.category ? "border-error" : "border-outline-variant"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => {
                    setIsAddingCategory(false);

                    setFormData((prev) => ({
                      ...prev,
                      category: "",
                    }));
                  }}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-outline-variant bg-surface-container-low text-on-surface transition hover:bg-surface-container"
                  title="Choose existing category"
                >
                  <i className="fa-solid fa-list"></i>
                </button>
              </div>
            )}

            {errors.category && (
              <p className="mt-1 text-body-sm text-error">{errors.category}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="mb-2 block text-label-sm text-on-surface"
            >
              Price (USD) <span className="text-error">*</span>
            </label>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-body-sm text-outline">
                $
              </span>

              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                className={`w-full rounded-md border bg-surface-container-lowest py-3 pl-8 pr-3 text-body-sm text-on-surface outline-none transition focus:border-primary ${
                  errors.price ? "border-error" : "border-outline-variant"
                }`}
              />
            </div>

            {errors.price && (
              <p className="mt-1 text-body-sm text-error">{errors.price}</p>
            )}
          </div>
        </div>

        {/* Stock */}
        <div>
          <label
            htmlFor="stock"
            className="mb-2 block text-label-sm text-on-surface"
          >
            Stock
          </label>

          <div className="flex items-center">
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  stock: Math.max(0, Number(prev.stock) - 1),
                }))
              }
              className="flex h-11 w-11 items-center justify-center rounded-l-md border border-outline-variant bg-surface-container-low text-on-surface transition hover:bg-surface-container"
            >
              <i className="fa-solid fa-minus text-xs"></i>
            </button>

            <input
              id="stock"
              name="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  stock: Math.max(0, Number(e.target.value)),
                }))
              }
              className="h-11 w-20 border-y border-outline-variant bg-surface-container-lowest text-center text-body-sm text-on-surface outline-none focus:border-primary"
            />

            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  stock: Number(prev.stock) + 1,
                }))
              }
              className="flex h-11 w-11 items-center justify-center rounded-r-md border border-outline-variant bg-surface-container-low text-on-surface transition hover:bg-surface-container"
            >
              <i className="fa-solid fa-plus text-xs"></i>
            </button>
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label
            htmlFor="image"
            className="mb-2 block text-label-sm text-on-surface"
          >
            Image URL
          </label>

          <input
            id="image"
            name="image"
            type="url"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className={`w-full rounded-md border bg-surface-container-lowest px-3 py-3 text-body-sm text-on-surface outline-none transition focus:border-primary ${
              errors.image ? "border-error" : "border-outline-variant"
            }`}
          />

          {errors.image ? (
            <p className="mt-1 text-body-sm text-error">{errors.image}</p>
          ) : (
            <p className="mt-1 text-body-sm text-outline">
              Please provide a valid image URL for the product thumbnail.
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-label-sm text-on-surface"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Briefly describe the product..."
            className={`w-full resize-none rounded-md border bg-surface-container-lowest px-3 py-3 text-body-sm text-on-surface outline-none transition focus:border-primary ${
              errors.description ? "border-error" : "border-outline-variant"
            }`}
          />

          <div className="mt-1 flex justify-between">
            {errors.description ? (
              <p className="text-body-sm text-error">{errors.description}</p>
            ) : (
              <span />
            )}

            <span className="text-body-sm text-outline">
              {formData.description.length}/500
            </span>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-label-lg text-on-primary transition hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-on-primary border-t-transparent" />
            ) : isEdit ? (
              <span> Save changes</span>
            ) : (
              <span>Sumbit</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
