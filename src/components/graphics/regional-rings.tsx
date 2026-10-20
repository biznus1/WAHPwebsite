/**
 * Accra-to-region vision as concentric rings (echoing the WAHP mark's ring)
 * rather than a clip-art map. Only Accra is placed; wider rings are labelled
 * as future and long-term ambitions, not existing locations.
 */
export function RegionalRings({ className = "" }: { className?: string }) {
  return (
    <figure className={className}>
      <svg viewBox="0 0 520 520" className="h-auto w-full" role="img" aria-labelledby="rings-title rings-desc">
        <title id="rings-title">From Accra to the region</title>
        <desc id="rings-desc">
          Three concentric rings. At the centre, the Accra flagship, in development. The middle ring represents further
          sites in Ghana, a future phase. The outer ring represents West Africa, a long-term ambition.
        </desc>
        <circle
          cx="260"
          cy="260"
          r="236"
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.28"
          strokeDasharray="2 9"
          strokeLinecap="round"
        />
        <circle cx="260" cy="260" r="160" fill="none" stroke="#00879E" strokeWidth="1.5" strokeDasharray="7 7" />
        <circle
          cx="260"
          cy="260"
          r="84"
          fill="#FFFFFF"
          fillOpacity="0.04"
          stroke="#FFFFFF"
          strokeOpacity="0.9"
          strokeWidth="14"
        />
        <circle cx="260" cy="260" r="10" fill="#00879E" />
        <circle
          cx="260"
          cy="260"
          r="22"
          fill="none"
          stroke="#00879E"
          strokeOpacity="0.8"
          className="motion-safe:animate-ping [transform-box:fill-box] [transform-origin:center]"
          style={{ animationDuration: "3s" }}
        />

        {/* Faint future nodes on the outer rings — unnamed on purpose */}
        {[30, 140, 215, 300].map((deg) => {
          const r = (deg * Math.PI) / 180;
          return (
            <circle
              key={`m${deg}`}
              cx={260 + 160 * Math.cos(r)}
              cy={260 + 160 * Math.sin(r)}
              r="5"
              fill="none"
              stroke="#00879E"
              strokeWidth="1.5"
            />
          );
        })}
        {[60, 105, 180, 250, 330].map((deg) => {
          const r = (deg * Math.PI) / 180;
          return (
            <circle
              key={`o${deg}`}
              cx={260 + 236 * Math.cos(r)}
              cy={260 + 236 * Math.sin(r)}
              r="3.5"
              fill="#FFFFFF"
              fillOpacity="0.35"
            />
          );
        })}

        <g fontWeight="700" letterSpacing="1.4" fontSize="13">
          <text x="260" y="300" textAnchor="middle" fill="#FFFFFF">
            ACCRA
          </text>
          <text x="260" y="90" textAnchor="middle" fill="#BCBFCC">
            GHANA · FUTURE
          </text>
          <text x="260" y="16" textAnchor="middle" fill="#FFFFFF" fillOpacity="0.85">
            WEST AFRICA · AMBITION
          </text>
        </g>
      </svg>
      <figcaption className="sr-only">
        Schematic only — no specific sites beyond the Accra flagship are named or implied.
      </figcaption>
    </figure>
  );
}
