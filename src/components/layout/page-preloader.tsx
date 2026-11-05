import { LogoMark } from "@/components/brand/logo";
import { PRELOADER_ID } from "@/lib/preloader";
import { RouteTransition } from "./route-transition";

/**
 * Lifts the loading screen once the page has loaded, after at least 700ms so it never just flickers.
 * Inline so it does not wait for the app's script. After 3s it lifts regardless (CSS does the same
 * if no script runs). Without script the screen is never shown at all (see `.js .preloader`).
 */
const lift = `(function(){var el=document.getElementById("${PRELOADER_ID}");if(!el)return;function done(){el.setAttribute("data-state","done")}function hide(){setTimeout(done,Math.max(0,700-performance.now()))}if(document.readyState==="complete")hide();else addEventListener("load",hide,{once:true});setTimeout(done,3000)})();`;

/**
 * Page loading screen, after the older build's: the WAHP emblem in a turning ring on brand navy.
 * Decorative only (hidden from assistive tech) and never blocks clicks.
 */
export function PagePreloader() {
  return (
    <>
      <div id={PRELOADER_ID} data-state="loading" aria-hidden className="preloader" suppressHydrationWarning>
        <div className="preloader-content">
          <div className="relative size-28">
            <svg viewBox="0 0 120 120" className="preloader-ring absolute inset-0 size-full" fill="none">
              <circle cx="60" cy="60" r="56" stroke="currentColor" strokeOpacity="0.14" strokeWidth="3" />
              <circle
                cx="60"
                cy="60"
                r="56"
                pathLength={100}
                className="preloader-arc"
                stroke="#8BC900"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <LogoMark className="preloader-mark absolute inset-0 m-auto size-14" />
          </div>
          <p className="mt-7 text-xs font-semibold tracking-[0.32em] text-white/75 uppercase">
            West African Health Partners
          </p>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: lift }} />
      <RouteTransition />
    </>
  );
}
