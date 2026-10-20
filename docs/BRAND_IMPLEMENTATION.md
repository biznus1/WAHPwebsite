# Brand implementation

**Governing sources**

1. *West African Health Partners — Brand Guidelines v1.0* (owner-supplied PDF, 24 pages; same file as Drive `West African Health Partners.pdf`, 2025-07-11).
2. Owner website directives in the *Website Clarification Questionnaire* and *Website Rebuild Master Brief* (Drive, Feb 2026): colour usage, type scale and logo rules.

## Logo

| Asset | Source | Use |
| --- | --- | --- |
| `public/brand/wahp-lockup.svg` | Drive *Logo Files › SVG › Asset 3.svg* | Primary lockup, light backgrounds |
| `public/brand/wahp-lockup-reversed.svg` | Drive *Asset 1.svg* | Reversed lockup, navy backgrounds only |
| `public/brand/wahp-mark.svg`, `src/app/icon.svg` | Drive *Emblem › SVG › Asset 7.svg* | Emblem / favicon |
| `public/favicon-16x16.png`, `favicon-32x32.png` | Drive *Favicon 32x32 and 16x16* | Raster favicons |

The inline `<Logo>` component (`src/components/brand/logo.tsx`) renders the exact paths from these files (`logo-paths.ts`). Nothing was redrawn.

- Colourways follow guideline p.11: primary = navy emblem + "West African", green "Health Partners"; reversed = white + green.
- Clear space: the "W" cap height on all sides (owner rule). The header gives ≥ 18px of clear space at 36–40px height.
- Minimum width: 120px (owner rule). The header logo renders at about 160–180px wide.
- The large, faint emblem on navy panels reproduces the watermark treatment on the guideline cover and section pages (navy-700 tone, `#26507A`).

## Colour

| Token | Hex | Source | Website role |
| --- | --- | --- | --- |
| `paper` | `#F5F6FC` | Primary 01 | Page / section background |
| `green` | `#8BC900` | Primary 02 | **CTA buttons only** (owner directive) and the logo |
| `navy` | `#003366` | Primary 03 | Headings, dark sections, primary brand surface |
| `teal` | `#00879E` | Primary 04 | Accent icons, rules, diagram lines, focus rings |
| `cloud` … `phantom` | `#EDEFF7` `#D3D6E0` `#BCBFCC` `#9DA2B3` `#6E7180` `#40424D` `#1E1E24` | Grayscale 01–07 | Surfaces, borders, text |
| `navy-900` | `#002447` | Derived shade | Hover state of navy buttons only |
| `navy-700` | `#26507A` | Guideline covers | Watermark emblem only |

There are no gradients and no colours outside this list.

### Accessibility adaptations (flagged for owner awareness)

- **Green buttons use navy text**, not white. White on `#8BC900` is about 2.0:1 and fails WCAG AA; navy on green is about 6.1:1. The guideline mock-ups show white text, so this is the one intentional deviation.
- **Teal is not used for small text.** `#00879E` on white is 4.2:1, below the 4.5:1 needed for body text. It is used for icons, rules and large numerals (≥ 24px) only.
- The guideline's two-tone heading device ("Lockup / Logo.") uses Space grey `#9DA2B3`, which is too light for text on white. Headings use Graphite `#6E7180` (large text, ≥ 3:1) on light backgrounds and Steel `#BCBFCC` on navy.

## Typography

- **Manrope** variable (200–800), self-hosted from `@fontsource-variable/manrope` (SIL OFL 1.1). No requests to third-party font servers.
- Owner scale: H1 48–60px Bold · H2 32–40px Semibold · H3 24–28px Medium · body 16–18px. These are implemented as fluid tokens `text-display`, `text-headline`, `text-title` and `text-lead`.
- Section spacing is ≥ 96px on desktop (`py-28` = 112px).

## Imagery

- Original vector graphics: the floor schematic, platform system diagram, roadmap rail and regional rings. All are captioned or described as conceptual.
- Owner concept renders (lobby, consultation suite, laboratory) carry a "Concept rendering" badge and a caption on every use. Details are in `ASSET_INVENTORY.md`.
- No stock photography, testimonials or headshots.

## Voice

Authoritative, institutional and plain. We say "clinical infrastructure platform" or "shared clinical infrastructure"; the site never uses "coworking" or "WeWork for doctors". Every capability is labelled *in development*, *planned*, *future phase* or *long-term ambition*.
