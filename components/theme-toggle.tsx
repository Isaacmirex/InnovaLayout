"use client"

import { useState, useEffect } from "react"
import { Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("theme") ?? "dark"
    setIsDark(saved === "dark")
  }, [])

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem("theme", next ? "dark" : "light")
  }

  if (!mounted) return <div className="w-9 h-9" />

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      className="w-9 h-9 rounded-xl border border-border bg-card/60 backdrop-blur-sm flex items-center justify-center hover:bg-card hover:border-[#00AAFF]/40 transition-all duration-200"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="w-4 h-4 text-[#00AAFF]" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: 30, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -30, scale: 0.7 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="w-4 h-4 text-[#8090B0]" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
