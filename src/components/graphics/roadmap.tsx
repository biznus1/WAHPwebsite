import { roadmap, roadmapCaveat } from "@/content/platform";
import { StageBadge } from "@/components/ui/primitives";

/** Phased rollout. Horizontal rail on desktop, vertical rail on mobile. No dates until approved. */
export function Roadmap({ dark = false }: { dark?: boolean }) {
  return (
    <div>
      <ol className="relative grid gap-0 md:grid-cols-4 md:gap-6">
        <span
          aria-hidden
          className={`absolute top-2 bottom-2 left-[7px] w-px md:top-[7px] md:right-0 md:bottom-auto md:left-0 md:h-px md:w-auto ${
            dark ? "bg-white/20" : "bg-steel"
          }`}
        />
        {roadmap.map((step, i) => {
          const filled = step.stage === "in-development";
          return (
            <li
              key={step.title}
              className="reveal relative pb-10 pl-10 md:pb-0 md:pl-0 md:pt-10"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span
                aria-hidden
                className={`absolute top-0.5 left-0 size-[15px] rounded-full md:top-0 ${
                  filled
                    ? `bg-teal ring-4 ${dark ? "ring-white/15" : "ring-teal/20"}`
                    : step.stage === "planned"
                      ? `${dark ? "bg-navy" : "bg-paper"} ring-2 ring-teal`
                      : `${dark ? "bg-navy border-white/50" : "bg-paper border-space"} border-2 border-dashed`
                }`}
              />
              <p className={`eyebrow ${dark ? "text-white/60" : "text-arsenic"}`}>{step.phase}</p>
              <h3 className={`mt-3 text-title font-medium ${dark ? "text-white" : "text-navy"}`}>{step.title}</h3>
              <p className={`mt-2 ${dark ? "text-white/70" : "text-arsenic"}`}>{step.description}</p>
              <div className="mt-4">
                <StageBadge stage={step.stage} dark={dark} />
              </div>
            </li>
          );
        })}
      </ol>
      <p className={`mt-10 max-w-3xl text-sm ${dark ? "text-white/60" : "text-arsenic"}`}>{roadmapCaveat}</p>
    </div>
  );
}
