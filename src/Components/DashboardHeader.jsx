import { Bell, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardHeader() {
  return (
    <motion.header
      className="flex flex-col gap-4 border-b border-outline-variant pb-5 md:flex-row md:items-center md:justify-between"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <motion.p
          className="text-body-sm text-on-surface-variant"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.3 }}
        >
          VoltGrid / Dashboard
        </motion.p>

        <motion.h1
          className="font-display text-3xl font-bold text-on-surface"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Overview
        </motion.h1>
      </motion.div>

      {/* Right side */}
      {/* <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
      
        <motion.div
          className="flex h-10 w-full items-center gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest px-3 sm:w-64"
          whileHover={{ borderColor: "var(--color-primary)", boxShadow: "0 0 0 2px rgba(63, 81, 181, 0.1)" }}
          whileFocus={{ borderColor: "var(--color-primary)" }}
          transition={{ duration: 0.2 }}
        >
          <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 200 }}>
            <Search
              size={18}
              className="shrink-0 text-on-surface-variant"
            />
          </motion.div>

          <input
            type="text"
            placeholder="Search products..."
            className="w-full bg-transparent text-sm text-on-surface outline-none placeholder:text-on-surface-variant"
          />
        </motion.div>

     
        <motion.button
          type="button"
          aria-label="Notifications"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface-variant transition hover:bg-surface-container-highest"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}>
            <Bell size={19} />
          </motion.div>
        </motion.button>

     
        <motion.div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-container font-bold text-on-secondary-container"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          V
        </motion.div>
      </motion.div> */}
    </motion.header>
  );
}
