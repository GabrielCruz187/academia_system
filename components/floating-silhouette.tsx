"use client"

import { motion } from "framer-motion"

export function FloatingSilhouette() {
  return (
    <div className="fixed left-0 top-1/4 w-32 h-96 pointer-events-none z-5 opacity-30">
      <motion.div
        className="absolute inset-0"
        animate={{
          y: [-20, 20, -20],
          scaleY: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div
          className="w-full h-full rounded-full blur-3xl"
          style={{
            background: "linear-gradient(180deg, #E5C5C8 0%, rgba(229, 197, 200, 0.2) 100%)",
          }}
        />
      </motion.div>
    </div>
  )
}
