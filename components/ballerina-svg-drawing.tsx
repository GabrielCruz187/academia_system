"use client"

import { motion } from "framer-motion"

export function BallerinaSvgDrawing() {
  const path = `
    M100 40
    Q125 80 100 120
    Q75 160 115 200
    Q145 230 100 260
    Q55 230 90 200
    Q125 160 100 120
    Q75 80 100 40
  `

  return (
    <div className="w-full max-w-[200px] mx-auto opacity-80">
      <svg viewBox="0 0 200 300" className="w-full h-auto">
        <motion.path
          d={path}
          fill="none"
          stroke="#E5C5C8"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 1, 0], // desenha -> fica -> apaga
            opacity: [0, 1, 1, 0],     // aparece → mantém → some
            transition: {
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,        // LOOP
              repeatDelay: 0.5         // pequena pausa elegante
            }
          }}
        />
      </svg>
    </div>
  )
}


