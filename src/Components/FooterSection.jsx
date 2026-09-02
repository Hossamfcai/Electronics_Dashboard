import { motion } from "framer-motion";
import { Zap, Headset, Store, FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant py-12 px-4 md:px-8 mt-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6"
      >
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-primary" />
          <span className="font-label-md text-label-md font-bold text-on-surface">
            VoltGrid
          </span>
        </div>

        <nav className="flex gap-6">
          {[
            { label: "Support", icon: Headset },
            { label: "Shop", icon: Store },
            { label: "Blog", icon: FileText },
          ].map((link) => (
            <motion.a
              key={link.label}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2"
              href="#"
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </motion.a>
          ))}
        </nav>
      </motion.div>
    </footer>
  );
}
