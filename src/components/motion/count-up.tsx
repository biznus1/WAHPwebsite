"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Splits a figure into the number that animates and the text around it, keeping its decimals and thousands
 * separators: "60+" → 60 + "+", "1.43" → 1.43, "71.8%" → 71.8 + "%", "1:5,707" → "1:" + 5,707, "11,867" → 11,867.
 */
export function parseFigure(value: string) {
  const m = value.match(/^(.*?)(\d[\d,]*(?:\.\d+)?)(\D*)$/);
  if (!m) return null;
  const [, prefix, digits, suffix] = m;
  return {
    prefix,
    suffix,
    target: Number(digits.replace(/,/g, "")),
    decimals: digits.includes(".") ? digits.split(".")[1].length : 0,
    grouping: digits.includes(","),
  };
}

type Figure = NonNullable<ReturnType<typeof parseFigure>>;

export function formatFigure(f: Figure, n: number) {
  const num = n.toLocaleString("en-US", {
    minimumFractionDigits: f.decimals,
    maximumFractionDigits: f.decimals,
    useGrouping: f.grouping,
  });
  return `${f.prefix}${num}${f.suffix}`;
}

/**
 * Counts a figure up softly when it first scrolls into view, e.g. "60+" from 0 to 60 or "71.8%" from 0.0%.
 * The final value is server-rendered (no-JS, SEO) and announced to screen readers; only the visual digits animate.
 */
export function CountUp({ value, duration = 1800, delay = 0 }: { value: string; duration?: number; delay?: number }) {
  const [shown, setShown] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const figure = parseFigure(value);
    if (!el || !figure) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    let frame = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 4);
        setShown(t < 1 ? formatFigure(figure, figure.target * eased) : value);
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setShown(formatFigure(figure, 0));
        timer = setTimeout(run, delay);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      if (timer) clearTimeout(timer);
    };
  }, [value, duration, delay]);

  return (
    <span ref={ref}>
      <span aria-hidden data-countup={value} className="tabular-nums">
        {shown}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
