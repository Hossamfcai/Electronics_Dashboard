import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

function HealthProgress({ label, value, width }) {
  return (
    <motion.div
      className="mb-5"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="mb-2 flex items-center justify-between text-[10px] text-on-surface-variant"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <span>{label}</span>
        <span>{value}</span>
      </motion.div>

      <div className="h-1.5 overflow-hidden rounded-full bg-surface-container-highest">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

export default function SystemHealth() {
  return (
    <motion.section
      className="rounded-xl border border-outline-variant/60 bg-surface-container-lowest shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ boxShadow: "0 10px 25px -5rgba(0, 0, 0, 0.1)" }}
    >
      {/* Header */}
      <motion.div
        className="border-b border-outline-variant/50 px-4 py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <h2 className="text-sm font-bold text-on-surface">
          System Health
        </h2>
      </motion.div>

      {/* Content */}
      <motion.div
        className="p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.4 }}
      >
        <HealthProgress
          label="Database Sync"
          value="Just now"
          width="100%"
        />

        <HealthProgress
          label="Storage Capacity"
          value="45%"
          width="45%"
        />

        {/* Status */}
        <motion.div
          className="flex gap-3 rounded-lg border border-primary/20 bg-surface-container-low p-3"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
          >
            <CheckCircle2
              size={20}
              className="shrink-0 text-primary"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.4 }}
          >
            <h3 className="text-xs font-bold text-on-surface">
              All systems optimal
            </h3>

            <p className="mt-1 text-[10px] leading-4 text-on-surface-variant">
              No pending updates or warnings. Scheduled
              maintenance in 14 days.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}