"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Target,
  Eye,
  Compass,
  Users,
  Award,
  Leaf,
  Globe,
  Zap,
} from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const misionItems = [
  "Diagnóstico técnico de operaciones industriales",
  "Diseño y rediseño de distribuciones de planta (SLP)",
  "Optimización de procesos mediante Lean Manufacturing",
  "Planificación y control de la producción",
  "Formación y transferencia de conocimiento a equipos locales",
]

const visionPillars = [
  { icon: Globe, label: "Alcance regional en Latinoamérica" },
  { icon: Award, label: "Referente en metodología SLP" },
  { icon: Users, label: "+200 MiPymes transformadas" },
  { icon: Leaf, label: "Industria sostenible y eficiente" },
]

const alcanceSectors = [
  {
    title: "Sector Textil",
    description: "Talleres de confección, hilado y tejeduría. Reducción de tiempos de ciclo y recorridos entre estaciones de trabajo.",
    gradient: "from-[#111827]/30 to-[#8B1A2A]/20",
    border: "border-[#8B1A2A]/40",
  },
  {
    title: "Sector Alimentario",
    description: "Plantas de procesamiento, empacado y distribución. Cumplimiento BPM y trazabilidad del flujo productivo.",
    gradient: "from-[#0B0F1E] to-[#111827]/20",
    border: "border-[#8090B0]/30",
  },
]

const values = [
  { icon: Zap, label: "Innovación", desc: "Aplicamos metodologías actualizadas y herramientas técnicas de vanguardia." },
  { icon: Users, label: "Colaboración", desc: "Trabajamos junto a tu equipo para generar soluciones sostenibles a largo plazo." },
  { icon: Target, label: "Resultados", desc: "Cada intervención se mide con indicadores claros: tiempo, espacio y productividad." },
  { icon: Leaf, label: "Sostenibilidad", desc: "Alineados con ODS 9 y ODS 11 para una industria más limpia y eficiente." },
]

function Counter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useGSAP(() => {
    if (!isInView || !ref.current) return
    gsap.fromTo(
      ref.current,
      { textContent: 0 },
      {
        textContent: target,
        duration: 2,
        ease: "power2.out",
        snap: { textContent: 1 },
        onUpdate() {
          if (ref.current) {
            ref.current.textContent = `${prefix}${Math.round(Number(ref.current.textContent))}${suffix}`
          }
        },
      }
    )
  }, { dependencies: [isInView] })

  return <span ref={ref}>{prefix}0{suffix}</span>
}

