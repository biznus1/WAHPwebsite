# Content approval queue

The decisions below block or shape public launch. The machine-readable register is `src/content/claims.ts`; only `publicApproved: true` entries render.

## A. Critical decisions (please answer before launch)

1. **Leadership.** Nobody is named on the site yet. Owner direction (Master Brief) is *name, title, LinkedIn only, no bios*. Please confirm each person's public title and consent:
   - Jonathan Francois, MD: CEO, Co-Founder
   - Emmanuel Adomfeh, MD, MPH: COO, Co-Founder
   - Elizabeth Aremu, MHA, MPH: the Feb deck and March blueprint say *CFO*; Team Bios (June 2026) says *Strategic Finance Advisor / Former CFO*. **Which title, and should she be listed?**
   - Nana Kwame Asare Obuobi: *MBBS, MPH* (deck) vs *MD, MPH* (Team Bios). Medical Director.
   - Emmanuel Oppong: Laboratory Manager. His headshot is a small 24 KB file, so it may need a higher-resolution version.

   To publish, add entries to `src/content/leadership.ts` with `publicApproved: true`.
2. **Hero headline.** The site currently uses *"Infrastructure for independent medicine."* Alternatives found in the owner's own materials:
   - *"Grow Your Practice with West African Health Partners"* (CEO, Master Brief)
   - *"The infrastructure physicians need to practice at their highest level."* (March blueprint)
   - *"The Infrastructure for Africa's Next Healthcare Revolution"* (deck)

   Please choose one.
3. **Enquiry delivery.** Pick Resend email or a webhook (e.g. Zapier → Google Sheets / HubSpot) and supply credentials (`.env.example`). Until then the form clearly says *not sent*.
4. **Scheduling links.** Owner materials want *Schedule a Call* (Calendly) as the primary CTA. The four links (`calendly.com/westahp-info/…`, including the live misspelling `diaspora-physcians`) are wired in but hidden. Confirm they are live, then approve `scheduling-links` in the claims register.
5. **Legal review** of `/privacy`, `/terms`, the investor disclaimer, and the emergency number (112) used in the patient notices.

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
| Traction (LOIs, physicians surveyed, studies) | March blueprint | **Not used.** Questionnaire #28: say "Early physician commitments secured" publicly. Owner may approve that line |
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
