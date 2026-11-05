"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import { PRELOADER_ID } from "@/lib/preloader";

/** How long the loading screen covers a newly opened page before it fades. */
const HOLD_MS = 450;

/**
 * Shows the loading screen briefly when moving to another page inside the site, as the older build did
 * between pages. It runs before the new page paints, so the page appears as the screen fades.
 */
export function RouteTransition() {
  const pathname = usePathname();
  const last = useRef(pathname);

  useLayoutEffect(() => {
    if (last.current === pathname) return;
    last.current = pathname;
    const el = document.getElementById(PRELOADER_ID);
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.dataset.state = "route";
    const timer = setTimeout(() => {
      el.dataset.state = "done";
    }, HOLD_MS);
    return () => {
      clearTimeout(timer);
      el.dataset.state = "done";
    };
  }, [pathname]);

  return null;
}
