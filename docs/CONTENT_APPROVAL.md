# Content approval queue

The decisions below block or shape public launch. The machine-readable register is `src/content/claims.ts`; only `publicApproved: true` entries render.

## A. Critical decisions (please answer before launch)

2. **Hero headline.** *Resolved 5 Nov 2026:* at the owner's request the Home hero uses the older WordPress build's wording: "Revolutionizing healthcare infrastructure across West Africa." with the line "Reimagined. For West Africa. One platform. Infinite possibilities." (sentence case to match the site). The "Not yet open · Accra, Ghana" badge stays beside the buttons, since the headline reads region wide while WAHP is pre-launch in Accra. History: *Update 21 Oct 2026:* the owner asked for the Home page to follow the newer build. It now reads *"Reimagining healthcare infrastructure for West Africa."* This is a softened form of that build's *"Revolutionizing Healthcare Infrastructure Across West Africa"*, which reads as already operating region-wide while WAHP is pre-launch in Accra. Either wording can be set in the site admin (Home page header). Earlier the site used *"Infrastructure for independent medicine."* Alternatives found in the owner's own materials, including the newer build's *"Revolutionizing Healthcare Infrastructure Across West Africa"*:
   - *"Grow Your Practice with West African Health Partners"* (CEO, Master Brief)
   - *"The infrastructure physicians need to practice at their highest level."* (March blueprint)
   - *"The Infrastructure for Africa's Next Healthcare Revolution"* (deck)

   Please choose one.
3. **Enquiry delivery.** Pick Resend email or a webhook (e.g. Zapier → Google Sheets / HubSpot) and supply credentials (`.env.example`). Until then the form clearly says *not sent*.
4. **Scheduling links.** *Resolved 5 Nov 2026:* at the owner's request the Contact page has the older build's Calendly booking ("Every partnership starts with a conversation", "I am a…", "Schedule your call"), and the header button reads *Schedule a call*. Since 6 Nov 2026 the Physicians, Diaspora and Investors pages also have a "Book a call" section with their own call, and partner links land on the Partners Call. All four links were checked live that day; each is a 30 minute Zoom call (Physicians Call, Diaspora Physicians, Investors Call, Partners Call), so the page says 30 minutes, not the older build's 20. The diaspora link keeps the live misspelling `diaspora-physcians` (the correct spelling returns 404); fixing the slug in Calendly would need the site updated too. The calendar loads inline only when a visitor asks, and the privacy notice has a new "Booking a call" section. The older build's "Get WAHP Updates" newsletter is **not** included: it needs a mailing list provider (see D).
5. **Legal review** of `/privacy` (including the new "Booking a call" section on Calendly and Zoom), `/terms`, the investor disclaimer, and the emergency number (112) used in the patient notices.

### Resolved on 21 Oct 2026
- **Contact email:** info@westahp.com (owner confirmed).
- **LOIs:** 20 signed Letters of Intent (owner confirmed).
- **Leadership:** published from wahp.viewyourprojecthere.com/team on the owner's instruction:
  - Jonathan Francois, MD: CEO
  - Emmanuel Adomfeh, MD, MPH: COO
  - Nana Kwame Obuobi, MBBS, MPH: Medical Director
  - Emmanuel Oppong: Laboratory Manager
  - Nakeitheya Smith: CMO

  Elizabeth Aremu is not listed (she is absent from the newer site). The advisory board is not shown because the newer site only has placeholders. LinkedIn URLs for four members come from westahp.com/founders-1. No public profile was found for Nakeitheya Smith; please send it. Emmanuel Oppong's photo is only 296px wide, so a larger original would sharpen it.

## B. Claims and copy status

