"use client";

import { useState, useSyncExternalStore, type ReactNode } from "react";
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

/**
 * Several `.currency-flip` figures that move together under one pause toggle, with a note beside it (e.g. the
 * exchange rate). The children are the figures; they can be server rendered.
 */
export function CurrencyFlipGroup({ note, children }: { note: ReactNode; children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  const hydrated = useHydrated();
  return (
    <div data-flip-paused={paused ? "" : undefined}>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-arsenic">{note}</p>
        {hydrated && (
          <PauseToggle
            paused={paused}
            onToggle={() => setPaused((p) => !p)}
            label="Pause the switch between US dollars and cedis"
            tone="light"
          />
        )}
      </div>
      {children}
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
