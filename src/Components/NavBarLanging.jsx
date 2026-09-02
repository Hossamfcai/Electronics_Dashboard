import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu as MantineMenu } from "@mantine/core";
import { Menu as MenuIcon, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const navLinkVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

const mobileMenuVariants = {
  closed: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.05,
    },
  },
};

const mobileItemVariants = {
  closed: { opacity: 0, x: -16 },
  open: { opacity: 1, x: 0 },
};

export default function NavBarLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerOffset = 80; // Height of fixed header + padding
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full px-4 md:px-8 py-4 bg-surface-container-lowest/90 border-b border-outline-variant fixed top-0 z-50 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-2"
        >
          <Zap className="w-6 h-6 text-primary" />
          <span className="font-headline-sm text-headline-sm font-bold text-primary tracking-tight">
            VoltGrid
          </span>
        </motion.div>
        <div className="md:hidden">
          <MantineMenu
            opened={mobileMenuOpen}
            onChange={setMobileMenuOpen}
            width="100%"
            shadow="lg"
            position="bottom-start"
            offset={12}
            styles={{
              dropdown: {
                border: "none",
                padding: 0,
                backgroundColor: "transparent",
                boxShadow: "none",
              },
            }}
          >
            <MantineMenu.Target>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center p-2 -ml-2 text-on-surface-variant hover:text-primary transition-colors"
                id="mobile-menu-btn"
              >
                <MenuIcon className="w-6 h-6" />
              </motion.button>
            </MantineMenu.Target>

            <MantineMenu.Dropdown className="fixed! left-0! right-0! top-16.5! w-full!">
              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.div
                    variants={mobileMenuVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="w-full bg-surface-container-lowest border-b border-outline-variant shadow-xl flex flex-col p-4 gap-4"
                  >
                    {["Hero", "Features", "About"].map((item) => (
                      <motion.a
                        key={item}
                        variants={mobileItemVariants}
                        onClick={(e) => {
                          setMobileMenuOpen(false);
                          handleSmoothScroll(e, item.toLowerCase());
                        }}
                        className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                        href={`#${item.toLowerCase()}`}
                      >
                        {item}
                      </motion.a>
                    ))}
                    <Link to={"/dashboard"}>
                      <motion.div
                        variants={mobileItemVariants}
                        whileTap={{ scale: 0.98 }}
                        className="bg-primary text-on-primary font-label-md text-label-md px-4 py-2 rounded-lg text-center shadow-sm mt-2"
                        href="#"
                      >
                        Get Started
                      </motion.div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </MantineMenu.Dropdown>
          </MantineMenu>
        </div>

        <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {["Hero", "Features", "About"].map((item, index) => (
            <motion.a
              key={item}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={navLinkVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => handleSmoothScroll(e, item.toLowerCase())}
              className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              href={`#${item.toLowerCase()}`}
            >
              {item}
            </motion.a>
          ))}
        </nav>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden md:flex items-center gap-4"
        >
          {" "}
          <Link to={"/dashboard"}>
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.15)",
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-on-primary font-label-md text-label-md px-4 py-2 rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-all duration-300 shadow-sm"
              href="#"
            >
              Get Started
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </motion.header>
  );
}
