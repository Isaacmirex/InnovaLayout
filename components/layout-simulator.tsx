"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import {
  Factory,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  RotateCcw,
  Scissors,
  Package,
  BarChart3,
  Warehouse,
  Flame,
  Shirt,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface Machine {
  id: string
  name: string
  Icon: React.ElementType
  chaotic: { x: number; y: number; rotation: number }
  optimized: { x: number; y: number; rotation: number }
}

const machines: Machine[] = [
  { id: "m1", name: "Corte",      Icon: Scissors,  chaotic: { x: 12, y: 18, rotation: -12 }, optimized: { x: 12, y: 22, rotation: 0 } },
  { id: "m2", name: "Confección", Icon: Shirt,     chaotic: { x: 78, y: 12, rotation: 18 },  optimized: { x: 35, y: 22, rotation: 0 } },
  { id: "m3", name: "Horno",      Icon: Flame,     chaotic: { x: 22, y: 72, rotation: -8 },  optimized: { x: 58, y: 22, rotation: 0 } },
  { id: "m4", name: "Empaque",    Icon: Package,   chaotic: { x: 68, y: 68, rotation: 22 },  optimized: { x: 12, y: 62, rotation: 0 } },
  { id: "m5", name: "Control",    Icon: BarChart3, chaotic: { x: 45, y: 42, rotation: -6 },  optimized: { x: 35, y: 62, rotation: 0 } },
  { id: "m6", name: "Almacén",    Icon: Warehouse, chaotic: { x: 8, y: 48, rotation: 14 },   optimized: { x: 58, y: 62, rotation: 0 } },
]

// Flows as SVG path strings — computed from % positions
// We build them dynamically in the component
const chaoticConnections = [
  { from: "m1", to: "m3" },
  { from: "m2", to: "m6" },
  { from: "m3", to: "m2" },
  { from: "m4", to: "m1" },
  { from: "m5", to: "m4" },
]
const optimizedConnections = [
  { from: "m1", to: "m2" },
  { from: "m2", to: "m3" },
  { from: "m4", to: "m5" },
  { from: "m5", to: "m6" },
]

function getPos(machine: Machine, isOptimized: boolean) {
  return isOptimized ? machine.optimized : machine.chaotic
}

function makePath(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  // Slight quadratic curve via midpoint with a small offset
  const cx = mx + (y2 - y1) * 0.15
  const cy = my - (x2 - x1) * 0.15
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`
}

function FlowLines({ machines: machineList, connections, isOptimized, svgW, svgH }: {
  machines: Machine[]
  connections: { from: string; to: string }[]
  isOptimized: boolean
  svgW: number
  svgH: number
}) {
  const color = isOptimized ? "#10b981" : "#ef4444"
  const glowColor = isOptimized ? "#6ee7b7" : "#fca5a5"

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 100 100`} preserveAspectRatio="none">
      <defs>
        <filter id="glow-opt">
          <feGaussianBlur stdDeviation="0.8" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glow-chaos">
          <feGaussianBlur stdDeviation="0.8" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <marker id="arrow-opt" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
          <path d="M0,0 L4,2 L0,4 Z" fill={color} />
        </marker>
        <marker id="arrow-chaos" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
          <path d="M0,0 L4,2 L0,4 Z" fill={color} />
        </marker>
      </defs>
      {connections.map(({ from, to }, i) => {
        const fromM = machineList.find(m => m.id === from)!
        const toM = machineList.find(m => m.id === to)!
        const fp = getPos(fromM, isOptimized)
        const tp = getPos(toM, isOptimized)
        const d = makePath(fp.x, fp.y, tp.x, tp.y)
        return (
          <motion.path
            key={`${from}-${to}-${isOptimized}`}
            d={d}
            stroke={color}
            strokeWidth="0.8"
            fill="none"
            strokeDasharray="3 2"
            markerEnd={isOptimized ? "url(#arrow-opt)" : "url(#arrow-chaos)"}
            filter={isOptimized ? "url(#glow-opt)" : "url(#glow-chaos)"}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.85 }}
            transition={{ duration: 1.0, delay: 0.3 + i * 0.1, ease: "easeInOut" }}
          />
        )
      })}
    </svg>
  )
}

function MachineNode({ machine, isOptimized }: { machine: Machine; isOptimized: boolean }) {
  const position = isOptimized ? machine.optimized : machine.chaotic
  const Icon = machine.Icon

  return (
    <motion.div
      animate={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        rotate: position.rotation,
      }}
      transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
      className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
    >
      <motion.div
        whileHover={{ scale: 1.15 }}
        className={`w-14 h-14 md:w-16 md:h-16 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-500 shadow-lg ${
          isOptimized
            ? "bg-emerald-500/20 border-2 border-emerald-500/60 shadow-emerald-500/20"
            : "bg-red-500/20 border-2 border-red-500/50 shadow-red-500/10"
        }`}
      >
        <Icon className={`w-5 h-5 ${isOptimized ? "text-emerald-400" : "text-red-400"}`} />
        <span className="text-[9px] font-semibold text-foreground/90">{machine.name}</span>
      </motion.div>
    </motion.div>
  )
}

const metrics = [
  { label: "Reducción de Recorridos", before: "100 m", after: "45 m", improvement: "-55%", unit: "" },
  { label: "Tiempo de Ciclo", before: "12 min", after: "7 min", improvement: "-42%", unit: "" },
  { label: "Espacio Utilizado", before: "60%", after: "85%", improvement: "+25%", unit: "" },
]

