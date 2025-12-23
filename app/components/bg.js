"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground({ children }) {
  return (
    <div className="relative min-h-full w-full overflow-hidden bg-[#0b0c10] text-white">
      {/* Blurred glowing blobs */}
      <motion.div
        className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-cyan-400/30 rounded-full mix-blend-screen blur-[150px]"
        animate={{
          x: [0, 100, -80, 0],
          y: [0, 50, -100, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-purple-500/25 rounded-full mix-blend-screen blur-[160px]"
        animate={{
          x: [0, -120, 80, 0],
          y: [0, -100, 60, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 25,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/3 w-[800px] h-[800px] bg-indigo-400/20 rounded-full mix-blend-screen blur-[180px]"
        animate={{
          x: [0, 50, -100, 0],
          y: [0, -80, 40, 0],
          scale: [1, 1.08, 0.92, 1],
        }}
        transition={{
          duration: 30,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* Subtle noise texture overlay for realism */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
