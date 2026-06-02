"use client"

import { motion, AnimatePresence, useInView } from "framer-motion"
import { useRef, useState } from "react"

const WA_LINK = "https://wa.me/593990315234?text=%C2%BFCu%C3%A1l%20es%20el%20cat%C3%A1logo%20de%20sus%20servicios%20y%20c%C3%B3mo%20agendo%3F"
import {
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Phone,
  TrendingUp,
  Briefcase,
  RotateCcw,
  Sparkles,
} from "lucide-react"

const questions = [
  {
    id: 1,
    Icon: HelpCircle,
    question: "¿Ya tienes experiencia en producción industrial?",
    sub: "Más de 2 años gestionando operaciones o planta",
  },
  {
    id: 2,
    Icon: Briefcase,
    question: "¿Tienes problemas identificados en tu planta?",
    sub: "Cuellos de botella, tiempos muertos, espacio mal utilizado",
  },
  {
    id: 3,
    Icon: TrendingUp,
    question: "¿Has trabajado antes con consultores industriales?",
    sub: "Experiencia previa con auditorías o mejora continua",
  },
]

const outcomes = {
  allYes: {
    Icon: Sparkles,
    title: "Solución profesional con consultor especializado",
    description:
      "Nuestros ingenieros analizarán tu planta, formularán objetivos claros y diseñarán una estrategia personalizada. Sin teorías, solo resultados medibles.",
    cta: "CONSULTA",
    ctaColor: "border-[#0077CC] text-[#0077CC] hover:bg-[#0077CC]/10",
    accent: "#0077CC",
  },
  someNo: {
    Icon: TrendingUp,
    title: "¿Recién empiezas?",
    description:
      "Realizamos un diagnóstico inicial gratuito de tu operación. Identificamos los problemas críticos y trazamos un plan de acción antes de cualquier intervención.",
    cta: "CONSULTA",
    cta2: "DIAGNÓSTICO",
    ctaColor: "border-[#00AAFF] text-[#00AAFF] hover:bg-[#00AAFF]/10",
    accent: "#00AAFF",
  },
}