| Claim / copy | Source | Status on site |
| --- | --- | --- |
| "95% Lower Overhead" | westahp.com (per brief) | **Not used.** No supporting analysis |
| "24/7 Access" | westahp.com (per brief) | **Not used.** Implies an operating facility |
| "1 Team / Multiple Practices" | westahp.com (per brief) | Replaced by "one shared operational backbone", framed as the proposed model |
| "50 percent lower overhead", "one day results", testimonials, "Now open in Accra" | Master Brief: CEO said remove | Not used |
| "The first integrated medical co-sharing and diagnostics infrastructure platform in West Africa." | Questionnaire #34 | **Held.** Owner-approved wording, but needs documented substantiation |
| Tagline "Our Healthcare Revolution. For Africa. By Africa.™" | One-Pager / deck | Held. Confirm current use and ™ |
| Mission and vision | One-Pager (Jul 2026) | Used on /about. Wording was reconstructed from PDF text, so **please check it word-for-word** |
| Regulatory sentence ("full compliance with applicable Ghanaian … regulations") | Questionnaire #27 | Used on /about and the physician FAQ. No agencies are named |
| "Hospitals have infrastructure but no autonomy. Clinics have autonomy but no infrastructure." | March blueprint / deck | Used on home ("…WAHP is designed to combine both."), as the intro to the three way comparison |
| "In a large hospital" column of the Home comparison (renamed from "big hospital", 5 Nov 2026) (premises, equipment, admin, diagnostics, focus) | Written 5 Nov 2026 from the line above and the older build's Hospital / WAHP / Private Clinic toggle | Qualitative, no figures. **Please check the wording** |
| "Accra is the starting point, not the destination." | March blueprint | Used on home |
| "Stop managing. Start practising." / "Everything under one roof" | westahp.com themes (per brief) | Used as section headings. British spelling *practising* (en-GB). Confirm |
| Flexible leases (hourly/daily/monthly) | Questionnaire #10 | Used in the physician FAQ as *planned*. No rates |
| Lab, Phase 2; imaging, Phase 3 | One-Pager, Questionnaire | Shown as *Planned* / *Future phase*. **No years shown**, because sources conflict on expansion timing |
| Problem stats from the March blueprint / deck (72% emigration intent, 62 km, $2B) | March blueprint / deck | **Not used.** Unsourced; add citations if wanted. (1:5,707 is used, from the newer site, see below) |
| "20 physicians have signed Letters of Intent" | Owner confirmed 21 Oct 2026 | **Used** on /investors and /physicians |
| 60+ physicians surveyed, 3 studies completed, 5-person team | Newer site build; Questionnaire #29 | Used on /investors ("Groundwork to date") |
| Workforce stats: 1.43 per 10,000 (WHO 2022), 1:5,707 (MoH 2021), 11,867 registered (GMDC 2024), 71.8% migration intent | Newer site, The Problem page | Used on home and /the-problem with sources. 71.8% now fully cited (6 Nov 2026): Wutor et al., *BMC Health Services Research* 2024;24:1493, doi:10.1186/s12913-024-11977-y, a March 2024 survey of 641 doctors working in Ghana |
| Push and pull factors behind migration (economic challenges, working environment, career progression, workload, postgraduate training; pay, quality of life) | Older build, The Problem page | Used on /the-problem (6 Nov 2026). Checked against the same study; it also lists "personal circumstances", which the older wording leaves out |
| "Brilliant doctors cannot carry a broken system alone." and "WAHP is building the clinical environment that makes better care possible." | Older build, The Problem page | Used as The Problem hero (6 Nov 2026, owner request). Copy put into en-GB, "exam room" as "consulting room" |
| "The talent exists. The infrastructure around it is fragmented, inefficient and ready for transformation." | Older WordPress build, Home | Used on /about (5 Nov 2026, owner request; moved to /the-problem on 6 Nov), with the 71.8% figure and the line "We do not believe it is because they want to leave", stated as WAHP's view. The older build's "72% … Ghana Medical Association surveys", "accelerated since 2018" and "WHO Target 15%" are **not used** (unsourced) |
| Market sizes ($1.21B, $214M, 42%, 36.7%) | Newer site / older build, investors page | **Used on /investors since 6 Nov 2026 at the owner's request** ("Why Ghana, why now"), labelled as WAHP estimates with their sources, under a line pointing to the investor notice. **Counsel to confirm** (forward looking figures on a 506(c) page). Sources to tighten: "WHO Ghana" (42%) and "Ghana MoH 2023" need a named document and year; keep the workings for $1.21B and $214M on file |
| "Help build the infrastructure behind better healthcare delivery" and "Register your interest … does not create any obligation to invest" | Older build, investors page | Used on /investors, "Who may invest" (6 Nov 2026) |
| Rule 506(c) accredited-investor notice + acknowledgement | Newer site, investors page | Used on /investors and in the investor form. **Counsel to confirm** |
| Imaging "within the same facility", on-site lab "results flow digitally" | Newer site | Reframed as Phase 2/3 *planned/future* |
| info@westahp.com | Questionnaire / contact blueprint | **Used.** Confirm the inbox is monitored |
| LinkedIn company page | Contact blueprint | Used in footer and contact page |
| Phone numbers (+1 / +233) | LOI letterhead only | Not used. Confirm before adding |
| Canonical domain: westahp.com vs westafricanhealthpartners.com | UI doc vs blueprint | `NEXT_PUBLIC_SITE_URL` defaults to westahp.com. Confirm |
| Instagram / X | Brand guide mock-ups | Not used. No confirmed handles; blueprint says no X |

