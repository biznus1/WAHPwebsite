import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { RevealObserver } from "./reveal-observer";

/** Skip link, header, main landmark and footer shared by every public page (not the site admin). */
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-navy px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
      <RevealObserver />
    </>
  );
}
