## Mobbin Pattern Research

Source: Mobbin MCP (`search_sections` and `search_screens`, web platform), October 2026. These are principles only. No HTML or imagery was copied. Links go to Mobbin entries and need a Mobbin login.

### 1. Editorial hero (healthcare / B2B infrastructure)
- **Refs:** [Ease](https://mobbin.com/sites/sections/6695790f-7142-4e99-86a9-2632963b795d), [Amigo](https://mobbin.com/sites/sections/6a5bc1de-dea8-47ea-89c1-fcff8e8b6636), [Titan Intake](https://mobbin.com/sites/sections/726ffa26-f3df-4f7b-b49f-75e351974821)
- **Pattern:** Ease: a large two-line headline left-aligned on off-white, a short paragraph, then a split media row (a flat colour block with line art next to an interior photo). Amigo: one centred line and one small CTA. Titan: a trust strip right under the hero.
- **Principle:** The headline does the work. Keep it to 2 lines or fewer at about 56-72px, keep the paragraph under about 60ch, use one primary CTA, and leave plenty of empty space. The media sits **below** or **beside** the text, never behind it, so the text stays readable. Trust signals go straight after the hero.
- **WAHP:** Navy Manrope headline on `#F5F6FC`, then a split row: a teal/navy block with abstract line art (a floor plan or care pathway) next to a clinical-space photo or render. One CTA ("Register interest"). Since WAHP has no client logos yet, put a credibility strip of facts underneath (Accra · shared outpatient space · independent physicians · launch phase).

### 2. Audience-segmented pathways
- **Refs:** [Ploy "Who's Ploy for?"](https://mobbin.com/sites/sections/2c493008-c3a6-42fc-b5a9-ed736484cb85), [Maze](https://mobbin.com/sites/sections/0f2d1d3a-7a0c-4945-9400-0913cc165adc), [Customer.io](https://mobbin.com/sites/sections/7c6d42e0-85b8-4d1d-bfc9-20a11bf77019)
- **Pattern:** Ploy: a left headline next to stacked audience panels, with one expanded (bullets plus two CTAs) and the rest collapsed to a title and one line. Maze: tall "For X" colour cards with an arrow. Customer.io: one card per audience, each with its own CTA.
- **Principle:** Every audience gets the same structure: label, a one-line value statement, 3-4 proof bullets and **its own** CTA verb. Only one panel is expanded at a time, so the section scans quickly without turning into four walls of text.
- **WAHP:** Four pathways: Investors / Physicians / Patients / Partners. Use a stacked accordion on desktop and full-width cards on mobile. Give each one a specific CTA ("Request investor brief", "Apply for clinical space", "Join patient updates", "Discuss partnership") that pre-selects that type in the contact form. Mark each audience with a different accent colour, used sparingly (green for physicians, teal for patients, navy for investors).

### 3. Phased roadmap / timeline
- **Refs:** [Wild](https://mobbin.com/sites/sections/1bac0acb-c4fe-46ec-acd7-fe0bf057faf2), [BitcoinOS](https://mobbin.com/sites/sections/92ac65c4-a924-42ea-b25b-99d2727e4099), [Wise Mission Roadmap](https://mobbin.com/sites/sections/1692b22c-7466-4fea-9981-6cc87f8b48aa), [Humble](https://mobbin.com/sites/sections/9ba75952-a7e5-4c37-bd80-79f22a33f93b)
- **Pattern:** Wild: a horizontal rail with coloured square nodes, a mono eyebrow ("PHASE 1 · WKS 1-4"), a title and a short description. BitcoinOS: phase columns with status chips and an Achieved / Next toggle. Wise: Now / Next / Later. Humble: a vertical rail.
- **Principle:** Every phase has an eyebrow (phase plus timeframe), a title, 1-2 lines of description and a **status** chip. The status is the honest signal a pre-launch audience is looking for. The layout is horizontal on desktop and becomes a vertical rail on mobile.
- **WAHP:** Use 4 phases (e.g. Foundation → Site & fit-out → Physician onboarding → Opening and expansion). Show status with colour: green `#8BC900` = complete, teal = in progress, outlined navy = planned. Avoid exact dates unless they are confirmed. Quarters or "Phase" labels protect credibility.

### 4. Segmented contact / enquiry form
- **Refs:** [Lightship](https://mobbin.com/sites/sections/0791334e-985a-4902-b866-3be56684576c), [Savor](https://mobbin.com/sites/sections/ae1f5fe6-9420-45e4-b097-64ae2aa8c06e), [Büro](https://mobbin.com/sites/sections/02b4f59f-4535-4b13-8139-43a63c310be5), [Framer](https://mobbin.com/sites/sections/914df681-c24d-4800-bd11-9c144d0175fb)
- **Pattern:** Lightship: "Reason for inquiry" **first**, then the contact preference as segmented buttons, then the fields. Savor: an "I am a…" select with underline inputs. Büro: numbered questions (01-08) in a ledger layout. Framer: compliance badges beside the form.
- **Principle:** Ask about intent first, then the fields that depend on it. Use large segmented choices instead of dropdowns when there are 4 options or fewer. Numbered steps or a ledger layout make a long form feel smaller. Put consent and privacy wording next to the submit button.
- **WAHP:** Step 1 is "I am a…" (Investor / Physician / Patient / Partner) as 4 tiles. Step 2 shows conditional fields (physicians: specialty and current practice setup; investors: organisation and ticket interest; partners: organisation type). Step 3 is contact details plus a consent line under Ghana's Data Protection Act. Show a step indicator ("1 of 3") and let the pathway CTAs deep-link to step 2.

### 5. "How it works" / platform diagram
- **Refs:** [Cloudflare Workers](https://mobbin.com/sites/sections/3f43d4a8-c70c-4f82-a216-52bd0a30a932), [Lassie](https://mobbin.com/sites/sections/310955c5-6f5c-44eb-bb3c-ca0362b77008), [Lyssna](https://mobbin.com/sites/sections/44e1eb5f-e08c-43ef-9f88-7dadf21e8160), [Ploy](https://mobbin.com/sites/sections/d6f36b4d-ed86-4682-9ac2-b374fb20b452)
- **Pattern:** Cloudflare: a node-and-edge diagram on a faint grid with labelled groups. Lassie: 3 equal cards, each with a vignette, a title and a sentence. Lyssna: a step list where the active step drives the visual.
- **Principle:** Show the **mechanism** rather than icons. Use a small set of labelled nodes, a consistent line style and colour-coded groups. Keep the explanation to 3 steps with parallel phrasing.
- **WAHP:** A hub diagram with the shared clinical space (navy) at the centre, linked to independent physicians, shared services (reception, diagnostics, scheduling, compliance) in teal, and patients. Use green only on the "value" edges. Write it as inline SVG so it scales. Underneath, 3 steps for physicians: Apply → Onboard → Practise.

### 6. FAQ accordion
- **Refs:** [Origin](https://mobbin.com/sites/sections/1f1caf97-2f02-4668-bc84-05c7f760d6d2), [monday.com](https://mobbin.com/sites/sections/3f750e1f-9291-4fd7-a27d-331f750a57ac), [MasterClass](https://mobbin.com/sites/sections/52e19fa1-aaf6-4df2-909a-51aaeeb6fdf8)
- **Pattern:** Origin: title on the left, accordion on the right, +/× toggles. monday.com: hairline rows with chevrons. MasterClass: questions grouped under category headings.
- **Principle:** A two-column layout (title left, questions right) on desktop. Group questions by category, use hairline dividers instead of heavy boxes, keep one clear toggle icon, and open the first item by default.
- **WAHP:** Group the questions by audience (Physicians / Investors / Patients), filterable with the same tabs as the pathways. Build it with `<details>`/`<summary>` or ARIA `aria-expanded` buttons. Questions should cover licensing, lease or membership model, opening timeline and how patients book.

### 7. Institutional footer
- **Refs:** [Complex Law](https://mobbin.com/sites/sections/d33c835f-2d6e-4ce1-b827-23703ef3a607), [Giga](https://mobbin.com/sites/sections/c5908fa0-2fc1-41dc-9669-9c55b0909a9f), [Corgi](https://mobbin.com/sites/sections/63e60bfc-1a20-41d0-a3b3-2da8a43a3723)
- **Pattern:** Complex Law: a brand statement, registered office and regulator line, plus link columns and a newsletter. Giga: mono-label columns and a policy row. Corgi: a full-width regulatory disclosure.
- **Principle:** Legitimacy lives in the footer. Include the registered entity, address, registration details, policy links and a small-print disclaimer, under compact grouped columns.
- **WAHP:** A navy footer with a brand statement, Accra address and company registration. Columns: Audiences / Company / Contact / Legal. Add a newsletter line ("Launch updates"). In small print: "Pre-launch: services not yet available. Not an offer of securities."

### 8. Mobile navigation
- **Refs:** [ZARA menu overlay](https://mobbin.com/screens/fab9fd81-4397-423b-a03a-0c5c778c92fa), [VanMoof](https://mobbin.com/sites/sections/a2eb514d-563f-4fb9-aaff-8f235f43d666), [Monte](https://mobbin.com/sites/sections/2f083c6a-8cf1-40af-823b-bee1ce8f419a)
- **Note:** Mobbin's web captures are desktop-width, so the evidence here is weaker than for the other patterns.
- **Pattern:** ZARA: a full-screen overlay with close top-left, a large primary list and a secondary column. VanMoof: a compact pill bar. Monte: text labels ("MENU" / "BOOK A TABLE") as the two persistent header actions.
- **Principle:** Keep the primary CTA visible outside the menu. In the overlay, show large primary links (about 28-32px) first, then secondary links and contact details. Lock body scroll, trap focus, and close on Esc.
- **WAHP:** Header with logo, a "Register interest" pill and a menu button. The overlay is navy, with the 4 audience links in large text and About / Roadmap / FAQ / Contact underneath. Touch targets should be at least 44px.
