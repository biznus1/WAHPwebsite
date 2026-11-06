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
      "Fully equipped consultation and treatment rooms in the Accra hub, planned on flexible leases. A physician walks in, sees patients and walks out. The shared practice model is designed to lower the capital barrier to independent practice to a monthly operating cost.",
    points: [
      "Designed to solve fragmented care and the high capital barrier",
      "No facility management. No equipment procurement. No long term property commitments",
      "For the physician: full clinical autonomy without the cost of building your own facility",
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
      "The lab is planned as part of the platform, in the same building. Once it opens, each result reaches the physician's record digitally. Continuity of care is built into the workflow, not bolted on after the fact.",
    points: [
      "Designed to solve delayed diagnostics and a fragmented patient journey",
      "Lab results will feed directly into the patient file",
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
      "In a later phase, WAHP plans to provide onsite diagnostic imaging, including CT, MRI, ultrasound and X ray, within the same healthcare facility, so imaging can be coordinated more efficiently alongside patient consultations and other services.",
    points: [
      "Designed to solve long imaging queues and incomplete clinical information",
      "The aim: faster, more accurate decisions with complete information",
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
      "Electronic health records, scheduling, telemedicine and operational management tools. The technology layer designed to tie the physical infrastructure together, so physicians can focus on patients, not paperwork.",
    points: [
      "Patient records will be digital and accessible from any suite",
      "Lab results and, later, imaging reports will feed directly into the patient file",
      "Telemedicine is planned to extend the physician's reach beyond the physical hub",
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
    title: "Shared clinical suites",
    description:
      "Fully equipped consultation and treatment rooms on flexible leases, with shared reception, admin and the core digital tools.",
    stage: "in-development",
  },
  {
    phase: "Phase 2",
    title: "Integrated diagnostic lab",
    description:
      "The lab becomes part of the platform, so a physician can order laboratory testing without having to coordinate across multiple disconnected facilities.",
    stage: "planned",
  },
  {
    phase: "Phase 3",
    title: "Imaging services",
    description:
      "Onsite diagnostic imaging, including CT, MRI, ultrasound and X ray, within the same healthcare facility, once the suites and lab are well used.",
    stage: "future",
  },
  {
    phase: "Phase 4",
    title: "Beyond Accra",
    description:
      "Future phases are designed to expand the model to Kumasi and other Ghanaian markets and, over time, across West Africa.",
    stage: "aspiration",
  },
];

export const roadmapCaveat =
  "This is our current plan. Timing depends on funding, licensing, construction and how quickly the suites are used, and it may change.";
