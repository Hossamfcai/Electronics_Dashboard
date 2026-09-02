import React from "react";
import { motion } from "framer-motion";

import {
  Zap,
  Headphones,
  Cpu,
  Router,
  Video,
  Activity,
  HardDrive,
  Radio,
  Wifi,
} from "lucide-react";

export default function Partners() {
  return (
    <section className="py-12 border-b border-outline-variant bg-surface-container-low/90 backdrop-blur-sm px-4 md:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-6 flex items-center justify-center gap-2"
        >
          {/* Continuous Rotating Icon */}
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="inline-block"
          >
            <Zap className="w-4 h-4 text-primary" />
          </motion.span>
          Trusted by Industry Leaders & Pro Creators
        </motion.p>

        {/* Infinite Marquee Container */}
        <div className="flex overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 25, // Adjusted speed for smooth readability with 8 partners
            }}
            className="flex flex-nowrap shrink-0 items-center gap-12 md:gap-16 opacity-60 grayscale pr-12 md:pr-16"
          >
            {/* Rendered twice to create an uninterrupted infinite loop */}
            {[...Array(2)].map((_, loopIndex) => (
              <React.Fragment key={loopIndex}>
                {[
                  { name: "AudioTech", icon: Headphones },
                  { name: "CoreSync", icon: Cpu },
                  { name: "NetWorks", icon: Router },
                  { name: "PixelPro", icon: Video },
                  { name: "PulseWave", icon: Activity },
                  { name: "DataDrive", icon: HardDrive },
                  { name: "AeroSignal", icon: Radio },
                  { name: "VoltLink", icon: Wifi },
                ].map((brand, i) => (
                  <motion.div
                    key={`${loopIndex}-${i}`}
                    whileHover={{
                      scale: 1.1,
                      filter: "grayscale(0%)",
                      opacity: 1,
                    }}
                    className="flex items-center gap-2 text-on-surface cursor-pointer shrink-0"
                  >
                    <brand.icon className="w-7 h-7" />
                    <span className="font-headline-sm font-bold">
                      {brand.name}
                    </span>
                  </motion.div>
                ))}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
