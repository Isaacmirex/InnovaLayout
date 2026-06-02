"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, ChevronDown } from "lucide-react"
import dynamic from "next/dynamic"

const WA_LINK = "https://wa.me/593990315234?text=%C2%BFCu%C3%A1l%20es%20el%20cat%C3%A1logo%20de%20sus%20servicios%20y%20c%C3%B3mo%20agendo%3F"

const HeroScene = dynamic(() => import("@/components/hero-scene"), {
  ssr: false,
  loading: () => null,
})

const stats = [
  { value: "+40%", label: "Productividad" },
  { value: "-35%", label: "Desperdicios" },
  { value: "100%", label: "A la medida" },
]

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="inicio"
      ref={containerRef}
      className="relative min-h-screen flex items-end overflow-hidden dark:bg-[#0B0F1E] bg-slate-100"
    >
      {/* Full-bleed background */}
      <div className="absolute inset-0 -z-30">
        <img
          src="/imagen2.webp"
          alt=""
          className="w-full h-full object-cover object-center"
          aria-hidden="true"
        />
      </div>

      {/* 3D particles — dark mode only */}
      <div className="hidden dark:block">
        <HeroScene />
      </div>

      {/* Overlay — dark mode: deep navy, light mode: light tint so image shows */}
      <div className="absolute inset-0 -z-10 pointer-events-none
        dark:bg-gradient-to-t dark:from-[#0B0F1E] dark:via-[#0B0F1E]/75 dark:to-[#0B0F1E]/50
        bg-gradient-to-t from-white/80 via-white/40 to-white/10" />
      {/* Left vignette */}
      <div className="absolute inset-0 -z-10 pointer-events-none
        dark:bg-gradient-to-r dark:from-[#0B0F1E]/85 dark:via-[#0B0F1E]/20 dark:to-transparent
        bg-gradient-to-r from-white/70 via-white/20 to-transparent" />

      {/* Content */}
      <div className="container mx-auto px-6 pb-24 pt-40 relative z-10 w-full">
        <div className="max-w-5xl">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-2 h-2 bg-[#00AAFF] rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-primary tracking-[0.25em] uppercase">
              Consultora
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3rem,8vw,7rem)] font-black leading-[0.95] tracking-tight mb-8
              dark:text-white text-[#0B0F1E]"
          >
            Diseñamos el<br />
            <span className="text-primary">
              futuro operativo
            </span><br />
            de tu empresa
          </motion.h1>

          {/* Subtext + CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-start sm:items-end gap-8"
          >
            <p className="text-lg max-w-md leading-relaxed dark:text-[#8090B0] text-slate-600">
              Más eficiencia, menos desperdicio, mejores resultados. Optimizamos
              operaciones de MiPymes textiles y alimentarias con metodologías probadas.
            </p>

            <div className="flex flex-col gap-3 flex-shrink-0">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[#00AAFF] text-white font-bold tracking-wide text-sm hover:bg-[#00AAFF]/90 transition-all duration-300 group shadow-lg shadow-[#00AAFF]/30"
              >
                Solicitar Consulta Gratuita
                <span className="w-7 h-7 rounded-full bg-black/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>
              <a
                href="#simulador"
                className="inline-flex items-center gap-2 text-sm dark:text-[#8090B0] text-slate-500 hover:text-[#00AAFF] transition-colors"
                onClick={(e) => { e.preventDefault(); document.getElementById("simulador")?.scrollIntoView({ behavior: "smooth" }) }}
              >
                <span className="w-8 h-px bg-current opacity-50" />
                Ver simulador de eficiencia
              </a>
            </div>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="flex gap-10 mt-16 pt-8 dark:border-t dark:border-white/10 border-t border-black/10"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-black dark:text-white text-[#0B0F1E]">{s.value}</div>
                <div className="text-xs mt-1 tracking-wide dark:text-[#8090B0] text-slate-500">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        onClick={() => document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 right-8 flex flex-col items-center gap-1 dark:text-[#8090B0]/40 text-slate-400 hover:text-[#00AAFF] transition-colors z-10"
      >
        <span className="text-[9px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      {/* Bottom crimson line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 1.0, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00AAFF]/50 to-transparent origin-left"
      />
    </section>
  )
}
