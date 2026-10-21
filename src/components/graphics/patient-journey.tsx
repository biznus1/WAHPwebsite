import type { CSSProperties } from "react";
import {
  CalendarClock,
  ClipboardCheck,
  FileText,
  FlaskConical,
  type LucideIcon,
  Pill,
  ScanLine,
  Stethoscope,
} from "lucide-react";

/**
 * The planned patient journey in one building (redrawn from the diagram on WAHP's newer site build), animated:
 * the route draws from check-in to follow-up, each step pops in as the line reaches it, then a dot travels the
 * route, pausing at each step. Lab and imaging are later phases, so they are drawn dashed and tagged.
 * Styles: .journey-map in globals.css. Without JS, or with reduced motion, the finished diagram shows.
 * Phones get the same steps as a vertical list (also the accessible version of the diagram).
 */
type Step = { title: string; detail: string; icon: LucideIcon; phase?: string; x: number; y: number; at: number };

const R = 38;
// Serpentine route through the step centres; `at` is each step's position along it (0 to 1).
const ROUTE =
  "M110 130 H580 A40 40 0 0 1 620 170 V270 A40 40 0 0 1 580 310 H70 A40 40 0 0 0 30 350 V450 A40 40 0 0 0 70 490 H160";
const steps: Step[] = [
  { title: "Check in", detail: "At the front desk", icon: ClipboardCheck, x: 110, y: 130, at: 0 },
  { title: "Consult", detail: "With your own doctor", icon: Stethoscope, x: 320, y: 130, at: 0.138 },
  { title: "Lab", detail: "Samples taken on site", icon: FlaskConical, phase: "Phase 2", x: 530, y: 130, at: 0.276 },
  { title: "Imaging", detail: "CT · MRI", icon: ScanLine, phase: "Phase 3", x: 530, y: 310, at: 0.49 },
  { title: "Results", detail: "In the same record", icon: FileText, x: 320, y: 310, at: 0.628 },
  { title: "Treatment", detail: "Plan agreed", icon: Pill, x: 110, y: 310, at: 0.766 },
  { title: "Follow up", detail: "Booked before you leave", icon: CalendarClock, x: 160, y: 490, at: 1 },
];

const DRAW = 4.5; // seconds for the route to draw

// The travelling dot pauses briefly at each step: move, hold, move, hold…
const hold = 0.045;
const moveSpan = 1 - hold * steps.length;
const frames: string[] = [];
let t = 0;
steps.forEach((s, i) => {
  if (i > 0) t += (s.at - steps[i - 1].at) * moveSpan;
  frames.push(`${(t * 100).toFixed(1)}% { offset-distance: ${(s.at * 100).toFixed(1)}%; }`);
  t += hold;
  frames.push(`${(Math.min(t, 1) * 100).toFixed(1)}% { offset-distance: ${(s.at * 100).toFixed(1)}%; }`);
});
const travelKeyframes = `@keyframes journey-travel { ${frames.join(" ")} }`;

const v = (vars: Record<string, string | number>) => vars as CSSProperties;

export function PatientJourney({ className = "" }: { className?: string }) {
  return (
    <figure
      className={`reveal journey-map rounded-panel bg-white/70 p-5 ring-1 ring-inset ring-smoke md:p-8 ${className}`}
      style={v({ "--draw": `${DRAW}s` })}
    >
      <style>{travelKeyframes}</style>
      <p className="eyebrow flex items-center gap-3 text-teal">One building · one visit</p>

      {/* Phones: vertical steps. Also the accessible version on larger screens. */}
      <ol className="mt-6 space-y-5 md:sr-only">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <li key={s.title} className="journey-step relative flex items-center gap-4" style={v({ "--i": i })}>
              <span
                className={`relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border-2 bg-white text-teal ${s.phase ? "border-dashed border-space" : "border-teal"}`}
              >
                <Icon aria-hidden className="size-5" strokeWidth={1.75} />
              </span>
              <span>
                <span className="block text-sm font-bold tracking-wide text-navy uppercase">
                  {String(i + 1).padStart(2, "0")} · {s.title}
                  {s.phase && (
                    <span className="ml-2 rounded-full bg-cloud px-2 py-0.5 text-[0.65rem] font-semibold tracking-normal text-arsenic normal-case">
                      {s.phase}
                    </span>
                  )}
                </span>
                <span className="block text-sm text-arsenic">{s.detail}</span>
              </span>
            </li>
          );
        })}
      </ol>

      {/* Larger screens: the animated route. Decorative; the list above carries the content. */}
      <svg aria-hidden viewBox="0 0 650 600" className="mt-4 hidden h-auto w-full md:block">
        <path d={ROUTE} fill="none" stroke="#D3D6E0" strokeWidth="2" />
        <path className="journey-route" d={ROUTE} pathLength={1} fill="none" stroke="#00879E" strokeWidth="2.5" />
        {/* Drawn beneath the steps, so the dot slips into each one as it pauses there. */}
        <g className="journey-dot" style={v({ offsetPath: `path("${ROUTE}")` })}>
          <circle r="13" fill="#00879E" opacity="0.18" />
          <circle r="6.5" fill="#00879E" stroke="#FFFFFF" strokeWidth="2" />
        </g>
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <g
              key={s.title}
              className="journey-node"
              style={v({ "--at": s.at, "--i": i, transformOrigin: `${s.x}px ${s.y}px` })}
            >
              <circle
                cx={s.x}
                cy={s.y}
                r={R}
                fill="#FFFFFF"
                stroke={s.phase ? "#9DA2B3" : "#00879E"}
                strokeWidth="2.5"
                strokeDasharray={s.phase ? "6 5" : undefined}
              />
              <Icon x={s.x - 14} y={s.y - 14} width={28} height={28} color="#00879E" strokeWidth={1.75} />
              <text
                x={s.x}
                y={s.y + R + 26}
                textAnchor="middle"
                fill="#003366"
                fontSize="14"
                fontWeight="700"
                letterSpacing="0.6"
              >
                {`${String(i + 1).padStart(2, "0")} · ${s.title.toUpperCase()}`}
              </text>
              <text x={s.x} y={s.y + R + 46} textAnchor="middle" fill="#6E7180" fontSize="12.5">
                {s.detail}
              </text>
              {s.phase && (
                <g>
                  <rect x={s.x + 18} y={s.y - R - 6} width="62" height="20" rx="10" fill="#EDEFF7" stroke="#D3D6E0" />
                  <text
                    x={s.x + 49}
                    y={s.y - R + 8}
                    textAnchor="middle"
                    fill="#40424D"
                    fontSize="10.5"
                    fontWeight="600"
                  >
                    {s.phase}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>

      <figcaption className="mt-4 text-xs text-arsenic">
        How a visit to the Accra hub is planned to work. The dashed steps, lab and imaging, come in Phases 2 and 3.
      </figcaption>
    </figure>
  );
}
