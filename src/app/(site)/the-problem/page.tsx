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
    "Ghana trains brilliant doctors, but too many plan to practise elsewhere. Why the system around them is the problem, in figures from WHO, Ghana's Ministry of Health and a 2024 survey of 641 doctors.",
  alternates: { canonical: "/the-problem" },
};

const STUDY_URL = "https://doi.org/10.1186/s12913-024-11977-y";

/** Workforce figures as on the older build's The Problem page. Each shows only while its claim is approved. */
const workforce: (StatCard & { claim: string })[] = [
  { claim: "stat-doctor-density", value: "1.43", label: "Doctors per 10,000 people in Ghana", source: "WHO, 2022" },
  {
    claim: "stat-doctor-ratio",
    value: "1:5,707",
    label: "One doctor for every 5,707 people in Ghana",
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
  const figures = workforce.filter((s) => approvedClaim(s.claim));

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
              Across the region, talented doctors are expected to deliver excellent care with limited diagnostics,
              outdated systems, too little clinical space and too many barriers outside the consulting room.
            </p>
            <p className="mt-6 text-lead text-white italic">
              WAHP is building the clinical environment that makes better care possible.
            </p>
          </div>

          {figures.length > 0 && (
            <div className="mt-16 md:mt-20">
              <h2 className="eyebrow text-steel">Ghana&apos;s doctors in numbers</h2>
              <StatCards items={figures} className="mt-6 md:grid-cols-3" />
            </div>
          )}
        </div>
      </section>

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
                  In a 2024 survey of 641 doctors working in Ghana, 71.8% said they intended to migrate to practise
                  abroad.
                  {factors &&
                    " The strongest push factors included economic challenges, the lack of a conducive working environment, slow career progression, excessive workload and poor postgraduate training. The strongest pull factors included better working conditions, better pay, a better quality of life and better postgraduate training abroad."}
                </p>
                <p>
                  This is not simply a salary issue. It is a systems issue. Physicians are more likely to stay where
                  they can grow, practise well, use diagnostics, work in organised environments and deliver the quality
                  of care they were trained to provide.
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
          lead="Help us build"
          rest="the system doctors deserve."
          primary={call}
          secondary={{ href: "/platform", label: "See how it works" }}
          greenAccent
        >
          <p>Physicians, investors and partners: a 30 minute call is the best place to start.</p>
        </CtaBand>
      </div>

      <StickyCallBar href={call.href} label={call.label} />
    </>
  );
}
