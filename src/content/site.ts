import { approvedClaim } from "./claims";

export const site = {
  name: "West African Health Partners",
  shortName: "WAHP",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.westahp.com",
  description:
    "West African Health Partners is building shared clinical infrastructure for independent outpatient medicine, beginning in Accra, Ghana.",
  locale: "en_GH",
  copyrightYear: 2026,
  /** Public contact email — null until approved in the claims register or set via NEXT_PUBLIC_CONTACT_EMAIL. */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || approvedClaim("contact-email")?.text || null,
  linkedin: approvedClaim("linkedin")?.text ?? null,
  youtube: approvedClaim("youtube")?.text ?? null,
  /** Introductory-call links; rendered only once the "scheduling-links" claim is approved. */
  scheduling: approvedClaim("scheduling-links")
    ? [
        { label: "Physicians", href: "https://calendly.com/westahp-info/physician-call" },
        { label: "Diaspora physicians", href: "https://calendly.com/westahp-info/diaspora-physcians" },
        { label: "Investors", href: "https://calendly.com/westahp-info/investor-call" },
        { label: "Partners", href: "https://calendly.com/westahp-info/partners-call" },
      ]
    : [],
};

export interface NavItem {
  href: string;
  label: string;
  description?: string;
}

export const primaryNav: NavItem[] = [
  { href: "/platform", label: "Platform", description: "How the model fits together" },
  { href: "/physicians", label: "Physicians", description: "Practise without building alone" },
  { href: "/diaspora-physicians", label: "Diaspora", description: "Practise, partner, or both" },
  { href: "/investors", label: "Investors", description: "The infrastructure thesis" },
  { href: "/patients", label: "Patients", description: "What care could feel like" },
  { href: "/about", label: "About", description: "Mission and approach" },
];

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Audiences",
    items: [
      { href: "/physicians", label: "For physicians" },
      { href: "/diaspora-physicians", label: "For diaspora physicians" },
      { href: "/investors", label: "For investors" },
      { href: "/patients", label: "For patients" },
      { href: "/contact?type=partnership", label: "For partners" },
    ],
  },
  {
    heading: "Company",
    items: [
      { href: "/platform", label: "Platform" },
      { href: "/about", label: "About WAHP" },
      { href: "/leadership", label: "Leadership" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Legal",
    items: [
      { href: "/privacy", label: "Privacy notice" },
      { href: "/terms", label: "Website terms" },
    ],
  },
];

export type EnquiryType = "physician" | "investor" | "partnership" | "vendor" | "media" | "general";

export const enquiryTypes: { value: EnquiryType; label: string; hint: string }[] = [
  { value: "physician", label: "Physician", hint: "In Ghana or the diaspora" },
  { value: "investor", label: "Investor", hint: "Request an introduction" },
  { value: "partnership", label: "Strategic partner", hint: "Growth and alignment" },
  { value: "vendor", label: "Vendor & industry", hint: "Labs, equipment, technology" },
  { value: "media", label: "Media", hint: "Press and speaking" },
  { value: "general", label: "General", hint: "Patients and everyone else" },
];
