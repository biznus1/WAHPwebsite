# Site Audit (RAW) — NOT PERFORMED: sites inaccessible

Date attempted: 2026-10-20

## Status
Neither site could be reached from this research environment, so **no content inventory,
screenshots, visual-identity notes, or SEO checks exist**. Nothing below is an audit of
either site, and nothing in this file should be treated as observed site content.

| Site | Result |
|---|---|
| https://www.westahp.com/ (+ /about, /founders, /contact-us) | Shell/Playwright egress: proxy 403 (host not on the session's network allowlist). WebFetch: `getaddrinfo ENOTFOUND`. |
| https://wahp.kwasimd.chatgpt.site/ | Same: proxy 403; WebFetch `ENOTFOUND`. |
| Control checks (example.com, web.archive.org, archive.org) | Also blocked (403 / ENOTFOUND), so this is environment-wide, not a site outage. |
| Web search | No indexed pages for westahp.com or "West African Health Partners"; results only cover the unrelated West African Health Organization (WAHO). |
| Repo | No saved HTML/PDF/screenshot copies of either site (repo is a fresh Next.js scaffold). |

No screenshots were captured; `docs/research/screenshots/` was not created.

## How to unblock
Pick one:
1. Add `www.westahp.com`, `westahp.com`, and `wahp.kwasimd.chatgpt.site` to the cloud environment's
   Allowed domains (environment menu in the session title bar → Edit → Network access; steps at
   https://code.claude.com/docs/en/cloud-environments#network-access), then re-run the audit.
2. Or put exports in the repo (e.g. `docs/research/source/`): browser "Save Page As → Complete"
   HTML for each page, plus full-page desktop and mobile screenshots or PDFs.

## Claims named in the brief (NOT observed; carried over from the request only)
The brief listed these as examples of claims that may be on the existing site. They could not
be confirmed as present. If they are, each needs substantiation before reuse:
- "95% Lower Overhead": a quantified financial claim. Needs a source model or should be removed.
  It is risky for a pre-launch company with no operating data.
- "24/7 Access": implies a facility is operating and staffed. Must not appear pre-launch unless
  reframed as a planned feature ("designed for extended-hours access").
- "1 Team / Multiple Practices": a positioning statement. Acceptable as intent; check the wording.

## Pre-launch wording guardrails (general, for the new build)
Do not state or imply any of these without documentary evidence:
- "Open", "now serving", "book an appointment", "accepting patients", "walk-ins welcome"
- Licensing/accreditation (e.g. HeFRA facility licence, Medical and Dental Council, lab
  accreditation) or "licensed"/"accredited"/"certified"
- Operational imaging/digital services. These should read as "planned".
- Patient counts, physician counts, testimonials, partner logos, or savings percentages
- Founder/leadership names, titles, credentials. These must come from the client, not the old sites.
