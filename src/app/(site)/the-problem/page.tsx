import type { Metadata } from "next";
import Image from "next/image";
import { CountUp } from "@/components/motion/count-up";
import { CtaBand } from "@/components/sections/cta-band";
import { InfrastructureGap } from "@/components/sections/infrastructure-gap";
import { StatCards, type StatCard } from "@/components/sections/stat-cards";
import { StickyCallBar } from "@/components/sections/sticky-call-bar";
import { Eyebrow } from "@/components/ui/primitives";
import { SiteImage } from "@/components/ui/site-image";
import { approvedClaim } from "@/content/claims";
import { callTypes } from "@/content/site";
import corridor from "../../../../public/images/photos/hospital-corridor.webp";

export const metadata: Metadata = {
  title: "The problem",
  description:
    "Ghana trains brilliant doctors, but many face financial pressure, demanding workloads and high barriers to private practice, and too many plan to leave. The problem in figures from WHO, Ghana's health facility assessment and a 2024 survey of 641 doctors.",
  alternates: { canonical: "/the-problem" },
};

const STUDY_URL = "https://doi.org/10.1186/s12913-024-11977-y";

/**
 * Headline figures, in the order of the story: pay, then capacity, then infrastructure. The first three whose
 * claims are approved are shown; the workforce ratio and register fill in if one is withdrawn.
 */
const headline: (StatCard & { claim: string })[] = [
  {
    claim: "stat-physician-income",
    value: "51%",
    label: "Of doctors surveyed reported earning GH₵10,000 to 15,000 a month",
    source: "Wutor et al., 2024 (survey of 641 doctors)",
  },
  { claim: "stat-doctor-density", value: "1.43", label: "Doctors per 10,000 people in Ghana", source: "WHO, 2022" },
  {
    claim: "stat-facility-internet",
    value: "28%",
    label: "Of the 1,421 health facilities assessed had a computer with internet",
    source: "Ghana Harmonized Health Facility Assessment, 2022",
  },
  {
    claim: "stat-doctor-ratio",
    value: "1:5,707",
    label: "Doctor to population ratio in Ghana",
    source: "Ghana Ministry of Health, 2021",
  },
  {
    claim: "stat-registered-doctors",
    value: "11,867",
    label: "Medical doctors registered to practise in Ghana",
    source: "Ghana Medical and Dental Council, reported 2024",
  },
];

const call =
  callTypes.length > 0
    ? { href: "/contact#schedule", label: "Schedule a call" }
    : { href: "/contact", label: "Get in touch" };

/**
 * The Problem, after the older WordPress build's page of the same name (owner's request, 6 Nov 2026):
 * the navy hero with its green highlight and workforce figures, physician migration with the doctor at
 * the window, the infrastructure gap, and the phone "Schedule a call" bar.
 */
