import { motion } from "framer-motion";
import { ShieldCheck, Globe2 } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

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

export default function AboutSection() {
  return (
    <section
      className="py-16 px-4 md:px-8 bg-surface-container-lowest"
      id="about"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">
            About VoltGrid
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            VoltGrid was founded on the belief that technology should empower,
            not complicate. We curate the highest quality electronics, building
            an ecosystem where power users and creators can find exactly what
            they need to elevate their craft. Our mission is to supercharge your
            world with uncompromising performance and reliability.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 text-left"
        >
          {[
            {
              title: "Tested Performance",
              text: "Every item undergoes rigorous stress-testing to guarantee peak performance.",
              icon: ShieldCheck,
            },
            {
              title: "Global Supply",
              text: "Directly sourced hardware components delivered worldwide with full warranty.",
              icon: Globe2,
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="p-5 rounded-lg border border-outline-variant bg-surface-bright flex gap-4 items-start"
            >
              <item.icon className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-on-surface mb-1">{item.title}</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
