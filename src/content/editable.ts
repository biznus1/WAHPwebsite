import { z } from "zod";
import home from "./data/pages/home.json";
import platform from "./data/pages/platform.json";
import physicians from "./data/pages/physicians.json";
import investors from "./data/pages/investors.json";
import patients from "./data/pages/patients.json";
import about from "./data/pages/about.json";
import leadership from "./data/pages/leadership.json";
import contact from "./data/pages/contact.json";
import diaspora from "./data/pages/diaspora.json";
import team from "./data/team.json";
import faqs from "./data/faqs.json";

/**
 * Content editable in the site admin (keystatic.config.ts). The JSON is validated at build time,
 * so a bad edit fails the build instead of publishing broken pages.
 */
const line = z.string().trim().min(1);

const header = z.object({ eyebrow: line, lead: line, rest: line, intro: line });
const homeHeader = z.object({ badge: line, lead: line, rest: line, intro: line });

export type PageHeader = z.infer<typeof header>;

export const pageHeaders = {
  home: homeHeader.parse(home),
  platform: header.parse(platform),
  physicians: header.parse(physicians),
  diaspora: header.parse(diaspora),
  investors: header.parse(investors),
  patients: header.parse(patients),
  about: header.parse(about),
  leadership: header.parse(leadership),
  contact: header.parse(contact),
};

export const memberSchema = z.object({
  // Stored by the admin as { name, slug }; the slug names the photo folder.
  name: z.object({ name: line, slug: z.string().regex(/^[a-z0-9-]+$/) }).transform((n) => n.name),
  credentials: z.string().trim().optional(),
  role: line,
  bio: line,
  focus: z.array(line),
  // Uploaded through the admin into public/images/team.
  photo: z
    .string()
    .startsWith("/images/team/")
    .refine((p) => !p.includes(".."), "Invalid photo path"),
  // https only, so an edit can never inject a javascript: or other scheme into an href.
  linkedin: z.string().url().startsWith("https://").nullish(),
  show: z.boolean(),
});

export type TeamMember = z.infer<typeof memberSchema>;

export const teamMembers = z.object({ members: z.array(memberSchema) }).parse(team).members;

const faq = z.object({ q: line, a: line });

export const faqLists = z
  .object({ physicians: z.array(faq), diaspora: z.array(faq), patients: z.array(faq) })
  .parse(faqs);
