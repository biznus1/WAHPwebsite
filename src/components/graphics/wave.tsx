/** Soft wave edge between sections. `className` sets the fill via text colour (e.g. "text-paper"). */
export function Wave({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={`pointer-events-none block h-16 w-full md:h-24 ${flip ? "rotate-180" : ""} ${className}`}
    >
      <path fill="currentColor" d="M0 64c120-28 260-56 420-50 190 7 300 64 500 70 180 5 330-38 520-62v98H0z" />
    </svg>
  );
}
