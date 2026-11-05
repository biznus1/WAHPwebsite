import type { CSSProperties } from "react";

/*
 * Original WAHP graphic: a sketch of a shared outpatient floor, after the owner's mockup (5 Nov 2026).
 * Six consulting suites, each drawn a little differently, connect to one shared operational core; the lab is
 * planned and imaging a future phase. Conceptual only: it does not depict an existing facility.
 * Animation (CSS in globals.css, `.floor-*`): plays once the panel scrolls into view, then a slow ambient flow.
 */

const NAVY = "#003366";
const TEAL = "#00879E";
const TEAL_LIGHT = "#7FD3E1";
const GREEN = "#8BC900";
const WALL = "#E6EFF4";
const FLOOR = "#BFCFD9";
const LINE = "#C7D0DA";

/** How each suite is furnished: same parts, arranged differently so no two rooms look alike. */
type RoomPlan = {
  couch?: { x: number; cushion: string };
  desk?: number;
  curtain?: { side: "left" | "right"; color: string };
  window?: number;
  monitor?: number;
  cabinet?: number;
  plant?: number;
  stool?: number;
  lamp?: number;
};

const rooms: RoomPlan[] = [
  { plant: 1, cabinet: 14, couch: { x: 38, cushion: TEAL }, monitor: 48, curtain: { side: "right", color: TEAL } },
  { couch: { x: 46, cushion: NAVY }, curtain: { side: "left", color: TEAL }, window: 50, stool: 36, plant: 86 },
  { desk: 14, window: 16, couch: { x: 58, cushion: TEAL }, lamp: 92 },
  { couch: { x: 8, cushion: TEAL }, cabinet: 70, monitor: 22, curtain: { side: "right", color: NAVY }, stool: 54 },
  { window: 8, couch: { x: 40, cushion: NAVY }, plant: 84 },
  { curtain: { side: "left", color: NAVY }, couch: { x: 8, cushion: TEAL }, monitor: 22, desk: 50 },
];

const W = 100;
const H = 74;
const FLOOR_Y = 58;

