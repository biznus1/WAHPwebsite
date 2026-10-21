import type { Stage } from "@/components/ui/primitives";

export interface PlatformPillar {
  id: string;
  number: string;
  title: string;
  short: string;
  stage: Stage;
  stageLabel: string;
  summary: string;
  points: string[];
}

/**
 * The four pillars of the WAHP platform (structure from the latest WAHP site build).
 * Stages follow the phased plan: nothing is described as operating today.
 */
export const pillars: PlatformPillar[] = [
  {
    id: "clinical-suites",
    number: "01",
    title: "Equipped clinical suites",
    short: "Clinical suites",
    stage: "in-development",
    stageLabel: "Phase 1 · in development",
    summary:
      "Fully equipped consultation and examination rooms on flexible leases, with shared reception and administrative support — so physicians can practise without buildout costs, facility management or equipment procurement.",
    points: [
      "Flexible lease options planned (for example by the hour, day or month)",
      "Shared reception, patient flow and administrative support",
      "No buildout and no long-term property commitment for the physician",
    ],
  },
  {
    id: "diagnostic-lab",
    number: "02",
    title: "Integrated diagnostic laboratory",
    short: "Diagnostic lab",
    stage: "planned",
    stageLabel: "Phase 2 · planned",
    summary:
      "An on-site laboratory designed so results flow digitally from the lab to the physician — building continuity of care into the workflow instead of bolting it on afterwards.",
    points: [
      "Testing kept close to the consultation",
      "Results designed to feed directly into the patient record",
      "Operates only once licensed and approved",
    ],
  },
  {
    id: "imaging",
    number: "03",
    title: "Imaging services",
    short: "Imaging",
    stage: "future",
    stageLabel: "Phase 3 · future",
    summary:
      "Diagnostic imaging — such as X-ray, ultrasound and CT — introduced after core utilisation and operational workflows are established, so imaging can be coordinated alongside consultations.",
    points: [
      "Added after the clinical suites and laboratory are established",
      "Intended to shorten imaging queues and complete the clinical picture",
      "Timing depends on capital, licensing and utilisation",
    ],
  },
  {
    id: "digital-tools",
    number: "04",
    title: "Digital tools",
    short: "Digital tools",
    stage: "in-development",
    stageLabel: "Phase 1 · core platform in development",
    summary:
      "Electronic health records, scheduling, telemedicine capability and operational management tools — the technology layer that ties the physical infrastructure together.",
    points: [
      "Patient records designed to be accessible from any suite",
      "Lab and imaging results designed to feed the patient file",
      "Telemedicine to extend the physician's reach beyond the hub",
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
    title: "Clinical suites launch",
    description:
      "Equipped clinical suites, shared reception and administrative support, and the core technology platform.",
    stage: "in-development",
  },
  {
    phase: "Phase 2",
    title: "Laboratory integration",
    description: "On-site laboratory services to increase provider utility and strengthen referral pathways.",
    stage: "planned",
  },
  {
    phase: "Phase 3",
    title: "Imaging expansion",
    description: "X-ray, ultrasound and CT, added after core utilisation and workflows are established.",
    stage: "future",
  },
  {
    phase: "Phase 4",
    title: "Replication",
    description: "Use flagship performance data to evaluate additional Ghanaian and regional locations.",
    stage: "aspiration",
  },
];

export const roadmapCaveat =
  "Phase sequencing reflects management's current plan. Timing depends on capital, licensing, construction and utilisation outcomes, and is subject to change.";
