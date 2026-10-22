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

## 21 Oct 2026, Home page redesign and soft motion

- At the owner's request, Home follows the layout of wahp.viewyourprojecthere.com, with shorter copy:

  | # | Section | Content |
  | --- | --- | --- |
  | 1 | Hero | Eyebrow, headline, one-line intro, two buttons and the pre-launch badge, plus four groundwork figures from approved claims (20 LOIs, 60+ surveyed, 5-person team, 3 studies) |
  | 2 | Who we serve | Audience cards |
  | 3 | The infrastructure gap | Navy: one sentence, a photo, the sourced statistics |
  | 4 | The platform | Schematic and the four pillars with their stage badges |
  | 5 | The missing middle | Comparison table |
  | 6 | Closing call to action | |

  Wave dividers join the sections. The facts strip and the "Not a hospital" text were removed.
- Motion, all switched off under `prefers-reduced-motion`:
  - **Scroll reveals:** softer, with a longer expo-out ease. Images settle from a slight zoom.
  - **Hero entrance:** staggered; the headline moves but never fades, so LCP is unaffected. The figures count up and their underline bars draw in.
  - **Hero rings:** drift slowly.
  - **Hero scroll effect:** where scroll-driven animations are supported, the hero content softly recedes and the rings sink as you scroll.
  - **Header:** on Home it starts navy, blending into the hero, and softens to light on scroll.
- Lighthouse (Home, local production build): Performance 97, Accessibility 100, Best Practices 100. SEO is 69 because indexing is deliberately off. LCP is 2.2 s and CLS 0.
- The static preview replays the reveals, count-ups and header change with a small inline script.

## 21 Oct 2026, Home hero video

- The owner's clinic video (a doctor checking an older patient's blood pressure) now plays behind the Home hero under a deep-blue overlay. The overlay is near-solid behind the text and lets the footage show through towards the right. On mobile it is an even 80%.
- Encoding and loading: re-encoded silent at 30 fps (WebM 0.65 MB, MP4 1.1 MB) with a 24 KB poster frame. The footage loads only after page load and browser idle; it is skipped for reduced-motion and data-saver visitors. A "Pause video" control satisfies WCAG 2.2.2.
- The hero now sits under the header: the header is transparent at the top, frosted navy while scrolling through the hero, and light after it.
- Lighthouse (Home): Performance 95–97, Accessibility 100, Best Practices 100. Starting the video immediately had dropped Performance to 79; deferring it fixed this.

## 21 Oct 2026, Investors expansion map

- The Investors hero rings now sit on an animated map of West Africa (`ExpansionMap`):
  1. It opens zoomed in on southern Ghana, marks the Accra flagship and draws a line to Kumasi (future phase).
  2. It zooms out to the region as the 16 West African countries light up outward from Accra.
  3. The Accra, Ghana and West Africa rings settle in, and a soft ripple keeps pulsing from Accra.
- It plays once when it scrolls into view. Without JS, or with reduced motion, it shows the final state. Pure CSS, no new runtime dependencies.
- Map data is Natural Earth 1:50m (public domain) via world-atlas, projected and simplified to 16.5 KB by `scripts/gen-west-africa-map.mjs`. Kumasi was added to the claims register (`expansion-kumasi`) on the owner's instruction. `regional-rings.tsx` was removed.

## 21 Oct 2026, investors card image

- The Home investors card now uses the owner-supplied `investor-lounge` image, shown with the "Illustrative image" badge. It replaces `clinic-interior`, which was removed.

## 21 Oct 2026, animated patient journey

- The Patients page's patient-journey image is now a live SVG (`PatientJourney`):
  1. The route draws from Check-in to Follow-up, and each step pops in as the line reaches it.
  2. A dot then travels the route, pausing at each step.
- Lab and Imaging are dashed and tagged "Phase 2" and "Phase 3". Phones get a vertical step list, which is also the accessible version on all sizes.
- Without JS, or with reduced motion, the finished diagram shows. The static `patient-journey.webp` was removed.

## 21 Oct 2026, physicians split into two pages

- `/physicians` is now for physicians in Ghana: hero, what WAHP intends to provide, how it works, registration and FAQs, plus a navy pointer to the diaspora page.
- New `/diaspora-physicians` (`/diaspora` redirects to it):
  - Hero and the two paths (practise or help build).
  - Three steps.
  - Registration form with the diaspora interest pre-selected and an overseas location hint.
  - Its own FAQs, written honestly: no relocation required; Ghanaian registration stays the physician's responsibility; investment goes through the investor page.
