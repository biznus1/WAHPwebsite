/**
 * Claims register.
 *
 * Every factual statement that could be disputed (numbers, operating status,
 * people, partnerships, contact details) is listed here. Components render a
 * claim only when `publicApproved` is true — see `approvedClaim()`.
 * Unresolved items are tracked for the owner in docs/CONTENT_APPROVAL.md.
 */

export type ClaimStatus = "verified" | "pending-review" | "unsupported" | "withdrawn";

export interface Claim {
  id: string;
  text: string;
  source: string;
  status: ClaimStatus;
  publicApproved: boolean;
  lastVerified: string | null;
  routes: string[];
  note?: string;
}

export const claims: Claim[] = [
  {
    id: "company-name",
    text: "West African Health Partners (WAHP)",
    source: "Brand Guidelines v1.0 (owner-supplied)",
    status: "verified",
    publicApproved: true,
    lastVerified: "2026-10-20",
    routes: ["*"],
  },
  {
    id: "flagship-accra",
    text: "WAHP's first site is planned for Accra, Ghana.",
    source: "Owner build brief, 20 Oct 2026",
    status: "verified",
    publicApproved: true,
    lastVerified: "2026-10-20",
    routes: ["/", "/platform", "/about", "/patients"],
  },
  {
    id: "pre-launch-status",
    text: "WAHP is pre-launch: no clinical services are operating and patients are not yet being seen.",
    source: "Owner build brief, 20 Oct 2026",
    status: "verified",
    publicApproved: true,
    lastVerified: "2026-10-20",
    routes: ["/", "/patients", "/physicians", "/platform"],
  },
  {
    id: "contact-email",
    text: "info@westahp.com",
    source:
      "Website Clarification Questionnaire (owner) + live westahp.com. NOTE: the newer site build shows info@wahp.org — owner to confirm",
    status: "verified",
    publicApproved: true,
    lastVerified: "2026-10-20",
    routes: ["/contact", "footer", "forms"],
    note: "Owner to confirm the inbox is actively monitored before launch.",
  },
  {
    id: "linkedin",
    text: "https://www.linkedin.com/company/west-african-health-partners",
    source: "WAHP contact-page blueprint (owner, Drive); no X/Twitter or Instagram at launch",
    status: "verified",
    publicApproved: true,
    lastVerified: "2026-10-20",
    routes: ["footer", "/contact"],
  },
  {
    id: "scheduling-links",
    text: "Calendly introductory-call links (calendly.com/westahp-info/…)",
    source: "WAHP contact-page blueprint (owner, Drive, Apr 2026)",
    status: "pending-review",
    publicApproved: false,
    lastVerified: null,
    routes: ["/contact"],
    note: "Owner's preferred primary CTA is 'Schedule a call'. Links could not be checked from the build environment; enable once confirmed live.",
  },
  {
    id: "stat-doctor-density",
    text: "1.43 doctors per 10,000 people in Ghana (WHO, 2022)",
    source: "WAHP site build /the-problem (owner), citing WHO 2022",
    status: "verified",
    publicApproved: true,
    lastVerified: "2026-10-21",
    routes: ["/"],
    note: "Primary source not independently re-checked from this environment.",
  },
  {
    id: "stat-doctor-ratio",
    text: "1:5,707 doctor-to-population ratio in Ghana (Ghana MoH, 2021)",
    source: "WAHP site build /the-problem (owner), citing Ghana Ministry of Health 2021",
    status: "verified",
    publicApproved: true,
    lastVerified: "2026-10-21",
    routes: ["/"],
  },
  {
    id: "stat-migration-intent",
    text: "71.8% of doctors surveyed in Ghana intended to migrate abroad",
    source: "WAHP site build /the-problem (owner), 'a recent study of doctors working in Ghana'",
    status: "verified",
    publicApproved: true,
    lastVerified: "2026-10-21",
    routes: ["/"],
    note: "Add the full citation. The same site's homepage says '72% … according to Ghana Medical Association surveys' — inconsistent attribution; 71.8% (study) is used.",
  },
  {
    id: "stat-registered-doctors",
    text: "11,867 medical doctors registered to practise in Ghana (GMDC, reported 2024)",
    source: "WAHP site build /the-problem (owner), citing Ghana Medical and Dental Council",
    status: "verified",
    publicApproved: true,
    lastVerified: "2026-10-21",
    routes: ["/"],
  },
  {
    id: "traction-lois",
    text: "20 physicians have signed Letters of Intent",
    source: "WAHP site build (home, physicians, diaspora pages)",
    status: "pending-review",
    publicApproved: false,
    lastVerified: null,
    routes: [],
    note: "Conflicts with the ~13 signed LOIs on Drive and with Questionnaire #28 (LOI counts in investor materials only). 'Early physician commitments secured' is used instead.",
  },
  {
    id: "traction-research",
    text: "60+ physicians surveyed; market, feasibility and phased-rollout studies completed",
    source: "WAHP site build (home, diaspora pages); Questionnaire #29 allows aggregate survey traction",
    status: "verified",
    publicApproved: true,
    lastVerified: "2026-10-21",
    routes: ["/investors", "/physicians"],
  },
  {
    id: "youtube",
    text: "https://www.youtube.com/@WestAfricanHealthPartners",
    source: "WAHP site build footer (owner)",
    status: "verified",
    publicApproved: true,
    lastVerified: "2026-10-21",
    routes: ["footer"],
  },
  {
    id: "first-claim",
    text: "The first integrated medical co-sharing and diagnostics infrastructure platform in West Africa.",
    source: "Website Clarification Questionnaire #34 (owner-approved wording)",
    status: "pending-review",
    publicApproved: false,
    lastVerified: null,
    routes: [],
    note: "Owner-approved wording, but a 'first' claim needs documented substantiation before publication.",
  },
  {
    id: "tagline",
    text: "Our Healthcare Revolution. For Africa. By Africa.™",
    source: "WAHP One-Pager / marketing materials (Drive)",
    status: "pending-review",
    publicApproved: false,
    lastVerified: null,
    routes: [],
    note: "Not used until owner confirms it is the current public tagline and the ™ usage is correct.",
  },
  {
    id: "stat-95-lower-overhead",
    text: "95% Lower Overhead",
    source: "Existing westahp.com homepage (per owner brief)",
    status: "unsupported",
    publicApproved: false,
    lastVerified: null,
    routes: [],
    note: "No supporting analysis supplied. Not used anywhere.",
  },
  {
    id: "stat-24-7-access",
    text: "24/7 Access",
    source: "Existing westahp.com homepage (per owner brief)",
    status: "unsupported",
    publicApproved: false,
    lastVerified: null,
    routes: [],
    note: "Implies an operating, staffed facility. Not used anywhere.",
  },
  {
    id: "stat-one-team",
    text: "1 Team / Multiple Practices",
    source: "Existing westahp.com homepage (per owner brief)",
    status: "pending-review",
    publicApproved: false,
    lastVerified: null,
    routes: [],
    note: "Conceptually consistent with the model, but phrased as a present-day fact. Replaced with 'one shared operational backbone' framed as the proposed model.",
  },
  {
    id: "leadership-profiles",
    text: "Core team: Jonathan Francois (CEO), Emmanuel Adomfeh (COO), Nana Kwame Obuobi (Medical Director), Emmanuel Oppong (Laboratory Manager), Nakeitheya Smith (CMO)",
    source: "Owner instruction 21 Oct 2026: copy founders from wahp.viewyourprojecthere.com/team",
    status: "verified",
    publicApproved: true,
    lastVerified: "2026-10-21",
    routes: ["/leadership", "/about", "/"],
    note: "Supersedes westahp.com/founders (which lists outdated roles and Elizabeth Aremu as CFO).",
  },
  {
    id: "laboratory-services",
    text: "Integrated laboratory services",
    source: "Owner build brief",
    status: "verified",
    publicApproved: true,
    lastVerified: "2026-10-20",
    routes: ["/platform", "/"],
    note: "Approved only as a planned capability subject to launch phase and approvals — never as operating.",
  },
  {
    id: "imaging-digital",
    text: "Imaging and digital enablement",
    source: "Owner build brief",
    status: "verified",
    publicApproved: true,
    lastVerified: "2026-10-20",
    routes: ["/platform", "/"],
    note: "Future / planned capability only.",
  },
  {
    id: "social-handles",
    text: "Instagram / X profiles",
    source:
      "Brand guidelines show Instagram and X avatars; contact blueprint says no X at launch; no Instagram handle found",
    status: "pending-review",
    publicApproved: false,
    lastVerified: null,
    routes: ["footer"],
  },
];

export function approvedClaim(id: string): Claim | null {
  const claim = claims.find((c) => c.id === id);
  return claim && claim.publicApproved ? claim : null;
}
