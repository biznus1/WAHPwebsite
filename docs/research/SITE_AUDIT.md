# Audit of the existing WAHP websites (21 Oct 2026)

Crawled with Playwright at 1440px and 390px. The screenshots are in `docs/research/screenshots/`, with the prefix `westahp-` for the live site and `vyp-` for the newer build.

| Site | Status |
| --- | --- |
| **www.westahp.com**: live Squarespace site | ✅ Audited: Home, About (`/about`, `/about-1`), Founders (`/founders`, `/founders-1`), Contact |
| **wahp.viewyourprojecthere.com**: newer WordPress build (owner says this is the latest) | ✅ Audited: Home, About, Team, The Platform, The Problem, For Physicians, For Diaspora, For Investors, Contact |
| **wahp.kwasimd.chatgpt.site**: alternate concept | ❌ Returns *401 "Sign in required — Continue with ChatGPT"*. It needs a ChatGPT login, so it was not audited |

---

## 1. westahp.com (live)

**Strengths worth keeping**
- Clear core idea and recognisable lines: "Stop Managing. Start Practicing.", "Built By Doctors. Better for Patients.", "Everything under one roof", and the explicit pre-launch paragraph ("We're raising funds, securing space…").
- A traditional practice vs WAHP comparison, five rows, qualitative.
- Healthcare Professional / Investor split, a Calendly CTA ("Schedule Conversation") and the contact email.

**Problems found**

| Area | Finding |
| --- | --- |
| Claims | "95% Lower Overhead", "24/7 Access" and "1 Team / Multiple Practices" have no support, and "24/7" implies an operating facility. "West Africa's First Medical Coworking Platform" and "region's first" are unsubstantiated "first" claims |
| Leadership | **Outdated and contradictory.** `/founders` calls Emmanuel Adomfeh *CEO* and Jonathan Francois *Co-Founder and COO*. `/founders-1` reverses this. Elizabeth Aremu is listed as *CFO*. The newer site lists Francois as CEO and Adomfeh as COO, does not list Aremu, and adds Nakeitheya Smith (CMO) |
| Copy quality | Typos: "Warch Overview", "Linkendin" ×4. Emmanuel Oppong's bio is pasted twice. Uses the "Coworking" vocabulary that the Questionnaire says to avoid |
| Broken / risky links | The LinkedIn link points to a **company admin URL** (`/company/107422755/admin/notifications/…`), which visitors cannot open. Sign-up buttons link to Google Forms **`/edit` URLs**, which expose the form editor or a permission wall. An empty `/cart` page is live (Squarespace commerce left on) |
| Media | The hero video fails in Chromium ("Video is not available or format is not supported") |
| Duplicate pages | `/about` vs `/about-1` and `/founders` vs `/founders-1` |
| Accessibility / SEO | Home has **4 `<h1>`s**; About, Founders and Contact have **none**. Most pages have no meta description. Images are missing alt text (6 on home, 6 on Founders) |
| Contact | A generic Squarespace form with no enquiry routing |

## 2. wahp.viewyourprojecthere.com (newer build)

**Strengths taken into the new site**
- **Team page:** five core members with roles, bios and focus tags. These are now used verbatim on `/leadership`.
- **About:** mission ("…tools, technology, and support to practice at their highest level"), vision ("a career advantage, not a sacrifice"), four values, and the founder's letter. All are adopted.
- **Platform:** four pillars (suites, lab, imaging, digital), the "value is in connecting all four" integration story, and "One building. Complete care." The structure is adopted, with honest phase labels.
- **Diaspora:** "Practice. Partner. Or both." two paths and a three-step "you do not need to move back tomorrow". Adopted on `/physicians#diaspora`.
- **Investors:** business model (revenue streams), differentiation (hospitals / diagnostic chains / WAHP), phase plan with a timing caveat, and the Rule 506(c) accredited-investor notice with an acknowledgement checkbox. Adopted, without market-size figures.
- **The Problem:** workforce statistics **with named sources** (WHO 2022; Ghana MoH 2021; GMDC 2024). Adopted on the home page.
- **Contact:** "I am a…" paths including **Vendor & Industry**, the 20-minute call framing, and the LinkedIn and YouTube channels. Adopted.

**Problems found**

| Area | Finding |
| --- | --- |
| Present-tense overclaims | Imaging is described as available ("WAHP will provide onsite … CT, MRI …"; "On-Site Imaging: Access imaging services within the WAHP facility"; "Results flow digitally …"). Imaging is Phase 3. The physician page promises suites, lab and imaging as if operating |
| "First" claim | The footer on every page says "WAHP is building the first integrated healthcare platform in West Africa". The Questionnaire approved only a narrower wording, and it still needs substantiation |
| Traction | **20 physician LOIs** appears on Home, Physicians and Diaspora. The Drive holds ~13 signed LOIs, and Questionnaire #28 keeps LOI counts to investor materials. "The model is validated" overstates a pre-launch status |
| Statistic consistency | Home: "72% … according to Ghana Medical Association surveys … WHO Target 15%". The Problem page: "71.8% … a recent study" with no citation. The attribution is inconsistent and the "WHO target" figure has no source |
| Placeholders live | Advisory Board shows four "Advisor Name / Title · Institution" cards and a note "Placeholder cards — replace…". The Calendly block says "The scheduling widget will render here on deploy". Three LinkedIn links point to `https://www.linkedin.com/in/` (empty) |
| Typos | "buid equity", "creditable path", "Submit Intrest", "You've thought about going back.WAHP" (missing space) |
| Contact email | Uses **info@wahp.org**, while westahp.com and the Questionnaire use **info@westahp.com**. Owner must confirm |
| Accessibility / SEO | **2 `<h1>`s on every page.** No meta descriptions. 22 images on the home page lack alt text. The navy-to-teal gradients, wave dividers and stock-style photography conflict with the "no gradients" rule |
| Investor compliance | Reg D 506(c) language is present, which is good. But general-solicitation pages need counsel sign-off, and the "Raising capital. Partner with us" banner on every page should be reviewed with counsel |

## 3. What the new build does differently

- One `<h1>` per page, a meta description on every page, alt text on every image (tested in CI), and Lighthouse accessibility at 100.
- Every capability carries an honest status label (Phase 1 in development, Phase 2 planned, Phase 3 future, Phase 4 replication), plus the timing caveat.
- No unsupported percentages, "first" claims or LOI counts. "Early physician commitments secured" is used per the Questionnaire.
- No placeholders, no broken LinkedIn links, no edit-mode form links. The enquiry form routes by audience and reports delivery honestly.
