import { approvedClaim } from "@/content/claims";

/** Cited workforce statistics (from WAHP's own research pages). Each renders only if its claim is approved. */
const stats = [
  { claim: "stat-doctor-density", value: "1.43", label: "Doctors per 10,000 people in Ghana", source: "WHO, 2022" },
  {
    claim: "stat-doctor-ratio",
    value: "1:5,707",
    label: "One doctor for every 5,707 people in Ghana",
    source: "Ghana Ministry of Health, 2021",
  },
  {
    claim: "stat-migration-intent",
    value: "71.8%",
    label: "Of doctors surveyed in Ghana said they intend to work abroad",
    source: "Published survey of doctors working in Ghana",
  },
  {
    claim: "stat-registered-doctors",
    value: "11,867",
    label: "Medical doctors registered to practise in Ghana",
    source: "Ghana Medical and Dental Council, reported 2024",
  },
];

export function ProblemStats({ dark = false }: { dark?: boolean }) {
  const shown = stats.filter((s) => approvedClaim(s.claim));
  if (shown.length === 0) return null;
  return (
    <dl
      className={`grid gap-px overflow-hidden rounded-card sm:grid-cols-2 lg:grid-cols-4 ${dark ? "bg-white/10" : "bg-smoke"}`}
    >
      {shown.map((s, i) => (
        <div
          key={s.claim}
          className={`reveal flex flex-col p-6 md:p-7 ${dark ? "bg-navy" : "bg-white"}`}
          style={{ transitionDelay: `${i * 60}ms` }}
        >
          <dt className={`order-2 mt-3 ${dark ? "text-white/80" : "text-arsenic"}`}>{s.label}</dt>
          <dd className={`order-1 text-headline font-semibold ${dark ? "text-white" : "text-navy"}`}>{s.value}</dd>
          <dd className={`order-3 mt-4 text-xs ${dark ? "text-white/60" : "text-arsenic"}`}>Source: {s.source}</dd>
        </div>
      ))}
    </dl>
  );
}
