import { Check, Minus } from "lucide-react";

const rows: { topic: string; traditional: string; wahp: string }[] = [
  {
    topic: "Premises",
    traditional: "Find, lease and fit out a facility alone",
    wahp: "Practise from professional suites designed for outpatient care",
  },
  {
    topic: "Equipment",
    traditional: "Purchase and maintain equipment individually",
    wahp: "Access to shared, maintained clinical fittings",
  },
  {
    topic: "Administration",
    traditional: "Hire and manage front-desk and admin staff",
    wahp: "One shared operational backbone across practices",
  },
  {
    topic: "Diagnostics",
    traditional: "Refer patients elsewhere for tests and wait",
    wahp: "Laboratory planned on site, closer to the consultation",
  },
  {
    topic: "Focus",
    traditional: "Time split between medicine and running a business",
    wahp: "More time for patients and clinical judgement",
  },
];

/** Qualitative comparison only — no invented percentages. Table on desktop, stacked cards on mobile. */
export function Comparison() {
  return (
    <>
      <ul
        className="reveal space-y-3 md:hidden"
        aria-label="Traditional independent practice compared with the proposed WAHP model"
      >
        {rows.map((r) => (
          <li key={r.topic} className="overflow-hidden rounded-card ring-1 ring-inset ring-smoke">
            <p className="bg-cloud px-5 py-3 text-xs font-semibold tracking-wide text-arsenic uppercase">{r.topic}</p>
            <p className="flex gap-3 bg-white px-5 py-4 text-arsenic">
              <Minus aria-hidden className="mt-1 size-4 shrink-0 text-space" />
              <span>
                <span className="sr-only">Traditional practice: </span>
                {r.traditional}
              </span>
            </p>
            <p className="flex gap-3 bg-navy px-5 py-4 text-white">
              <Check aria-hidden className="mt-1 size-4 shrink-0 text-steel" />
              <span>
                <span className="sr-only">Proposed WAHP model: </span>
                {r.wahp}
              </span>
            </p>
          </li>
        ))}
      </ul>
      <div className="reveal hidden overflow-hidden rounded-panel ring-1 ring-inset ring-steel/70 md:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Traditional independent practice compared with the proposed WAHP model</caption>
          <thead>
            <tr className="text-sm">
              <th scope="col" className="w-[18%] bg-cloud px-6 py-5 font-semibold text-arsenic">
                <span className="sr-only">Topic</span>
              </th>
              <th scope="col" className="bg-cloud px-6 py-5 font-semibold text-arsenic">
                Traditional independent practice
              </th>
              <th scope="col" className="bg-navy px-6 py-5 font-semibold text-white">
                <span className="text-steel">Proposed</span> WAHP model
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
