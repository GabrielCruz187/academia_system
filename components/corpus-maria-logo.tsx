"use client"

import { motion } from "framer-motion"

interface CorpusMariaLogoProps {
  className?: string
  animate?: boolean
}

export function CorpusMariaLogo({ className = "", animate = false }: CorpusMariaLogoProps) {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (custom: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, ease: "easeInOut", delay: custom * 0.3 },
        opacity: { duration: 0.3, delay: custom * 0.3 },
      },
    }),
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 2,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.svg
        className={className}
        viewBox="0 0 150 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={animate ? "hidden" : undefined}
        animate={animate ? "visible" : undefined}
      >
        <motion.path
          d="M 96,112 L 96,116 L 105,113 L 107,116 L 124,114 L 121,114 L 122,109 L 114,115 L 114,109 L 109,115 L 107,108 L 102,115 L 102,109 Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0.5"
          custom={0}
          variants={animate ? pathVariants : undefined}
        />
        <motion.path
          d="M 74,108 L 71,116 L 77,114 Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0.5"
          custom={1}
          variants={animate ? pathVariants : undefined}
        />
        <motion.path
          d="M 85,102 L 82,117 L 87,107 L 88,115 L 91,111 L 93,117 L 96,103 L 90,110 L 89,102 Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0.5"
          custom={2}
          variants={animate ? pathVariants : undefined}
        />
        <motion.path
          d="M 29,109 L 31,117 L 40,116 L 47,111 L 51,120 L 59,113 L 61,116 L 68,114 L 65,114 L 65,110 L 62,115 L 62,110 L 60,112 L 53,108 L 50,115 L 47,108 L 45,113 L 41,109 L 32,116 L 31,108 L 36,102 L 37,107 L 38,102 L 34,102 Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0.5"
          custom={3}
          variants={animate ? pathVariants : undefined}
        />
        <motion.path
          d="M 47,34 L 40,44 L 45,68 L 46,56 L 53,58 L 54,62 L 49,69 L 76,93 L 81,84 L 100,65 L 99,59 L 98,64 L 95,62 L 97,54 L 102,52 L 97,48 L 103,48 L 105,59 L 106,43 L 103,38 L 93,33 L 90,34 L 98,38 L 98,43 L 87,35 L 80,40 L 76,37 L 72,40 L 64,35 L 73,42 L 72,46 L 69,44 L 68,49 L 62,51 L 62,45 L 67,41 L 61,44 L 58,41 L 53,45 L 57,46 L 57,49 L 48,50 L 48,40 L 60,36 Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0.5"
          custom={4}
          variants={animate ? pathVariants : undefined}
        />
      </motion.svg>

      <motion.div
        className="text-4xl md:text-5xl font-serif italic text-foreground tracking-wide"
        style={{ fontFamily: "'Brush Script MT', cursive" }}
        initial={animate ? "hidden" : undefined}
        animate={animate ? "visible" : undefined}
        variants={textVariants}
      >
        Corpus Maria
      </motion.div>
    </div>
  )
}