export default function NosotrosSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" })

  return (
    <section id="nosotros" className="py-28 relative overflow-hidden">
      {/* Layered backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_30%,_#111827_0%,_transparent_55%)] opacity-15" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_70%,_#C13344_0%,_transparent_50%)] opacity-5" />

      <div className="container mx-auto px-4 relative z-10" ref={sectionRef}>

        {/* Section badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-6">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Quiénes Somos</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Ingeniería con{" "}
            <span className="text-primary">propósito real</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Somos un equipo de ingenieros industriales ecuatorianos comprometidos
            con la transformación operativa de las MiPymes del país.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24"
        >
          {[
            { value: 40, suffix: "+", label: "Empresas Asesoradas" },
            { value: 8, suffix: " años", label: "Experiencia en sector" },
            { value: 95, suffix: "%", label: "Clientes satisfechos" },
            { value: 3, suffix: " países", label: "Alcance regional" },
          ].map((stat, i) => (
            <div key={i} className="text-center bg-card rounded-2xl border border-border p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Misión */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">01</p>
                <h3 className="text-2xl font-bold text-foreground">Misión</h3>
              </div>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Contribuir al crecimiento sostenible de las micro, pequeñas y medianas
              empresas industriales de Ecuador, mediante la aplicación de metodologías
              de ingeniería de métodos, diseño de planta y planeación de producción que
              generen resultados medibles y duraderos.
            </p>
            <ul className="space-y-3">
              {misionItems.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.08 }}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#C13344] flex-shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            {/* Real factory photo */}
            <div className="relative rounded-2xl overflow-hidden border border-border h-80">
              <img
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80"
                alt="Planta industrial optimizada"
                className="w-full h-full object-cover object-center"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1E]/90 via-[#0B0F1E]/20 to-transparent" />
              <div className="absolute inset-0 bg-[#8B1A2A]/10" />
              {/* Floating badges */}
              <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-border text-xs text-foreground font-medium">
                🎯 Resultados medibles
              </div>
              <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-border text-xs text-foreground font-medium">
                🇪🇨 Hecho en Ecuador
              </div>
            </div>
          </motion.div>
        </div>

        {/* Visión */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative order-2 lg:order-1"
          >
            {/* Vision visual — real team photo */}
            <div className="relative rounded-2xl overflow-hidden border border-border h-72">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80"
                alt="Equipo de consultoría industrial"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1E]/95 via-[#0B0F1E]/30 to-transparent" />
              <div className="relative h-full flex flex-col justify-between p-6">
                <p className="text-4xl font-bold text-foreground/15 select-none">2030</p>
                <div className="space-y-3">
                  {visionPillars.map((pillar, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-center gap-3 bg-card/60 backdrop-blur-sm rounded-lg px-4 py-2.5 border border-border"
                    >
                      <pillar.icon className="w-4 h-4 text-[#C13344]" />
                      <span className="text-sm text-foreground">{pillar.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="order-1 lg:order-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#C13344]/15 border border-[#C13344]/30 flex items-center justify-center">
                <Eye className="w-6 h-6 text-[#C13344]" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">02</p>
                <h3 className="text-2xl font-bold text-foreground">Visión</h3>
              </div>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Ser la consultora de referencia en optimización operativa industrial
              para MiPymes en Ecuador y Latinoamérica hacia 2030, reconocida por
              la solidez técnica de sus metodologías, el impacto real en la productividad
              de sus clientes y su compromiso con una industria más eficiente y sostenible.
            </p>
            <div className="bg-card rounded-xl border border-[#C13344]/20 p-4">
              <p className="text-sm text-muted-foreground italic">
                "Creemos que cada planta industrial bien organizada es un paso hacia
                una economía más competitiva y equitativa para Ecuador."
              </p>
              <p className="text-xs text-[#C13344] mt-2 font-medium">— Franciss Delgado, Fundadora InnovaLayout</p>
            </div>
          </motion.div>
        </div>

        {/* Alcance */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-10 justify-center">
            <div className="w-12 h-12 rounded-xl bg-[#8090B0]/15 border border-[#8090B0]/30 flex items-center justify-center">
              <Compass className="w-6 h-6 text-[#8090B0]" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">03</p>
              <h3 className="text-2xl font-bold text-foreground">Alcance de Operación</h3>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {alcanceSectors.map((sector, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.12 }}
                className={`relative rounded-2xl bg-gradient-to-br ${sector.gradient} p-[1px] group`}
              >
                <div className={`relative bg-card rounded-2xl p-6 h-full border ${sector.border}`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="text-xs font-mono text-muted-foreground mb-3 block">0{i + 1}</span>
                  <h4 className="text-lg font-bold text-foreground mb-3">{sector.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{sector.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Organigrama */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.28 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-10 justify-center">
            <div className="w-12 h-12 rounded-xl bg-[#C13344]/15 border border-[#C13344]/30 flex items-center justify-center">
              <span className="text-[#C13344] font-bold text-sm">04</span>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">04</p>
              <h3 className="text-2xl font-bold text-foreground">Equipo Directivo</h3>
            </div>
          </div>

          <div className="rounded-2xl border border-border overflow-hidden bg-card p-4 md:p-8">
            <img
              src="/direcion.jpeg"
              alt="Organigrama InnovaLayout S.A.S. — Estructura directiva"
              className="w-full h-auto object-contain rounded-xl"
              style={{ maxHeight: "680px" }}
            />
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h3 className="text-xl font-bold text-foreground text-center mb-8">Nuestros Valores</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.45 + i * 0.08 }}
                className="bg-card rounded-xl border border-border p-5 text-center group hover:border-primary/40 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                  <value.icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{value.label}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
