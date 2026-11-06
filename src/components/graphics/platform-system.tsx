"use client";

import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { Check } from "lucide-react";
import { pillars } from "@/content/platform";
import { StageBadge } from "@/components/ui/primitives";
import { SiteImage } from "@/components/ui/site-image";

const center = { x: 300, y: 240 };
const nodePos = [
  { x: 135, y: 112 },
  { x: 465, y: 112 },
  { x: 465, y: 368 },
  { x: 135, y: 368 },
];
const NODE_R = 70;
const CENTER_R = 86;
const NAVY = "#003366";
const TEAL = "#00879E";
const GREEN = "#8BC900";
const SPACE = "#9DA2B3";

/** Icons drawn on a 24 unit grid (stethoscope, flask and laptop from lucide, ISC; scanner drawn here). */
function PillarIcon({ id, x, y, size, color }: { id: string; x: number; y: number; size: number; color: string }) {
  const common = {
    fill: "none",
    stroke: color,
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <g transform={`translate(${x} ${y}) scale(${size / 24})`} className="sys-icon">
      {id === "clinical-suites" && (
        <>
          <path {...common} d="M11 2v2M5 2v2" />
          <path {...common} d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" />
          <path {...common} d="M8 15a6 6 0 0 0 12 0v-3" />
          <circle cx="20" cy="10" r="2.2" fill={GREEN} stroke={color} strokeWidth="1.4" />
        </>
      )}
      {id === "diagnostic-lab" && (
        <>
          <path d="M6.453 15h11.094l2.208 4.04A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96Z" fill={GREEN} />
          <path
            {...common}
            d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"
          />
          <path {...common} d="M6.453 15h11.094M8.5 2h7" />
        </>
      )}
      {id === "imaging" && (
        <>
          <circle {...common} cx="13" cy="10.5" r="8" />
          <circle {...common} cx="13" cy="10.5" r="3.2" />
          <path fill="none" stroke={GREEN} strokeWidth="2.6" strokeLinecap="round" d="M6.4 6A8 8 0 0 1 19.6 6" />
          <path {...common} d="M2 21h20M4 17.5h11" />
        </>
      )}
      {id === "digital-tools" && (
        <>
          <path
            {...common}
            d="M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z"
          />
          <path {...common} d="M20.054 15.987H3.946" />
          <path fill="none" stroke={GREEN} strokeWidth="2.4" strokeLinecap="round" d="M12 7.2v5.6M9.2 10h5.6" />
        </>
      )}
    </g>
  );
}

/** Doctor and patient, for the centre of the diagram. */
function PracticeIcon({ x, y, size }: { x: number; y: number; size: number }) {
  const s = {
    fill: "none",
    stroke: NAVY,
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <g transform={`translate(${x} ${y}) scale(${size / 24})`}>
      <circle {...s} cx="8.5" cy="6.2" r="3.4" />
      <path {...s} d="M1.8 21v-1.6A5.8 5.8 0 0 1 7.6 13.6h1.8a5.8 5.8 0 0 1 5.8 5.8V21" />
      <path {...s} stroke={TEAL} d="M6.4 13.9v2.8a2.1 2.1 0 0 0 4.2 0v-2.8" />
      <circle {...s} cx="17.6" cy="9.4" r="2.7" />
      <path {...s} d="M13.9 21v-.8a3.7 3.7 0 0 1 3.7-3.7a3.7 3.7 0 0 1 3.7 3.7v.8" />
    </g>
  );
}

/**
 * The four platform components around independent practice, after the owner's mockup (5 Nov 2026).
 * Connector style still encodes the stage: navy in development, teal planned, dashed a later phase.
 * Animation (CSS in globals.css, `.sys-*`): when the card scrolls into view the centre pops in, the connectors
 * draw outward and the four parts pop in; then the orbit turns slowly, the centre glow breathes, dots flow into
 * the centre along the live connectors and the dashed future part marches. Nothing moves for reduced motion.
 */
