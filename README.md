# West African Health Partners — website

A marketing site for West African Health Partners (WAHP): shared clinical infrastructure for independent outpatient medicine, beginning in Accra, Ghana.

**Status: staging build for owner review. Not deployed. Search indexing is off by default.**

## Run it

```bash
npm install
npm run dev            # http://localhost:3000 (development)
# or, production preview:
npm run build && npm run start
```

## Checks

```bash
npm run lint           # ESLint
npm run typecheck      # TypeScript (strict)
npm test               # Vitest unit tests (validation, spam checks, rate limit, claims register)
npm run build && npm run test:e2e   # Playwright journeys (desktop + mobile Chromium)
```

## Static preview

`node scripts/snapshot.mjs http://localhost:3000 <outDir>` (with the production server running) writes a script-free
copy of every page with inlined fonts and images, used for the shareable Artifact preview.

## Stack

Next.js 16 (App Router, Turbopack, Cache Components), React 19, TypeScript strict, Tailwind CSS v4 with brand tokens in `src/app/globals.css`, Zod, lucide-react, self-hosted Manrope (`@fontsource-variable/manrope`). Playwright and Vitest for tests. No CMS, no analytics, no tracking cookies.

## Structure

```text
src/app/                 routes: / platform physicians investors patients about leadership contact privacy terms
src/app/actions/         server action for the enquiry form
src/components/brand/    official logo (paths from the owner's SVG files)
src/components/graphics/ original SVG graphics: floor schematic, platform system, roadmap, regional rings
src/components/sections/ page sections: hero, pathways, comparison, FAQ, CTA band, legal layout
src/components/forms/    enquiry form (segmented, validated, honeypot + time-trap)
src/components/ui/       buttons, badges, cards, notices, concept-image
src/content/             site copy, platform/roadmap data, claims register, leadership
src/lib/                 enquiry schema, delivery (Resend/webhook), rate limiter
public/brand/            official logo SVGs
public/images/concepts/  owner-supplied concept renders (labelled as concepts on-site)
docs/                    research, brand implementation, content approval, QA, launch checklist
```

## Environment variables

See `.env.example`. Without a delivery integration the form **does not pretend to succeed**: it says the message was not sent and offers the email address.

## Content rules

All potentially disputable facts live in `src/content/claims.ts`. Only claims with `publicApproved: true` are rendered. Open decisions are tracked in `docs/CONTENT_APPROVAL.md`.
