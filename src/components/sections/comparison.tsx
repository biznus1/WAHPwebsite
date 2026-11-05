import { Check, Minus } from "lucide-react";

type OptionId = "hospital" | "wahp" | "own";

/** Columns in reading order: WAHP sits between the big hospital and going it alone, as the heading says. */
const options: { id: OptionId; label: string; short: string }[] = [
  { id: "hospital", label: "In a big hospital", short: "Big hospital" },
  { id: "wahp", label: "Planned at WAHP", short: "WAHP" },
  { id: "own", label: "On your own", short: "On your own" },
];

/** Each cell: the text, and whether it counts in the doctor's favour (check) or against (dash). */
type Cell = { text: string; good: boolean };

const rows: { topic: string; cells: Record<OptionId, Cell> }[] = [
  {
    topic: "Premises",
    cells: {
      hospital: { text: "Work in the hospital's building, on its terms", good: false },
      wahp: { text: "Book a consulting room in the Accra hub", good: true },
      own: { text: "Find, lease and fit out a building yourself", good: false },
    },
  },
  {
    topic: "Equipment",
    cells: {
      hospital: { text: "Equipment is there, shared with the whole hospital", good: true },
      wahp: { text: "Use rooms that are already fitted and maintained", good: true },
      own: { text: "Buy and maintain every piece of equipment", good: false },
    },
  },
  {
    topic: "Administration",
    cells: {
      hospital: { text: "Follow the hospital's systems, rules and rotas", good: false },
      wahp: { text: "Share one front desk, schedule and records system", good: true },
      own: { text: "Hire your own receptionist and admin staff", good: false },
    },
  },
  {
    topic: "Diagnostics",
    cells: {
      hospital: { text: "Lab and imaging are usually in the building", good: true },
      wahp: { text: "An on site lab is planned for Phase 2", good: true },
      own: { text: "Send patients across town for tests, then wait", good: false },
    },
  },
  {
    topic: "Focus",
    cells: {
      hospital: { text: "Little say over your hours or how you practise", good: false },
      wahp: { text: "More of your week goes on patients", good: true },
      own: { text: "Half your week goes on running a business", good: false },
    },
  },
];

const caption = "Practising in a big hospital, at WAHP and on your own, compared";

function Mark({ good, dark = false }: { good: boolean; dark?: boolean }) {
  return good ? (
    <Check aria-hidden className={`mt-1 size-4 shrink-0 ${dark ? "text-teal-300" : "text-teal"}`} />
  ) : (
    <Minus aria-hidden className={`mt-1 size-4 shrink-0 ${dark ? "text-steel" : "text-space"}`} />
  );
}

/**
 * Qualitative three way comparison, no invented percentages.
 * Desktop: one table with WAHP in the middle column. Phones: a switch (radio buttons, no script needed)
 * shows one option at a time, after the Hospital / WAHP / Private clinic toggle on the older site.
 */
export function Comparison({ name = "compare" }: { name?: string }) {
  return (
    <>
      <div className="compare-switch md:hidden">
        <fieldset>
          <legend className="sr-only">Show one way of practising</legend>
          <div className="grid grid-cols-3 gap-1 rounded-full bg-cloud p-1 ring-1 ring-inset ring-smoke">
            {options.map((o) => (
              <label key={o.id} className="relative block cursor-pointer">
                <input
                  type="radio"
                  name={name}
                  value={o.id}
                  defaultChecked={o.id === "wahp"}
                  className="peer sr-only"
                />
                <span className="flex h-11 items-center justify-center rounded-full px-2 text-center text-sm font-semibold text-arsenic transition-colors duration-200 peer-checked:bg-navy peer-checked:text-white peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-teal">
                  {o.short}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="mt-4 space-y-3">
          {options.map((o) => {
            const dark = o.id === "wahp";
            return (
              <div
                key={o.id}
                role="group"
                data-option={o.id}
                aria-label={o.label}
                className={`compare-panel overflow-hidden rounded-card ring-1 ring-inset ${dark ? "bg-navy text-white ring-navy" : "bg-white text-arsenic ring-smoke"}`}
              >
                <p
                  className={`px-5 py-3 text-xs font-semibold tracking-wide uppercase ${dark ? "bg-navy-900 text-teal-300" : "bg-cloud text-arsenic"}`}
                >
                  {o.label}
                </p>
                <dl className="divide-y divide-current/10 px-5">
                  {rows.map((r) => (
                    <div key={r.topic} className="py-4">
                      <dt
                        className={`text-xs font-semibold tracking-wide uppercase ${dark ? "text-steel" : "text-graphite"}`}
                      >
                        {r.topic}
                      </dt>
                      <dd className="mt-1.5 flex gap-3">
                        <Mark good={r.cells[o.id].good} dark={dark} />
                        <span>{r.cells[o.id].text}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            );
          })}
        </div>
      </div>

      <div className="hidden overflow-hidden rounded-panel ring-1 ring-inset ring-steel/70 md:block">
        <table className="w-full table-fixed border-collapse text-left">
          <caption className="sr-only">{caption}</caption>
          <colgroup>
            <col className="w-[16%]" />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr className="text-sm">
              <th scope="col" className="bg-cloud px-6 py-5 font-semibold text-arsenic">
                <span className="sr-only">Topic</span>
              </th>
              {options.map((o) =>
                o.id === "wahp" ? (
                  <th key={o.id} scope="col" className="bg-navy px-6 py-5 font-semibold text-white">
                    <span className="text-teal-300">Planned</span> at WAHP
                  </th>
                ) : (
                  <th key={o.id} scope="col" className="bg-cloud px-6 py-5 font-semibold text-arsenic">
                    {o.label}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.topic} className="border-t border-smoke align-top">
                <th scope="row" className="bg-white px-6 py-5 text-sm font-semibold text-navy">
                  {r.topic}
                </th>
                {options.map((o) => (
                  <td
                    key={o.id}
                    className={
                      o.id === "wahp" ? "bg-paper px-6 py-5 font-medium text-navy" : "bg-white px-6 py-5 text-arsenic"
                    }
                  >
                    <span className="flex gap-3">
                      <Mark good={r.cells[o.id].good} />
                      {r.cells[o.id].text}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
