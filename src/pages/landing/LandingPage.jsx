import { useEffect } from "react";
import { motion } from "framer-motion";

import { Cpu, Keyboard, Cable } from "lucide-react";
import NavBarLanding from "../../Components/NavBarLanging";
import HeroSection from "../../Components/HeroSection";
import Partners from "../../Components/PartnersSection";
import Feature from "../../Components/Feature";
import AboutSection from "../../Components/AboutSection";
import Footer from "../../Components/FooterSection";

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

export default function LandingPage() {
  const featureData = [
    {
      title: "Hardware",
      desc: "High-performance workstations and core infrastructure designed for power users.",
      icon: Cpu,
    },
    {
      title: "Peripherals",
      desc: "Precision-engineered input devices and monitors for seamless interaction.",
      icon: Keyboard,
    },
    {
      title: "Accessories",
      desc: "Premium cables, storage, and essential gear to complete your high-voltage setup.",
      icon: Cable,
    },
  ];

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <>
      <NavBarLanding />
      <main className="grow pt-18 overflow-hidden">
        <HeroSection />
        <Partners />
        <section
          className="py-16 px-4 md:px-8 bg-surface-bright border-b border-outline-variant"
          id="features"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-10 text-center"
            >
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">
                Wired for Maximum Performance
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
                The premium electronics and smart devices you need to
                supercharge your setup with absolute precision.
              </p>
            </motion.div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {featureData.map((card, i) => (
                <Feature key={i} card={card} />
              ))}
            </motion.div>
          </div>
        </section>
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
