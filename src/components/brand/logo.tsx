import { LOCKUP_GREEN_PATHS, LOCKUP_PRIMARY_PATHS, LOCKUP_VIEWBOX, MARK_PATHS, MARK_VIEWBOX } from "./logo-paths";

type Tone = "primary" | "reversed";

/**
 * Official horizontal lockup. Colourways follow Brand Guidelines p.11:
 * - primary  (light backgrounds): navy emblem + "West African", green "Health Partners"
 * - reversed (navy backgrounds):  white emblem + "West African", green "Health Partners"
 * Minimum rendered width is 120px (owner logo rules).
 */
export function Logo({
  tone = "primary",
  className,
  title = "West African Health Partners",
}: {
  tone?: Tone;
  className?: string;
  title?: string | null;
}) {
  const primary = tone === "primary" ? "#003366" : "#FFFFFF";
  return (
    <svg
      viewBox={LOCKUP_VIEWBOX}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title ?? undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <g fill={primary}>
        {LOCKUP_PRIMARY_PATHS.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <g fill="#8BC900">
        {LOCKUP_GREEN_PATHS.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  );
}

/** Emblem alone. Uses currentColor so callers pick an approved brand colour. */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {MARK_PATHS.map((d, i) => (
        <path key={i} d={d} fill="currentColor" />
      ))}
    </svg>
  );
}
