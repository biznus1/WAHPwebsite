# Launch checklist

Nothing below has been done. **No production site, domain, DNS or Squarespace setting has been changed.**

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

## Legal
- [ ] Privacy notice, website terms and investor disclaimer reviewed by counsel (Ghana Data Protection Act 2012, Act 843; securities rules in the target jurisdictions)
- [ ] Emergency number wording confirmed

## Go-live (needs explicit owner sign-off)
- [ ] Choose a host (e.g. Vercel) and create the project
- [ ] Set `NEXT_PUBLIC_SITE_URL` and the canonical domain
- [ ] Set `NEXT_PUBLIC_ALLOW_INDEXING=true` **only** for production
- [ ] Point DNS for westahp.com; keep the Squarespace site until DNS cut-over is verified
- [ ] Redirects: `/founders` → `/leadership`, `/contact-us` → `/contact` (configured in `next.config.ts`; add any other legacy URLs)
- [ ] Re-run Lighthouse on the live URL; submit the sitemap in Google Search Console
