"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
  Factory, Mail, Phone, MapPin,
  Linkedin, Instagram, Youtube, ArrowRight,
  Globe
} from "lucide-react"

const WA_LINK = "https://wa.me/593990315234?text=%C2%BFCu%C3%A1l%20es%20el%20cat%C3%A1logo%20de%20sus%20servicios%20y%20c%C3%B3mo%20agendo%3F"

const navLinks = [
  { name: "Inicio",    href: "#inicio" },
  { name: "Servicios", href: "#servicios" },
  { name: "Nosotros",  href: "#nosotros" },
  { name: "Simulador", href: "#simulador" },
  { name: "Proceso",   href: "#proceso" },
  { name: "FAQ",       href: "#faq" },
]

const legalLinks = [
  { name: "Política de Privacidad", href: "#" },
  { name: "Términos de Uso",        href: "#" },
  { name: "Política de Reembolso",  href: "#" },
]

const socialLinks = [
  { Icon: Linkedin,  href: "#", label: "LinkedIn" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Youtube,   href: "#", label: "YouTube" },
  { Icon: Globe,     href: "#", label: "Web" },
]

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <footer id="contacto" ref={ref} className="relative overflow-hidden bg-[#0B0F1E] border-t border-[#1B2540]">
      {/* Subtle crimson radial */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_0%_50%,_#0077CC_0%,_transparent_50%)] opacity-6" />

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="container mx-auto px-6 pt-20 pb-10">
          <div className="grid lg:grid-cols-3 gap-16 mb-16">

            {/* Left — Bold navigation */}
            <motion.nav
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="lg:col-span-1"
            >
              <p className="text-xs uppercase tracking-widest text-[#8090B0]/70 mb-6">Navegación</p>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-2xl md:text-3xl font-bold text-white/70 hover:text-white transition-colors duration-200 leading-tight block group"
                    >
                      <span className="group-hover:translate-x-1 inline-block transition-transform duration-200">
                        {link.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.nav>

            {/* Center — CTA + tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-1 flex flex-col justify-between"
            >
              <div>
                <p className="text-xs uppercase tracking-widest text-[#8090B0]/70 mb-4">Sobre nosotros</p>
                <p className="text-sm text-[#8090B0] leading-relaxed mb-6 max-w-xs">
                  Optimizamos operaciones industriales de MiPymes en Ecuador con metodologías técnicas
                  probadas. Cada intervención genera resultados medibles.
                </p>
                {/* ODS badges */}
                <div className="flex items-center gap-2 mb-8">
                  <div className="px-3 py-1.5 rounded-lg bg-[#0077CC]/15 border border-[#0077CC]/30">
                    <span className="text-xs font-bold text-[#8090B0]">ODS 9</span>
                    <span className="text-xs text-muted-foreground ml-1.5">Industria</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-[#00AAFF]/10 border border-[#00AAFF]/30">
                    <span className="text-xs font-bold text-[#00AAFF]">ODS 11</span>
                    <span className="text-xs text-muted-foreground ml-1.5">Ciudades</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div>
                <p className="text-xs text-[#8090B0]/60 uppercase tracking-widest mb-3">
                  CADA OPTIMIZACIÓN HOY CONSTRUYE LA EMPRESA DE MAÑANA
                </p>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#00AAFF]/50 text-[#00AAFF] font-bold tracking-widest text-xs hover:bg-[#00AAFF]/10 transition-all duration-300 group"
                >
                  AGENDAR CONSULTA
                  <span className="w-7 h-7 rounded-full bg-[#00AAFF] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5 text-[#0B0F1E]" />
                  </span>
                </a>
              </div>
            </motion.div>

            {/* Right — Contact + Social */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <p className="text-xs uppercase tracking-widest text-[#8090B0]/70 mb-6">Contáctanos</p>

              <div className="space-y-4 mb-8">
                <a
                  href="mailto:innovalayout.ec@gmail.com"
                  className="block text-lg font-semibold text-white hover:text-[#00AAFF] transition-colors underline-offset-4 hover:underline"
                >
                  innovalayout.ec@gmail.com
                </a>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#8090B0] hover:text-white transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  +593 99 031 5234
                </a>
                <div className="flex items-center gap-2 text-[#8090B0] text-sm">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  Provincia de Pichincha, Ecuador
                </div>
              </div>

              <p className="text-xs uppercase tracking-widest text-[#8090B0]/70 mb-4">Redes Sociales</p>
              <div className="flex flex-wrap items-center gap-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-10 h-10 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-primary/10 flex items-center justify-center transition-all duration-200"
                  >
                    <s.Icon className="w-4 h-4 text-muted-foreground" />
                  </a>
                ))}
              </div>

              {/* Legal links */}
              <div className="mt-8 space-y-1">
                <p className="text-xs uppercase tracking-widest text-[#8090B0]/70 mb-2">Legal</p>
                {legalLinks.map((l) => (
                  <a key={l.name} href={l.href} className="block text-xs text-[#8090B0]/50 hover:text-[#8090B0] transition-colors">
                    {l.name}
                  </a>
                ))}
                <p className="text-xs text-[#8090B0]/30 mt-2">
                  INNOVALAYOUT S.A.S.<br />
                  RUC: 1792XXXXXX001 · Registrada en Ecuador
                </p>
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-3" />

          {/* Copyright strip */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 py-4">
            <p className="text-xs text-[#8090B0]/40">
              © 2026 InnovaLayout S.A.S. — Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#0077CC]/20 rounded-md flex items-center justify-center border border-[#0077CC]/30">
                <Factory className="w-3.5 h-3.5 text-[#00AAFF]" />
              </div>
              <span className="text-xs text-[#8090B0]/40">Diseñado para MiPymes industriales de Ecuador</span>
            </div>
          </div>
        </div>

        {/* Giant brand wordmark */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="relative overflow-hidden select-none pointer-events-none pb-0"
          aria-hidden="true"
        >
          <p
            className="text-center font-black leading-none tracking-tighter"
            style={{
              fontSize: "clamp(60px, 12vw, 180px)",
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(193,51,68,0.40)",
              letterSpacing: "-0.04em",
            }}
          >
            INNOVALAYOUT
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
