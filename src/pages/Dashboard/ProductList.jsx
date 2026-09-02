import { useContext, useState } from "react";
import { Package, Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Context } from "../../context/contextApi.jsx";
import EditProductModal from "../../Components/EditProductModal";
import productService from "../../services/productService";

export default function ProductList() {
  const navigate = useNavigate();
  const { products = [], loading = false, error = null, getAllProducts } = useContext(Context) || {};
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = (e, product) => {
    e.stopPropagation(); // Prevent navigation to details page
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = async (e, product) => {
    e.stopPropagation(); // Prevent navigation to details page
    
    const result = await Swal.fire({
      title: "Delete Product?",
      text: `Are you sure you want to delete "${product.name}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d32f2f",
      cancelButtonColor: "#757575",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await productService.deleteProduct(product.id ?? product._id);
        
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Product has been deleted successfully.",
          confirmButtonColor: "#3f51b5",
        });

        // Refresh the products list
        getAllProducts?.();
      } catch (error) {
        console.error("Error deleting product:", error);
        Swal.fire(
          "Error",
          error.response?.data?.message || "Failed to delete product",
          "error"
        );
      }
    }
  };

  const handleEditSuccess = () => {
    // Refresh the products list after successful edit
    getAllProducts?.();
    setIsEditModalOpen(false);
  };

  if (loading) {
    return <div className="text-center py-8 text-on-surface">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-error">Error loading products: {error}</div>;
  }

  if (products.length === 0) {
    return <div className="text-center py-8 text-on-surface-variant">No products found</div>;
  }

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-4">
        <h2 className="text-lg font-bold text-on-surface mb-4">All Products ({products.length})</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-low">
                <th className="px-4 py-3 text-left text-xs font-bold text-on-surface-variant">PRODUCT</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-on-surface-variant">CATEGORY</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-on-surface-variant">PRICE</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-on-surface-variant">STOCK</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-on-surface-variant">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <motion.tr
                  key={product.id ?? product._id}
                  onClick={() => navigate(`/Dashboard/ProductList/${product.id ?? product._id}`)}
                  className="border-b border-outline-variant hover:bg-surface-container-high transition cursor-pointer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary-container text-secondary">
                        <Package size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-on-surface">{product.name}</p>
                        <p className="text-xs text-on-surface-variant">{product.description || "No description"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-on-surface">{product.category || "N/A"}</td>
                  <td className="px-4 py-3 text-sm text-on-surface text-right font-semibold">${product.price || 0}</td>
                  <td className="px-4 py-3 text-sm text-on-surface text-right">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      product.stock > 0 ? 'bg-primary-container text-primary' : 'bg-error-container text-error'
                    }`}>
                      {product.stock || 0}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <motion.button
                        onClick={(e) => handleEditClick(e, product)}
                        className="p-1.5 rounded hover:bg-surface-container-high text-primary hover:text-primary-container transition"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Edit size={16} />
                      </motion.button>
                      <motion.button
                        onClick={(e) => handleDeleteClick(e, product)}
                        className="p-1.5 rounded hover:bg-surface-container-high text-error hover:text-error-container transition"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingProduct(null);
          }}
          onSuccess={handleEditSuccess}
        />
      )}
    </motion.div>
  );
}



