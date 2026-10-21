# Site admin

The website has a built-in editor at **`/keystatic`**, linked discreetly as "Admin" at the bottom right of every page footer. It is built on [Keystatic](https://keystatic.com), an open-source editor that saves content as files in this repository. There is no database and no extra service to pay for.

## What can be edited

| Section | What it changes | Stored in |
| --- | --- | --- |
| Page headers | The status badge (Home), eyebrow, two-part headline and intro paragraph at the top of Home, Platform, Physicians, Investors, Patients, About, Leadership and Contact | `src/content/data/pages/*.json` |
| Leadership team | Each person's name, credentials, role, bio, focus areas, photo, LinkedIn link and whether they are shown. People can be added, removed or reordered | `src/content/data/team.json`, photos in `public/images/team/members/<name>/` |
| FAQs | The Physicians and Patients FAQ lists | `src/content/data/faqs.json` |

Everything else (body sections, graphics, the claims register, legal pages) is still edited in code. More sections can be moved into the admin later in the same way.

**Safeguards**
- Every save is checked when the site is built (`src/content/editable.ts`). Examples: an empty headline, a LinkedIn link that isn't `https://`, or a photo outside the team folder fails the build instead of publishing a broken page.
- Keep pre-launch wording honest. The Home status badge and the Patients "Not yet seeing patients" badge exist for compliance. The admin can't add statistics or claims; those still go through `src/content/claims.ts` and `CONTENT_APPROVAL.md`.

## How sign-in works

| Where | Mode | Login |
| --- | --- | --- |
| `npm run dev` on a laptop | Local: saves straight to the files on disk | None (only reachable on your own machine) |
| Deployed website | GitHub: each save is a commit to this repository, and the host rebuilds the site | Editors sign in with their GitHub account and need write access to `biznus1/WAHPwebsite` |

**On a deployed site the admin stays switched off until GitHub mode is configured.** Keystatic's local mode has no login, so `src/lib/admin.ts` disables the admin page and its API outside development unless `NEXT_PUBLIC_KEYSTATIC_STORAGE=github`. Until then, `/keystatic` shows "Site admin isn't switched on yet" and the API returns 404; `tests/e2e/admin.spec.ts` checks this.

## Switching it on for the live site (owner)

This needs owner sign-off. Like the rest of the launch, nothing here has been deployed.

1. **Host on a platform that runs Next.js server code** (for example Vercel). The admin needs the `/api/keystatic` route, so a purely static export won't work.
2. **Create the GitHub App** (one time, on a laptop):
   ```bash
   NEXT_PUBLIC_KEYSTATIC_STORAGE=github npm run dev
   ```
   - Open http://127.0.0.1:3000/keystatic and follow Keystatic's prompt to create a GitHub App for `biznus1/WAHPwebsite`.
   - It writes `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET` and `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` to `.env`. **Never commit `.env`**; it is git-ignored.
3. **In the GitHub App settings**, add the production callback URL: `https://<your-domain>/api/keystatic/github/oauth/callback`.
4. **On the host**, set the four variables above plus `NEXT_PUBLIC_KEYSTATIC_STORAGE=github`. Optionally set `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO` if the repository moves. Then redeploy.
5. **Give editors access.** Add each editor as a collaborator with write access to the repository; anyone without write access can't save.
6. **Choose the publishing branch.** Saves commit to the branch picked in the admin's branch menu. Point the host's production deployment at that branch, or save to a separate branch and merge it for review.
7. **Check it end to end.** Click "Admin" in the footer (or go to `/admin`), sign in, change a page header, save, and confirm the commit and the rebuilt page.

## Notes
- The admin route has its own Content Security Policy (`next.config.ts`). It allows Google Fonts for the editor's interface and GitHub's API for sign-in and saving. Public pages keep the strict policy.
- `/keystatic` is excluded from search engines (`noindex` header and `robots.txt`). The footer link is never prefetched, so visitors don't download the editor.
- `npm audit` reports a high-severity advisory in `braces` via `chokidar`, used by `@keystatic/next` for file watching in development. It doesn't run on the live site's request path. Re-check when Keystatic updates.
