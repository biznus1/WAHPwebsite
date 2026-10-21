import type { StaticImageData } from "next/image";
import jonathan from "../../public/images/team/jonathan-francois.webp";
import emmanuelA from "../../public/images/team/emmanuel-adomfeh.webp";
import nanaKwame from "../../public/images/team/nana-kwame-obuobi.webp";
import emmanuelO from "../../public/images/team/emmanuel-oppong.webp";
import nakeitheya from "../../public/images/team/nakeitheya-smith.webp";

/**
 * Core team, copied at the owner's instruction (21 Oct 2026) from the team page of
 * the latest WAHP site build (wahp.viewyourprojecthere.com/team). That site's
 * advisory-board cards are unfilled placeholders, so no advisors are listed.
 * LinkedIn URLs come from the founders page of westahp.com (/founders-1), except
 * Jonathan Francois (both sites agree). No public profile was found for Nakeitheya Smith.
 * Set `publicApproved: false` to hide anyone.
 */
export interface Leader {
  name: string;
  credentials?: string;
  role: string;
  bio: string;
  focus: string[];
  photo: StaticImageData;
  linkedin?: string;
  publicApproved: boolean;
}

export const leaders: Leader[] = [
  {
    name: "Jonathan Francois",
    credentials: "MD",
    role: "Co-Founder & Chief Executive Officer",
    bio: "Physician. Founded WAHP to solve the infrastructure gap he saw firsthand working across healthcare systems in Haiti, the US, and West Africa. Leads strategy, fundraising, and the vision for building a replicable healthcare infrastructure platform across the region.",
    focus: ["Strategy", "Fundraising", "Vision", "Physician"],
    photo: jonathan,
    linkedin: "https://www.linkedin.com/in/jofrancoismd",
    publicApproved: true,
  },
  {
    name: "Emmanuel Adomfeh",
    credentials: "MD, MPH",
    role: "Co-Founder & Chief Operating Officer",
    bio: "Physician and public health specialist with deep operational experience across West African healthcare systems. Leads operations, partnership development, and the on-the-ground execution of WAHP's first hub in Accra.",
    focus: ["Operations", "Partnerships", "Hub Development", "Public Health"],
    photo: emmanuelA,
    linkedin: "https://www.linkedin.com/in/emmanuel-adomfeh-7419a918/",
    publicApproved: true,
  },
  {
    name: "Nana Kwame Obuobi",
    credentials: "MBBS, MPH",
    role: "Medical Director",
    bio: "Harvard T.H. Chan School of Public Health, MPH 2026. Responsible for establishing medical standards, physician onboarding protocols, and quality of care benchmarks across all WAHP facilities.",
    focus: ["Medical Standards", "Quality of Care", "Physician Onboarding"],
    photo: nanaKwame,
    linkedin: "https://www.linkedin.com/in/nana-kwame-asare-obuobi-md-mph-07143b264/",
    publicApproved: true,
  },
  {
    name: "Emmanuel Oppong",
    role: "Laboratory Manager",
    bio: "Oversees all laboratory operations including diagnostic workflows, equipment procurement and maintenance, lab staff management, and quality assurance protocols for WAHP's integrated diagnostic facilities.",
    focus: ["Lab Operations", "Diagnostics", "Equipment", "Quality Assurance"],
    photo: emmanuelO,
    linkedin: "https://www.linkedin.com/in/emmanuel-oppong-boakye-3838523aa/",
    publicApproved: true,
  },
  {
    name: "Nakeitheya Smith",
    role: "Chief Marketing Officer",
    bio: "Leads brand strategy, physician engagement, investor communications, and strategic partnerships at West African Health Partners. Dedicated to positioning WAHP as the premier platform empowering physicians to build and grow modern, technology-enabled practices across West Africa.",
    focus: ["Brand Strategy", "Physician Engagement", "Investor Communications", "Strategic Partnerships"],
    photo: nakeitheya,
    publicApproved: true,
  },
];

export const approvedLeaders = leaders.filter((l) => l.publicApproved);
