"use client";

import { createContext, use, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";

const noop = () => () => {};
const useHydrated = () =>
  useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );

/** The pause toggle for the currency animation (WCAG 2.2.2), on navy or on a light background. */
function PauseToggle({
  paused,
  onToggle,
  label,
  tone,
}: {
  paused: boolean;
  onToggle: () => void;
  label: string;
  tone: "dark" | "light";
}) {
  const colours =
    tone === "dark"
      ? "text-white/80 ring-white/25 hover:bg-white/10 hover:text-white"
      : "text-navy ring-steel hover:bg-cloud";
  return (
    <button
      type="button"
      data-js-only
      aria-pressed={paused}
      aria-label={label}
      onClick={onToggle}
      className={`grid size-9 shrink-0 place-items-center rounded-full ring-1 transition-colors ring-inset motion-reduce:hidden ${colours}`}
    >
      {paused ? <Play aria-hidden className="size-4" /> : <Pause aria-hidden className="size-4" />}
    </button>
  );
}

const FlipGroupContext = createContext<{ paused: boolean; toggle: () => void } | null>(null);

/**
 * Wraps every `.currency-flip` figure of a section so they move in step under one pause toggle
 * (`CurrencyFlipNote`). The children can be server rendered. Inside a group the figures do not wait for their own
 * scroll reveal (see `[data-flip-group]` in globals.css), so figures revealed at different moments stay in phase.
 */
export function CurrencyFlipGroup({ children, className = "" }: { children: ReactNode; className?: string }) {
  const [paused, setPaused] = useState(false);
  const value = useMemo(() => ({ paused, toggle: () => setPaused((p) => !p) }), [paused]);
  return (
    <FlipGroupContext value={value}>
      <div className={className} data-flip-group data-flip-paused={paused ? "" : undefined}>
        {children}
      </div>
    </FlipGroupContext>
  );
}

/** A note for a `CurrencyFlipGroup` (e.g. the exchange rate) with the group's pause toggle beside it. */
export function CurrencyFlipNote({ children, className = "" }: { children: ReactNode; className?: string }) {
  const group = use(FlipGroupContext);
  const hydrated = useHydrated();
  return (
    <div className={`flex items-center justify-between gap-4 ${className}`}>
      <p className="text-sm text-arsenic">{children}</p>
      {hydrated && group && (
        <PauseToggle
          paused={group.paused}
          onToggle={group.toggle}
          label="Pause the switch between US dollars and cedis"
          tone="light"
        />
      )}
    </div>
  );
}

/**
 * A figure that switches back and forth between two values, e.g. pay in cedis (green) and in US dollars (red).
 * The motion is the CSS `.currency-flip` animation in globals.css, so it also runs in the script-free preview.
 * Screen readers get `label`, which states both values once; the moving copies are hidden from them. A pause
 * toggle beside the caption meets WCAG 2.2.2 (it appears once React has hydrated, and not for reduced motion,
 * where the first value simply stays).
 */
export function CurrencyFlip({
  first,
  second,
  label,
  caption,
  figureClassName = "",
  secondClassName = "",
  captionClassName = "",
}: {
  first: ReactNode;
  second: ReactNode;
  label: string;
  caption: ReactNode;
  figureClassName?: string;
  secondClassName?: string;
  captionClassName?: string;
}) {
  const [paused, setPaused] = useState(false);
  const hydrated = useHydrated();
  return (
    <>
      <p className={figureClassName}>
        <span className="sr-only">{label}</span>
        <span aria-hidden className="currency-flip" data-paused={paused ? "" : undefined}>
          <span className="currency-first">{first}</span>
          <span className={`currency-second ${secondClassName}`}>{second}</span>
        </span>
      </p>
      <div className="mt-3 flex items-center justify-between gap-4">
        <p className={captionClassName}>{caption}</p>
        {hydrated && (
          <PauseToggle
            paused={paused}
            onToggle={() => setPaused((p) => !p)}
            label="Pause the switch between cedis and US dollars"
            tone="dark"
          />
        )}
      </div>
    </>
  );
}