/** A small front view of an exam room, drawn in a 100 x 74 box. */
function Room({ plan, x, y, id }: { plan: RoomPlan; x: number; y: number; id: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <clipPath id={id}>
        <rect width={W} height={H} rx="9" />
      </clipPath>
      <g clipPath={`url(#${id})`}>
        <rect width={W} height={FLOOR_Y} fill={WALL} />
        <rect y={FLOOR_Y} width={W} height={H - FLOOR_Y} fill={FLOOR} />
        <rect y={FLOOR_Y - 1.5} width={W} height="1.5" fill="#FFFFFF" opacity="0.8" />
        <rect x="38" y="3" width="24" height="2.5" rx="1.2" fill="#FFFFFF" />
        <ellipse cx="50" cy="8" rx="20" ry="5" fill="#FFFFFF" opacity="0.35" />

        {plan.window !== undefined && (
          <g>
            <rect
              x={plan.window}
              y="11"
              width="26"
              height="22"
              rx="2"
              fill="#BFE5EE"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            <path d={`M${plan.window + 13} 11v22M${plan.window} 22h26`} stroke="#FFFFFF" strokeWidth="1.4" />
          </g>
        )}
        {plan.monitor !== undefined && (
          <g>
            <rect x={plan.monitor} y="14" width="20" height="13" rx="2" fill="#0B2C4A" />
            <path
              className="floor-pulse"
              d={`M${plan.monitor + 2} 21h4l2-4 3 7 2-3h5`}
              fill="none"
              stroke={TEAL_LIGHT}
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </g>
        )}
        {plan.curtain && (
          <g>
            <rect
              x={plan.curtain.side === "left" ? 0 : W - 15}
              y="2"
              width="15"
              height={FLOOR_Y - 2}
              fill={plan.curtain.color}
            />
            {[3, 7, 11].map((d) => (
              <path
                key={d}
                d={`M${(plan.curtain!.side === "left" ? 0 : W - 15) + d} 3v${FLOOR_Y - 4}`}
                stroke="#000000"
                strokeOpacity="0.15"
                strokeWidth="1"
              />
            ))}
          </g>
        )}
        {plan.lamp !== undefined && (
          <g>
            <path d={`M${plan.lamp} 22v${FLOOR_Y - 22}`} stroke="#6E7180" strokeWidth="1.4" />
            <path d={`M${plan.lamp - 6} 24l3-8h6l3 8z`} fill="#FFFFFF" stroke={LINE} />
          </g>
        )}
        {plan.cabinet !== undefined && (
          <g>
            <rect x={plan.cabinet} y="36" width="20" height={FLOOR_Y - 36} rx="1.5" fill="#FFFFFF" stroke={LINE} />
            <path d={`M${plan.cabinet} 43h20M${plan.cabinet} 50h20`} stroke={LINE} />
            <path
              d={`M${plan.cabinet + 8} 39.5h4M${plan.cabinet + 8} 46.5h4M${plan.cabinet + 8} 53.5h4`}
              stroke="#9DA2B3"
            />
          </g>
        )}
        {plan.desk !== undefined && (
          <g>
            <rect x={plan.desk} y="40" width="30" height="3.5" rx="1" fill="#FFFFFF" stroke={LINE} />
            <path
              d={`M${plan.desk + 3} 43.5v${FLOOR_Y - 43.5}M${plan.desk + 27} 43.5v${FLOOR_Y - 43.5}`}
              stroke={LINE}
              strokeWidth="1.6"
            />
            <rect x={plan.desk + 9} y="31" width="12" height="8" rx="1" fill="#0B2C4A" />
            <path d={`M${plan.desk + 15} 39v1`} stroke="#0B2C4A" strokeWidth="1.5" />
            <rect x={plan.desk + 32} y="38" width="9" height="11" rx="2" fill={NAVY} />
            <path
              d={`M${plan.desk + 33} 49v${FLOOR_Y - 49}M${plan.desk + 40} 49v${FLOOR_Y - 49}`}
              stroke={NAVY}
              strokeWidth="1.4"
            />
          </g>
        )}
        {plan.couch && (
          <g>
            <rect x={plan.couch.x} y="44" width="36" height="8" rx="2" fill="#FFFFFF" stroke={LINE} />
            <rect x={plan.couch.x + 6} y="52" width="24" height={FLOOR_Y - 52} fill="#FFFFFF" stroke={LINE} />
            <path
              d={`M${plan.couch.x - 1} 44h28l9-6h2v3l-8 6H${plan.couch.x - 1}z`}
              fill={plan.couch.cushion}
              opacity="0.9"
            />
            <rect x={plan.couch.x - 1} y="40.5" width="28" height="4" rx="2" fill={plan.couch.cushion} />
          </g>
        )}
        {plan.stool !== undefined && (
          <g>
            <ellipse cx={plan.stool} cy="47" rx="5" ry="2" fill={NAVY} />
            <path
              d={`M${plan.stool} 49v${FLOOR_Y - 51}M${plan.stool - 4} ${FLOOR_Y - 1}h8`}
              stroke="#40424D"
              strokeWidth="1.4"
            />
          </g>
        )}
        {plan.plant !== undefined && (
          <g>
            <path d={`M${plan.plant + 2} 47h9l-1.5 ${FLOOR_Y - 47}h-6z`} fill="#FFFFFF" stroke={LINE} />
            <ellipse
              cx={plan.plant + 6.5}
              cy="40"
              rx="3.2"
              ry="7"
              fill={GREEN}
              transform={`rotate(-12 ${plan.plant + 6.5} 40)`}
            />
            <ellipse
              cx={plan.plant + 2.5}
              cy="42"
              rx="2.6"
              ry="5.6"
              fill="#5F8F12"
              transform={`rotate(-38 ${plan.plant + 2.5} 42)`}
            />
            <ellipse
              cx={plan.plant + 10.5}
              cy="42"
              rx="2.6"
              ry="5.6"
              fill="#6FA514"
              transform={`rotate(32 ${plan.plant + 10.5} 42)`}
            />
          </g>
        )}
      </g>
      <rect width={W} height={H} rx="9" fill="none" stroke="#FFFFFF" strokeOpacity="0.35" />
    </g>
  );
}

