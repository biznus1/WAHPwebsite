/** id of the page loading screen rendered by `PagePreloader`. */
export const PRELOADER_ID = "wahp-preloader";

/**
 * Runs `fn` once the loading screen has started to lift, or straight away if there is none,
 * so entrance animations play where people can see them. Returns a cancel function.
 */
export function afterPreloader(fn: () => void): () => void {
  const el = document.getElementById(PRELOADER_ID);
  if (!el || el.dataset.state === "done") {
    fn();
    return () => {};
  }
  const mo = new MutationObserver(() => {
    if (el.dataset.state !== "done") return;
    mo.disconnect();
    fn();
  });
  mo.observe(el, { attributes: true, attributeFilter: ["data-state"] });
  return () => mo.disconnect();
}
