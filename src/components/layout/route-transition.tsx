"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";
import { PRELOADER_ID } from "@/lib/preloader";

/** How long the loading screen stays over a newly opened page before it fades. */
const HOLD_MS = 350;
/** If a tapped link never leads anywhere, the screen lifts after this long anyway. */
const GIVE_UP_MS = 6000;

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** True for a plain left click on a link to another page of this site. */
function isPageLink(e: MouseEvent): boolean {
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return false;
  const a = e.target instanceof Element ? e.target.closest("a[href]") : null;
  if (!(a instanceof HTMLAnchorElement) || a.hasAttribute("download")) return false;
  if (a.target && a.target !== "_self") return false;
  const url = new URL(a.href, window.location.href);
  if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return false;
  return !url.pathname.startsWith("/keystatic") && !url.pathname.startsWith("/api");
}

/**
 * The loading screen between pages, as the older build had: it fades in as soon as a link to another
 * page is tapped, stays while that page loads, and lifts shortly after it appears. Back and forward
 * show it too. Changes within a page (a tab, a booking option, `#schedule`) do not.
 */
export function RouteTransition() {
  const pathname = usePathname();
  const last = useRef(pathname);
  const giveUp = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = document.getElementById(PRELOADER_ID);
      if (!el || reducedMotion() || !isPageLink(e)) return;
      el.dataset.state = "leaving";
      clearTimeout(giveUp.current);
      giveUp.current = setTimeout(() => {
        el.dataset.state = "done";
      }, GIVE_UP_MS);
    };
    // Capture phase, so this runs before the link's own handler starts the navigation.
    window.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("click", onClick, true);
      clearTimeout(giveUp.current);
    };
  }, []);

  // Runs before the new page paints, so it never shows uncovered for a frame.
  useLayoutEffect(() => {
    if (last.current === pathname) return;
    last.current = pathname;
    const el = document.getElementById(PRELOADER_ID);
    if (!el || reducedMotion()) return;
    clearTimeout(giveUp.current);
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