export default function DecisionTree() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({})
  const [showResult, setShowResult] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const answeredCount = Object.keys(answers).length
  const allYes = Object.values(answers).every(Boolean)
  const outcome = answeredCount === questions.length
    ? (allYes ? outcomes.allYes : outcomes.someNo)
    : null

  const answer = (qId: number, yes: boolean) => {
    const next = { ...answers, [qId]: yes }
    setAnswers(next)
    if (Object.keys(next).length === questions.length) {
      setTimeout(() => setShowResult(true), 350)
    }
  }

  const reset = () => { setAnswers({}); setShowResult(false) }

  const activeQuestion = questions.find(q => answers[q.id] === undefined)

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_50%,_#00AAFF_0%,_transparent_60%)] opacity-4" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-6">
            <div className="w-5 h-5 rounded-full bg-[#0077CC]/20 flex items-center justify-center">
              <TrendingUp className="w-3 h-3 text-[#0077CC]" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">¿Cómo aprovechar tu consultoría?</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Descubre tu{" "}
            <span className="text-primary">camino ideal</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Responde tres preguntas y te mostramos qué tipo de consultoría se adapta mejor a tu situación.
          </p>
        </motion.div>

        {/* Tree layout */}
        <div className="max-w-3xl mx-auto">
          {/* Questions */}
          <div className="relative">
            {questions.map((q, i) => {
              const isAnswered = answers[q.id] !== undefined
              const isActive = q.id === activeQuestion?.id && !showResult
              const answeredYes = answers[q.id] === true
              const answeredNo = answers[q.id] === false

              return (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.15, duration: 0.55 }}
                  className="flex gap-4 mb-4"
                >
                  {/* Left connector column */}
                  <div className="flex flex-col items-center w-10 flex-shrink-0">
                    {/* Circle */}
                    <div
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-400 ${
                        answeredYes
                          ? "bg-[#0077CC] border-[#0077CC]"
                          : answeredNo
                          ? "bg-red-500/20 border-red-500/60"
                          : isActive
                          ? "bg-card border-[#0077CC]"
                          : "bg-card border-border"
                      }`}
                    >
                      {answeredYes ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : answeredNo ? (
                        <q.Icon className="w-5 h-5 text-red-400" />
                      ) : (
                        <q.Icon className={`w-5 h-5 ${isActive ? "text-[#0077CC]" : "text-muted-foreground/40"}`} />
                      )}
                    </div>
                    {/* Line */}
                    {i < questions.length - 1 && (
                      <div
                        className={`flex-1 w-0.5 my-1 ${
                          answeredYes ? "bg-[#0077CC]/50" : "border-l border-dashed border-muted-foreground/20"
                        }`}
                        style={{ minHeight: 20 }}
                      />
                    )}
                  </div>

                  {/* Card + No branch */}
                  <div className="flex-1 flex gap-3">
                    {/* Main question card */}
                    <div
                      className={`flex-1 rounded-xl border p-4 transition-all duration-300 ${
                        isActive
                          ? "border-[#0077CC]/50 bg-card shadow-lg shadow-[#0077CC]/5"
                          : isAnswered
                          ? "border-border/50 bg-card/60"
                          : "border-border/30 bg-card/30"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div>
                          <p className="text-xs text-muted-foreground/50 mb-0.5 font-mono">0{q.id}</p>
                          <h3 className={`font-bold text-sm leading-snug ${isAnswered ? "text-foreground/80" : "text-foreground"}`}>
                            {q.question}
                          </h3>
                          <p className="text-xs text-muted-foreground/60 mt-1">{q.sub}</p>
                        </div>
                        {answeredYes && (
                          <span className="text-xs font-bold text-[#0077CC] bg-[#0077CC]/10 px-2 py-0.5 rounded-full flex-shrink-0">
                            Sí
                          </span>
                        )}
                        {answeredNo && (
                          <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full flex-shrink-0">
                            No
                          </span>
                        )}
                      </div>

                      {/* Buttons - only when active */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex gap-2"
                          >
                            <button
                              onClick={() => answer(q.id, true)}
                              className="flex-1 py-2 rounded-lg bg-[#0077CC]/20 border border-[#0077CC]/40 text-[#0077CC] text-xs font-bold hover:bg-[#0077CC]/30 transition-colors flex items-center justify-center gap-1"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Sí
                            </button>
                            <button
                              onClick={() => answer(q.id, false)}
                              className="flex-1 py-2 rounded-lg bg-muted/40 border border-border text-muted-foreground text-xs font-bold hover:bg-muted/60 transition-colors"
                            >
                              No
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* "No" dashed branch on the right */}
                    {answeredNo && (
                      <motion.div
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex-shrink-0 flex items-center gap-1.5"
                      >
                        <div className="flex gap-0.5">
                          {[...Array(4)].map((_, j) => (
                            <div key={j} className="w-2.5 h-0.5 bg-red-500/40" />
                          ))}
                        </div>
                        <div className="px-2 py-1 rounded border border-dashed border-red-500/50 bg-red-500/5">
                          <p className="text-[10px] text-red-400 font-medium">Diagnóstico</p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* "Sí" label on the left side */}
          {answeredCount > 0 && (
            <div className="flex ml-3 mb-1">
              {allYes && answeredCount > 0 && (
                <p className="text-xs text-[#0077CC] font-bold">
                  {answeredCount === 3 ? "✓ Sí, Sí, Sí" : `${answeredCount}/3 confirmado`}
                </p>
              )}
            </div>
          )}

          {/* Result */}
          <AnimatePresence>
            {showResult && outcome && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.5 }}
                className="mt-6 ml-14"
              >
                <div
                  className="rounded-2xl border p-6"
                  style={{
                    borderColor: `${outcome.accent}40`,
                    background: `linear-gradient(135deg, ${outcome.accent}08 0%, transparent 70%)`,
                  }}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${outcome.accent}20`, border: `2px solid ${outcome.accent}50` }}
                    >
                      <outcome.Icon className="w-5 h-5" style={{ color: outcome.accent }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-base">{outcome.title}</h3>
                      <p className="text-muted-foreground text-sm mt-1 leading-relaxed">{outcome.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={WA_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border font-bold text-xs tracking-widest transition-colors ${outcome.ctaColor}`}
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {outcome.cta}
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: outcome.accent, color: "#0B0F1E" }}
                      >
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </a>

                    {"cta2" in outcome && (
                      <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-foreground font-bold text-xs tracking-widest hover:bg-card transition-colors">
                        <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">2</span>
                        {(outcome as typeof outcomes.someNo).cta2}
                      </button>
                    )}

                    <button
                      onClick={reset}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-border/50 text-muted-foreground text-xs hover:text-foreground hover:bg-card transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Reiniciar
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
