import type { CSSProperties } from "react";
import { ACCRA, KUMASI, MAP_H, MAP_W, NEIGHBOURS, WEST_AFRICA } from "./west-africa-map-data";

/**
 * Accra → Kumasi → West Africa, told as a short map animation (styles: .expansion-map in globals.css).
 * 1. Opens zoomed in on southern Ghana: the Accra flagship is marked, then a line draws to Kumasi.
 * 2. Zooms out to the region; West African countries light up outward from Accra and the brand rings settle.
 * Without JS, or with reduced motion, it shows the final state. Only Accra is an existing plan;
 * Kumasi is labelled a future phase and the region a long-term ambition.
 */
const [ax, ay] = ACCRA;
const [kx, ky] = KUMASI;
// Zoom focus between Accra and Kumasi, brought to the centre of the frame.
const ZOOM = 3.6;
const fx = (ax + kx) / 2 + 6;
const fy = (ay + ky) / 2 + 4;
const zoomFrom = `translate(${MAP_W / 2 - ZOOM * fx}px, ${MAP_H / 2 - ZOOM * fy}px) scale(${ZOOM})`;

const v = (vars: Record<string, string | number>) => vars as CSSProperties;

export function ExpansionMap({ className = "" }: { className?: string }) {
  return (
    <figure className={`reveal expansion-map ${className}`} style={v({ "--zoom-from": zoomFrom })}>
      <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="h-auto w-full" role="img" aria-labelledby="em-title em-desc">
        <title id="em-title">From Accra to West Africa</title>
        <desc id="em-desc">
          Animated map. It starts on southern Ghana with our Accra hub, which is in development, then draws a line to
          Kumasi, a future phase. It then zooms out to West Africa, our long term ambition, as the region&apos;s
          countries light up around rings centred on Accra.
        </desc>

        {/* Map layer: zooms from southern Ghana out to the region. */}
        <g className="em-zoom">
          {NEIGHBOURS.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="#FFFFFF"
              fillOpacity="0.025"
              stroke="#FFFFFF"
              strokeOpacity="0.1"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {WEST_AFRICA.map((c, i) => (
            <path
              key={c.name}
              d={c.d}
              className={c.name === "Ghana" ? "em-ghana" : "em-country"}
              style={v({ "--i": i })}
              stroke="#FFFFFF"
              strokeOpacity="0.32"
              strokeWidth="0.8"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {/* Close-up markers, sized for the zoomed-in view; they hand over to the region layer below. */}
          <g className="em-near">
            <path
              className="em-arc"
              d={`M${ax} ${ay} Q ${ax - 2} ${ky - 6} ${kx} ${ky}`}
              pathLength={1}
              fill="none"
              stroke="#00879E"
              strokeWidth="0.7"
              strokeLinecap="round"
            />
            <g className="em-pin-accra">
              <circle cx={ax} cy={ay} r="2.6" fill="none" stroke="#FFFFFF" strokeWidth="0.9" />
              <circle cx={ax} cy={ay} r="1.1" fill="#00879E" />
              <text x={ax + 4.2} y={ay + 1.3} fill="#FFFFFF" fontSize="3.6" fontWeight="700" letterSpacing="0.3">
                ACCRA · FLAGSHIP
              </text>
            </g>
            <g className="em-pin-kumasi">
              <circle cx={kx} cy={ky} r="1.6" fill="none" stroke="#00879E" strokeWidth="0.7" />
              <circle cx={kx} cy={ky} r="0.7" fill="#FFFFFF" />
              <text
                x={kx - 3.4}
                y={ky + 1.2}
                textAnchor="end"
                fill="#BCBFCC"
                fontSize="3.4"
                fontWeight="700"
                letterSpacing="0.3"
              >
                KUMASI · FUTURE
              </text>
            </g>
          </g>
        </g>

        {/* Region layer: the brand rings, centred on Accra. */}
        <g className="em-far">
          <circle
            className="em-ring-outer"
            cx={ax}
            cy={ay}
            r="232"
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity="0.3"
            strokeDasharray="2 9"
            strokeLinecap="round"
          />
          <circle
            className="em-ring-ghana"
            cx={ax}
            cy={ay}
            r="48"
            fill="none"
            stroke="#00879E"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          <circle className="em-ripple" cx={ax} cy={ay} r="14" fill="none" stroke="#00879E" strokeWidth="1.5" />
          <circle
            className="em-ring-accra"
            cx={ax}
            cy={ay}
            r="14"
            fill="#003366"
            fillOpacity="0.6"
            stroke="#FFFFFF"
            strokeOpacity="0.95"
            strokeWidth="5"
          />
          <circle cx={ax} cy={ay} r="4" fill="#00879E" className="em-ring-accra" />
          <circle cx={kx} cy={ky} r="2.6" fill="#FFFFFF" fillOpacity="0.85" className="em-label-ghana" />
          <g fontWeight="700" letterSpacing="1.3" fontSize="12">
            <text className="em-label-accra" x={ax} y={ay + 34} textAnchor="middle" fill="#FFFFFF">
              ACCRA
            </text>
            <text className="em-label-ghana" x={ax} y={ay - 56} textAnchor="middle" fill="#BCBFCC" fontSize="11">
              GHANA · FUTURE
            </text>
            <text className="em-label-region" x={ax} y={ay - 240} textAnchor="middle" fill="#FFFFFF" fillOpacity="0.9">
              WEST AFRICA · AMBITION
            </text>
          </g>
        </g>
      </svg>
      <figcaption className="sr-only">
        Schematic map. Only the Accra hub is in development. Kumasi is a future phase and West Africa a long term
        ambition.
      </figcaption>
    </figure>
  );
}
