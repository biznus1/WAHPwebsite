import { config, fields, singleton } from "@keystatic/core";

/**
 * Site admin (Keystatic). Content is stored as JSON in src/content/data and read at build time.
 *
 * - Local mode (default): edits files on disk. Only available under `next dev`; there is no login.
 * - GitHub mode (NEXT_PUBLIC_KEYSTATIC_STORAGE=github): admins sign in with GitHub and each save is a
 *   commit to the repository, which triggers a rebuild. Requires the GitHub App env vars in .env.example.
 *
 * Setup and safeguards: docs/ADMIN.md.
 */
export const adminStorage = process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github" ? "github" : "local";
const repo = (process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO || "biznus1/WAHPwebsite") as `${string}/${string}`;

const text = (label: string, description?: string, max = 120) =>
  fields.text({ label, description, validation: { length: { min: 1, max } } });

const headerSchema = {
  eyebrow: text("Eyebrow", "Small label above the headline."),
  lead: text("Headline, first part", "Shown in light blue."),
  rest: text("Headline, second part", "Shown in white."),
  intro: fields.text({ label: "Intro paragraph", multiline: true, validation: { length: { min: 1, max: 400 } } }),
};

const pages = {
  platform: "Platform",
  physicians: "Physicians",
  investors: "Investors",
  patients: "Patients",
  about: "About",
  leadership: "Leadership",
  contact: "Contact",
} as const;

const pageSingletons = Object.fromEntries(
  Object.entries(pages).map(([slug, label]) => [
    `page-${slug}`,
    singleton({
      label: `${label} page header`,
      path: `src/content/data/pages/${slug}`,
      format: { data: "json" },
      schema: headerSchema,
    }),
  ]),
);

const faqList = (label: string) =>
  fields.array(
    fields.object({
      q: text("Question", undefined, 200),
      a: fields.text({ label: "Answer", multiline: true, validation: { length: { min: 1, max: 800 } } }),
    }),
    { label, itemLabel: (props) => props.fields.q.value },
  );

export default config({
  storage: adminStorage === "github" ? { kind: "github", repo } : { kind: "local" },
  ui: {
    brand: { name: "WAHP site admin" },
    navigation: {
      "Page headers": ["page-home", ...Object.keys(pages).map((slug) => `page-${slug}`)],
      Content: ["team", "faqs"],
    },
  },
  singletons: {
    "page-home": singleton({
      label: "Home page header",
      path: "src/content/data/pages/home",
      format: { data: "json" },
      schema: {
        badge: text("Status badge", "Keep the pre-launch status visible, e.g. “Pre-launch · Accra, Ghana”."),
        lead: headerSchema.lead,
        rest: headerSchema.rest,
        intro: headerSchema.intro,
      },
    }),
    ...pageSingletons,
    team: singleton({
      label: "Leadership team",
      path: "src/content/data/team",
      format: { data: "json" },
      schema: {
        members: fields.array(
          fields.object({
            // A slug field gives each person a stable photo folder (public/images/team/members/<slug>/).
            name: fields.slug({
              name: { label: "Name", validation: { length: { min: 1, max: 120 } } },
              slug: {
                label: "Photo folder name",
                description: "Generated from the name; letters, numbers and dashes.",
              },
            }),
            credentials: fields.text({ label: "Credentials", description: "For example “MD, MPH”. Optional." }),
            role: text("Role"),
            bio: fields.text({ label: "Bio", multiline: true, validation: { length: { min: 1, max: 800 } } }),
            focus: fields.array(text("Focus area", undefined, 40), {
              label: "Focus areas",
              itemLabel: (props) => props.value,
            }),
            photo: fields.image({
              label: "Photo",
              description: "Square crop works best.",
              directory: "public/images/team",
              publicPath: "/images/team/",
              validation: { isRequired: true },
            }),
            linkedin: fields.url({ label: "LinkedIn URL", description: "Optional. Must start with https://" }),
            show: fields.checkbox({ label: "Show on the website", defaultValue: true }),
          }),
          { label: "Team members", slugField: "name", itemLabel: (props) => props.fields.name.value.name },
        ),
      },
    }),
    faqs: singleton({
      label: "FAQs",
      path: "src/content/data/faqs",
      format: { data: "json" },
      schema: {
        physicians: faqList("Physicians page FAQs"),
        patients: faqList("Patients page FAQs"),
      },
    }),
  },
});
