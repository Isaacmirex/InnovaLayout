"use client"

import React from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const WA_LINK = "https://wa.me/593990315234?text=%C2%BFCu%C3%A1l%20es%20el%20cat%C3%A1logo%20de%20sus%20servicios%20y%20c%C3%B3mo%20agendo%3F"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine
} from "recharts"
import {
  Phone, Calendar, Clock, Send,
  CheckCircle2, BarChart3, RotateCcw,
  MessageSquare, Mail, Linkedin,
  ArrowRight
} from "lucide-react"

// Chart data: 20 weeks, two series
const chartData = [
  { t: "S1",  sin: 28, con: 30  },
  { t: "S2",  sin: 29, con: 42  },
  { t: "S3",  sin: 30, con: 52, step: 1 },
  { t: "S4",  sin: 30, con: 58  },
  { t: "S5",  sin: 31, con: 63  },
  { t: "S6",  sin: 32, con: 68  },
  { t: "S7",  sin: 33, con: 75, step: 2 },
  { t: "S8",  sin: 33, con: 80  },
  { t: "S9",  sin: 34, con: 85  },
  { t: "S10", sin: 35, con: 89  },
  { t: "S11", sin: 35, con: 93, step: 3 },
  { t: "S12", sin: 36, con: 97  },
  { t: "S14", sin: 37, con: 102 },
  { t: "S16", sin: 39, con: 109 },
  { t: "S18", sin: 41, con: 118 },
  { t: "S20", sin: 43, con: 128 },
]

function CustomDot(props: {
  cx?: number; cy?: number; payload?: { step?: number }
  fill?: string
}) {
  const { cx, cy, payload, fill } = props
  if (!payload?.step || cx === undefined || cy === undefined) return null
  return (
    <g>
      <circle cx={cx} cy={cy} r={14} fill="#0B0F1E" stroke={fill} strokeWidth={2} />
      <text x={cx} y={cy + 5} textAnchor="middle" fill={fill} fontSize={11} fontWeight="bold">
        {payload.step}
      </text>
    </g>
  )
}

const CustomTooltip = ({ active, payload, label }: {
  active?: boolean; payload?: { value: number; name: string; color: string }[]; label?: string
}) => {
  if (!active || !payload?.length) return null
  return (
    <div className="dark:bg-[#0B0F1E] bg-white dark:border-[#8B1A2A]/40 border-slate-200 border rounded-xl px-4 py-3 shadow-xl">
      <p className="text-xs dark:text-[#8090B0] text-slate-400 mb-2 uppercase tracking-wide">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="text-sm font-semibold" style={{ color: p.color }}>
          {p.name}: <span className="font-bold">{p.value}%</span>
        </p>
      ))}
    </div>
  )
}

const steps = [
  {
    number: "1",
    title: "Agenda tu consulta y horario",
    accent: "#C13344",
    icons: [
      { Icon: Phone,    label: "Llamada" },
      { Icon: Calendar, label: "Agenda" },
      { Icon: Clock,    label: "30-45 min" },
    ],
    cta: "CONSULTAR",
    detail: (
      <div className="flex items-center gap-2 mt-3">
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#C13344]/60 text-primary text-xs font-bold tracking-widest hover:bg-[#C13344]/10 transition-colors"
        >
          CONSULTAR
          <span className="w-5 h-5 rounded-full bg-[#C13344] flex items-center justify-center">
            <ArrowRight className="w-3 h-3 text-[#0B0F1E]" />
          </span>
        </a>
      </div>
    ),
  },
  {
    number: "2",
    title: "Conoce a tu analista",
    accent: "#8B1A2A",
    icons: [],
    cta: null,
    detail: (
      <div className="mt-3 space-y-2">
        <div className="flex items-center gap-3">
          {/* Analyst avatar */}
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#8B1A2A]/50 flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face&q=80"
              alt="Analista InnovaLayout"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none"
              }}
            />
            <div className="w-full h-full bg-[#8B1A2A]/20 flex items-center justify-center text-[#8B1A2A] font-bold text-sm hidden">F</div>
          </div>
          <div className="flex-1 h-8 bg-muted/40 rounded-full border border-border flex items-center px-3">
            <span className="text-xs text-muted-foreground/50">Escribe tu consulta…</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground/60">
          <Send className="w-4 h-4" />
          <Mail className="w-4 h-4" />
          <Linkedin className="w-4 h-4" />
          <MessageSquare className="w-4 h-4" />
        </div>
      </div>
    ),
  },
  {
    number: "3",
    title: "Resuelve con nuestra ayuda",
    accent: "#8090B0",
    icons: [
      { Icon: CheckCircle2, label: "Plan" },
      { Icon: BarChart3,    label: "Métricas" },
      { Icon: RotateCcw,    label: "Seguimiento" },
    ],
    cta: null,
    detail: null,
  },
]

