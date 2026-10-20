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

/** The four components of the proposed WAHP model. Stages are deliberately conservative. */
export const pillars: PlatformPillar[] = [
  {
    id: "clinical-space",
    number: "01",
    title: "Professional clinical space",
    short: "Clinical space",
    stage: "in-development",
    stageLabel: "In development · flagship",
    summary:
      "Purpose-designed consultation and examination suites that independent physicians can use without building and equipping a practice alone.",
    points: [
      "Multi-tenant outpatient suites designed for consultation and examination",
      "Professional, consistent patient-facing environment",
      "Flexible participation models under discussion with physicians",
    ],
  },
  {
    id: "shared-operations",
    number: "02",
    title: "Shared operational backbone",
    short: "Shared operations",
    stage: "in-development",
    stageLabel: "In development",
    summary:
      "One coordinated operations layer — front desk, patient flow, scheduling support and administration — shared across practices so physicians can focus on medicine.",
    points: [
      "Reception, patient flow and administrative support",
      "Shared clinical support where available and approved",
      "Common standards for facility management and compliance",
    ],
  },
  {
    id: "laboratory",
    number: "03",
    title: "Integrated laboratory",
    short: "Laboratory",
    stage: "planned",
    stageLabel: "Planned · subject to phase & approvals",
    summary:
      "On-site laboratory services intended to shorten the distance between consultation, diagnosis and follow-up — subject to the applicable launch phase and regulatory approvals.",
    points: [
      "Designed to keep diagnostics close to the consultation",
      "Introduced according to the phased rollout",
      "Operates only once licensed and approved",
    ],
  },
  {
    id: "imaging-digital",
    number: "04",
    title: "Imaging & digital enablement",
    short: "Imaging & digital",
    stage: "future",
    stageLabel: "Future phase",
    summary:
      "A later stage adds diagnostic imaging and connected digital tools that help practices coordinate care across the platform.",
    points: [
      "Diagnostic imaging as a future capability",
      "Digital tools for coordination between practices",
      "Sequenced after the core clinical platform is established",
    ],
  },
];

export interface RoadmapPhase {
  phase: string;
  title: string;
  description: string;
  stage: Stage;
}

/** No dates are published until the owner approves a timeline (docs/CONTENT_APPROVAL.md). */
export const roadmap: RoadmapPhase[] = [
  {
    phase: "Phase 1",
    title: "Flagship clinical infrastructure",
    description: "Establish the first multi-tenant outpatient facility in Accra with shared operations.",
    stage: "in-development",
  },
  {
    phase: "Phase 2",
    title: "Laboratory integration",
    description: "Introduce integrated laboratory services, subject to approvals and the launch sequence.",
    stage: "planned",
  },
  {
    phase: "Phase 3",
    title: "Imaging & digital enablement",
    description: "Add diagnostic imaging and digital coordination tools across participating practices.",
    stage: "future",
  },
  {
    phase: "Beyond",
    title: "A replicable regional model",
    description: "Apply the proven model to further sites in Ghana and, over time, across West Africa.",
    stage: "aspiration",
  },
];
