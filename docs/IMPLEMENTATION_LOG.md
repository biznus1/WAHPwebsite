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
