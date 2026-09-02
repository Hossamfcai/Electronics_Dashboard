import { useContext } from "react";
import { Activity, DollarSign, Layers3, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { Context } from "../../context/contextApi.jsx";

import DashboardHeader from "../../Components/DashboardHeader";
import StatCard from "../../Components/StatCard";
import RecentProducts from "../../Components/RecentProducts";
import SystemHealth from "../../Components/SystemHealth";

export default function DashBoard() {
  const contextValue = useContext(Context) || {};
  const { products = [], loading = false, error = null } = contextValue;

  const navigate = useNavigate();

  // Calculate real statistics from products
  const totalProducts = products.length || 0;
  const totalInventoryValue = products.reduce((sum, p) => sum + ((p.price || 0) * (p.stock || 0)), 0);
  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
  const activeCategories = categories.length || 0;
  const apiStatus = error ? "Error" : loading ? "Loading..." : "99.9% Uptime";
  const badgeType = error ? "error" : loading ? "stable" : "live";

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  const statCardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      y: -5,
      boxShadow: "0 20px 25px -5rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      className="w-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <DashboardHeader />
      </motion.div>

      {/* Actions */}
      <motion.div
        className="flex flex-wrap items-center gap-3 py-5"
        variants={containerVariants}
      >
        <motion.button
          type="button"
          onClick={() => navigate("/Dashboard/AddProduct")}
          className="flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-on-primary transition hover:bg-primary-container"
          variants={buttonVariants}
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-lg leading-none">+</span>
          Add New Product
        </motion.button>

        <motion.button
          type="button"
          onClick={() => navigate("/Dashboard/ProductList")}
          className="flex h-10 items-center gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest px-4 text-sm font-semibold text-on-surface transition hover:bg-surface-container-high"
          variants={buttonVariants}
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
        >
          <Package size={16} />
          View Full Inventory
        </motion.button>
      </motion.div>

      {/* Statistics */}
      <motion.section
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        variants={containerVariants}
      >
        <motion.div variants={statCardVariants} whileHover="hover">
          <StatCard
            icon={Package}
            title="Total Products"
            value={totalProducts.toString()}
            badge={totalProducts > 0 ? `${totalProducts} items` : "No data"}
          />
        </motion.div>

        <motion.div variants={statCardVariants} whileHover="hover">
          <StatCard
            icon={Layers3}
            title="Active Categories"
            value={activeCategories.toString()}
            badge={activeCategories > 0 ? "Active" : "None"}
            badgeType="stable"
          />
        </motion.div>

        <motion.div variants={statCardVariants} whileHover="hover">
          <StatCard
            icon={DollarSign}
            title="Total Inventory Value"
            value={`$${(totalInventoryValue / 100000).toFixed(2)}k`}
            badge={totalInventoryValue > 0 ? `${(totalInventoryValue / 1000).toFixed(0)}k total` : "$0"}
          />
        </motion.div>

        <motion.div variants={statCardVariants} whileHover="hover">
          <StatCard
            icon={Activity}
            title="Live API Status"
            value={apiStatus}
            badge={error ? "Error" : loading ? "Syncing" : "Live"}
            badgeType={badgeType}
          />
        </motion.div>
      </motion.section>

      {/* Bottom section */}
      <motion.section
        className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1.7fr_0.8fr]"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <RecentProducts products={products} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <SystemHealth />
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
