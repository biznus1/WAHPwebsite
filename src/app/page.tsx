import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, FlaskConical, MonitorSmartphone, ScanLine } from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
import { ClinicalFloorSchematic } from "@/components/graphics/clinical-floor-schematic";
import { RegionalRings } from "@/components/graphics/regional-rings";
import { Roadmap } from "@/components/graphics/roadmap";
import { AudiencePaths } from "@/components/sections/audience-paths";
import { Comparison } from "@/components/sections/comparison";
import { ProblemStats } from "@/components/sections/problem-stats";
import { TeamGrid } from "@/components/sections/team-grid";
import { approvedLeaders } from "@/content/leadership";
import { CtaBand } from "@/components/sections/cta-band";
import { ButtonLink } from "@/components/ui/button";
import { ConceptImage } from "@/components/ui/concept-image";
import { Eyebrow, Section, SectionIntro, SplitHeading, StageBadge } from "@/components/ui/primitives";
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

      {/* 2 — What WAHP is */}
      <Section tone="paper" className="!pb-14 md:!pb-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionIntro eyebrow="What WAHP is" lead="Not a hospital." rest="Not a room rental." />
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
            <p>
              The flagship is planned for Accra. The model is designed to be repeatable — so that what works for one
              community of physicians can, over time, serve many.
            </p>
            <Link href="/about" className="group inline-flex items-center gap-2 text-base font-semibold text-navy">
              Our mission and approach
              <ArrowRight aria-hidden className="size-4 text-teal transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </Section>

      <section aria-label="Concept rendering" className="bg-paper pb-20 md:pb-28">
        <div className="container-wahp">
          <ConceptImage
            name="lobby"
            aspect="aspect-[4/3] md:aspect-[21/9]"
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="reveal"
          />
        </div>
      </section>

      {/* 3 — Platform narrative */}
      <Section tone="white" labelledBy="platform-heading">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionIntro
            id="platform-heading"
            eyebrow="The platform"
            lead="Everything under one roof,"
            rest="built in deliberate phases."
          />
          <ButtonLink href="/platform" variant="ghost" arrow className="reveal self-start md:self-auto">
            How it fits together
          </ButtonLink>
        </div>
        <ul className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((p, i) => {
            const Icon = pillarIcons[i];
            return (
              <li
                key={p.id}
                className="reveal flex flex-col rounded-card bg-paper p-6 ring-1 ring-inset ring-steel/60 md:p-7"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className="flex items-start justify-between">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-cloud text-teal ring-1 ring-inset ring-smoke">
                    <Icon aria-hidden className="size-6" strokeWidth={1.75} />
                  </span>
                  <span className="text-sm font-bold text-navy">{p.number}</span>
                </div>
                <h3 className="mt-8 text-title font-medium text-navy">{p.title}</h3>
                <p className="mt-3 flex-1 text-arsenic">{p.summary}</p>
                <div className="mt-6">
                  <StageBadge stage={p.stage} />
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* 4 — The challenge */}
      <Section tone="navy" labelledBy="challenge-heading">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <SectionIntro
            id="challenge-heading"
            eyebrow="The challenge"
            lead="Great physicians,"
            rest="fragmented infrastructure."
            dark
          >
            <p>
              Independent outpatient practice depends on infrastructure that is expensive to assemble alone: premises,
              equipment, staff, systems and access to diagnostics. When each practice carries that weight separately,
              time and capital move away from patients.
            </p>
          </SectionIntro>
          <ul className="grid gap-px self-end overflow-hidden rounded-card bg-white/10 sm:grid-cols-2">
            {[
              [
                "Capital-heavy start-up",
                "Fitting out a compliant clinical space is a significant barrier to practising independently.",
              ],
              ["Administrative drag", "Front desk, scheduling and records pull clinicians away from clinical work."],
              [
                "Diagnostics at a distance",
                "Patients are often referred elsewhere for tests, slowing decisions and follow-up.",
              ],
              [
                "Hard to scale quality",
                "Standards vary practice by practice, without a shared operational foundation.",
              ],
            ].map(([t, b], i) => (
              <li key={t} className="reveal bg-navy p-6 md:p-8" style={{ transitionDelay: `${i * 70}ms` }}>
                <span className="text-sm font-bold text-steel">0{i + 1}</span>
                <h3 className="mt-4 text-xl font-medium">{t}</h3>
                <p className="mt-2 text-white/70">{b}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-14">
          <h3 className="eyebrow mb-5 text-steel">The workforce picture in Ghana</h3>
          <ProblemStats dark />
        </div>
      </Section>

      {/* 5 — Comparison & benefits */}
      <Section tone="paper" labelledBy="compare-heading">
        <SectionIntro
          id="compare-heading"
          eyebrow="Why shared infrastructure"
          lead="Stop managing."
          rest="Start practising."
        >
          <p>
            The proposed model moves the heaviest operational burdens onto one shared platform — so physicians keep
            their independence while gaining the foundation of a larger institution.
          </p>
        </SectionIntro>
        <div className="mt-14">
          <Comparison />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="reveal rounded-card bg-white p-7 ring-1 ring-inset ring-smoke md:p-9">
            <Eyebrow>For physicians</Eyebrow>
            <h3 className="mt-5 text-title font-medium text-navy">More time for medicine.</h3>
            <p className="mt-3 text-arsenic">
              Professional space and shared support intended to lower the effort of running a practice, so clinical work
              comes first.
            </p>
            <Link href="/physicians" className="group mt-6 inline-flex items-center gap-2 font-semibold text-navy">
              For physicians{" "}
              <ArrowRight aria-hidden className="size-4 text-teal transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="reveal rounded-card bg-white p-7 ring-1 ring-inset ring-smoke md:p-9 [transition-delay:80ms]">
            <Eyebrow>For patients</Eyebrow>
            <h3 className="mt-5 text-title font-medium text-navy">More connected care — once we open.</h3>
            <p className="mt-3 text-arsenic">
              The model is designed so consultation and diagnostics sit closer together. WAHP is not yet seeing
              patients.
            </p>
            <Link href="/patients" className="group mt-6 inline-flex items-center gap-2 font-semibold text-navy">
              For patients{" "}
              <ArrowRight aria-hidden className="size-4 text-teal transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </Section>

      {/* 6 — Investor thesis */}
      <Section tone="navy" labelledBy="thesis-heading">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionIntro
              id="thesis-heading"
              eyebrow="The thesis"
              lead="Infrastructure first."
              rest="Designed to scale."
              dark
            >
              <p>
                WAHP treats outpatient care as an infrastructure problem: build the shared foundation once, prove it in
                Accra, then replicate it with discipline.
              </p>
            </SectionIntro>
            <ul className="mt-10 space-y-5">
              {[
                [
                  "A platform, not a single practice",
                  "Value is created by the shared system that many independent physicians use.",
                ],
                [
                  "Phased, evidence-led rollout",
                  "Each capability is added only once the previous phase is established.",
                ],
                [
                  "Built for the region",
                  "Accra is the starting point, not the destination: a model designed in and for West Africa.",
                ],
              ].map(([t, b]) => (
                <li key={t} className="reveal flex gap-4">
                  <span aria-hidden className="mt-2 size-2 shrink-0 rounded-full bg-teal" />
                  <div>
                    <p className="font-semibold">{t}</p>
                    <p className="mt-1 text-white/70">{b}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <ButtonLink href="/investors" variant="light" arrow>
                The investor perspective
              </ButtonLink>
            </div>
          </div>
          <RegionalRings className="reveal mx-auto w-full max-w-lg" />
        </div>
      </Section>

      {/* 7 — Roadmap */}
      <Section tone="white" labelledBy="roadmap-heading">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionIntro id="roadmap-heading" eyebrow="Roadmap" lead="A phased rollout," rest="stated plainly." />
          <p className="reveal max-w-sm text-sm text-arsenic">
            WAHP is pre-launch. Status labels describe intent and are updated as each phase progresses. Timelines are
            published once confirmed.
          </p>
        </div>
        <div className="mt-14">
          <Roadmap />
        </div>
      </Section>

      {/* Leadership teaser */}
      <Section tone="white" labelledBy="team-teaser-heading">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionIntro
            id="team-teaser-heading"
            eyebrow="Leadership"
            lead="Built by physicians."
            rest="Run by operators."
          />
          <ButtonLink href="/leadership" variant="ghost" arrow className="reveal self-start md:self-auto">
            Meet the team
          </ButtonLink>
        </div>
        <div className="mt-14">
          <TeamGrid leaders={approvedLeaders} compact />
        </div>
      </Section>

      {/* 8 — Pathways */}
      <Section tone="paper" labelledBy="paths-heading">
        <div className="mb-12">
          <SplitHeading id="paths-heading" lead="Where do you fit?" rest="Choose your next step." className="reveal" />
        </div>
        <AudiencePaths />
      </Section>

      <CtaBand
        lead="Built for physicians."
        rest="Designed for connected care."
        primary={{ href: "/contact", label: "Speak with the team" }}
        secondary={{ href: "/platform", label: "Explore the platform" }}
      >
        <p>
          Tell us who you are and what you&apos;re interested in — we&apos;ll route your enquiry to the right person.
        </p>
      </CtaBand>
    </>
  );
}
