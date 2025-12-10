"use client"

import { motion } from "framer-motion"

export function BreathingBackground() {
  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-pink-50 via-white to-pink-100/40 -z-20"
      animate={{
        opacity: [0.97, 1, 0.97],
      }}
      transition={{
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  )
}
