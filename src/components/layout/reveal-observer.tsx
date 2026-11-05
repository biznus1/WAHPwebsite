"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { afterPreloader } from "@/lib/preloader";

/** Adds `.is-visible` to `.reveal` elements as they enter the viewport, once the loading screen lifts. */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    const cancel = afterPreloader(() => els.forEach((el) => io.observe(el)));
    return () => {
      cancel();
      io.disconnect();
    };
  }, [pathname]);
  return null;
}
