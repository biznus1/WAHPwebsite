# Implementation log

## 20 Oct 2026, initial build

1. **Repository.** It was empty, with no commits, on branch `ccr-3f23f1ac-xtw4sr`. Scaffolded Next.js 16.4 (App Router, TypeScript strict, Tailwind v4).
2. **Brand.** Read all 24 pages of Brand Guidelines v1.0 and extracted the tokens. Installed the official logo SVGs from Drive (an earlier PDF-vector extraction was replaced by the Drive originals). Applied the owner's website directives: green for CTAs only, the specified type scale, and the logo rules.
3. **Research.** The live site and alternate site were blocked by the network policy (documented). Drive was read read-only. Mobbin: 8 patterns.
4. **Pages.** Home, Platform, Physicians (with a diaspora section), Investors, Patients, About, Leadership, Contact, Privacy, Terms, plus a 404 page.
5. **Graphics.** Clinical floor schematic (hero), interactive platform system, phased roadmap, Accra→region rings, qualitative comparison, physician journey.
6. **Functionality.** Server-action enquiry form with Zod validation, markup stripping, honeypot, time-trap, IP rate limit, Resend/webhook delivery and an honest "not sent" state; `?type=` deep links; sitemap, robots, Open Graph image, JSON-LD organisation, legacy redirects, security headers (CSP, HSTS, frame-ancestors none).
7. **QA.** Lint, typecheck, unit and e2e tests, Lighthouse and the screenshot matrix (see `QA_REPORT.md`).

## Design decisions

- **Static by default.** Every page is prerendered, so the client-side JS is only the header, reveal observer, platform tabs and forms.
- **Claims register as a gate.** Copy that depends on facts is read through `approvedClaim()`, so unapproved facts cannot render by accident.
- **No fake success.** The form reports delivery truthfully. Bots get a neutral response and nothing is delivered.

## 21 Oct 2026, site review and founders

- Network access opened. Crawled westahp.com and wahp.viewyourprojecthere.com; the ChatGPT concept site needs a sign-in. Audit: `research/SITE_AUDIT.md`.
- Leadership: five core members, copied from the newer build per owner instruction, with photos, bios and focus tags. Added a home-page teaser.
- Content from the newer build:
  - About: mission, vision, values and founder's letter.
  - Platform: four-pillar structure and the integration story.
  - Diaspora: practise/partner paths.
  - Investors: revenue streams, differentiation, groundwork stats, and the 506(c) notice with an acknowledgement checkbox.
  - Home: cited workforce stats.
  - Contact: vendor & industry enquiry type.
  - Footer: LinkedIn and YouTube links.
- Not carried over: present-tense imaging and lab claims, the "first integrated platform" claim, the 20-LOI count, market-size estimates, placeholder advisors, and typos.

## 21 Oct 2026, shorter home page and less repetition

- Home reduced from nine sections to five: hero and fact strip, what WAHP is (with a one-line view of the four pillars), the challenge with sourced statistics, the comparison, and audience pathways. Desktop length went from about 9,400px to 4,600px.
- Each topic now has one home:

  | Topic | Page |
  | --- | --- |
  | Roadmap | `/platform#phases` (removed from Home, Investors, About) |
  | Investor thesis and regional rings | `/investors` |
  | Team grid | `/leadership` |
  | Lobby render | `/patients` |

- Platform: removed the "In detail" list, which repeated the interactive tabs, and the availability notice, which repeated the stage labels and footer.
