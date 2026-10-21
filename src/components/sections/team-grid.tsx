import Image from "next/image";
import type { Leader } from "@/content/leadership";

function displayName(l: Leader) {
  return l.credentials ? `${l.name}, ${l.credentials}` : l.name;
}

/** Leadership cards: photo, role, name, bio, focus areas, LinkedIn. */
export function TeamGrid({ leaders, compact = false }: { leaders: Leader[]; compact?: boolean }) {
  return (
    <ul className={`grid gap-5 sm:grid-cols-2 ${compact ? "lg:grid-cols-5" : "lg:grid-cols-3"}`}>
      {leaders.map((l, i) => (
        <li
          key={l.name}
          className="reveal flex flex-col overflow-hidden rounded-card bg-white ring-1 ring-inset ring-smoke"
          style={{ transitionDelay: `${(i % 3) * 70}ms` }}
        >
          <div className="relative aspect-square bg-cloud">
            <Image
              src={l.photo}
              alt={`Portrait of ${l.name}`}
              fill
              sizes={
                compact
                  ? "(min-width: 1024px) 18vw, (min-width: 640px) 45vw, 100vw"
                  : "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
              }
              className="object-cover"
            />
          </div>
          <div className={`flex flex-1 flex-col ${compact ? "p-5" : "p-6 md:p-7"}`}>
            <p className="eyebrow text-arsenic">{l.role}</p>
            <h3 className={`mt-3 font-medium text-navy ${compact ? "text-lg" : "text-title"}`}>{displayName(l)}</h3>
            {!compact && (
              <>
                <p className="mt-3 flex-1 text-arsenic">{l.bio}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${l.name}: areas of focus`}>
                  {l.focus.map((f) => (
                    <li key={f} className="rounded-full bg-cloud px-3 py-1 text-xs font-semibold text-navy">
                      {f}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {l.linkedin && !compact && (
              <a
                href={l.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 self-start font-semibold text-navy underline decoration-teal decoration-2 underline-offset-4"
              >
                LinkedIn<span className="sr-only"> profile of {l.name} (opens in a new tab)</span>
              </a>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
