import { CountUp } from "@/components/motion/count-up";
import { approvedClaim } from "@/content/claims";

/** Cited workforce statistics (from WAHP's own research pages). Each renders only if its claim is approved.
 *  Figures count up when they scroll into view. */
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
    source: "Wutor et al., BMC Health Services Research, 2024",
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
          <dt className={`order-2 mt-4 ${dark ? "text-white/85" : "text-arsenic"}`}>{s.label}</dt>
          {/* Brand accents: light teal figures on navy (navy on light), and a teal bar that draws in under each. */}
          <dd className={`order-1 text-headline font-semibold ${dark ? "text-teal-300" : "text-navy"}`}>
            <CountUp value={s.value} delay={150 + i * 140} />
            <span
              aria-hidden
              className="stat-bar mt-4 block h-1 w-14 rounded-full bg-gradient-to-r from-teal to-teal-300"
              style={{ transitionDelay: `${300 + i * 140}ms` }}
            />
          </dd>
          <dd className={`order-3 mt-4 text-xs ${dark ? "text-steel" : "text-arsenic"}`}>Source: {s.source}</dd>
        </div>
      ))}
    </dl>
  );
}
