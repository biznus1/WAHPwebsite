/** Concentric rings echoing the brand emblem's curve; decorative backdrop for the Home hero. */
export function HeroRings({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 800 800" fill="none" className={className}>
      <g className="ambient-drift" stroke="currentColor">
        <circle cx="400" cy="400" r="390" strokeWidth="1.5" />
        <circle cx="430" cy="380" r="320" strokeWidth="1.5" />
        <circle cx="460" cy="360" r="250" strokeWidth="1.5" />
        <circle cx="490" cy="340" r="180" strokeWidth="1" opacity="0.7" />
      </g>
    </svg>
  );
}