- Its header and FAQs are editable in the site admin.
- Navigation, footer, sitemap and e2e routes include the new page.
- Home "Who we serve" cards follow the newer build's card style: accent top edge, WAHP mark on the photo, one line of copy, a divider and one call to action. Diaspora physicians get their own card, so there are five cards: three leading, two wide. Accents use brand teal and navy, since green stays reserved for buttons.

## 21 Oct 2026, owner-supplied photo adaptations

- Replaced `doctor-child-consultation`, `community-bp-screening` and `doctor-clinic-kinshasa` with the owner's AI-edited versions. Each is badged "Illustrative image" and credited "Adapted from a photo by …"; the Terms image credits note the edits. The `clinic-bp-check` replacement (Platform, Suites tab) is still awaited as a file.
- Later the same day, `clinic-bp-check` (Platform, Suites tab) and `nurse-child-ward` (Home patients card) were replaced the same way, with "Adapted from a photo by …" credits.
- `midwives-newborn` (Patients FAQ column) was then replaced with the owner's edited version too, credited "Adapted from a U.S. Army photo, public domain".

## 21 Oct 2026, Leadership in the main menu

- Leadership is now a primary navigation item after About, on desktop and in the mobile menu, where it replaces the small secondary link. Nav padding tightens below 1280px, so all seven items fit from 1024px with no overflow.

## 21 Oct 2026, copy rewrite in WAHP's own voice

- At the owner's request, every visible string was rewritten to sound specific to WAHP and less generic, with no em dashes, en dashes or hyphens. The rewrite covers pages, editable JSON, FAQs, team bios, form labels and messages, alt text, SVG labels, metadata, legal pages and the preview bar.
- The copy names concrete things: the Accra hub, consulting rooms by the hour, day or month, one front desk, schedule and records, the lab down the corridor in Phase 2, and the taxi between facilities that patients take today.
- Stage meaning, the 112 emergency wording and the securities notice are kept. Stage badges now read "Not yet open" and "Long term ambition".
- The only hyphens left in visible text are in the licence name "CC BY-SA". A page crawl of all routes at desktop and mobile, covering body text, alt text, ARIA labels, SVG text, options and titles, is clean.
- Home headline: "Healthcare infrastructure for West Africa's doctors, starting in Accra." It is editable in the admin.
- The Home physicians card now uses the owner-supplied `physician-teal-scrubs` image; `doctor-child-consultation` and its credit were removed.

## 21 Oct 2026, no on-photo credits; new diaspora card photo

- At the owner's request, the small credit labels were removed from every photo. Attribution for the CC BY-SA photos (required by that licence) stays in the Terms page image credits.
- The Home diaspora card now uses the owner-supplied `diaspora-doctor.webp`. Its licence needs confirming: the image is the size of an iStock/Getty preview.

## 21 Oct 2026, hub lobby video band on Home

- New full-width band between "The platform" and "The missing middle". The owner's lobby video plays untinted (no navy overlay, per the owner), and the text sits on its own white card. The band is labelled "Concept rendering of the planned hub" and has a pause control.
- On phones the video gets its own space above the card. On larger screens it fills the band behind the card.
- `HeroVideo` became the reusable `LoopVideo`. `start="idle"` (hero) waits for page load. `start="visible"` (lobby) plays only while on screen and pauses when scrolled away, without restarting after the visitor pauses it. Both respect reduced motion and data saver.
- Lighthouse on Home: Performance 94 and 98 across two runs, Accessibility 100, Best Practices 100. Only the lobby's 46 KB poster loads up front.

## 22 Oct 2026, hero stat cards animate on view

- The four groundwork cards now animate when they scroll into view, not on page load. On phones they sit below the fold, so the old entrance played unseen.
- The cards rise in a stagger, the numbers count up from zero, the teal underline draws in and one soft light sweep crosses each card. The preview script now starts the count up on view too.
- The hero content's scroll fade (`scroll-recede`) now runs only from 768px up. On phones it made the buttons look washed out.
- With reduced motion the cards show their final state.

## 22 Oct 2026, lobby video autoplays in the preview

- The static preview script only started the hero video, so the lobby band showed its poster. It now starts every background video: the hero at once, the others when scrolled into view. Each keeps its own pause control.
- `LoopVideo` also sets the `muted` attribute itself before playing, because some mobile browsers only allow autoplay when that attribute is present.

## 22 Oct 2026, new Physicians page photo

- The proposition section on `/physicians` now uses the owner-supplied `physician-stethoscope-green.webp`, framed from the top so the face and stethoscope stay in view. The old `doctor-clinic-kinshasa` photo and its Terms credit were removed. Licence to confirm (see `ASSET_INVENTORY.md`).
- The Home "infrastructure gap" photo was replaced with the owner-supplied `doctors-meeting.webp`. `village-hospital-yard` and its Terms credit were removed. Licence to confirm: it looks like a news agency photo.
