import type { ReactNode } from "react";

/**
 * One amount that switches back and forth between two values, e.g. US dollars and Ghana cedis, using the CSS
 * `.currency-flip` animation in globals.css (so the script-free preview runs it too). Both values share one grid
 * cell, so the text around it never moves; `align="end"` right-aligns them, for figures in a column.
 * Screen readers get `label` once; the moving copies are hidden from them. A server component: put it inside a
 * `CurrencyFlipGroup` for a pause toggle.
 */
export function Flip({
  first,
  second,
  label,
  secondClassName = "",
  align = "start",
}: {
  first: ReactNode;
  second: ReactNode;
  label: string;
  secondClassName?: string;
  align?: "start" | "end";
}) {
  return (
    <>
      <span className="sr-only">{label}</span>
      <span aria-hidden className={`currency-flip ${align === "end" ? "justify-items-end" : ""}`}>
        <span className="currency-first">{first}</span>
        <span className={`currency-second ${secondClassName}`}>{second}</span>
      </span>
    </>
  );
}
