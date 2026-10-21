import { Check, Minus } from "lucide-react";

const rows: { topic: string; traditional: string; wahp: string }[] = [
  {
    topic: "Premises",
    traditional: "Find, lease and fit out a building yourself",
    wahp: "Book a consulting room in the Accra hub",
  },
  {
    topic: "Equipment",
    traditional: "Buy and maintain every piece of equipment",
    wahp: "Use rooms that are already fitted and maintained",
  },
  {
    topic: "Administration",
    traditional: "Hire your own receptionist and admin staff",
    wahp: "Share one front desk, schedule and records system",
  },
  {
    topic: "Diagnostics",
    traditional: "Send patients across town for tests, then wait",
    wahp: "An on site lab is planned for Phase 2",
  },
  {
    topic: "Focus",
    traditional: "Half your week goes on running a business",
    wahp: "More of your week goes on patients",
  },
];

/** Qualitative comparison only — no invented percentages. Table on desktop, stacked cards on mobile. */
export function Comparison() {
  return (
    <>
      <ul className="reveal space-y-3 md:hidden" aria-label="Practising on your own compared with practising at WAHP">
        {rows.map((r) => (
          <li key={r.topic} className="overflow-hidden rounded-card ring-1 ring-inset ring-smoke">
            <p className="bg-cloud px-5 py-3 text-xs font-semibold tracking-wide text-arsenic uppercase">{r.topic}</p>
            <p className="flex gap-3 bg-white px-5 py-4 text-arsenic">
              <Minus aria-hidden className="mt-1 size-4 shrink-0 text-space" />
              <span>
                <span className="sr-only">On your own: </span>
                {r.traditional}
              </span>
            </p>
            <p className="flex gap-3 bg-navy px-5 py-4 text-white">
              <Check aria-hidden className="mt-1 size-4 shrink-0 text-steel" />
              <span>
                <span className="sr-only">Planned at WAHP: </span>
                {r.wahp}
              </span>
            </p>
          </li>
        ))}
      </ul>
      <div className="reveal hidden overflow-hidden rounded-panel ring-1 ring-inset ring-steel/70 md:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Practising on your own compared with practising at WAHP</caption>
          <thead>
            <tr className="text-sm">
              <th scope="col" className="w-[18%] bg-cloud px-6 py-5 font-semibold text-arsenic">
                <span className="sr-only">Topic</span>
              </th>
              <th scope="col" className="bg-cloud px-6 py-5 font-semibold text-arsenic">
                Practising on your own
              </th>
              <th scope="col" className="bg-navy px-6 py-5 font-semibold text-white">
                <span className="text-steel">Planned</span> at WAHP
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.topic} className="border-t border-smoke align-top">
                <th scope="row" className="bg-white px-6 py-5 text-sm font-semibold text-navy">
                  {r.topic}
                </th>
                <td className="bg-white px-6 py-5 text-arsenic">
                  <span className="flex gap-3">
                    <Minus aria-hidden className="mt-1 size-4 shrink-0 text-space" />
                    {r.traditional}
                  </span>
                </td>
                <td className="bg-paper px-6 py-5 text-navy">
                  <span className="flex gap-3">
                    <Check aria-hidden className="mt-1 size-4 shrink-0 text-teal" />
                    {r.wahp}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
