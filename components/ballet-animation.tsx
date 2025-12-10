"use client"

import { motion } from "framer-motion"

export function BalletAnimation() {
  // Animação de pirouette - círculo girando
  const pirouetteVariants = {
    animate: {
      rotate: [0, 360],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      },
    },
  }

  // Animação de movimento fluido - arabesque
  const arabesqueVariants = {
    animate: {
      d: [
        "M 50 100 Q 50 20 100 50 T 150 100",
        "M 50 100 Q 80 10 120 40 T 150 100",
        "M 50 100 Q 50 20 100 50 T 150 100",
      ],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  // Animação de partículas - glitter do palco
  const particleVariants = (delay: number) => ({
    animate: {
      y: [0, -60, 0],
      opacity: [0, 1, 0],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        delay,
        ease: "easeInOut",
      },
    },
  })

  // Animação de véu fluindo
  const veilVariants = {
    animate: {
      y: [0, 10, 0],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="relative w-full h-64 flex items-center justify-center overflow-hidden">
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />

      {/* SVG Container */}
      <svg viewBox="0 0 200 200" className="w-32 h-32 md:w-48 md:h-48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Pirouette - Main Circle */}
        <motion.circle
          cx="100"
          cy="100"
          r="30"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary/40"
          variants={pirouetteVariants}
          animate="animate"
        />

        {/* Inner rotating circle */}
        <motion.circle
          cx="100"
          cy="100"
          r="15"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="5,5"
          className="text-primary/30"
          variants={pirouetteVariants}
          animate="animate"
        />

        {/* Arabesque curve - fluid movement */}
        <motion.path
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary/50"
          strokeLinecap="round"
          fill="none"
          variants={arabesqueVariants}
          animate="animate"
        />

        {/* Decorative lines - representing ribbons */}
        <motion.path
          d="M 70 80 Q 80 60 100 50 Q 120 40 130 70"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-primary/30"
          fill="none"
          strokeLinecap="round"
          variants={veilVariants}
          animate="animate"
        />
      </svg>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              bottom: "20%",
            }}
            variants={particleVariants(i * 0.3)}
            animate="animate"
          />
        ))}
      </div>

      {/* Light glow effect */}
      <motion.div
        className="absolute w-40 h-40 bg-gradient-radial from-primary/20 to-transparent rounded-full blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
