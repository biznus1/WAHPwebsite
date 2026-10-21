# QA report (updated 21 Oct 2026, production build)

## Automated checks

| Check | Result |
| --- | --- |
| `npm run lint` (ESLint, next/core-web-vitals + TS) | ✅ 0 errors, 0 warnings |
| `npm run typecheck` (strict) | ✅ |
| `npm test` (Vitest) | ✅ 14/14: validation, markup stripping, consent, physician rules, investor acknowledgement, honeypot/time-trap, rate limiter, claims guardrails |
| `npm run test:e2e` (Playwright, desktop + mobile Chromium) | ✅ 37 passed, 3 skipped (viewport-specific). Covers every route returning 200 with one `<h1>`, title, description, no console errors and no horizontal overflow; no unsupported claims or `href="#"`; image alt text; legacy redirects; skip link; mobile menu (open, Esc, focus return, navigate); active nav state; keyboard-operable platform tabs; form validation; `?type=` deep link; **"not sent" state without an integration** |
| `next build` | ✅ All pages static, except the OG image |

## Lighthouse (mobile preset, local production server, Lighthouse 12.8)

| Page | Perf | A11y | Best practices | SEO* | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Home | 91 | 100 | 100 | 69 | 2.2 s | 0 | 340 ms |
| Platform | 94 | 100 | 100 | 69 | 3.0 s | 0 | 120 ms |
| Physicians | 99 | 100 | 100 | 69 | 2.1 s | 0 | 60 ms |
| Investors | 99 | 100 | 100 | 66 | 2.0 s | 0 | 50 ms |
| Patients | 99 | 100 | 100 | 69 | 2.1 s | 0 | 60 ms |
| About | 99 | 100 | 100 | 69 | 2.0 s | 0 | 90 ms |
| Leadership | 99 | 100 | 100 | 69 | 2.0 s | 0 | 60 ms |
| Contact | 97 | 100 | 100 | 66 | 2.5 s | 0 | 110 ms |

\* SEO is below target **only because indexing is intentionally disabled** (`noindex` + `robots.txt` disallow) until launch approval. With `NEXT_PUBLIC_ALLOW_INDEXING=true` the failing audit (`is-crawlable`) clears.
Home, About, Investors and Leadership were re-measured on 21 Oct after the content update; the other rows are from 20 Oct. Home blocking time varies between runs (50–340 ms).
Platform LCP (3.0 s under simulated mobile throttling) is the one page above the 2.5 s target. Its LCP element is the hero paragraph, and the client JS for the interactive diagram adds blocking time. A candidate optimisation is deferring the diagram's hydration.

## Accessibility notes (WCAG 2.2 AA baseline)

- Skip link, landmarks, one `h1` per page, logical heading order, labelled navs.
- Mobile menu: `role="dialog"`, `aria-modal`, focus trap, Esc to close, focus returned to the toggle, body scroll locked.
- Platform diagram: ARIA tabs with arrow/Home/End keys; the SVG is decorative (`aria-hidden`) and all content is in the tab panel.
- Forms: visible labels, `aria-invalid` + `aria-describedby` errors, focus moved to the status message, error text not shown by colour alone.
- `prefers-reduced-motion` disables reveal animations, the schematic flow and the ping.
- **Known gaps:** not yet tested with a real screen reader (NVDA/VoiceOver); Firefox and WebKit not tested (only Chromium is installed in this environment).

## Visual QA

Desktop (1440px) and mobile (390px) full-page screenshots of every core page are in `docs/screenshots/`. Fixes made after review:
- The mobile comparison table became stacked cards.
- The contact headline was shortened.
- The hero watermark was repositioned.
- **Mobile menu bug:** the header's `backdrop-filter` collapsed the fixed menu panel. The panel now renders outside the header.