export default function LayoutSimulator() {
  const [isOptimized, setIsOptimized] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const handleOptimize = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setIsOptimized(prev => !prev)
    setTimeout(() => setIsAnimating(false), 1400)
  }

  const connections = isOptimized ? optimizedConnections : chaoticConnections

  return (
    <section id="simulador" className="py-28 relative overflow-hidden">
      {/* Background layer */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,_#111827_0%,_transparent_60%)] opacity-10" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_transparent,_#0B0F1E_90%)]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-6">
            <Factory className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Simulador Interactivo de Planta</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Optimización de{" "}
            <span className="text-primary">Layout Industrial</span>
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Visualiza en tiempo real cómo transformamos un espacio productivo saturado
            en un sistema de alto rendimiento mediante la metodología SLP.
          </p>
        </motion.div>

        {/* Simulator */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-2xl shadow-black/30">
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/20">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ backgroundColor: isOptimized ? "#8B1A2A" : "#ef4444" }}
                  transition={{ duration: 0.5 }}
                  className="w-3 h-3 rounded-full"
                />
                <span className="font-semibold text-foreground text-sm">
                  {isOptimized ? "Layout Optimizado — Metodología SLP" : "Layout Actual — Saturado"}
                </span>
              </div>
              <div className={`flex items-center gap-2 text-sm font-medium transition-colors duration-500 ${
                isOptimized ? "text-[#8090B0]" : "text-red-400"
              }`}>
                {isOptimized ? (
                  <><CheckCircle2 className="w-4 h-4" /> Flujo optimizado</>
                ) : (
                  <><AlertTriangle className="w-4 h-4" /> Cuellos de botella activos</>
                )}
              </div>
            </div>

            {/* Grid area */}
            <div className="relative aspect-[16/9] bg-gradient-to-br from-[#0B0F1E] to-[#111827]/20">
              {/* Grid pattern */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: "linear-gradient(to right, #8B1A2A 1px, transparent 1px), linear-gradient(to bottom, #8B1A2A 1px, transparent 1px)",
                  backgroundSize: "8% 12.5%",
                }}
              />

              {/* Corner labels */}
              <div className="absolute top-2 left-2 text-[10px] text-muted-foreground/50 font-mono">A1</div>
              <div className="absolute top-2 right-2 text-[10px] text-muted-foreground/50 font-mono">A6</div>
              <div className="absolute bottom-2 left-2 text-[10px] text-muted-foreground/50 font-mono">C1</div>
              <div className="absolute bottom-2 right-2 text-[10px] text-muted-foreground/50 font-mono">C6</div>

              {/* Flow lines */}
              <AnimatePresence mode="wait">
                <FlowLines
                  key={isOptimized ? "opt" : "chaos"}
                  machines={machines}
                  connections={connections}
                  isOptimized={isOptimized}
                  svgW={100}
                  svgH={100}
                />
              </AnimatePresence>

              {/* Machine nodes */}
              {machines.map(machine => (
                <MachineNode key={machine.id} machine={machine} isOptimized={isOptimized} />
              ))}

              {/* Efficiency meter */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-3 left-3 bg-background/85 backdrop-blur-sm rounded-lg px-4 py-2.5 border border-border"
              >
                <div className="text-[10px] text-muted-foreground mb-1.5 uppercase tracking-wider">Eficiencia de Flujo</div>
                <div className="flex items-center gap-3">
                  <div className="w-28 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: isOptimized ? "95%" : "35%" }}
                      transition={{ duration: 1.1, delay: 0.4, ease: "easeInOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: isOptimized ? "#8B1A2A" : "#ef4444" }}
                    />
                  </div>
                  <motion.span
                    animate={{ color: isOptimized ? "#8090B0" : "#f87171" }}
                    className="text-sm font-bold"
                  >
                    {isOptimized ? "95%" : "35%"}
                  </motion.span>
                </div>
              </motion.div>

              {/* Legend */}
              <div className="absolute bottom-3 right-3 bg-background/85 backdrop-blur-sm rounded-lg px-3 py-2 border border-border">
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span className="w-4 h-0.5 bg-[#8B1A2A] inline-block" />
                  Flujo optimizado
                </div>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground mt-1">
                  <span className="w-4 h-0.5 bg-red-500 inline-block" />
                  Recorrido excesivo
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 px-6 py-5 border-t border-border bg-muted/20">
              <Button
                onClick={handleOptimize}
                disabled={isAnimating}
                size="lg"
                className={`gap-2 px-8 font-semibold transition-all duration-300 ${
                  isOptimized
                    ? "bg-muted hover:bg-muted/80 text-foreground border border-border"
                    : "bg-[#C13344] hover:bg-[#C13344]/90 text-[#0B0F1E]"
                }`}
              >
                {isOptimized ? (
                  <><RotateCcw className="w-5 h-5" />Restaurar Layout</>
                ) : (
                  <><Sparkles className="w-5 h-5" />Optimizar con SLP</>
                )}
              </Button>
            </div>
          </div>

          {/* Result metrics */}
          <div className="grid md:grid-cols-3 gap-4 mt-5">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                className="bg-card rounded-xl border border-border p-5 relative overflow-hidden"
              >
                {/* gold accent line */}
                <motion.div
                  animate={{ scaleX: isOptimized ? 1 : 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="absolute top-0 left-0 right-0 h-0.5 bg-[#C13344] origin-left"
                />
                <div className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wide">{metric.label}</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-xl font-bold transition-all duration-500 ${
                      isOptimized ? "text-muted-foreground line-through text-base" : "text-foreground"
                    }`}>
                      {metric.before}
                    </span>
                    <AnimatePresence>
                      {isOptimized && (
                        <motion.span
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-xl font-bold text-[#8090B0]"
                        >
                          → {metric.after}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  <AnimatePresence>
                    {isOptimized && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-sm font-bold text-[#C13344] bg-[#C13344]/10 px-2 py-1 rounded border border-[#C13344]/30"
                      >
                        {metric.improvement}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
