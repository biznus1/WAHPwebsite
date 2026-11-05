# Launch checklist

**Staging deployment (5 Nov 2026):** Vercel project `wahp-website` (account biznus1, Hobby) serves the branch `ccr-01d11262-1nlrsu` at https://wahp-website.vercel.app. The production address is public; preview and per-deployment URLs need a Vercel login. Indexing is off (`robots.txt` disallows all), no environment variables are set, so enquiries report "not sent", and the site admin is switched off. The project is **not linked to Git** on purpose: the repository's default branch on GitHub is the older `ccr-3f23f1ac-xtw4sr`, and a linked project would publish that branch to production. Each update is deployed from this branch by hand until the default branch is fixed (e.g. create `main` from this branch and make it the default), after which the project can be linked.

No domain, DNS or Squarespace setting has been changed.

## Owner decisions (from CONTENT_APPROVAL.md §A)
- [ ] Leadership names, titles and consent (+ LinkedIn URLs)
- [ ] Hero headline choice
- [ ] Mission/vision wording checked against the One-Pager
- [ ] Calendly links confirmed live → approve `scheduling-links`
- [ ] Concept-render rights confirmed (who produced them, licence)

## Integrations
- [ ] Enquiry delivery: Resend (`RESEND_API_KEY`, `ENQUIRY_FROM_EMAIL`, `ENQUIRY_TO_EMAIL`) **or** `ENQUIRY_WEBHOOK_URL`
- [ ] Send a real test enquiry of each type and confirm receipt
- [ ] If deploying to many serverless instances: move the rate limiter to a shared store
- [ ] Analytics: only if wanted, with a consent banner and privacy-notice update
- [ ] Site admin: create the Keystatic GitHub App, set its env vars and `NEXT_PUBLIC_KEYSTATIC_STORAGE=github` on the host, add the production callback URL, and test a save (`docs/ADMIN.md`)

## Legal
- [ ] Privacy notice, website terms and investor disclaimer reviewed by counsel (Ghana Data Protection Act 2012, Act 843; securities rules in the target jurisdictions)
- [ ] Emergency number wording confirmed

## Go-live (needs explicit owner sign-off)
- [x] Choose a host (e.g. Vercel) and create the project (`wahp-website`, staging only, see above)
- [ ] Set `NEXT_PUBLIC_SITE_URL` and the canonical domain
- [ ] Set `NEXT_PUBLIC_ALLOW_INDEXING=true` **only** for production
- [ ] Point DNS for westahp.com; keep the Squarespace site until DNS cut-over is verified
- [ ] Redirects: `/founders` → `/leadership`, `/contact-us` → `/contact` (configured in `next.config.ts`; add any other legacy URLs)
- [ ] Re-run Lighthouse on the live URL; submit the sitemap in Google Search Console
