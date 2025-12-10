"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function RevealBar() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
  }, [])

  if (!show) return null

  return (
    <motion.div
      className="fixed top-0 left-0 h-full w-1 bg-primary z-40 pointer-events-none"
      initial={{ x: 0 }}
      animate={{ x: "100vw" }}
      transition={{ duration: 2, delay: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
    />
  )
}
