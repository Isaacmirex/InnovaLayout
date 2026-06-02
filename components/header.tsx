"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import InnovaLogo from "@/components/logo"
import ThemeToggle from "@/components/theme-toggle"

const WA_LINK = "https://wa.me/593990315234?text=%C2%BFCu%C3%A1l%20es%20el%20cat%C3%A1logo%20de%20sus%20servicios%20y%20c%C3%B3mo%20agendo%3F"

const navItems = [
  { name: "Inicio", href: "#inicio" },
  { name: "Servicios", href: "#servicios" },
  { name: "Nosotros", href: "#nosotros" },
  { name: "Simulador", href: "#simulador" },
  { name: "Proceso", href: "#proceso" },
  { name: "Contacto", href: "#contacto" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-lg border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#inicio"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 group"
          >
            <InnovaLogo size={44} />
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight leading-none">InnovaLayout</h1>
              <p className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase">S.A.S. · Ecuador</p>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
              >
                {item.name}
              </motion.a>
            ))}
          </nav>

          {/* CTA + Theme toggle */}
          <div className="hidden md:flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <ThemeToggle />
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#00AAFF] hover:bg-[#00AAFF]/90 text-[#0B0F1E] font-bold gap-2 shadow-md shadow-[#00AAFF]/20">
                  <Phone className="w-4 h-4" />
                  Consulta Gratis
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="block mt-4">
                <Button className="w-full bg-[#00AAFF] hover:bg-[#00AAFF]/90 text-[#0B0F1E] font-bold gap-2">
                  <Phone className="w-4 h-4" />
                  Consulta Gratis
                </Button>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