export default function TheProblemPage() {
  const migration = approvedClaim("stat-migration-intent");
  const factors = approvedClaim("migration-factors");
  const income = approvedClaim("stat-physician-income");
  const figures = headline.filter((s) => approvedClaim(s.claim)).slice(0, 3);

  return (
    <>
      <section
        aria-labelledby="problem-heading"
        className="grain on-dark relative isolate overflow-hidden bg-navy text-white"
      >
        {/* A crowded corridor behind deep navy, as the older build set its hero over a photo. Decorative. */}
        <Image
          src={corridor}
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          className="-z-20 object-cover object-[50%_40%] opacity-60"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,51,102,0.88)_0%,rgba(0,51,102,0.84)_55%,#003366_100%)]"
        />
        <div className="container-wahp py-20 md:py-28">
          <div className="max-w-3xl">
            <Eyebrow accent="green">The problem</Eyebrow>
            <h1 id="problem-heading" className="mt-6 text-display font-bold text-white">
              Brilliant doctors cannot carry <span className="text-green">a broken system alone.</span>
            </h1>
            <p className="mt-8 text-lead text-white/85">
              Ghana has highly skilled physicians and significant healthcare needs. Yet many doctors face financial
              pressure, demanding workloads and substantial barriers to establishing a private practice. They are
              expected to deliver excellent care with limited diagnostics, outdated systems, inadequate clinical space
              and too many barriers outside the exam room.
            </p>
            <p className="mt-6 text-lead text-white italic">
              WAHP is building the clinical environment that makes better care possible.
            </p>
          </div>

          {figures.length > 0 && (
            <div className="mt-16 md:mt-20">
              <h2 className="eyebrow text-steel">The consequences are measurable</h2>
              <StatCards items={figures} className="mt-6 md:grid-cols-3" />
            </div>
          )}
        </div>
      </section>

      {income && (
        <section aria-labelledby="pay-heading" className="bg-paper py-20 md:py-28">
          <div className="container-wahp grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            {/* The figure in a navy panel, green on navy as on the older build's stat cards. */}
            <div className="reveal grain on-dark relative overflow-hidden rounded-panel bg-navy p-8 text-white md:p-10">
              <Eyebrow accent="green">Physician compensation</Eyebrow>
              <p className="mt-8 text-[clamp(2.25rem,9vw,3rem)] leading-none font-bold tracking-tight whitespace-nowrap text-green">
                GH₵10K to 15K
              </p>
              <p className="mt-3 text-xl font-semibold text-white">a month</p>
              <p className="mt-6 text-lead text-white/85">
                51% of the 641 physicians surveyed in Ghana in March 2024 reported monthly incomes within this range.
              </p>
              <p className="mt-6 text-sm text-white/70">
                Source:{" "}
                <a
                  href={STUDY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
                >
                  Wutor et al., BMC Health Services Research, 2024 (641 doctors)
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
            </div>
            <div className="reveal">
              <h2 id="pay-heading" className="text-headline font-bold text-navy">
                Years of training. Significant responsibility.{" "}
                <span className="text-graphite">Too few ways to build on them.</span>
              </h2>
              <p className="mt-6 text-lead text-arsenic">
                Despite years of medical training and significant clinical responsibility, many physicians seek better
                remuneration and working conditions. In the same study, economic challenges were the strongest reason
                doctors gave for wanting to work abroad.
              </p>
              <h3 className="mt-10 text-title font-semibold text-navy">The barriers to practising independently</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  "Expensive leases",
                  "Equipment purchases",
                  "Staffing costs",
                  "Administrative responsibilities",
                  "Regulatory requirements",
                  "Diagnostics in other locations",
                ].map((b) => (
                  <li key={b} className="flex items-center gap-3 text-arsenic">
                    <span aria-hidden className="size-2 shrink-0 rounded-full bg-teal" />
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-lead text-arsenic">
                These financial and operational barriers restrict opportunities for physicians to increase their
                earnings and build independent careers.
              </p>
            </div>
          </div>
        </section>
      )}

      {migration && (
        <section aria-labelledby="migration-heading" className="bg-white py-20 md:py-28">
          <div className="container-wahp grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <SiteImage
              name="physicianMigration"
              className="reveal reveal-media"
              aspect="aspect-[4/3]"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="reveal">
              <Eyebrow accent="navy">Physician migration</Eyebrow>
              {/* Large figure in a navy to teal gradient: at this size teal clears 3:1 on white. */}
              <p className="mt-6 bg-gradient-to-r from-navy to-teal bg-clip-text text-[clamp(4.5rem,13vw,7rem)] leading-none font-bold tracking-tight text-transparent">
                <CountUp value="71.8%" />
              </p>
              <h2 id="migration-heading" className="mt-6 text-headline font-bold text-navy">
                When the system does not support doctors, doctors look elsewhere.
              </h2>
              <div className="mt-6 space-y-5 text-lead text-arsenic">
                <p>
                  A 2024 study of 641 doctors working in Ghana found that 71.8% intended to migrate abroad.
                  {factors &&
                    " The strongest push factors included economic challenges, the lack of a conducive working environment, slow career progression, excessive workload and poor postgraduate training. The strongest pull factors included better working conditions, better remuneration, a better quality of life and better postgraduate training abroad."}
                </p>
                <p>
                  This is not simply a salary issue. It is a systems issue. Physicians are more likely to stay where
                  they can grow, practise well, access diagnostics, work in organised environments and deliver the
                  quality of care they were trained to provide.
                </p>
              </div>
              <p className="mt-6 text-sm text-arsenic">
                Source:{" "}
                <a
                  href={STUDY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-navy underline decoration-teal decoration-2 underline-offset-4"
                >
                  Wutor et al., BMC Health Services Research, 2024
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
            </div>
          </div>
        </section>
      )}

      <InfrastructureGap above="text-white" below="text-paper" />

      <div data-sticky-stop>
        <CtaBand
          lead="WAHP is built to close"
          rest="the infrastructure gap."
          primary={call}
          secondary={{ href: "/platform", label: "Discover the platform" }}
          greenAccent
        >
          <p>
            West African Health Partners is not building another traditional hospital. We are creating the
            infrastructure physicians need to practise optimally and the access patients need to receive timely,
            reliable care.
          </p>
        </CtaBand>
      </div>

      <StickyCallBar href={call.href} label={call.label} />
    </>
  );
}
