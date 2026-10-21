# Content approval queue

The decisions below block or shape public launch. The machine-readable register is `src/content/claims.ts`; only `publicApproved: true` entries render.

## A. Critical decisions (please answer before launch)

2. **Hero headline.** The site currently uses *"Infrastructure for independent medicine."* Alternatives found in the owner's own materials, including the newer build's *"Revolutionizing Healthcare Infrastructure Across West Africa"*:
   - *"Grow Your Practice with West African Health Partners"* (CEO, Master Brief)
   - *"The infrastructure physicians need to practice at their highest level."* (March blueprint)
   - *"The Infrastructure for Africa's Next Healthcare Revolution"* (deck)

   Please choose one.
3. **Enquiry delivery.** Pick Resend email or a webhook (e.g. Zapier → Google Sheets / HubSpot) and supply credentials (`.env.example`). Until then the form clearly says *not sent*.
4. **Scheduling links.** Owner materials want *Schedule a Call* (Calendly) as the primary CTA. The four links (`calendly.com/westahp-info/…`, including the live misspelling `diaspora-physcians`) are wired in but hidden. Confirm they are live, then approve `scheduling-links` in the claims register.
5. **Legal review** of `/privacy`, `/terms`, the investor disclaimer, and the emergency number (112) used in the patient notices.

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
| "Hospitals have infrastructure but no autonomy. Clinics have autonomy but no infrastructure." | March blueprint / deck | Used on home ("…WAHP is designed to combine both.") |
| "Accra is the starting point, not the destination." | March blueprint | Used on home |
| "Stop managing. Start practising." / "Everything under one roof" | westahp.com themes (per brief) | Used as section headings. British spelling *practising* (en-GB). Confirm |
| Flexible leases (hourly/daily/monthly) | Questionnaire #10 | Used in the physician FAQ as *planned*. No rates |
| Lab, Phase 2; imaging, Phase 3 | One-Pager, Questionnaire | Shown as *Planned* / *Future phase*. **No years shown**, because sources conflict on expansion timing |
| Problem stats (72% emigration intent, 1:5,707, 62 km, $2B) and market sizes | March blueprint / deck | **Not used.** Unsourced; add citations if wanted |
| "20 physicians have signed Letters of Intent" | Owner confirmed 21 Oct 2026 | **Used** on /investors and /physicians |
| 60+ physicians surveyed, 3 studies completed, 5-person team | Newer site build; Questionnaire #29 | Used on /investors ("Groundwork to date") |
| Workforce stats: 1.43 per 10,000 (WHO 2022), 1:5,707 (MoH 2021), 11,867 registered (GMDC 2024), 71.8% migration intent | Newer site, The Problem page | Used on home with sources. **The 71.8% figure needs a full citation** |
| Market sizes ($1.21B, $214M, 42%, 36.7%) | Newer site, investors page | Not used (investor-materials territory) |
| Rule 506(c) accredited-investor notice + acknowledgement | Newer site, investors page | Used on /investors and in the investor form. **Counsel to confirm** |
| Imaging "within the same facility", on-site lab "results flow digitally" | Newer site | Reframed as Phase 2/3 *planned/future* |
| info@westahp.com | Questionnaire / contact blueprint | **Used.** Confirm the inbox is monitored |
| LinkedIn company page | Contact blueprint | Used in footer and contact page |
| Phone numbers (+1 / +233) | LOI letterhead only | Not used. Confirm before adding |
| Canonical domain: westahp.com vs westafricanhealthpartners.com | UI doc vs blueprint | `NEXT_PUBLIC_SITE_URL` defaults to westahp.com. Confirm |
| Instagram / X | Brand guide mock-ups | Not used. No confirmed handles; blueprint says no X |

## C. Confidential material deliberately excluded

Fundraising targets, valuation, use of funds, projections, physician LOIs and names, survey responses, vendor, architect and lab-partner names, competitor names, candidate neighbourhoods and lease terms, data-room documents, and personnel changes. None of this appears in the repository or on the site.

## D. Requested in owner docs but not implemented (needs a decision)

- **Google Analytics / Meta Pixel** (Master Brief). These need a cookie-consent banner and privacy-notice updates; omitted for now.
- **Investor auto-email with pitch deck** (Master Brief). Excluded: distributing the deck automatically needs counsel review.
- **HubSpot newsletter form.** Can be added once the form ID is supplied (and the CSP updated).
- **Separate "The Problem" and "For Partners" pages** (April blueprint). The problem is covered on the home page and partners are routed to `/contact?type=partnership`; both can become full pages.
