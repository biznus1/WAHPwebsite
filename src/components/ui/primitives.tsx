import type { ReactNode } from "react";

export type Stage = "in-development" | "planned" | "future" | "aspiration" | "pre-launch";

const stageStyles: Record<Stage, { label: string; className: string }> = {
  "pre-launch": { label: "Pre-launch", className: "bg-white text-navy ring-navy/30" },
  "in-development": { label: "In development", className: "bg-cloud text-navy ring-teal/50" },
  planned: { label: "Planned", className: "bg-white text-navy ring-steel" },
  future: {
    label: "Future phase",
    className: "bg-transparent text-arsenic ring-0 outline-1 outline-dashed outline-space -outline-offset-1",
  },
  aspiration: { label: "Long-term ambition", className: "bg-transparent text-arsenic ring-steel" },
};

/** Honest status label used everywhere a capability's availability is described. */
export function StageBadge({ stage, label, dark = false }: { stage: Stage; label?: string; dark?: boolean }) {
  const s = stageStyles[stage];
  const darkCls = dark ? "!bg-white/10 !text-white !ring-white/25 [&>span]:!bg-white" : "";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.72rem] font-semibold tracking-wide ring-1 ring-inset ${s.className} ${darkCls}`}
    >
      <span
        aria-hidden
        className={`size-1.5 rounded-full ${
          stage === "pre-launch" ? "bg-navy" : stage === "in-development" ? "bg-teal" : "border border-current"
        }`}
      />
      {label ?? s.label}
    </span>
  );
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${dark ? "text-steel" : "text-arsenic"}`}>
      <span aria-hidden className="h-0.5 w-8 rounded-full bg-teal" />
      {children}
    </p>
  );
}

/**
 * Two-tone heading, the typographic device of the brand guidelines
 * ("Lockup / Logo."): a muted grey first line, then the statement in full colour.
 * Green is reserved for CTAs on the website (owner questionnaire), so it is not used here.
 */
export function SplitHeading({
  lead,
  rest,
  as: Tag = "h2",
  dark = false,
  size = "headline",
  className = "",
  id,
}: {
  lead: ReactNode;
  rest: ReactNode;
  as?: "h1" | "h2" | "h3";
  dark?: boolean;
  size?: "display" | "headline" | "title";
  className?: string;
  id?: string;
}) {
  const sizeCls =
    size === "display"
      ? "text-display font-bold"
      : size === "headline"
        ? "text-headline font-semibold"
        : "text-title font-medium";
  return (
    <Tag id={id} className={`${sizeCls} ${dark ? "text-white" : "text-navy"} ${className}`}>
      <span className={`block ${dark ? "text-steel" : "text-graphite"}`}>{lead}</span>
      <span className="block">{rest}</span>
    </Tag>
  );
}

export function SectionIntro({
  eyebrow,
  lead,
  rest,
  children,
  dark = false,
  align = "left",
  id,
  as = "h2",
}: {
  eyebrow?: string;
  lead: ReactNode;
  rest: ReactNode;
  children?: ReactNode;
  dark?: boolean;
  align?: "left" | "center";
  id?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={`reveal max-w-3xl ${align === "center" ? "mx-auto text-center [&_.eyebrow]:justify-center" : ""}`}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <SplitHeading
        as={as}
        size={as === "h1" ? "display" : "headline"}
        id={id}
        lead={lead}
        rest={rest}
        dark={dark}
        className="mt-5"
      />
      {children && <div className={`mt-6 text-lead ${dark ? "text-white/75" : "text-arsenic"}`}>{children}</div>}
    </div>
  );
}

export function Card({
  children,
  className = "",
  tone = "paper",
}: {
  children: ReactNode;
  className?: string;
  tone?: "paper" | "white" | "navy" | "teal";
}) {
  const tones = {
    paper: "bg-paper ring-1 ring-inset ring-steel/70",
    white: "bg-white ring-1 ring-inset ring-smoke",
    navy: "bg-navy text-white on-dark",
    teal: "bg-teal text-white on-dark",
  } as const;
  return <div className={`rounded-card ${tones[tone]} ${className}`}>{children}</div>;
}

export function Section({
  children,
  className = "",
  tone = "paper",
  id,
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  tone?: "paper" | "white" | "navy" | "cloud";
  id?: string;
  labelledBy?: string;
}) {
  const tones = {
    paper: "bg-paper",
    white: "bg-white",
    cloud: "bg-cloud",
    navy: "bg-navy text-white grain on-dark",
  } as const;
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${tones[tone]} py-20 md:py-28 ${className}`}>
      <div className="container-wahp">{children}</div>
    </section>
  );
}
