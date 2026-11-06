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
- The Investors banner above the introduction form now uses the owner-supplied `team-laptop-celebration.webp`. `community-outreach` and its Terms credit were removed. Licence to confirm.

## 5 Nov 2026, the best of the older WordPress build

A WordPress export of wahp.viewyourprojecthere.com arrived by WeTransfer (dated 2 Nov 2026), and the owner asked for one site that takes the best of both. A side by side review found the new build stronger on layout, type and phones, and the older build stronger on energy and interaction. These parts were brought over; its copy, claims and stock imagery were not.

- **Highlighted statements on navy.** Every two tone heading on navy now sets the first line in white and the statement line in light teal (`teal-300`, 7.4:1 on navy), as the Home hero already did. The older build used green words; green stays reserved for CTAs.
- **Three way comparison.** "Where WAHP fits" now compares a big hospital, WAHP and going it alone, with WAHP in the middle column, matching its heading. The intro is the approved line "Hospitals have infrastructure but no autonomy…". On phones a three way switch (radio buttons, no script, so it also works in the static preview) shows one option at a time, after the older build's Hospital / WAHP / Private Clinic toggle. The hospital column is new qualitative copy for the owner to check.
- **Audience doors at the end of Home.** The inset "Let's talk" card is replaced by a full width band over the hero footage (navy overlay, pause control) with three cards: physician in Ghana, diaspora physician, investor. Each goes straight to the matching enquiry type, with a link to its audience page. Partners and press get a line below.
- **More of the hero footage.** The hero overlay is lighter on the right so the video carries the hero, as it did on the older build. It stays dense behind the text.
- **Sharper headshots.** The five team photos were re-encoded from the original uploads in the export (same framing, quality 90). Nakeitheya Smith's is now 1080px.
- **Not brought over:** the green headline words (owner rule), the hospital logo strip (implies affiliations), the crowded corridor photo (removed earlier at the owner's request), market size figures and the advisory board placeholders.
- **Security note.** The export and the live WordPress site contain injected malware. Only the five headshots were taken from the export, and they were decoded and re-encoded rather than copied.

## 5 Nov 2026, "The infrastructure gap" on About; new Partners card photo

- **About page:** the older build's "The infrastructure gap" section is back as a navy band between "Our mission" and the founder's letter (owner request: anywhere but Home). Headline with highlighted words ("talent", "infrastructure", "transformation", in light teal), the hospital corridor image, and a card with the doctor at the window, "71.8% intend to work abroad" and an animated bar. It uses the sourced 71.8% (claim `stat-migration-intent`; the stat parts hide if that claim is withdrawn), not the older "72%", and leaves out the unsourced "WHO Target 15%" bar and "accelerated since 2018" line. Component: `components/sections/infrastructure-gap.tsx`.
- **Home Partners card:** now uses the older build's "Capital Partners" picture (owner request), still titled "Partners". The amounts, percentages and dates on the pictured screen are blurred so they cannot be read as WAHP's investment figures. `community-bp-screening` and its Terms credit were removed.
- Both new images and the corridor image appear AI-generated and carry the "Illustrative image" badge; usage rights to confirm (see `ASSET_INVENTORY.md`).

## 5 Nov 2026, no badges on images

- At the owner's request, the "Illustrative image" and "Concept rendering" badges are gone from every image, along with the "Concept rendering of the planned hub" label on the Home lobby video.
- What still tells visitors these are not real WAHP people or a finished building: the captions under the four concept renders ("…The building does not exist yet…"), the lobby card ("This is a concept of the reception we are planning"), and a new sentence on `/terms#images`: other photos are illustrative, and unless a person is named, the people and places shown are not WAHP staff, patients or facilities.

## 5 Nov 2026, no video buttons; no concept captions

- At the owner's request, the "Pause video" / "Play video" button is gone from all three background videos (Home hero, lobby band, closing audience band). `LoopVideo` keeps its playback rules: the hero starts after load and idle, the other two play only while in view, and nothing plays for reduced motion or data saver. Note: WCAG 2.2.2 asks for a way to pause moving content that runs longer than five seconds; the reduced motion setting is now the only way to stop it.
- The captions under the four concept renders (three on `/platform`, one on `/physicians`) are removed, so no photo carries "Concept rendering" text. Their alt text still says so for screen readers, and `/terms#images` now reads: "Images of the inside of the Accra hub, and the lobby video on the home page, are concept renderings of planned environments."
- The floor schematic diagram on Home keeps its caption ("A sketch of the plan, not a building that exists yet"), as it is a diagram rather than a photo.

## 5 Nov 2026, animated workforce figures; "large hospital"

- The four workforce figures on Home (1.43, 1:5,707, 71.8%, 11,867) now count up when they scroll into view, in a stagger, in light teal on navy, each with a teal bar that draws in underneath. Sources are in Steel. With reduced motion they show their final values.
- `CountUp` now handles decimals, ratios and thousands separators (`parseFigure` / `formatFigure`, unit tested), so "1:5,707" counts as 1:0 → 1:5,707 and "71.8%" as 0.0% → 71.8%.
- Fixed the static preview's count up: its pattern sat in a template literal, which dropped the backslashes, so the preview never animated any figure. The new code uses no backslashes.
- The Home comparison says "large hospital" instead of "big hospital" (heading, phone switch, column title), at the owner's request.

## 5 Nov 2026, new Platform diagram and Home floor plan, both animated

Both redrawn as inline SVG after the owner's mockups, so they stay sharp, keep their meaning and can animate. Styles are in `globals.css` (`.sys-*` and `.floor-*`); nothing is hidden without JS, and nothing moves for reduced motion.

- **Platform diagram** (`components/graphics/platform-system.tsx`): larger parts with icons (stethoscope, flask, laptop, scanner; lucide paths, ISC), a doctor and patient at the centre, a glowing centre ring, a dotted orbit and a soft teal background. Unchanged: connector style shows the stage (navy in development, teal planned, dashed a later phase) and clicking a part selects its tab. Animation: when the card scrolls into view the centre pops in, connectors draw outward and the parts pop in one by one; then the orbit turns slowly, the centre glow breathes, dots flow along the live connectors into the centre, and the dashed future part marches.
- **Home floor plan** (`components/graphics/clinical-floor-schematic.tsx`): glowing tiles on a navy grid, and each of the six suites is a small illustrated exam room, furnished a little differently (couch, cabinet, monitor, curtain, window, desk, plant, lamp, stool). Reception and records have icons, the planned lab has a test tube rack and the future imaging tile a scanner. Animation: the core pops, the rooms pop in one by one, the links fade in and flow to the core, the lab tubes fill and bob, the service pills slide up, the core glows and the imaging tile's dashed border marches.
- Green appears in small accents in both diagrams because the owner's mockups use it; see `BRAND_IMPLEMENTATION.md`.
- Static preview: the diagram's parts now select their tabs, and tab states are captured already revealed.

## 5 Nov 2026, more of the hero video

- At the owner's request the Home hero shows more of its footage. The navy overlay is lighter: 66% on phones (was 75%), and on desktop it fades from 82% behind the text to 12% on the right (was 93% to 32%). The dark band at the bottom is shorter, and the four stat cards have darker glass so they stay readable.
- The headline and intro have a soft navy shadow. On phones the intro is full white and the statement line uses a paler teal (`teal-200`), because the footage sits behind all the text there.
- Contrast was measured on the footage itself, with the text hidden and shadows off, at six points in the loop (95th percentile of background brightness). Worst case: phones, headline 4.7:1, teal line 3.2:1, intro 4.6:1; desktop, 7.0:1, 3.9:1 and 7.9:1. All meet WCAG AA (3:1 for large text, 4.5:1 for body text).

## 5 Nov 2026, phone hero shows the whole scene; header fits small phones

- The owner meant the crop, not the overlay. On phones the hero video used to fill the whole tall hero, which zoomed it to about 15% of the frame's width. It now has its own 17rem band under the header that shows about 80% of the frame (both people), lightly tinted, fading into navy where the eyebrow starts. The headline and intro sit on the original deep navy again.
- This replaces the phone part of the previous entry: the 66% overlay, the white intro and the `teal-200` token are gone. The desktop overlay (82% to 12%) stays.
- Header: the logo, "Get in touch" and the menu button overflowed 360px screens by 16px on every page (since 21 Oct). Under 380px the logo is now 32px tall (142px wide, above the 120px minimum) with a smaller gap, and under 360px the header's "Get in touch" is hidden (the menu has one). No page scrolls sideways from 320px to 430px.

## 5 Nov 2026, hero video covers the phone hero again; desktop overlay corrected

- At the owner's request the phone hero has the video behind the text again, under the original 75% navy, rather than in a band above it. It now covers the first screen (header to buttons, `100svh`, 40 to 56rem) instead of the whole tall hero, which halves the zoom, and it is framed on the doctor (`object-position: 63% 50%`). It fades into navy above the stat cards. The text starts where it did originally.
- Correction to the earlier desktop change: measured on the brightest frames (a close up of the doctor's white coat), the end of the headline sat where the overlay was only about 50% navy, under 3:1. The desktop overlay now stays dense behind the whole text block (86% to 78% to 62% at 58% of the width) and opens to 15% on the right, where the doctor shows.
- Contrast measured behind the words themselves (tight text boxes, text hidden, shadows off), at six points in the loop: phones, headline 5.8:1, teal line 3.2:1, intro 5.9:1; desktop, 4.9:1, 3.7:1 and 6.6:1.

## 5 Nov 2026, the older build's hero wording

- At the owner's request the Home hero now reads "Revolutionizing healthcare infrastructure / across West Africa." with "Reimagined. For West Africa. One platform. Infinite possibilities." below, the wording of the older WordPress build (sentence case to match the site). Set in `content/data/pages/home.json`, so it stays editable in the site admin.
- The "Not yet open · Accra, Ghana" badge stays beside the buttons. Hero contrast re-measured with the new line lengths: still AA on phones and desktop.

## 5 Nov 2026, staging deployment on Vercel

- At the owner's request the site is live at https://wahp-website.vercel.app (Vercel project `wahp-website`, Node 22, built from `ccr-01d11262-1nlrsu` at `5c205bf`). Deployment protection is Vercel's "Standard": the production address is public, preview and per-deployment URLs need a Vercel login.
- Checked on the live site: all 11 pages return 200, `robots.txt` disallows indexing, the hero video plays on desktop and phone, no console errors, no sideways scroll.
- The project is not linked to Git, because GitHub's default branch is the older `ccr-3f23f1ac-xtw4sr` and would become production. See `LAUNCH_CHECKLIST.md`.

## 5 Nov 2026, Calendly booking and the older build's contact flow

- At the owner's request the Contact page follows the older WordPress build: "Every partnership starts with a conversation", then "I am a…" (Physician in Ghana, Diaspora physician, Investor, Partner or supplier) beside "Schedule your call", which shows the booking type, "30 minutes", "Video call on Zoom", "Show available times" and "Open in Calendly". Below it, "Prefer to write? Reach us directly." keeps the routed enquiry form, email, LinkedIn and the medical notice.
- The four Calendly links were checked live: each is a 30 minute Zoom call, so the page says 30 minutes (the older build said 20). The `scheduling-links` claim is now approved. The diaspora link keeps the live misspelling `diaspora-physcians`.
- Calendly sets its own cookies, so its calendar loads inline (an iframe) only after "Show available times". Without script, or in the static preview, "Open in Calendly" opens the booking page instead. The CSP allows frames from `https://calendly.com` only. The privacy notice has a new "Booking a call" section (`/privacy#booking`).
- The option shown is picked with CSS (`.call-scheduler`, `:has`), like the Home comparison switch. `?call=physician|diaspora|investor|partner` pre-selects it; the enquiry `?type=` does too where it maps onto a call.
- The header button now reads "Schedule a call" (as on the older build), "Book a call" under 640px so it fits beside the logo and menu from 360px. It links to `/contact#schedule`. The Home closing band's three cards link straight to the matching booking.
- Not included: the older build's "Get WAHP Updates" newsletter form, which needs a mailing list provider (`CONTENT_APPROVAL.md` D).

## 5 Nov 2026, page loading screen with the WAHP emblem

- At the owner's request every page has a loading screen, after the older WordPress build's (its plugin showed a developer's "KinetiTEC" GIF, and its page transition a green ring with the company name). Ours shows the WAHP emblem in white with a soft double beat, inside a turning ring with a green arc, and "West African Health Partners" in spaced capitals, on brand navy.
- First load: the screen lifts once the page has loaded, shown for at least 650ms so it never just flickers, and for 3 seconds at most (an inline script, with a CSS timeout as a backstop).
- Between pages inside the site, as on the older build: it fades in as soon as a link to another page is tapped (so a slow connection still gets instant feedback), stays while the page loads, and lifts 350ms after the new page appears. Back and forward show it too. It does not show for changes within a page (a booking option, a tab, `#schedule`) or for links that open a new tab, and it gives up after 6 seconds if a tap leads nowhere.
- The hero's entrance, scroll reveals and number count ups wait until it lifts, so they play where people can see them.
- It is decorative: hidden from screen readers and never blocks clicks. Without script it never appears; with reduced motion it does not spin or beat, and the between pages version is skipped.
- `scripts/shoot.mjs` waits for it to lift; the static preview shows it on each page.

## 6 Nov 2026, Calendly booking on each audience page

- At the owner's request the Calendly booking is on the pages it belongs to, not only on Contact. The Physicians, Diaspora and Investors pages each have a navy "Book a call" section (`#book-a-call`) with their own call (Physicians Call, Diaspora Physicians, Investors Call) ready to book, with no "I am a…" step. It sits just before each page's written form and links to it for anyone who prefers to write.
- Each page's main hero button is now "Book a call" and jumps to that section. The second hero button is unchanged. If the scheduling links are ever withdrawn, the buttons go back to "Register interest" / "Request an introduction" and the sections disappear.
- Investors: the section adds "A call is not an offer to sell securities. Please read the important notice below." above the existing Rule 506(c) notice.
- Partners have no page of their own, so "For partners" (footer), the Home Partners card and "Discuss a partnership" (Platform) now open Contact with the Partners Call selected (`/contact?type=partnership#schedule`). Patients have no call type, so their page is unchanged.
- The booking card is one shared component (`call-booking.tsx`) used by these sections and by the Contact page picker. Inside navy sections it keeps teal focus rings, so keyboard focus stays visible on the white card.

## 6 Nov 2026, retouched photo in the Diaspora hero

- At the owner's request the Diaspora page hero uses the owner's retouched version of the same photo (the doctor putting on her stethoscope): brighter, sharper and cropped to 4:3, which is the hero's own shape. The file came with a thin navy rounded frame drawn into it; 18px was trimmed from each side so only the site's own rounded corners show. Saved over `doctor-stethoscope.webp` (1409×1052, 77 KB), so nothing else changed. Alt text unchanged.

## 6 Nov 2026, overview video link on Home

- At the owner's request the Home hero has a "Watch the overview / On YouTube" link with a play button, under the main buttons. It opens WAHP's "West African Health Partners Overview" video (https://www.youtube.com/watch?v=CBGQphpdUyk, on the WAHP channel) in a new tab. The tracking parameter from the shared link is left off.
- It is a link, not an embedded player, so YouTube sets no cookies on this site and the privacy notice and CSP are unchanged. Registered as the `overview-video` claim; set to null there and the link disappears.

## 6 Nov 2026, phone menu in the older build's style

- At the owner's request the phone menu (under 1024px) now looks like the older WordPress build's: a white panel dropping from under the header (the page stays visible below it; tapping there closes it), rows divided by a faint rule, Manrope 16px bold in navy with 10px × 20px padding, sub-items set in a further 8px, all taken from that build's stylesheet. The full-screen navy menu with descriptions, the Privacy link and the menu's own call button are gone (Privacy stays in the footer; the header keeps "Book a call", and "Contact" is in the menu).
- Same grouping as the older build: About ▾ (About WAHP, Leadership; "Team" there), The Platform, The Problem (the infrastructure gap section on About, `/about#the-problem`), Who We Serve ▾ (For Physicians, For Diaspora, For Investors, and For Patients, which the older build did not have), Contact.
- As there, the current page and an open group are filled with brand green, and the group holding the current page starts open. One deliberate difference: the text on green stays navy, because white on this green is about 2:1 and hard to read (the same rule as the green buttons). The chevron turns when a group opens.
- Groups are native disclosure elements, so they work before the page's script loads and in the static preview. Escape, the focus trap and closing on navigation are unchanged. The desktop menu is unchanged.

## 6 Nov 2026, The Problem page and the older build's Investors sections

- At the owner's request the older build's The Problem page and two Investors sections are back, in its navy and green, and the photo of the doctor at the window (watching a plane, passport on the desk) is used, but not on Home.
- **New page `/the-problem`:** a navy hero over a dimmed corridor photo, "Brilliant doctors cannot carry *a broken system alone.*", with the three workforce figures as green stat cards; "Physician migration" with the window photo, a large 71.8%, "When the system does not support doctors, doctors look elsewhere." and the study's push and pull factors; "The infrastructure gap" (moved here from About, without its 71.8% card, now illustrated by the young doctor at the ward window); a closing call to action. On phones a "Schedule a call" bar is pinned to the bottom of the screen, as on the older build, and steps aside over the closing call to action and the footer.
- **71.8% is now fully cited:** Wutor et al., *BMC Health Services Research* 2024;24:1493 (doi:10.1186/s12913-024-11977-y; PubMed 39609798), a March 2024 survey of 641 doctors in Ghana. The page links to it, and Home's stat card names it.
- **Investors:** "Why Ghana, why now" (navy) after the "why" points: "Launching in a market with *demand, talent and regional reach.*", the four market figures ($1.21B, 42%, 36.7%, $214M) as green stat cards with their sources, the Greater Accra paragraphs, and a line pointing to the investor notice. "Who may invest" replaces the introduction section: "Help build the infrastructure behind *better healthcare delivery.*", the older build's lobby banner, "Register your interest" next to the form, and the existing notice. The "why" points' heading became "Why shared clinics, and why they work." so it does not repeat "why Ghana now". The booking section is white on this page so two navy bands do not meet, and the team photo strip is gone.
- The market figures were left out before as investor materials; they are published now at the owner's request and flagged for counsel in `CONTENT_APPROVAL.md`.
- Links: "The Problem" in the phone menu (now the page), the desktop menu from 1280px (it does not fit beside the other items below that), the footer, and "Why doctors leave" on Home's problem section.
- Fixes found on the way: desktop menu links no longer drop their text a line at 1024 to 1100px (the hidden underline wrapped), and "Rule 506(c)" no longer shows as "506©" (Manrope's contextual alternates are switched off for it).

## 6 Nov 2026, coffee photo back on Investors

- At the owner's request the "Who may invest" banner is the photo of a young man and woman with a laptop and coffee (`team-laptop-celebration.webp`, the photo that sat above the introduction before), instead of the older build's lobby banner, which is removed from the repo. 16:9 on phones and 2:1 from tablet up, at most 896px wide, framed to keep both faces and the coffee cup. The file is only 678px wide, so the banner is kept narrower than the page to limit enlargement; a larger original would sharpen it.

## 6 Nov 2026, copy rewritten in the older build's wording (about 75%)

- At the owner's request the visible copy of Home, Platform, The Problem, Physicians, Diaspora, Investors, About and Contact now follows the older WordPress build's wording, with the design unchanged (same sections, components, images, links and markers). Privacy, Terms, Patients and the Leadership bios have no older equivalent and were not changed.
- **Measured** by comparing each sentence on the new pages with the older build's text (lowercased, UK and US spellings treated as equal; a sentence counts when it is 60% or more similar to an old one, weighted by words): **75.7%** of the words on these eight pages now come from the older build (26% before). By page: The Problem 95%, About 88%, Platform 80%, Investors 78%, Home 74%, Diaspora 71%, Contact 71%, Physicians 64%. What remains is mostly text with no older equivalent that has to stay: the enquiry forms and consent line, the medical and emergency notices, the investor notice, licensing and "planned" FAQ answers, statistics sources and the stage markers.
- **The rules still applied** (old lines left out or recast): no "co-working" (now "shared clinical suites" / "shared practice model"); planned services stay plans ("immediate access to … lab, imaging", "same-day results", "within the same facility", "results flow digitally" recast or dropped); unsupported claims stay out (72%, "WHO target 15%", 95% overhead, 24/7, "zero buildout", "hundreds of thousands of dollars", "hours, not weeks", "high margin", "pays for itself", "Institutions in discussion", the $800,000 raise and EBITDA, "Rule 506(c) offering", "Invest in…"). The 20 minute call stays 30 minutes. The emigration line stays WAHP's view ("We believe it is not because they want to leave"). UK spelling, no hyphens or dashes, sentence case.
- **For the owner to check:** the Physicians heading "Lower overhead. More control. Greater potential." (from the older build; a promise without a figure); the About mission now ends "to practise at their highest level, at home" (was "at their best"; compare with the One-Pager); the Investors hero "Building the infrastructure for Africa's next healthcare revolution" (from the deck).
- Test-bound labels kept: "Equipped clinical suites", "Integrated diagnostic laboratory" (platform tabs test) and the enquiry type "Strategic partner" (the partner call type is "Partner or vendor").

## 6 Nov 2026, The Problem page: what doctors in Ghana face

- At the owner's request The Problem page now leads with the problems for doctors in Ghana, in this order: pay, capacity, infrastructure, migration, then WAHP's answer.
- **Hero:** "Ghana has highly skilled physicians and significant healthcare needs. Yet many doctors face financial pressure, demanding workloads and substantial barriers to establishing a private practice." The headline figures are now **51%** of doctors surveyed reporting GH₵10,000 to 15,000 a month (Wutor et al. 2024), **1.43** doctors per 10,000 people (WHO 2022) and **28%** of the 1,421 health facilities assessed with a computer with internet (Ghana Harmonized Health Facility Assessment 2022). The workforce ratio and register return automatically if either new claim is withdrawn.
- **New "Physician compensation" section:** "GH₵10K to 15K a month", the study source, "Despite years of medical training and significant clinical responsibility, many physicians seek better remuneration and working conditions", economic challenges as the strongest push factor, and the barriers to practising independently (leases, equipment, staffing, administration, regulation, diagnostics elsewhere).
- **Both figures were checked against the primary sources** (claims `stat-physician-income` and `stat-facility-internet`): the study's Table 1 (327 of 641, 51.0%; self-reported band, not net or gross; online convenience sample, March 2024) and the HHFA national report, Executive Summary p.16 and Annex Table 2.1.1.1 (28%, n = 1,421). Worded as "reported" and "of facilities assessed", not as a national average salary or all facilities.
- **Not used on this page** (from the analysis the owner shared): the four physician earnings scenarios, the WageIndicator range, the Year 1 revenue and recruitment figures, the $800,000 raise and the pitch text. They are projections or investor material; the earnings examples would need "revenue after the WAHP fee, before other costs" framing and counsel review before going anywhere public.

## 6 Nov 2026, The Problem page: the rest of the older build's page

- At the owner's request the rest of the older build's The Problem page is now on /the-problem, ordered so it reads as one story: the problem in figures; **too few doctors** (new); pay and the barriers to private practice; **the three system gaps** (new); migration; **the patient cost** (new); the infrastructure gap; and how WAHP closes it.
- **"Ghana has too few doctors for its population"** (white): the older build's paragraph (1.4 doctors per 10,000 people in 2022, compared with 8 in South Africa and 36 in the United States), drawn as a three bar comparison with every value labelled, Ghana in teal. Beside it, "Many registered doctors may not be actively practising in Ghana" (11,867 and the study's caveat) and "Diagnostic access remains a major gap" (WAHP's feasibility study).
- **Physician compensation panel:** adds **~22×**, the historical gap between US and Ghanaian physician pay adjusted for cost of living, labelled as a 2004 estimate (Vujicic et al., *Human Resources for Health*).
- **"Three system gaps holding healthcare back"** (white): Gap one, limited access to diagnostics; Gap two, fragmented technology and records; Gap three, inadequate clinical infrastructure, in the older wording, then the navy callout "These failures compound… 'where else can I go?'". The migration section follows it (now on paper) so that question leads straight into the 71.8% figure.
- **"When physicians leave, patients pay."** (white): the older paragraph, then a navy panel with **78.3%** of 460 primary health facilities surveyed in Greater Accra and Ashanti with no critical care personnel (Afrifa-Yamoah et al., *Internal and Emergency Medicine*, 2024; data collected 2020) and **$2.17B** estimated lost investment in educating doctors who left nine African countries for Australia, Canada, the UK and the US (Mills et al., *BMJ*, 2011; Ghana is not one of the nine, so it is not presented as a Ghana figure).
- **Closing band:** the older "Transition into WAHP" paragraph, with the medical suites, diagnostics, imaging, digital systems and operational support "planned as one coordinated platform".
- **Checked against the primary sources** (claims `stat-doctor-density-comparison`, `stat-registered-doctors-caveat`, `stat-wage-gap`, `stat-critical-care-staff`, `stat-emigration-cost`); the feasibility study line is the owner's (`feasibility-diagnostics`, pending review).
- **Left out:** "72% of clinics in Ghana cannot provide the full range of expected services due to a lack of personnel". No source could be found (the HHFA national report and annex, Ministry of Health slides and a web search); recorded as `stat-clinics-personnel-72`, unsupported. "This is not a statistic about staffing. It is a statement about access." now follows the verified 78.3% figure instead. "The loss of a single doctor means the nearest provider is hours away" is softened to "can mean".

## 6 Nov 2026, The Problem: pay in cedis and US dollars

- At the owner's request the "GH₵10K to 15K a month" figure now switches back and forth with **$790 to $1,180** in red, rolling up to dollars and back down to cedis, about every 3.5 seconds.
- **Conversion:** the Bank of Ghana's interbank month average for March 2024, GH₵12.67 to the US dollar (claim `pay-usd-conversion`), because the survey ran in March 2024 and the study gives no dollar figures. A line under the study sentence states the dollar range and the rate, so the figure is never only in the animation.
- **How it works:** a CSS animation (`.currency-flip` in `globals.css`), so the script-free preview runs it too. Both values share one grid cell, so nothing moves around them. It starts when the panel scrolls into view. On the live site a small pause toggle sits beside "a month" (WCAG 2.2.2). With reduced motion the cedi figure stays and the toggle is hidden. Screen readers hear both values once.
- **Colour:** `--color-red` (#FF6B6B, 4.5:1 on navy) is not a brand colour and is used only here (see `BRAND_IMPLEMENTATION.md`).

## 6 Nov 2026, The Solution page

- New page `/the-solution`, built from the owner's write up and laid out like The Problem: navy photo hero, sections that alternate white and paper, navy panels with green figures, the closing band and the phone "Schedule a call" bar. It does not repeat The Problem's figures.
- **Sections:** hero ("Private practice, without building a clinic.", the mission, "One doctor. One session. One patient at a time."); How it works (reserve a room by the session, see your own patients, we run the rest; keep your primary position); From barrier to platform (each barrier from The Problem with the part of the platform designed to answer it); The economic opportunity for physicians; Why this matters (physicians, patients, the platform); The long term vision (beyond one facility, link to Investors); closing band.
- **Example earnings:** the owner's four physicians, six 4 hour sessions a month at a proposed $100 a session: GP $10,080 a year, paediatrician $18,720, OB/GYN $15,840, cardiologist $27,360. The page computes them from the inputs (patients × fee − $100, × 6 sessions × 12 months), so they cannot drift. Marked "Example only, not final", with the owner's caveat (revenue after WAHP session fees, before other expenses and tax). Claim `earnings-examples`, pending review; **counsel to review before launch**.
- **Wording kept to the house rules:** "medical coworking" became "shared medical and diagnostics platform" and "shared … hubs"; the hub, lab and imaging are planned; regulation is "designed to meet". **Left out:** the $800,000 pre-seed raise and "pre-seed stage" (investment terms stay on the Investors page, behind its notice), and the tagline "Our Healthcare Revolution. For Africa. By Africa." (claim `tagline` is not approved).
- **Photos:** stock photos of Black doctors already in the site's library: the consulting room with a clinician taking a patient's blood pressure behind the hero (`clinic-bp-check`, CC BY-SA, credited on /terms), the physician at a laptop (`physician-laptop`, Pexels) and the doctor putting on her stethoscope (`doctor-stethoscope`, Unsplash). The first two were not used anywhere else. New stock downloads could not be fetched from here.
- **Links:** The Problem's closing band now says "See the solution" (it said "Discover the platform"); The Solution's closing band links to the platform. Also in the phone menu, the footer, the sitemap and the preview. Not in the desktop menu, which has no room for another item.

## 6 Nov 2026, The Solution: earnings in US dollars and cedis

- At the owner's request each example earnings card on /the-solution now switches back and forth between US dollars (navy) and Ghana cedis (green): the yearly figure (e.g. $10,080 and GH₵128K) and the monthly line (about $840 and about GH₵10,640 a month), in step.
- **Rate:** the same Bank of Ghana interbank month average for March 2024 as The Problem, GH₵12.67 to the US dollar (claim `pay-usd-conversion`). Yearly cedis are rounded to the nearest thousand (the site's "GH₵10K" style), monthly to the nearest GH₵10, and computed in the page from the dollar figures. A note above the cards states the rate.
- **Green on light cards:** the brand green #8BC900 is under 2:1 on the light cards, so the cedi figures use `--color-green-ink` (#4F7A00, a deepened brand green, 4.7:1 on paper). Recorded in `BRAND_IMPLEMENTATION.md`.
- Same `.currency-flip` CSS animation as The Problem's pay figure, so the preview runs it too. One pause toggle above the cards pauses all four (`CurrencyFlipGroup`); with reduced motion the dollar figures stay. "a year" now sits on its own line under the figure, so the cards do not jump between states.

