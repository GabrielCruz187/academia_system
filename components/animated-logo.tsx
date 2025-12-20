"use client"

import { motion } from "framer-motion"

export function AnimatedLogo({
  className = "",
  duration = 3,
}: {
  className?: string
  duration?: number
}) {
  return (
    <svg
      viewBox="0 0 140 140"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M 47,34 C 45,36 42,40 40,44 C 39,47 41,58 45,68 C 45.5,66 46,60 46,56 C 47,57 50,57.5 53,58 C 53.3,59.3 53.8,61 54,62 C 53,65 51,67 49,69 C 57,78 67,86 76,93 C 78,90 79.5,87 81,84 C 89,76 95,70 100,65 C 100,63 99.5,61 99,59 C 98.7,61 98.3,63 98,64 C 97,63 96,62.5 95,62 C 95.7,59 96.3,56 97,54 C 99,53.3 100.5,52.7 102,52 C 100,50.7 98.5,49.3 97,48 C 99.3,48 101.3,48 103,48 C 104,51 105,55 105,59 C 105.3,53 105.7,48 106,43 C 105,40.7 104,39.3 103,38 C 99,35.3 96,34 93,33 C 91.7,33.3 91,33.7 90,34 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration, ease: "easeInOut" }}
      />
    </svg>
  )
}



