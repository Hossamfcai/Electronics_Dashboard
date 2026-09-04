import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Home, SearchX } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[var(--color-background)] text-[var(--color-on-background)] font-body p-6 relative overflow-hidden">
      {/* Background Decorative Grid Accent */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(var(--color-outline)_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 max-w-lg w-full text-center flex flex-col items-center bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] rounded-[var(--radius-xl)] p-8 sm:p-12 shadow-xl"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Animated Icon Container */}
        <motion.div
          className="w-20 h-20 rounded-[var(--radius-full)] bg-[var(--color-surface-container-low)] text-[var(--color-tertiary)] flex items-center justify-center mb-6 relative"
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1,
          }}
        >
          <SearchX size={40} className="stroke-[1.75]" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-power-warning)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[var(--color-power-warning)]"></span>
          </span>
        </motion.div>

        {/* Error Code & Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <span className="font-display font-bold text-[var(--color-primary)] text-sm tracking-widest uppercase bg-[var(--color-surface-container-low)] px-3 py-1 rounded-[var(--radius-full)]">
            Error 404
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-[var(--color-on-surface)] mt-4 tracking-tight">
            Page Not Found
          </h1>
        </motion.div>

        {/* Message */}
        <motion.p
          className="mt-3 text-[var(--color-on-surface-variant)] text-body-md max-w-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          The page you are looking for doesn't exist, was removed, or the URL
          might be mistyped.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="mt-8 flex flex-col sm:flex-row gap-3 w-full justify-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          {/* Back to Previous Page */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[var(--radius-md)] border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-low)] text-[var(--color-on-surface)] font-display text-sm font-semibold transition-all duration-200 hover:bg-[var(--color-surface-container-high)] active:scale-[0.98] cursor-pointer"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

          {/* Go Home */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[var(--radius-md)] bg-[var(--color-primary)] text-[var(--color-on-primary)] font-display text-sm font-bold shadow-md transition-all duration-200 hover:bg-[var(--color-primary-container)] active:scale-[0.98] cursor-pointer"
          >
            <Home size={18} />
            Return Home
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
