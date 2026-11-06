"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/button";

/**
 * Phone only: a "Schedule a call" button pinned to the bottom of the screen, as on the older build's
 * The Problem page. It steps aside while the page's own call to action (`[data-sticky-stop]`) or the
 * footer is on screen, so it never covers them.
 */
export function StickyCallBar({ href, label }: { href: string; label: string }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const stops = Array.from(document.querySelectorAll("[data-sticky-stop], footer"));
    if (stops.length === 0 || !("IntersectionObserver" in window)) return;
    const onScreen = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) onScreen.add(e.target);
        else onScreen.delete(e.target);
      }
      setHidden(onScreen.size > 0);
    });
    stops.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div
      data-sticky-call
      aria-hidden={hidden || undefined}
      className={`fixed inset-x-0 bottom-0 z-30 bg-gradient-to-t from-navy from-55% to-navy/0 px-4 pt-10 pb-[max(1rem,env(safe-area-inset-bottom))] transition-[opacity,translate,visibility] duration-300 lg:hidden ${
        hidden ? "invisible translate-y-full opacity-0" : ""
      }`}
    >
      <ButtonLink href={href} size="lg" arrow className="w-full" tabIndex={hidden ? -1 : undefined}>
        {label}
      </ButtonLink>
    </div>
  );
}
