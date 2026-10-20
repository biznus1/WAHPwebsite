# Design research

## 1. Existing WAHP sites

Both `westahp.com` and `wahp.kwasimd.chatgpt.site` were **unreachable** from the build environment (see `SOURCE_ACCESS.md`). No audit was invented. What we know comes from:

- **The owner brief.** Themes on the live homepage: "Stop Managing. Start Practicing.", "Built By Doctors. Better for Patients.", "Everything under one roof", a traditional-vs-WAHP comparison, Healthcare Professional / Investor pathways, an explicit pre-launch explanation, and the stats "95% Lower Overhead", "24/7 Access" and "1 Team / Multiple Practices".
- **Owner Drive documents.** The Master Brief (Feb 2026) with CEO edits to the current site, and the homepage and contact blueprints (Mar–Apr 2026).

`WAHP_DESIGN_COMPARISON.md` records how each theme was treated.

## 2. Mobbin patterns

Full notes are in `research/MOBBIN_NOTES.md`. Principles applied:

| Pattern | Principle | Where applied |
| --- | --- | --- |
| Editorial hero (Ease, Amigo, Titan) | Two-line headline, one primary CTA, media beside the text, trust strip straight after | Home hero + fact strip |
| Audience pathways (Ploy, Maze, Customer.io) | Same structure per audience, each with its own CTA verb | `AudiencePaths` (home), deep links to `/contact?type=` |
| Phased roadmap (Wild, Wise, Humble) | Eyebrow + title + short copy + **status chip**; horizontal on desktop, vertical on mobile | `Roadmap` |
| Segmented enquiry (Lightship, Savor) | Ask intent first with large segmented choices; conditional fields; consent by submit | `EnquiryForm` |
| How-it-works diagram (Cloudflare, Lyssna) | Show the mechanism with few labelled nodes; the active step drives the visual | `PlatformSystem` (keyboard tabs + diagram) |
| FAQ (Origin, monday.com) | Title left, hairline accordion right, first item open | `Faq` (native `<details>`) |
| Institutional footer (Complex Law, Corgi) | Legitimacy in the footer: entity, policies, disclaimer | Footer pre-launch / not-an-offer notice |
| Mobile nav (ZARA, Monte) | Primary CTA stays visible; large overlay links; Esc closes; focus trapped | `SiteHeader` |

## 3. Supplementary references

lina.co, aruwacapital.com and suitesbynylo.com were blocked by the network policy and not studied. The owner's UI-polish doc lists them as the desired quality bar: calm, premium, editorial, generous whitespace. That informed spacing and restraint, not layouts.
