import { CountUp } from "@/components/motion/count-up";

export interface StatCard {
  value: string;
  label: string;
  source: string;
}

/**
 * Figures on navy in the older build's style: one card each, a large green figure (6.3:1 on navy) that
 * counts up, the label, and the source in italics.
 */
export function StatCards({
  items,
  sourceTone = "muted",
  className = "",
}: {
  items: StatCard[];
  /** "green" as on the older build's investors page; "muted" as on its problem page. */
  sourceTone?: "green" | "muted";
  className?: string;
}) {
  if (items.length === 0) return null;
  return (
    <dl className={`grid gap-4 md:gap-5 ${className}`}>
      {items.map((s, i) => (
        <div
          key={s.label}
          className="reveal flex flex-col rounded-[1.25rem] bg-white/[0.06] px-6 py-8 text-center ring-1 ring-white/15 ring-inset md:px-8 md:py-10"
          style={{ transitionDelay: `${i * 70}ms` }}
        >
          <dt className="order-2 mt-4 text-lg font-medium text-white/85">{s.label}</dt>
          <dd className="order-1 text-[clamp(2.5rem,7vw,3.25rem)] leading-none font-bold tracking-tight text-green">
            <CountUp value={s.value} delay={150 + i * 140} />
          </dd>
          <dd className={`order-3 mt-3 text-base italic ${sourceTone === "green" ? "text-green" : "text-white/70"}`}>
            {s.source}
          </dd>
        </div>
      ))}
    </dl>
  );
}
