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

## 21 Oct 2026, photos from the source sites

- Collected every image from wahp.viewyourprojecthere.com and westahp.com (`scripts/collect-images.mjs`). Selected 17 photos and diagrams into `public/images/photos/` (WebP, ≤1600px).
- `SiteImage` replaces `ConceptImage`. Concept renders are badged and captioned, source-site photos carry an "Illustrative image" badge, and the founders photo is unbadged.
- Placement:

  | Page | Images |
  | --- | --- |
  | Home | Audience cards (4 photos), challenge (hospital corridor) |
  | Platform | One photo per pillar tab, plus all three concept renders under "The spaces" |
  | Physicians | Proposition, diaspora |
  | Investors | Banner above the introduction form |
  | Patients | Hero portrait, patient-journey diagram, family consultation |
  | About | Founders photo beside the founder's letter |
  | Contact | Clinic interior |

- Excluded, with reasons, in `ASSET_INVENTORY.md`: hospital logos, an image with fake investment figures, duplicates, map tiles and masked/PPE imagery.

## 21 Oct 2026, stock photos of African health workers

- Per owner instruction, replaced the source-site photos of doctors with licensed stock photos of African doctors, nurses and midwives working in clinics and communities. Sources: Wikimedia Commons (CC BY-SA 2.0/4.0, public domain) and Pexels (Pexels licence).
- New `stock` image kind in `SiteImage`: no "Illustrative" badge, a small on-image credit, and full credits at `/terms#image-credits`. People shown are not WAHP staff or patients.
- Placement:

  | Page | Photo |
  | --- | --- |
  | Home | Audience cards (doctor with a young girl, community BP screening, nurse with a child on a ward), challenge (rural hospital yard) |
  | Platform | Suites tab (clinic BP check), digital tab (physician at a laptop) |
  | Physicians | Proposition (doctor in scrubs), diaspora (doctor in a lab coat) |
  | Investors | Banner (community health outreach) |
  | Patients | FAQ column (midwives with a newborn) |

- Kept: the laboratory and MRI pillar images, the patient portrait, the clinic interior and the founders photo. Removed the Contact page image and 11 superseded photo files.
- Still to confirm: three Pexels photographer names (credited as "Pexels" for now); see `ASSET_INVENTORY.md`.

## 21 Oct 2026, owner-supplied Unsplash photos

- Added two photos the owner linked from westahp.com (both Unsplash, Unsplash licence):
  - `doctor-stethoscope`: a doctor putting on her stethoscope. It replaces the Kinshasa lab-coat photo in the Physicians diaspora section.
  - `patient-portrait`: the Patients hero portrait, re-encoded from the 2500px original. Reclassified from "illustrative" to "stock", so it now shows a credit instead of the badge.
- Both are listed on `/terms#image-credits`. Photographer names are still to confirm, because unsplash.com blocks automated lookups.

## 21 Oct 2026, site admin

- Added a site admin built on Keystatic (`keystatic.config.ts`, `/keystatic`), linked discreetly as "Admin" in the footer. `/admin` redirects to it.
- Editable now: the page headers on eight pages, the leadership team (including photo uploads) and the Physicians and Patients FAQs. The content moved to `src/content/data/*.json`; `src/content/editable.ts` validates it at build time, allowing https-only LinkedIn links and team-folder photo paths only.
- Public pages moved into the `(site)` route group, so the admin renders without the site header and footer. The 404 page renders the chrome itself.
- Security: Keystatic's local mode has no login, so outside `next dev` the admin page and API are off unless GitHub mode is configured. The e2e tests check that the API returns 404. The admin has its own CSP and is `noindex`.
- Team photos now live in `public/images/team/members/<slug>/photo.webp`, the layout Keystatic writes, so the first admin save doesn't rename them all.
- Setup for the live site: `docs/ADMIN.md`.
