"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"

const WA_LINK = "https://wa.me/593990315234?text=%C2%BFCu%C3%A1l%20es%20el%20cat%C3%A1logo%20de%20sus%20servicios%20y%20c%C3%B3mo%20agendo%3F"

const results = [
  { metric: "+40%", label: "Productividad promedio alcanzada" },
  { metric: "-35%", label: "Reducción de desperdicios" },
  { metric: "< 90 días", label: "Tiempo de implementación" },
]

const clients = [
  { name: "Sector Alimentario", sector: "Alimentario" },
  { name: "Sector Textil", sector: "Textil" },
  { name: "Sector Alimentario", sector: "Alimentario" },
  { name: "Sector Textil", sector: "Textil" },
  { name: "Sector Alimentario", sector: "Alimentario" },
  { name: "Sector Textil", sector: "Textil" },
]

const sectorLabels = [
  { icon: "🧵", label: "Industria Textil", desc: "Talleres de confección, hilado y tejeduría" },
  { icon: "🏭", label: "Industria Alimentaria", desc: "Plantas de procesamiento, empacado y distribución" },
]

export default function ClientsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section id="casos" className="py-0 relative overflow-hidden">

      {/* Full-bleed industrial photo */}
      <div className="relative h-[65vh] min-h-[480px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/Nestle.jpg"
            alt="Equipo InnovaLayout en planta industrial"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 pointer-events-none
          dark:bg-gradient-to-t dark:from-[#0B0F1E] dark:via-[#0B0F1E]/55 dark:to-[#0B0F1E]/10
          bg-gradient-to-t from-white/90 via-white/50 to-white/10" />
        <div className="absolute inset-0 pointer-events-none
          dark:bg-gradient-to-r dark:from-[#0B0F1E]/65 dark:to-transparent
          bg-gradient-to-r from-white/70 to-transparent" />

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute top-0 left-0 h-1 w-48 bg-gradient-to-r from-[#00AAFF] to-[#0077CC] origin-left"
        />

        <div ref={ref} className="container mx-auto px-6 pb-16 relative z-10 w-full">
          <div className="max-w-3xl">

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-5"
            >
              <span className="text-primary text-xs font-bold tracking-[0.3em] uppercase">Resultados reales</span>
              <div className="h-px w-12 bg-[#00AAFF]/60" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl font-black leading-[1] tracking-tight mb-4 dark:text-white text-[#0B0F1E]"
            >
              Operaciones que<br />
              <span className="text-primary">
                transformamos
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-muted-foreground text-lg max-w-xl leading-relaxed"
            >
              Trabajamos junto a MiPymes textiles y alimentarias de Ecuador,
              implementando metodologías Lean para optimizar espacios, reducir tiempos
              y aumentar la capacidad productiva.
            </motion.p>

            {/* Generic result metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-8 mt-8"
            >
              {results.map((r) => (
                <div key={r.label} className="border-l-2 border-[#00AAFF] pl-4">
                  <div className="text-2xl font-black dark:text-white text-[#0B0F1E]">{r.metric}</div>
                  <div className="text-xs text-muted-foreground mt-1 max-w-[130px] leading-tight">{r.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Sectors strip */}
      <div className="bg-background border-t border-border py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col items-center gap-10"
          >
            <p className="text-xs text-muted-foreground/50 tracking-[0.3em] uppercase text-center">
              Sectores industriales donde operamos
            </p>

            <div className="flex flex-col sm:flex-row gap-6 max-w-2xl w-full justify-center">
              {sectorLabels.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex-1 bg-card border border-border rounded-2xl px-6 py-5 flex items-start gap-4"
                >
                  <span className="text-2xl">{s.icon}</span>
                  <div>
                    <div className="font-bold text-foreground text-sm">{s.label}</div>
                    <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{s.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.85 }}
              className="inline-flex items-center gap-3 mt-2 px-7 py-3.5 rounded-full border border-[#00AAFF]/50 text-[#00AAFF] text-sm font-bold tracking-widest hover:bg-[#00AAFF]/10 transition-all group"
            >
              SOLICITAR DIAGNÓSTICO
              <span className="w-7 h-7 rounded-full bg-[#00AAFF] flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowRight className="w-3.5 h-3.5 text-[#0B0F1E]" />
              </span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
