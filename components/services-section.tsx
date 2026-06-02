"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import {
  BarChart3,
  Layout,
  Wrench,
  ArrowRight,
  TrendingUp,
  Timer,
  Boxes,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  {
    id: 1,
    icon: BarChart3,
    title: "Gerencia de Planeación y Control",
    shortTitle: "Planeación",
    description:
      "Optimizamos la planificación, programación y control de la producción para garantizar el uso eficiente de los recursos en cada turno operativo.",
    features: [
      "Planificación maestra de producción (MPS)",
      "Control estricto de inventarios y stock",
      "Evaluación de capacidad instalada",
      "Indicadores de gestión y productividad (KPIs)",
    ],
    accent: "#8B1A2A",
    accentLight: "#8090B0",
    gradientFrom: "from-[#111827]/25",
    gradientTo: "to-[#8B1A2A]/10",
    borderColor: "border-[#8B1A2A]/35",
    bgIcon: "bg-[#8B1A2A]/15",
    animation: TrendingUp,
  },
  {
    id: 2,
    icon: Layout,
    title: "Diseño y Optimización de Layout",
    shortTitle: "Layout",
    description:
      "Diseñamos y rediseñamos la distribución de planta para mejorar el flujo de materiales, reducir recorridos y aprovechar el espacio físico disponible.",
    features: [
      "Análisis de flujo de procesos y relaciones",
      "Redistribución de áreas mediante SLP",
      "Reducción de recorridos innecesarios",
      "Simulación y validación del nuevo layout",
    ],
    accent: "#C13344",
    accentLight: "#C13344",
    gradientFrom: "from-[#C13344]/15",
    gradientTo: "to-[#111827]/15",
    borderColor: "border-[#C13344]/30",
    bgIcon: "bg-[#C13344]/15",
    animation: Boxes,
  },
  {
    id: 3,
    icon: Wrench,
    title: "Mantenimiento Industrial",
    shortTitle: "Mantenimiento",
    description:
      "Previene paros costosos, gestiona activos y elimina fallas repetitivas con planes de mantenimiento técnico especializado para tu maquinaria.",
    features: [
      "Planes de mantenimiento: Previene paros costosos y repara fallas al instante.",
      "Indicadores de mantenimiento: Optimiza tu presupuesto midiendo el rendimiento con KPIs.",
      "Gestión de activos: Maximiza la vida útil de toda tu maquinaria.",
      "Diagnóstico de fallas: Elimina averías repetitivas identificando la causa raíz.",
    ],
    accent: "#8090B0",
    accentLight: "#8090B0",
    gradientFrom: "from-[#8090B0]/15",
    gradientTo: "to-[#8B1A2A]/10",
    borderColor: "border-[#8090B0]/30",
    bgIcon: "bg-[#8090B0]/15",
    animation: Timer,
  },
]

function ServiceCard({ service, index }: { service: (typeof services)[0]; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.18 }}
      className={`relative group rounded-2xl bg-gradient-to-br ${service.gradientFrom} ${service.gradientTo} p-[1px] overflow-hidden`}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${service.accent}18 0%, transparent 70%)`,
        }}
      />

      <div className={`relative bg-card rounded-2xl p-6 lg:p-8 h-full border ${service.borderColor}`}>
        {/* Top accent line */}
        <div
          className="absolute top-0 left-8 right-8 h-px opacity-60"
          style={{ background: `linear-gradient(to right, transparent, ${service.accent}, transparent)` }}
        />

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div
            className={`w-14 h-14 rounded-xl ${service.bgIcon} flex items-center justify-center border ${service.borderColor}`}
          >
            <service.icon className="w-7 h-7" style={{ color: service.accent }} />
          </div>
          <span className="text-xs font-mono text-muted-foreground/50">0{service.id}</span>
        </div>

        <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3">{service.title}</h3>
        <p className="text-muted-foreground mb-6 leading-relaxed text-sm">{service.description}</p>

        {/* Expandable features */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? "auto" : 0 }}
          className="overflow-hidden"
        >
          <div className="pb-4">
            <ul className="space-y-2.5">
              {service.features.map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isExpanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: service.accent }}
                  />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground gap-1 text-xs"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Ver menos" : "Ver detalle"}
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-xs font-medium group/btn"
            style={{ color: service.accent }}
          >
            Consultar
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Ambient icon */}
        <div className="absolute bottom-5 right-5 opacity-[0.06] group-hover:opacity-[0.1] transition-opacity duration-500">
          <service.animation className="w-20 h-20" style={{ color: service.accent }} />
        </div>
      </div>
    </motion.div>
  )
}

export default function ServicesSection() {
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true })

  return (
    <section id="servicios" className="py-28 relative overflow-hidden">
      {/* Subtle bg texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,_#111827_0%,_transparent_30%)] opacity-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_80%,_#8B1A2A_0%,_transparent_25%)] opacity-8" />

      <div className="container mx-auto px-4">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-6"
          >
            <Wrench className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Líneas de Servicio</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-foreground mb-4"
          >
            Soluciones técnicas{" "}
            <span className="text-primary">integrales</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Tres líneas de servicio complementarias que transforman espacios productivos
            en sistemas inteligentes de alto rendimiento y eficiencia operativa.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 text-center"
        >
          <p className="text-muted-foreground text-sm mb-4">
            ¿No sabes cuál servicio necesitas?{" "}
            <span className="text-primary font-medium">Nuestro diagnóstico gratuito</span> lo determina por ti.
          </p>
          <Button
            size="sm"
            variant="outline"
            className="border-[#C13344]/40 text-[#C13344] hover:bg-[#C13344]/10 gap-2"
          >
            Solicitar Diagnóstico <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
