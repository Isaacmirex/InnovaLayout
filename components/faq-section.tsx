"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { 
  ChevronDown,
  HelpCircle,
  AlertTriangle,
  TrendingDown,
  Users,
  Target,
  Lightbulb
} from "lucide-react"

const faqs = [
  {
    id: 1,
    icon: HelpCircle,
    question: "¿Recién empiezas tu negocio?",
    answer: "Te guiaremos en los pasos básicos sin teoría innecesaria. Elegiremos juntos entre un layout por proceso o por producto según tu capacidad inicial, estableciendo bases sólidas para el crecimiento.",
    features: ["Diagnóstico inicial gratuito", "Planificación de capacidad", "Diseño de planta inicial"]
  },
  {
    id: 2,
    icon: AlertTriangle,
    question: "¿Sospechas que estás perdiendo dinero en operaciones?",
    answer: "Te ayudaremos a identificar los cuellos de botella y desperdicios ocultos. Analizaremos tu flujo de producción para determinar exactamente dónde se pierde rentabilidad.",
    features: ["Mapeo de flujo de valor", "Identificación de desperdicios", "Plan de acción inmediato"]
  },
  {
    id: 3,
    icon: TrendingDown,
    question: "¿Has tenido experiencias negativas con consultores?",
    answer: "Entendemos tu frustración. Analizaremos qué falló en tu caso anterior y replantearemos tu estrategia de trabajo con un enfoque 100% basado en datos y resultados medibles.",
    features: ["Diagnóstico sin compromiso", "Metodología transparente", "Garantía de resultados"]
  },
  {
    id: 4,
    icon: Users,
    question: "¿Has probado todo excepto un analista personal?",
    answer: "Te proporcionaremos soporte personalizado en horarios convenientes. Asesoraremos sobre cada decisión operativa clave, como si tuvieras un ingeniero industrial en tu equipo.",
    features: ["Asesor dedicado", "Comunicación directa", "Seguimiento continuo"]
  },
  {
    id: 5,
    icon: Target,
    question: "¿Quieres una opinión alternativa sobre tu operación?",
    answer: "Analizaremos tu planta con ojos de profesional externo. Identificaremos oportunidades que podrías estar pasando por alto y te daremos una visión objetiva de tu situación.",
    features: ["Auditoría externa", "Benchmark sectorial", "Recomendaciones priorizadas"]
  },
  {
    id: 6,
    icon: Lightbulb,
    question: "¿Buscas escalabilidad para tu MiPyme?",
    answer: "Diseñaremos un plan de crecimiento sostenible. Te ayudaremos a preparar tu infraestructura operativa para duplicar o triplicar tu capacidad cuando llegue el momento.",
    features: ["Plan de escalabilidad", "Inversión por fases", "Proyección de ROI"]
  }
]

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left p-5 md:p-6 rounded-xl transition-all duration-300 ${
          isOpen 
            ? "bg-primary/10 border-primary/30" 
            : "bg-card hover:bg-card/80 border-border"
        } border`}
      >
        <div className="flex items-start gap-4">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 ${
            isOpen ? "bg-primary/20" : "bg-secondary"
          }`}>
            <faq.icon className={`w-5 h-5 transition-colors duration-300 ${
              isOpen ? "text-primary" : "text-muted-foreground"
            }`} />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-semibold text-foreground text-lg text-balance">
                {faq.question}
              </h3>
              <ChevronDown className={`w-5 h-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`} />
            </div>

            <motion.div
              initial={false}
              animate={{ 
                height: isOpen ? "auto" : 0,
                opacity: isOpen ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="text-muted-foreground mt-3 text-pretty">
                {faq.answer}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {faq.features.map((feature, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </button>
    </motion.div>
  )
}

export default function FAQSection() {
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true })

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-6"
          >
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
              <HelpCircle className="w-3 h-3 text-primary" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">{"¿Cuándo vale la pena consultar?"}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance"
          >
            Identifica tu{" "}
            <span className="text-primary">situación</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg text-pretty"
          >
            Descubre cómo podemos ayudarte según tu contexto específico. 
            Cada situación tiene una solución personalizada.
          </motion.p>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
          {faqs.map((faq, index) => (
            <FAQItem key={faq.id} faq={faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
