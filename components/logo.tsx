"use client"

export default function InnovaLogo({ size = 48 }: { size?: number }) {
  const s = size
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="InnovaLayout logo"
    >
      {/* Outer frame — industrial square */}
      <rect x="2" y="2" width="44" height="44" rx="10" fill="#0B0F1E" stroke="#8B1A2A" strokeWidth="1.5" />

      {/* Grid motif — fine lines */}
      <line x1="2" y1="16" x2="46" y2="16" stroke="#8B1A2A" strokeWidth="0.4" strokeOpacity="0.35" />
      <line x1="2" y1="32" x2="46" y2="32" stroke="#8B1A2A" strokeWidth="0.4" strokeOpacity="0.35" />
      <line x1="16" y1="2" x2="16" y2="46" stroke="#8B1A2A" strokeWidth="0.4" strokeOpacity="0.35" />
      <line x1="32" y1="2" x2="32" y2="46" stroke="#8B1A2A" strokeWidth="0.4" strokeOpacity="0.35" />

      {/* Corner accent dots */}
      <circle cx="6" cy="6" r="1.5" fill="#C13344" />
      <circle cx="42" cy="6" r="1.5" fill="#C13344" />
      <circle cx="6" cy="42" r="1.5" fill="#8B1A2A" fillOpacity="0.6" />
      <circle cx="42" cy="42" r="1.5" fill="#8B1A2A" fillOpacity="0.6" />

      {/* "I" letterform — left bar */}
      <rect x="11" y="13" width="4" height="22" rx="2" fill="#C13344" />
      {/* "I" top serif line */}
      <rect x="9" y="13" width="8" height="2.5" rx="1.25" fill="#C13344" />
      {/* "I" bottom serif line */}
      <rect x="9" y="32.5" width="8" height="2.5" rx="1.25" fill="#C13344" />

      {/* "L" letterform — vertical */}
      <rect x="22" y="13" width="4" height="22" rx="2" fill="#8090B0" />
      {/* "L" base */}
      <rect x="22" y="32.5" width="14" height="2.5" rx="1.25" fill="#8090B0" />

      {/* Top right accent — small crimson square */}
      <rect x="33" y="13" width="3" height="3" rx="0.75" fill="#C13344" />
    </svg>
  )
}
