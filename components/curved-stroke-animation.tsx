"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function CurvedStrokeAnimation() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // SVG path for a fluid, ballet-like movement (arabesque-inspired curve)
  const balletPath =
    "M 50 400 Q 150 350 250 300 T 450 200 Q 550 150 650 180 T 850 220 Q 950 240 1050 200 T 1250 150 Q 1350 120 1450 140"

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1500 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
      >
        <motion.path
          d={balletPath}
          stroke="url(#balletGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            isVisible
              ? {
                  pathLength: 1,
                  opacity: [0, 1, 1, 0],
                }
              : {}
          }
          transition={{
            pathLength: { duration: 3, ease: "easeInOut" },
            opacity: { duration: 3, times: [0, 0.1, 0.9, 1] },
          }}
          style={{
            filter: "drop-shadow(0 0 8px rgba(229, 197, 200, 0.6))",
          }}
        />

        <defs>
          <linearGradient id="balletGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