function SystemDiagram({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
  return (
    <svg viewBox="0 0 600 480" className="h-auto w-full overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id="sys-bg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#E3F2F5" />
          <stop offset="100%" stopColor="#F5F6FC" />
        </radialGradient>
        <radialGradient id="sys-glow-fill">
          <stop offset="55%" stopColor={TEAL} stopOpacity="0.32" />
          <stop offset="100%" stopColor={TEAL} stopOpacity="0" />
        </radialGradient>
        <filter id="sys-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="8" stdDeviation="9" floodColor={NAVY} floodOpacity="0.16" />
        </filter>
      </defs>
      <rect width="600" height="480" rx="28" fill="url(#sys-bg)" />
      <circle
        className="sys-orbit"
        cx={center.x}
        cy={center.y}
        r="209"
        fill="none"
        stroke={TEAL}
        strokeOpacity="0.45"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeDasharray="0.5 10"
      />

      {nodePos.map((p, i) => {
        const pillar = pillars[i];
        const isActive = i === active;
        const future = pillar.stage === "future";
        const color = future ? SPACE : pillar.stage === "planned" ? TEAL : NAVY;
        const dx = p.x - center.x;
        const dy = p.y - center.y;
        const len = Math.hypot(dx, dy);
        const ux = dx / len;
        const uy = dy / len;
        const a = { x: center.x + ux * (CENTER_R + 8), y: center.y + uy * (CENTER_R + 8) };
        const b = { x: p.x - ux * NODE_R, y: p.y - uy * NODE_R };
        return (
          <g key={`l${i}`}>
            <path
              d={`M${a.x} ${a.y}L${b.x} ${b.y}`}
              pathLength={1}
              className={future ? "sys-link-dashed" : "sys-link"}
              stroke={isActive ? NAVY : color}
              strokeWidth={isActive ? 5 : 3}
              strokeDasharray={future ? "0.03 0.035" : undefined}
              strokeLinecap="round"
              fill="none"
              style={{ "--i": i, transition: "stroke 300ms, stroke-width 300ms" } as CSSProperties}
            />
            {!future && (
              <circle
                className="sys-flow"
                cx={b.x}
                cy={b.y}
                r="4.5"
                fill={isActive ? GREEN : TEAL}
                style={{ "--i": i, "--dx": `${a.x - b.x}px`, "--dy": `${a.y - b.y}px` } as CSSProperties}
              />
            )}
          </g>
        );
      })}

      {/* Centre: independent practice */}
      <circle className="sys-glow" cx={center.x} cy={center.y} r="128" fill="url(#sys-glow-fill)" />
      <g className="sys-center">
        <circle
          cx={center.x}
          cy={center.y}
          r={CENTER_R + 9}
          fill="none"
          stroke={TEAL}
          strokeOpacity="0.35"
          strokeWidth="2"
        />
        <circle
          cx={center.x}
          cy={center.y}
          r={CENTER_R}
          fill="#FFFFFF"
          stroke={NAVY}
          strokeWidth="13"
          filter="url(#sys-shadow)"
        />
        <PracticeIcon x={center.x - 22} y={center.y - 62} size={44} />
        <text x={center.x} y={center.y + 4} textAnchor="middle" fontSize="19" fontWeight="800" fill={NAVY}>
          Independent
        </text>
        <text x={center.x} y={center.y + 26} textAnchor="middle" fontSize="19" fontWeight="800" fill={NAVY}>
          practice
        </text>
        <text x={center.x} y={center.y + 47} textAnchor="middle" fontSize="13" fill="#6E7180">
          physician + patient
        </text>
      </g>

      {nodePos.map((p, i) => {
        const pillar = pillars[i];
        const isActive = i === active;
        const future = pillar.stage === "future";
        const ink = isActive ? "#FFFFFF" : NAVY;
        return (
          <g
            key={pillar.id}
            data-tab-index={i}
            onClick={() => onSelect(i)}
            className={`sys-node cursor-pointer ${isActive ? "is-active" : ""}`}
          >
            <g className="sys-node-in" style={{ "--i": i } as CSSProperties}>
              <circle
                className={future && !isActive ? "sys-disc sys-dash" : "sys-disc"}
                cx={p.x}
                cy={p.y}
                r={NODE_R}
                fill={isActive ? NAVY : "#FFFFFF"}
                stroke={isActive ? NAVY : future ? SPACE : "#D3D6E0"}
                strokeWidth={future && !isActive ? 2.2 : 1.5}
                strokeDasharray={future && !isActive ? "5 6" : undefined}
                filter="url(#sys-shadow)"
              />
              <PillarIcon id={pillar.id} x={p.x - 17} y={p.y - 50} size={34} color={ink} />
              <text
                x={p.x}
                y={p.y + 10}
                textAnchor="middle"
                fontSize="17"
                fontWeight="800"
                fill={isActive ? GREEN : TEAL}
              >
                {pillar.number}
              </text>
              {pillar.short.split(" & ").map((line, li, arr) => (
                <text
                  key={li}
                  x={p.x}
                  y={p.y + 32 + li * 18}
                  textAnchor="middle"
                  fontSize="15.5"
                  fontWeight="700"
                  fill={ink}
                >
                  {li < arr.length - 1 ? `${line} &` : line}
                </text>
              ))}
            </g>
          </g>
        );
      })}
    </svg>
  );
}

export function PlatformSystem() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const pillar = pillars[active];

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = pillars.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next !== null) {
      e.preventDefault();
      setActive(next);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
      <div>
        <div role="tablist" aria-label="Platform components" aria-orientation="vertical" className="space-y-2">
          {pillars.map((p, i) => {
            const selected = i === active;
            return (
              <button
                key={p.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`${baseId}-tab-${i}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={onKeyDown}
                className={`flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left transition-colors ${
                  selected ? "bg-navy text-white" : "bg-white text-navy ring-1 ring-inset ring-smoke hover:ring-steel"
                }`}
              >
                <span className={`text-sm font-bold ${selected ? "text-steel" : "text-navy"}`}>{p.number}</span>
                <span className="flex-1 text-lg font-semibold">{p.title}</span>
                <span className={`hidden text-xs sm:block ${selected ? "text-white/70" : "text-arsenic"}`}>
                  {p.stage === "future" ? "Future" : p.stage === "planned" ? "Planned" : "In development"}
                </span>
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`${baseId}-panel`}
          aria-labelledby={`${baseId}-tab-${active}`}
          className="mt-6 overflow-hidden rounded-card bg-white ring-1 ring-inset ring-smoke"
        >
          <SiteImage
            key={pillar.id}
            name={pillar.image}
            rounded="rounded-none"
            aspect="aspect-[16/9]"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
          <div className="p-6 md:p-8">
            <StageBadge stage={pillar.stage} label={pillar.stageLabel} />
            <p className="mt-4 text-lg leading-relaxed text-arsenic">{pillar.summary}</p>
            <ul className="mt-5 space-y-3">
              {pillar.points.map((pt) => (
                <li key={pt} className="flex gap-3 text-arsenic">
                  <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-teal" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="reveal sys-diagram rounded-panel bg-paper p-4 ring-1 ring-inset ring-steel/70 md:p-8 lg:sticky lg:top-28">
        <SystemDiagram active={active} onSelect={setActive} />
        <p className="mt-2 px-2 text-xs text-arsenic">
          Navy: in development · Teal: planned · Dashed: a later phase. Choose a pillar to read more.
        </p>
      </div>
    </div>
  );
}
