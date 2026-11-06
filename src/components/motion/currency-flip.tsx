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
          <button
            type="button"
            data-js-only
            aria-pressed={paused}
            aria-label="Pause the switch between cedis and US dollars"
            onClick={() => setPaused((p) => !p)}
            className="grid size-9 shrink-0 place-items-center rounded-full text-white/80 ring-1 ring-white/25 transition-colors ring-inset hover:bg-white/10 hover:text-white motion-reduce:hidden"
          >
            {paused ? <Play aria-hidden className="size-4" /> : <Pause aria-hidden className="size-4" />}
          </button>
        )}
      </div>
    </>
  );
}
