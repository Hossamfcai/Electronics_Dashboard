import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function StatCard({
  icon: Icon,
  title,
  value,
  badge,
  badgeType = "positive",
}) {
  const badgeStyles = {
    positive: "bg-primary-fixed/40 text-primary",
    stable: "bg-surface-container-highest text-on-surface-variant",
    live: "bg-primary-fixed/40 text-primary",
  };

  return (
    <motion.div
      className="rounded-xl border border-outline-variant/60 bg-surface-container-lowest p-4 shadow-sm cursor-default"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        boxShadow: "0 10px 25px -5rgba(0, 0, 0, 0.15)",
        y: -2,
      }}
    >
      {/* Top */}
      <div className="flex items-start justify-between">
        <motion.div
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary-container text-secondary"
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Icon size={19} />
        </motion.div>

        {badge && (
          <motion.span
            className={`flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-bold ${
              badgeStyles[badgeType]
            }`}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            {badgeType === "positive" && (
              <TrendingUp size={11} />
            )}

            {badge}
          </motion.span>
        )}
      </div>

      {/* Content */}
      <motion.p
        className="mt-4 text-xs text-on-surface-variant"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        {title}
      </motion.p>

      <motion.h2
        className="mt-1 text-2xl font-bold text-on-surface"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.3 }}
      >
        {value}
      </motion.h2>
    </motion.div>
  );
}