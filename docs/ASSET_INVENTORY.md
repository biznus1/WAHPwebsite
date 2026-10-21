# Asset inventory and provenance

| File | Origin | Rights / approval | Notes |
| --- | --- | --- | --- |
| `public/brand/*.svg`, `src/app/icon.svg`, `public/favicon-*.png` | Owner Drive › Branding › Logo Files | Owner's own brand assets | Unmodified copies |
| `public/images/concepts/lobby.webp` | Drive `WAHP-Website-Photos/the-platform/3D Lobby 4K .jpeg` (2026-01-02) | Owner-supplied for the website; **owner to confirm licence/creator rights** | Resized to 2400px WebP. Appears AI-generated. Concept only |
| `public/images/concepts/consultation-suite.webp` | Drive `3D Examination room 4k logo.jpeg` (2026-01-01) | As above | Cropped to remove the burned-in logo corner |
| `public/images/concepts/laboratory.webp` | Drive `3D Laboratory 4k with WAHP logo.jpeg` (2026-01-10) | As above | Cropped to remove the burned-in logo. Depicts a **planned** service |
| `public/images/team/*.webp` (5 headshots) | wahp.viewyourprojecthere.com/team (same files as Drive WAHP-Website-Photos) | Owner instruction to copy the founders; consent assumed via owner | Converted to square WebP; source resolutions 296–1080px |
| `public/images/photos/*.webp` (17 images) | Copied 21 Oct 2026 at the owner's instruction from wahp.viewyourprojecthere.com (15) and westahp.com (2: `patient-portrait`, Unsplash; `clinic-interior`) | **Owner to confirm licences.** Files named only with numbers (e.g. `34747.jpg`, `85710.jpg`) look like stock-library downloads, which may require a licence or attribution. `file_0000…` images look AI-generated | Shown with an "Illustrative image" badge; `founders` is a real photo (no badge); `patient-journey` is a diagram from the new site |
| Ten stock photos, replaced on 21 Oct 2026 at the owner's request: African health workers in community and clinic settings | See the table below | Free licences; credits on `/terms#image-credits` and on each image | Replace the source-site photos that showed doctors |
| Inline SVG graphics (`src/components/graphics/*`) | Original work for this build | WAHP | Labelled conceptual |
| Manrope font | `@fontsource-variable/manrope` | SIL Open Font License 1.1 | Self-hosted |
| Icons | `lucide-react` | ISC licence | Used sparingly |

**Not used from the source sites:**
- Seven hospital and university logos (Corewell, NYU Langone, Sanford, Michigan Medicine, IU Health, Columbia Mailman, Yale New Haven). They appear as an unlabelled strip and would imply affiliations.
- The "capital partners" image with a dashboard showing "$245.7M", which would read as investment figures.
- Duplicates of the three concept renders, and duplicate headshots.
- Google Maps tiles, the loading GIF, and screenshots of UI mock-ups.
- Clinicians in surgical masks or PPE, which look like pandemic-era imagery.

**Not used from Drive:**
- The corridor render: its wall sign says "Radiology", which implies imaging exists.
- The empty CT-scan placeholder.

## Stock photos of health workers in Africa (added 21 Oct 2026)

| File | Source | Licence | Credit |
| --- | --- | --- | --- |
| `doctor-child-consultation.webp` | Wikimedia Commons, "A young girl sits with a doctor receiving medical care" (Nigeria) | CC BY-SA 2.0 | Carla Keithley |
| `community-bp-screening.webp` | Wikimedia Commons, "A uniformed nurse listening to a patient's BP" (Ghana) | CC BY-SA 4.0 | Kwameghana |
| `clinic-bp-check.webp` | Wikimedia Commons, "Checking blood pressure" | CC BY-SA 4.0 | Pambelle12 |
| `midwives-newborn.webp` | Wikimedia Commons, "US, Ghana midwives team up in maternity ward at African Lion 2025" | Public domain (U.S. Government) | U.S. Army, 1st Lt. Katherine Sibilla |
| `nurse-child-ward.webp` | Pexels 34185202 | Pexels licence | Speak Media Uganda |
| `doctor-clinic-kinshasa.webp` | Pexels 18844981 (Kinshasa) | Pexels licence | Carmel Nsenga |
| `doctor-labcoat-kinshasa.webp` | Pexels 19218034 (Kinshasa) | Pexels licence | Carmel Nsenga |
| `village-hospital-yard.webp` | Pexels 4483669 | Pexels licence | Pexels contributor (name to confirm) |
| `community-outreach.webp` | Pexels 4483695 | Pexels licence | Pexels contributor (name to confirm) |
| `physician-laptop.webp` | Pexels 4989179 | Pexels licence | Pexels contributor (name to confirm) |

**Removed** (replaced by the photos above): the source-site photos `physician-consultation`, `clinic-conversation`, `pillar-suites`, `pillar-digital`, `patient-checkup`, `hospital-corridor`, `physician-with-patient`, `diaspora-physician`, `investor-banner`, `family-consultation` and `partners-meeting` (Home investors card now uses `clinic-interior`).

**Kept from the source sites (no doctor shown):** `pillar-laboratory`, `pillar-imaging` (technologist), `patient-portrait`, `clinic-interior`, `founders`, `patient-journey`.

**Not used:** stock photos showing identifiable public figures or named individuals (for example, a UK minister's hospital visit and a profile photo of a named Korle Bu nurse), and US military surgical-mission photos.
