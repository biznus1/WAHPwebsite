"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Check } from "lucide-react";
import { pillars } from "@/content/platform";
import { StageBadge } from "@/components/ui/primitives";

const nodePos = [
  { x: 140, y: 110 },
  { x: 460, y: 110 },
  { x: 460, y: 370 },
  { x: 140, y: 370 },
];
const center = { x: 300, y: 240 };

/** Diagram of the four platform components around independent practice. */
function SystemDiagram({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
  return (
    <svg viewBox="0 0 600 480" className="h-auto w-full" aria-hidden="true">
      <defs>
        <pattern id="sys-dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#9DA2B3" fillOpacity="0.35" />
        </pattern>
      </defs>
      <rect width="600" height="480" fill="url(#sys-dots)" />
      <circle cx={center.x} cy={center.y} r="168" fill="none" stroke="#BCBFCC" strokeDasharray="2 8" />

      {nodePos.map((p, i) => {
        const pillar = pillars[i];
        const isActive = i === active;
        const dashed = pillar.stage === "future" ? "6 7" : undefined;
        const color = pillar.stage === "future" ? "#9DA2B3" : pillar.stage === "planned" ? "#00879E" : "#003366";
        return (
          <line
            key={`l${i}`}
            x1={center.x}
            y1={center.y}
            x2={p.x}
            y2={p.y}
            stroke={isActive ? "#003366" : color}
            strokeWidth={isActive ? 3.5 : 1.6}
            strokeDasharray={dashed}
            style={{ transition: "stroke 300ms, stroke-width 300ms" }}
          />
        );
      })}

      {/* Center: independent practice */}
      <circle cx={center.x} cy={center.y} r="74" fill="#FFFFFF" stroke="#003366" strokeWidth="14" />
      <text x={center.x} y={center.y - 8} textAnchor="middle" fontSize="13" fontWeight="700" fill="#003366">
        Independent
      </text>
      <text x={center.x} y={center.y + 10} textAnchor="middle" fontSize="13" fontWeight="700" fill="#003366">
        practice
      </text>
      <text x={center.x} y={center.y + 30} textAnchor="middle" fontSize="10.5" fill="#6E7180">
        physician + patient
      </text>

      {nodePos.map((p, i) => {
        const pillar = pillars[i];
        const isActive = i === active;
        const future = pillar.stage === "future";
        return (
          <g
            key={pillar.id}
            onClick={() => onSelect(i)}
            className="cursor-pointer"
            style={{ transition: "transform 300ms" }}
          >
            <circle
              cx={p.x}
              cy={p.y}
              r={isActive ? 62 : 56}
              fill={isActive ? "#003366" : "#FFFFFF"}
              stroke={isActive ? "#003366" : future ? "#9DA2B3" : "#BCBFCC"}
              strokeWidth="1.5"
              strokeDasharray={future && !isActive ? "5 5" : undefined}
              style={{ transition: "all 300ms" }}
            />
            <text
              x={p.x}
              y={p.y - 10}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={isActive ? "#BCBFCC" : "#00879E"}
            >
              {pillar.number}
            </text>
            {pillar.short.split(" & ").map((line, li, arr) => (
              <text
                key={li}
                x={p.x}
                y={p.y + 8 + li * 16}
                textAnchor="middle"
                fontSize="12.5"
                fontWeight="600"
                fill={isActive ? "#FFFFFF" : "#003366"}
              >
                {li < arr.length - 1 ? `${line} &` : line}
              </text>
            ))}
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
          className="mt-6 rounded-card bg-white p-6 ring-1 ring-inset ring-smoke md:p-8"
        >
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

      <div className="rounded-panel bg-paper p-4 ring-1 ring-inset ring-steel/70 md:p-8 lg:sticky lg:top-28">
        <SystemDiagram active={active} onSelect={setActive} />
        <p className="mt-2 px-2 text-xs text-arsenic">
          Navy line: in development · Teal: planned · Dashed: future phase. Select a component to explore.
        </p>
      </div>
    </div>
  );
}
