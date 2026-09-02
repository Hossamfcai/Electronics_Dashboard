import { motion } from "framer-motion";

import { ArrowRight } from "lucide-react";

export default function Feature({ card }) {
  const itemVariants = {
    hidden: { opacity: 0, y: 35, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 soft-shadow flex flex-col h-full hover:border-primary hover:shadow-xl transition-all duration-300 group cursor-pointer"
    >
      <motion.div
        whileHover={{ scale: 1.15, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400 }}
        className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center mb-4 group-hover:bg-primary-container transition-colors duration-300"
      >
        <card.icon className="w-6 h-6 text-primary group-hover:text-on-primary-container transition-colors" />
      </motion.div>
      <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2 flex items-center justify-between">
        <span>{card.title}</span>
        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
      </h3>
      <p className="font-body-sm text-body-sm text-on-surface-variant grow">
        {card.desc}
      </p>
    </motion.div>
  );
}
