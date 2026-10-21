import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, FlaskConical, MonitorSmartphone, ScanLine } from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
import { ClinicalFloorSchematic } from "@/components/graphics/clinical-floor-schematic";
import { AudiencePaths } from "@/components/sections/audience-paths";
import { Comparison } from "@/components/sections/comparison";
import { ProblemStats } from "@/components/sections/problem-stats";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionIntro, SplitHeading, StageBadge } from "@/components/ui/primitives";
import { pillars } from "@/content/platform";

export const metadata: Metadata = {
  title: { absolute: "West African Health Partners — Infrastructure for independent medicine" },
  description:
    "WAHP is developing shared clinical infrastructure for independent outpatient practice — professional clinical space, a shared operational backbone and integrated diagnostics — beginning in Accra, Ghana.",
  alternates: { canonical: "/" },
};

const facts = [
  { label: "Flagship", value: "Accra, Ghana" },
  { label: "Model", value: "Shared outpatient infrastructure" },
  { label: "Built around", value: "Independent physicians" },
  { label: "Stage", value: "Pre-launch" },
];

const pillarIcons = [Building2, FlaskConical, ScanLine, MonitorSmartphone];

export default function HomePage() {
  return (
    <>
      {/* 1 — Hero */}
      <section className="grain on-dark relative overflow-hidden bg-navy text-white">
        <LogoMark className="pointer-events-none absolute -right-48 -bottom-72 size-[44rem] text-navy-700/35" />
        <div className="container-wahp relative grid items-center gap-14 pt-16 pb-20 md:pt-24 md:pb-28 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-10">
          <div>
            <StageBadge stage="pre-launch" label="Pre-launch · Accra, Ghana" dark />
            <h1 className="mt-7 text-display font-bold text-white">
              <span className="block text-steel">Infrastructure for</span>
              <span className="block">independent medicine.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lead text-white/78">
              West African Health Partners is building a shared clinical platform for outpatient care — professional
              clinical space, one operational backbone and integrated diagnostics — so independent physicians can focus
              on medicine.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/platform" size="lg" arrow>
                Explore the platform
              </ButtonLink>
              <ButtonLink href="/contact" size="lg" variant="light">
                Partner or enquire
              </ButtonLink>
            </div>
          </div>
          <div className="animate-rise [animation-delay:150ms]">
            <ClinicalFloorSchematic className="mx-auto max-w-[36rem]" />
          </div>
        </div>
      </section>

      {/* Fact strip */}
      <section aria-label="WAHP at a glance" className="border-b border-smoke bg-white">
        <dl className="container-wahp grid grid-cols-2 divide-smoke md:grid-cols-4 md:divide-x">
          {facts.map((f) => (
            <div key={f.label} className="py-6 md:px-8 md:first:pl-0">
              <dt className="eyebrow text-arsenic">{f.label}</dt>
              <dd className="mt-2 font-semibold text-navy">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 2 — What WAHP is, with a one-line view of the four pillars */}
      <Section tone="paper" labelledBy="what-heading">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionIntro id="what-heading" eyebrow="What WAHP is" lead="Not a hospital." rest="Not a room rental." />
          <div className="reveal space-y-6 text-lead text-arsenic lg:pt-14">
            <p>
              WAHP is developing a{" "}
              <strong className="font-semibold text-navy">healthcare infrastructure platform</strong>: multi-tenant
              outpatient space where independent physicians practise under their own names, supported by shared
              operations and diagnostics.
            </p>
            <blockquote className="border-l-2 border-teal pl-5 text-navy">
              Hospitals have infrastructure but no autonomy. Clinics have autonomy but no infrastructure. WAHP is
              designed to combine both.
            </blockquote>
          </div>
        </div>
        <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="The four pillars of the platform">
          {pillars.map((p, i) => {
            const Icon = pillarIcons[i];
            return (
              <li key={p.id} className="reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <Link
                  href="/platform"
                  className="group flex h-full flex-col gap-4 rounded-card bg-white p-5 ring-1 ring-inset ring-smoke transition-shadow hover:ring-steel"
                >
                  <span className="flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-cloud text-teal">
                      <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                    </span>
                    <span className="text-sm font-bold text-navy">{p.number}</span>
                  </span>
                  <span className="text-lg font-semibold text-navy">{p.title}</span>
                  <span className="mt-auto">
                    <StageBadge stage={p.stage} />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <Link href="/platform" className="group mt-8 inline-flex items-center gap-2 font-semibold text-navy">
          How the platform fits together
          <ArrowRight aria-hidden className="size-4 text-teal transition-transform group-hover:translate-x-0.5" />
        </Link>
      </Section>

      {/* 3 — The challenge */}
      <Section tone="navy" labelledBy="challenge-heading">
        <SectionIntro
          id="challenge-heading"
          eyebrow="The challenge"
          lead="Great physicians,"
          rest="fragmented infrastructure."
          dark
        >
          <p>
            Independent outpatient practice depends on infrastructure that is expensive to assemble alone: premises,
            equipment, staff, systems and access to diagnostics. When the system does not support doctors, doctors look
            elsewhere.
          </p>
        </SectionIntro>
        <div className="mt-12">
          <ProblemStats dark />
        </div>
      </Section>

      {/* 4 — Comparison */}
      <Section tone="paper" labelledBy="compare-heading">
        <SectionIntro
          id="compare-heading"
          eyebrow="Why shared infrastructure"
          lead="Stop managing."
          rest="Start practising."
        >
          <p>
            The proposed model moves the heaviest operational burdens onto one shared platform, so physicians keep their
            independence while gaining the foundation of a larger institution.
          </p>
        </SectionIntro>
        <div className="mt-12">
          <Comparison />
        </div>
      </Section>

      {/* 5 — Pathways (closing call to action) */}
      <Section tone="white" labelledBy="paths-heading">
        <div className="mb-12">
          <SplitHeading id="paths-heading" lead="Where do you fit?" rest="Choose your next step." className="reveal" />
        </div>
        <AudiencePaths />
      </Section>
    </>
  );
}