| Physician pay: 51% of 641 doctors surveyed reported GH₵10,000 to 15,000 a month | Wutor et al. 2024, Table 1 (verified 6 Nov 2026) | Used on /the-problem. Self-reported band, convenience sample: never present as Ghana's average salary |
| 28% of 1,421 health facilities assessed had a computer with internet | Ghana HHFA 2022-2023 national report, Annex Table 2.1.1.1 (verified 6 Nov 2026) | Used on /the-problem |
| Doctors per 10,000 people in 2022: Ghana 1.4, South Africa 8, United States 36; the 11,867 register includes doctors who have migrated or stopped practising | Wutor et al. 2024, Methodology (verified 6 Nov 2026) | Used on /the-problem, "Ghana has too few doctors for its population" |
| ~22× US to Ghana physician pay gap, adjusted for cost of living | Vujicic et al., *Hum Resour Health* 2004;2:3 (verified 6 Nov 2026) | Used on /the-problem, always labelled as a historical 2004 estimate |
| 78.3% of 460 primary health facilities surveyed in Greater Accra and Ashanti had no critical care personnel | Afrifa-Yamoah et al., *Intern Emerg Med* 2024 (verified 6 Nov 2026; data from 2020) | Used on /the-problem, "The patient cost" |
| $2.17B lost investment in educating doctors who emigrated from nine African countries | Mills et al., *BMJ* 2011;343:d7031 (verified 6 Nov 2026) | Used on /the-problem. Ghana is not one of the nine countries |
| "Diagnostic and laboratory centres in Ghana are location sensitive, expensive to establish…" | WAHP feasibility study, quoted on the older build | Used on /the-problem. **Please keep the study on file** |
| "72% of clinics in Ghana cannot provide the full range of expected services due to a lack of personnel" | Older build, The Problem page (no citation) | **Not used.** No source found; send the citation if there is one |
| Physician earnings scenarios (GP $10,080 … cardiologist $27,360 a year after the WAHP fee) | Owner analysis, 6 Nov 2026 | **Not used.** Projections; if ever published, frame as "revenue after the WAHP session fee, before other costs and tax", show lower volumes, and have counsel review |
| Site copy in the older build's wording (6 Nov 2026, owner request) | Older WordPress build, all pages | About 75% of the words on Home, Platform, The Problem, Physicians, Diaspora, Investors, About and Contact now come from it (see `IMPLEMENTATION_LOG.md`). **Please check:** Physicians heading "Lower overhead. More control. Greater potential."; About mission ending "at their highest level, at home"; Investors hero "Building the infrastructure for Africa's next healthcare revolution" |

## C. Confidential material deliberately excluded

Fundraising targets, valuation, use of funds, projections, physician LOIs and names, survey responses, vendor, architect and lab-partner names, competitor names, candidate neighbourhoods and lease terms, data-room documents, and personnel changes. None of this appears in the repository or on the site.

## D. Requested in owner docs but not implemented (needs a decision)

- **Google Analytics / Meta Pixel** (Master Brief). These need a cookie-consent banner and privacy-notice updates; omitted for now.
- **Investor auto-email with pitch deck** (Master Brief). Excluded: distributing the deck automatically needs counsel review.
- **Newsletter sign up** ("Get WAHP Updates" on the older build's Contact page; HubSpot in the Master Brief). Can be added once a provider and form ID are supplied (and the CSP updated).
- **Separate "For Partners" page** (April blueprint). Partners are routed to the Partners Call on `/contact`. ("The Problem" became a full page on 6 Nov 2026.)