/** People: the shared team at the core. */
function TeamIcon({ x, y }: { x: number; y: number }) {
  const s = { fill: "none", stroke: "#FFFFFF", strokeWidth: 2, strokeLinecap: "round" as const };
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle {...s} cx="0" cy="6" r="5" />
      <path {...s} d="M-9 22v-2a9 9 0 0 1 18 0v2" />
      <circle {...s} cx="-14" cy="9" r="3.6" strokeOpacity="0.8" />
      <path {...s} strokeOpacity="0.8" d="M-21 22v-1a7 7 0 0 1 8-6.8" />
      <circle {...s} cx="14" cy="9" r="3.6" strokeOpacity="0.8" />
      <path {...s} strokeOpacity="0.8" d="M21 22v-1a7 7 0 0 0-8-6.8" />
    </g>
  );
}

export function ClinicalFloorSchematic({ className = "" }: { className?: string }) {
  const suitesTop = [44, 176, 308, 440];
  const suitesBottom = [44, 176];
  const core = { x: 300, y: 262 };
  const tileH = 112;
  const topY = 40;
  const bottomY = 368;
  const tiles = [...suitesTop.map((x) => ({ x, y: topY })), ...suitesBottom.map((x) => ({ x, y: bottomY }))];

  return (
    <figure className={`floor-plan ${className}`}>
      <svg viewBox="0 0 600 520" className="h-auto w-full" role="img" aria-labelledby="floor-title floor-desc">
        <title id="floor-title">Sketch of a planned WAHP outpatient floor</title>
        <desc id="floor-desc">
          Six consulting rooms, each used by an independent doctor, around one shared front desk that handles reception,
          patient flow, records and scheduling. The lab is marked as planned and imaging as a future phase. This is a
          sketch of the plan, not a building that exists.
        </desc>
        <defs>
          <pattern id="floor-grid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M16 0H0V16" fill="none" stroke="#FFFFFF" strokeOpacity="0.06" />
          </pattern>
          <filter id="floor-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="floor-core-glow">
            <stop offset="45%" stopColor={TEAL_LIGHT} stopOpacity="0.35" />
            <stop offset="100%" stopColor={TEAL_LIGHT} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="floor-liquid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={TEAL_LIGHT} />
            <stop offset="100%" stopColor={TEAL} />
          </linearGradient>
        </defs>

        {/* Floor plate */}
        <rect x="20" y="20" width="560" height="480" rx="28" fill="#0A3E70" fillOpacity="0.45" />
        <rect x="20" y="20" width="560" height="480" rx="28" fill="url(#floor-grid)" />
        <rect
          className="floor-plate"
          x="20"
          y="20"
          width="560"
          height="480"
          rx="28"
          fill="none"
          stroke={TEAL_LIGHT}
          strokeOpacity="0.6"
          strokeWidth="2"
          filter="url(#floor-glow)"
        />

        {/* Connections from each suite to the shared core; the lab's is dashed because it is planned */}
        <g className="floor-links">
          <g fill="none" stroke={TEAL_LIGHT} strokeWidth="2.2" strokeLinecap="round" className="schematic-flow">
            {suitesTop.map((x) => (
              <path
                key={`t${x}`}
                d={`M${x + 58} ${topY + tileH} C ${x + 58} 200, ${core.x} 186, ${core.x} ${core.y - 64}`}
              />
            ))}
            {suitesBottom.map((x) => (
              <path
                key={`b${x}`}
                d={`M${x + 58} ${bottomY} C ${x + 58} 326, ${core.x} 336, ${core.x} ${core.y + 64}`}
              />
            ))}
          </g>
          <path
            d={`M366 ${bottomY} C 366 330, ${core.x + 22} 336, ${core.x + 14} ${core.y + 62}`}
            fill="none"
            stroke={TEAL_LIGHT}
            strokeOpacity="0.55"
            strokeWidth="2"
            strokeDasharray="2 6"
            strokeLinecap="round"
          />
        </g>

        {/* Suites */}
        {tiles.map((s, i) => (
          <g key={i} className="floor-tile" style={{ "--i": i } as CSSProperties}>
            <rect
              x={s.x}
              y={s.y}
              width="116"
              height={tileH}
              rx="15"
              fill="#0E4A80"
              fillOpacity="0.55"
              stroke={TEAL_LIGHT}
              strokeOpacity="0.75"
              strokeWidth="1.6"
              filter="url(#floor-glow)"
            />
            <text x={s.x + 12} y={s.y + 21} fill="#FFFFFF" fontSize="12" fontWeight="800" letterSpacing="1.2">
              {`SUITE 0${i + 1}`}
            </text>
            <Room plan={rooms[i]} x={s.x + 8} y={s.y + 30} id={`floor-room-${i}`} />
          </g>
        ))}

        {/* Laboratory: planned */}
        <g className="floor-tile" style={{ "--i": 6 } as CSSProperties}>
          <rect
            x="308"
            y={bottomY}
            width="116"
            height={tileH}
            rx="15"
            fill={TEAL}
            fillOpacity="0.38"
            stroke={TEAL_LIGHT}
            strokeWidth="2"
            filter="url(#floor-glow)"
          />
          <text x="320" y={bottomY + 21} fill="#FFFFFF" fontSize="12" fontWeight="800" letterSpacing="1.2">
            LABORATORY
          </text>
          <text x="320" y={bottomY + 37} fill="#FFFFFF" fillOpacity="0.8" fontSize="11">
            Planned
          </text>
          {[338, 360, 382].map((tx, ti) => (
            <g key={tx}>
              <rect
                className="floor-liquid"
                x={tx - 5}
                y={bottomY + 66}
                width="10"
                height="30"
                rx="5"
                fill="url(#floor-liquid)"
                style={{ "--i": ti } as CSSProperties}
              />
              <path
                d={`M${tx - 6} ${bottomY + 50}v41a6 6 0 0 0 12 0v-41`}
                fill="#FFFFFF"
                fillOpacity="0.12"
                stroke="#FFFFFF"
                strokeWidth="1.6"
              />
              <path d={`M${tx - 8} ${bottomY + 50}h16`} stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            </g>
          ))}
          <path
            d={`M326 ${bottomY + 76}h68M326 ${bottomY + 101}h68`}
            stroke="#FFFFFF"
            strokeOpacity="0.7"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>

        {/* Imaging: future phase */}
        <g className="floor-tile" style={{ "--i": 7 } as CSSProperties}>
          <rect
            className="floor-dash"
            x="440"
            y={bottomY}
            width="116"
            height={tileH}
            rx="15"
            fill="#FFFFFF"
            fillOpacity="0.04"
            stroke="#FFFFFF"
            strokeOpacity="0.6"
            strokeWidth="1.6"
            strokeDasharray="5 6"
          />
          <text x="452" y={bottomY + 21} fill="#FFFFFF" fontSize="12" fontWeight="800" letterSpacing="1.2">
            IMAGING
          </text>
          <text x="452" y={bottomY + 37} fill="#FFFFFF" fillOpacity="0.7" fontSize="11">
            Future phase
          </text>
          {/* Scanner: housing, bore, and the patient table */}
          <rect x="488" y={bottomY + 50} width="50" height="48" rx="20" fill="#E6EFF4" />
          <circle cx="513" cy={bottomY + 74} r="12" fill="#0B2C4A" />
          <circle
            cx="513"
            cy={bottomY + 74}
            r="12"
            fill="none"
            stroke={TEAL_LIGHT}
            strokeWidth="1.5"
            className="floor-scan"
          />
          <rect x="456" y={bottomY + 86} width="62" height="6" rx="3" fill="#FFFFFF" />
          <rect x="458" y={bottomY + 83} width="44" height="4" rx="2" fill={TEAL_LIGHT} />
          <path d={`M470 ${bottomY + 92}v8M500 ${bottomY + 92}v8`} stroke="#BCBFCC" strokeWidth="2" />
        </g>

        {/* Shared core: echoes the ring of the WAHP mark */}
        <circle className="floor-core-glow" cx={core.x} cy={core.y} r="96" fill="url(#floor-core-glow)" />
        <g className="floor-core">
          <circle
            cx={core.x}
            cy={core.y}
            r="58"
            fill={NAVY}
            stroke={TEAL_LIGHT}
            strokeWidth="6"
            filter="url(#floor-glow)"
          />
          <circle cx={core.x} cy={core.y} r="58" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.9" />
          <TeamIcon x={core.x} y={core.y - 38} />
          <text
            x={core.x}
            y={core.y + 8}
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="13"
            fontWeight="800"
            letterSpacing="1"
          >
            SHARED
          </text>
          <text
            x={core.x}
            y={core.y + 25}
            textAnchor="middle"
            fill="#BCBFCC"
            fontSize="11.5"
            fontWeight="700"
            letterSpacing="1.1"
          >
            OPERATIONS
          </text>
        </g>

        {/* Shared services either side of the core */}
        <g className="floor-pill" style={{ "--i": 0 } as CSSProperties}>
          {/* Reception desk with a receptionist */}
          <circle cx="126" cy="221" r="5.5" fill="none" stroke="#FFFFFF" strokeWidth="2" />
          <path d="M116 241a10 10 0 0 1 20 0" fill="none" stroke="#FFFFFF" strokeWidth="2" />
          <rect x="102" y="240" width="48" height="10" rx="2" fill="#FFFFFF" />
          <rect x="138" y="231" width="12" height="8" rx="1.5" fill="#FFFFFF" fillOpacity="0.85" />
          <rect
            x="56"
            y="258"
            width="140"
            height="32"
            rx="16"
            fill="#0E4A80"
            fillOpacity="0.7"
            stroke={TEAL_LIGHT}
            strokeOpacity="0.7"
            strokeWidth="1.4"
          />
          <text x="126" y="278.5" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700">
            Reception &amp; flow
          </text>
        </g>
        <g className="floor-pill" style={{ "--i": 1 } as CSSProperties}>
          {/* Calendar with a check */}
          <rect x="462" y="222" width="24" height="22" rx="3" fill="none" stroke="#FFFFFF" strokeWidth="2" />
          <path d="M462 229h24M468 219v6M480 219v6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <path
            d="M467 235h2M473 235h2M479 235h2M467 240h2M473 240h2"
            stroke={TEAL_LIGHT}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <g className="floor-check">
            <circle cx="488" cy="244" r="7" fill={TEAL} stroke="#FFFFFF" strokeWidth="1.5" />
            <path
              d="M484.8 244.2l2.2 2.2 4-4.4"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <rect
            x="404"
            y="258"
            width="140"
            height="32"
            rx="16"
            fill="#0E4A80"
            fillOpacity="0.7"
            stroke={TEAL_LIGHT}
            strokeOpacity="0.7"
            strokeWidth="1.4"
          />
          <text x="474" y="278.5" textAnchor="middle" fill="#FFFFFF" fontSize="11.5" fontWeight="700">
            Records &amp; scheduling
          </text>
        </g>
      </svg>
      <figcaption className="mt-3 text-xs tracking-wide text-white/55">
        A sketch of the plan, not a building that exists yet.
      </figcaption>
    </figure>
  );
}
