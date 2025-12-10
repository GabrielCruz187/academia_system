"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function StageCurtain() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(true)
  }, [])

  return (
    <>
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isOpen ? "-100%" : 0 }}
        transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="fixed inset-y-0 left-0 w-1/2 bg-black/95 z-50 pointer-events-none"
        style={{ boxShadow: "10px 0 30px rgba(0,0,0,0.5)" }}
      />
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isOpen ? "100%" : 0 }}
        transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="fixed inset-y-0 right-0 w-1/2 bg-black/95 z-50 pointer-events-none"
        style={{ boxShadow: "-10px 0 30px rgba(0,0,0,0.5)" }}
      />
    </>
  )
}
