export interface JourneyStep {
  title: string;
  body: string;
}

/** Numbered process with a connecting rail. */
export function JourneySteps({ steps, note }: { steps: JourneyStep[]; note?: string }) {
  return (
    <div>
      <ol className={`grid gap-4 ${steps.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-4"}`}>
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="reveal group relative overflow-hidden rounded-card bg-white p-6 ring-1 ring-inset ring-smoke md:p-7"
            style={{ transitionDelay: `${i * 70}ms` }}
          >
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                {String(i + 1).padStart(2, "0")}
              </span>
              {i < steps.length - 1 && <span aria-hidden className="h-px flex-1 bg-smoke" />}
            </div>
            <h3 className="mt-6 text-title font-medium text-navy">{step.title}</h3>
            <p className="mt-2 text-arsenic">{step.body}</p>
          </li>
        ))}
      </ol>
      {note && <p className="mt-5 text-sm text-arsenic">{note}</p>}
    </div>
  );
}