function StepConnector() {
  return (
    <div className="hidden lg:flex items-center gap-1 flex-shrink-0 pt-10">
      <div className="w-2 h-2 rounded-full border border-muted-foreground/30" />
      <div className="flex gap-1">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-4 h-0.5 bg-muted-foreground/25" />
        ))}
      </div>
      <div className="w-8 h-8 rounded-full bg-muted/50 border border-border flex items-center justify-center">
        <Calendar className="w-4 h-4 text-muted-foreground/50" />
      </div>
      <div className="flex gap-1">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-4 h-0.5 bg-muted-foreground/25" />
        ))}
      </div>
      <div className="w-2 h-2 rounded-full border border-muted-foreground/30" />
    </div>
  )
}

export default function ProcessSection() {
  const ref = useRef(null)
  const chartRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const isChartInView = useInView(chartRef, { once: true, margin: "-80px" })

  return (
    <section id="proceso" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,_#111827_0%,_transparent_40%)] opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-6">
            <div className="w-5 h-5 rounded-full bg-[#C13344]/20 flex items-center justify-center">
              <ArrowRight className="w-3 h-3 text-primary" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Proceso de Consultoría</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Tres pasos hacia{" "}
            <span className="text-primary">tu transformación</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Un proceso simple, transparente y orientado a resultados medibles desde la primera sesión.
          </p>
        </motion.div>

        {/* Cards row */}
        <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-0 mb-10 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <React.Fragment key={step.number}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.18, duration: 0.6 }}
                className="flex-1 bg-card rounded-2xl border border-border p-5 relative overflow-hidden group hover:border-[#8B1A2A]/40 transition-colors duration-300"
              >
                {/* Top accent glow */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-60"
                  style={{ background: `linear-gradient(to right, transparent, ${step.accent}, transparent)` }}
                />

                {/* Step number */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: step.accent, color: "#0B0F1E" }}
                  >
                    {step.number}
                  </div>
                  <h3 className="font-bold text-foreground text-sm leading-tight">{step.title}</h3>
                </div>

                {/* Icon buttons */}
                {step.icons.length > 0 && (
                  <div className="flex items-center gap-2 mb-3">
                    {step.icons.map(({ Icon, label }) => (
                      <div
                        key={label}
                        title={label}
                        className="w-9 h-9 rounded-xl bg-muted/60 border border-border flex items-center justify-center hover:bg-muted transition-colors cursor-default"
                      >
                        <Icon className="w-4 h-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                )}

                {step.detail}
              </motion.div>

              {i < steps.length - 1 && <StepConnector />}
            </React.Fragment>
          ))}
        </div>

        {/* Chart */}
        <motion.div
          ref={chartRef}
          initial={{ opacity: 0, y: 32 }}
          animate={isChartInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto bg-card rounded-2xl border border-border overflow-hidden"
        >
          {/* Chart header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-3">
            <div>
              <p className="text-sm font-semibold text-foreground">Eficiencia Operativa en el Tiempo</p>
              <p className="text-xs text-muted-foreground mt-0.5">Comparativa antes y después de consultoría InnovaLayout</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#8B1A2A]" />
                <span className="text-xs text-muted-foreground">Con InnovaLayout</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#2D4A6B]" />
                <span className="text-xs text-muted-foreground">Sin optimizar</span>
              </div>
            </div>
          </div>

          <div className="px-2 pb-6">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradCon" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B1A2A" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#8B1A2A" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="gradSin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2D4A6B" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#2D4A6B" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#8B1A2A18" vertical={false} />
                <XAxis
                  dataKey="t"
                  tick={{ fill: "#8090B080", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#8090B080", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v}%`}
                  width={42}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="sin"
                  name="Sin optimizar"
                  stroke="#2D4A6B"
                  strokeWidth={2}
                  fill="url(#gradSin)"
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="con"
                  name="Con InnovaLayout"
                  stroke="#8B1A2A"
                  strokeWidth={2.5}
                  fill="url(#gradCon)"
                  dot={<CustomDot fill="#C13344" />}
                  activeDot={{ r: 6, fill: "#8B1A2A", stroke: "#8090B0", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>

            {/* Step labels under chart */}
            <div className="flex justify-around px-10 mt-1">
              {["Diagnóstico inicial", "Plan de acción", "Implementación"].map((label, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground/70">
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                    style={{ backgroundColor: "#C13344", color: "#0B0F1E" }}
                  >
                    {i + 1}
                  </span>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isChartInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[#C13344]/50 text-primary font-bold tracking-widest text-sm hover:bg-[#C13344]/10 transition-all duration-300 group"
          >
            AGENDAR CONSULTA GRATUITA
            <span className="w-8 h-8 rounded-full bg-[#C13344] flex items-center justify-center group-hover:scale-110 transition-transform">
              <ArrowRight className="w-4 h-4 text-[#0B0F1E]" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
