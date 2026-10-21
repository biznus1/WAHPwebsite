import type { Stage } from "@/components/ui/primitives";
import type { SiteImageName } from "@/components/ui/site-image";

export interface PlatformPillar {
  id: string;
  number: string;
  title: string;
  short: string;
  stage: Stage;
  stageLabel: string;
  summary: string;
  points: string[];
  image: SiteImageName;
}

/**
 * The four pillars of the WAHP platform (structure from the latest WAHP site build).
 * Stages follow the phased plan: nothing is described as operating today.
 */
export const pillars: PlatformPillar[] = [
  {
    id: "clinical-suites",
    image: "clinicBpCheck",
    number: "01",
    title: "Equipped clinical suites",
    short: "Clinical suites",
    stage: "in-development",
    stageLabel: "Phase 1 · in development",
    summary:
      "Equipped consulting and examination rooms in the Accra hub, rented as you need them. Reception and admin are shared, so you practise without fitting out premises, running a building or buying equipment.",
    points: [
      "Rooms planned by the hour, day or month",
      "One reception desk, one schedule, shared admin staff",
      "No fit out costs and no lease to sign for years",
    ],
  },
  {
    id: "diagnostic-lab",
    image: "pillarLaboratory",
    number: "02",
    title: "Integrated diagnostic laboratory",
    short: "Diagnostic lab",
    stage: "planned",
    stageLabel: "Phase 2 · planned",
    summary:
      "A laboratory in the same building, so a patient can give a sample after the consultation and the result reaches the physician's record digitally. No second trip across Accra for tests.",
    points: [
      "Samples taken down the corridor, not across town",
      "Results go straight into the patient record",
      "Opens only once licensed and approved",
    ],
  },
  {
    id: "imaging",
    image: "pillarImaging",
    number: "03",
    title: "Imaging services",
    short: "Imaging",
    stage: "future",
    stageLabel: "Phase 3 · future",
    summary:
      "CT, MRI and other scans, added once the consulting rooms and lab are busy and running well. The aim is for scans to be booked alongside the consultation, in the same building.",
    points: [
      "Comes after the consulting rooms and the lab",
      "Meant to cut waits for scans",
      "Timing depends on funding, licensing and demand",
    ],
  },
  {
    id: "digital-tools",
    image: "physicianLaptop",
    number: "04",
    title: "Digital tools",
    short: "Digital tools",
    stage: "in-development",
    stageLabel: "Phase 1 · core platform in development",
    summary:
      "Electronic records, scheduling, telemedicine and the tools we use to run the hub. This is what lets several independent practices share one building without losing track of their patients.",
    points: [
      "Your patient records open in whichever room you use",
      "Lab and scan results land in the same file",
      "Telemedicine for follow up with patients outside Accra",
    ],
  },
];

export interface RoadmapPhase {
  phase: string;
  title: string;
  description: string;
  stage: Stage;
}

export const roadmap: RoadmapPhase[] = [
  {
    phase: "Phase 1",
    title: "Consulting rooms open",
    description:
      "Equipped consulting rooms in Accra, shared reception and admin, and the core records and scheduling system.",
    stage: "in-development",
  },
  {
    phase: "Phase 2",
    title: "Laboratory on site",
    description: "A lab in the same building, so physicians can order tests without sending patients elsewhere.",
    stage: "planned",
  },
  {
    phase: "Phase 3",
    title: "Imaging added",
    description: "CT, MRI and other scans, once the consulting rooms and lab are well used.",
    stage: "future",
  },
  {
    phase: "Phase 4",
    title: "The next city",
    description: "Use what we learn in Accra to decide on Kumasi and, in time, other West African cities.",
    stage: "aspiration",
  },
];

export const roadmapCaveat =
  "This is our current plan. Timing depends on funding, licensing, construction and how quickly the rooms are used, and it may change.";
