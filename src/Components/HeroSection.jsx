import { motion, useScroll, useTransform } from "framer-motion";
import { Zap, BookOpen, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroPhoto from "../assets/images/HeroPhoto.png";

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

export default function HeroSection() {
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const { scrollY } = useScroll();
  const heroImageY = useTransform(scrollY, [0, 1000], [0, 300]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.2]);
  return (
    <section
      className="relative overflow-hidden py-16 px-4 md:px-8 flex flex-col items-center justify-center min-h-179 text-center border-b border-outline-variant"
      id="hero"
    >
      <motion.div
        style={{ y: heroImageY, opacity: heroOpacity }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <img
          loading="lazy"
          alt="Premium high-end electronics and hardware components"
          className="w-full h-full object-cover"
          src={heroPhoto}
        />
        <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-linear-to-b from-surface/50 to-surface"></div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-4"
      >
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-highest border border-outline-variant text-label-sm font-label-sm text-on-surface-variant mb-4 shadow-sm cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          <span>New Arrivals Unlocked</span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-display-lg text-display-lg text-on-surface tracking-tight max-w-3xl"
        >
          Supercharge Your Setup with VoltGrid
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto"
        >
          A premium, high-voltage hub designed for tech enthusiasts and power
          users. Discover cutting-edge electronics, optimize your smart home,
          and plug into the future with our curated gear.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4 mt-6 w-full sm:w-auto"
        >
          <Link to={"/Dashboard"}>
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="w-full sm:w-auto bg-primary text-on-primary font-label-md text-label-md px-6 py-3 rounded-lg shadow-md flex items-center justify-center gap-2 group cursor-pointer"
              href="#"
            >
              <span>Get Started</span>
              <Zap className="w-4.5 h-4.5 group-hover:rotate-12 transition-transform duration-300" />
            </motion.a>
          </Link>
          <motion.a
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={(e) => handleSmoothScroll(e, "features")}
            className="w-full sm:w-auto bg-surface-container-lowest text-on-surface font-label-md text-label-md px-6 py-3 rounded-lg border border-outline-variant shadow-sm flex items-center justify-center gap-2 group cursor-pointer"
            href="#features"
          >
            <span>View Features</span>
            <BookOpen className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
