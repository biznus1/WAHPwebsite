/**
 * Original WAHP graphic: a top-down schematic of a shared outpatient floor.
 * Independent consultation suites connect to one shared operational core,
 * with laboratory (planned) and imaging (future) shown honestly.
 * Conceptual only — it does not depict an existing facility.
 */
export function ClinicalFloorSchematic({ className = "" }: { className?: string }) {
  const suitesTop = [44, 176, 308, 440];
  const suitesBottom = [44, 176];
  const core = { x: 300, y: 260 };

  return (
    <figure className={className}>
      <svg viewBox="0 0 600 520" className="h-auto w-full" role="img" aria-labelledby="floor-title floor-desc">
        <title id="floor-title">Conceptual schematic of a WAHP shared outpatient floor</title>
        <desc id="floor-desc">
          Six independent consultation suites arranged around one shared operational core for reception, patient flow,
          records and scheduling. A laboratory space is marked as planned and an imaging space as a future phase.
          Conceptual illustration, not an existing facility.
        </desc>
        <defs>
          <pattern id="floor-grid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M16 0H0V16" fill="none" stroke="#FFFFFF" strokeOpacity="0.05" />
          </pattern>
        </defs>

        {/* Floor plate */}
        <rect
          x="20"
          y="20"
          width="560"
          height="480"
          rx="28"
          fill="url(#floor-grid)"
          stroke="#FFFFFF"
          strokeOpacity="0.22"
        />

        {/* Corridor */}
        <rect x="44" y="164" width="512" height="192" rx="18" fill="#FFFFFF" fillOpacity="0.03" />

        {/* Connections from each suite to the shared core */}
        <g fill="none" stroke="#00879E" strokeWidth="2" strokeLinecap="round" className="schematic-flow">
          {suitesTop.map((x) => (
            <path key={`t${x}`} d={`M${x + 58} 148 C ${x + 58} 210, ${core.x} 190, ${core.x} ${core.y - 70}`} />
          ))}
          {suitesBottom.map((x) => (
            <path key={`b${x}`} d={`M${x + 58} 372 C ${x + 58} 310, ${core.x} 330, ${core.x} ${core.y + 70}`} />
          ))}
          <path d={`M366 372 C 366 320, ${core.x + 20} 330, ${core.x + 14} ${core.y + 68}`} strokeDasharray="2 6" />
        </g>

        {/* Suites */}
        {[...suitesTop.map((x) => ({ x, y: 44 })), ...suitesBottom.map((x) => ({ x, y: 372 }))].map((s, i) => (
          <g key={i}>
            <rect
              x={s.x}
              y={s.y}
              width="116"
              height="104"
              rx="16"
              fill="#FFFFFF"
              fillOpacity="0.06"
              stroke="#FFFFFF"
              strokeOpacity="0.35"
            />
            {/* desk + exam couch, abstracted */}
            <rect x={s.x + 16} y={s.y + 44} width="34" height="12" rx="4" fill="#FFFFFF" fillOpacity="0.25" />
            <rect
              x={s.x + 64}
              y={s.y + 36}
              width="36"
              height="48"
              rx="8"
              fill="none"
              stroke="#FFFFFF"
              strokeOpacity="0.3"
            />
            <circle cx={s.x + 33} cy={s.y + 70} r="6" fill="none" stroke="#FFFFFF" strokeOpacity="0.4" />
            <text
              x={s.x + 16}
              y={s.y + 26}
              fill="#FFFFFF"
              fillOpacity="0.72"
              fontSize="11"
              fontWeight="600"
              letterSpacing="1.2"
            >
              {`SUITE 0${i + 1}`}
            </text>
          </g>
        ))}

        {/* Laboratory — planned */}
        <g>
          <rect
            x="308"
            y="372"
            width="116"
            height="104"
            rx="16"
            fill="#00879E"
            fillOpacity="0.28"
            stroke="#00879E"
            strokeWidth="1.5"
          />
          <text x="324" y="398" fill="#FFFFFF" fontSize="11" fontWeight="700" letterSpacing="1.2">
            LABORATORY
          </text>
          <text x="324" y="416" fill="#FFFFFF" fillOpacity="0.7" fontSize="10.5">
            Planned
          </text>
          <g stroke="#FFFFFF" strokeOpacity="0.55" fill="none">
            <path d="M344 436v20a8 8 0 0 0 16 0v-20" />
            <path d="M372 432v24a8 8 0 0 0 16 0v-24" />
          </g>
        </g>

        {/* Imaging — future phase */}
        <g>
          <rect
            x="440"
            y="372"
            width="116"
            height="104"
            rx="16"
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity="0.45"
            strokeDasharray="5 6"
          />
          <text x="456" y="398" fill="#FFFFFF" fillOpacity="0.85" fontSize="11" fontWeight="700" letterSpacing="1.2">
            IMAGING
          </text>
          <text x="456" y="416" fill="#FFFFFF" fillOpacity="0.6" fontSize="10.5">
            Future phase
          </text>
          <circle cx="498" cy="446" r="16" fill="none" stroke="#FFFFFF" strokeOpacity="0.4" strokeDasharray="3 4" />
        </g>

        {/* Shared core — echoes the ring of the WAHP mark */}
        <circle cx={core.x} cy={core.y} r="96" fill="#FFFFFF" fillOpacity="0.04" />
        <circle cx={core.x} cy={core.y} r="62" fill="#003366" stroke="#FFFFFF" strokeWidth="12" />
        <text
          x={core.x}
          y={core.y - 6}
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="12"
          fontWeight="700"
          letterSpacing="1"
        >
          SHARED
        </text>
        <text
          x={core.x}
          y={core.y + 12}
          textAnchor="middle"
          fill="#BCBFCC"
          fontSize="12"
          fontWeight="700"
          letterSpacing="1"
        >
          OPERATIONS
        </text>

        {/* Corridor annotations */}
        <g fontSize="10.5" fill="#FFFFFF" fillOpacity="0.75" fontWeight="600" letterSpacing="0.6">
          <rect x="60" y="246" width="132" height="28" rx="14" fill="#FFFFFF" fillOpacity="0.07" />
          <text x="126" y="264" textAnchor="middle">
            Reception &amp; flow
          </text>
          <rect x="408" y="246" width="132" height="28" rx="14" fill="#FFFFFF" fillOpacity="0.07" />
          <text x="474" y="264" textAnchor="middle">
            Records &amp; scheduling
          </text>
        </g>
      </svg>
      <figcaption className="mt-3 text-xs tracking-wide text-white/55">
        Conceptual schematic — illustrates the proposed model, not an existing facility.
      </figcaption>
    </figure>
  );
}
