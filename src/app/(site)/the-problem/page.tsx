import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { Building2, Microscope, Quote, Unplug } from "lucide-react";
import { CountUp } from "@/components/motion/count-up";
import { CurrencyFlip } from "@/components/motion/currency-flip";
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
    "Ghana trains brilliant doctors, but there are too few of them, many face financial pressure and high barriers to private practice, and too many plan to leave. The problem in figures from WHO, Ghana's health facility assessment and peer reviewed studies, and what it costs patients.",
  alternates: { canonical: "/the-problem" },
};

const STUDY_URL = "https://doi.org/10.1186/s12913-024-11977-y";
const WAGE_URL = "https://doi.org/10.1186/1478-4491-2-3";
const EMIGRATION_COST_URL = "https://doi.org/10.1136/bmj.d7031";
const CRITICAL_CARE_URL = "https://doi.org/10.1007/s11739-024-03607-6";

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

/** Medical doctors per 10,000 people, 2022, as quoted in Wutor et al. 2024. Ghana is the highlighted bar. */
const density = [
  { country: "Ghana", value: 1.4 },
  { country: "South Africa", value: 8 },
  { country: "United States", value: 36 },
];
const DENSITY_MAX = 36;

/** The older build's three system gaps, in its wording. */
const gaps = [
  {
    n: "one",
    icon: Microscope,
    title: "Limited access to diagnostics",
    body: "Too many patients face delays because laboratory testing, imaging and diagnostic services are limited, expensive or concentrated in a few facilities. When diagnostics are delayed, care is delayed.",
  },
  {
    n: "two",
    icon: Unplug,
    title: "Fragmented technology and records",
    body: "Many clinics still operate with disconnected systems, paper based workflows and limited digital coordination. This makes it harder for providers to track patients, share information, manage follow up and deliver coordinated care.",
  },
  {
    n: "three",
    icon: Building2,
    title: "Inadequate clinical infrastructure",
    body: "Many physicians and healthcare providers lack access to modern, equipped, flexible clinical space. Building a private practice requires major upfront cost, staffing, licensing, equipment and operational complexity.",
  },
];

const call =
  callTypes.length > 0
    ? { href: "/contact#schedule", label: "Schedule a call" }
    : { href: "/contact", label: "Get in touch" };

/** A cited source under a figure on navy. */
function NavySource({ href, children, className = "mt-4" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <p className={`${className} text-sm text-white/70`}>
      Source:{" "}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
      >
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </p>
  );
}

/** A cited source on a light background. */
function Source({ href, children }: { href: string; children: ReactNode }) {
  return (
    <p className="mt-6 text-sm text-arsenic">
      Source:{" "}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-navy underline decoration-teal decoration-2 underline-offset-4"
      >
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </p>
  );
}

/**
 * The Problem, after the older WordPress build's page of the same name (owner's requests, 6 Nov 2026). The story
 * runs: the problem in figures; too few doctors; pay and the barriers to private practice; the three system gaps
 * and how they compound; migration; what it costs patients; the infrastructure gap; and how WAHP closes it.
 * Every figure is gated by its claim. The older build's "72% of clinics" line had no source and is left out.
 */
export default function TheProblemPage() {
  const migration = approvedClaim("stat-migration-intent");
  const factors = approvedClaim("migration-factors");
  const income = approvedClaim("stat-physician-income");
  const usd = approvedClaim("pay-usd-conversion");
  const comparison = approvedClaim("stat-doctor-density-comparison");
  const registered = approvedClaim("stat-registered-doctors") && approvedClaim("stat-registered-doctors-caveat");
  const diagnostics = approvedClaim("feasibility-diagnostics");
  const wageGap = approvedClaim("stat-wage-gap");
  const criticalCare = approvedClaim("stat-critical-care-staff");
  const emigrationCost = approvedClaim("stat-emigration-cost");
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

      {(comparison || registered || diagnostics) && (
        <section aria-labelledby="workforce-heading" className="bg-white py-20 md:py-28">
          <div className="container-wahp grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
            <div className="reveal">
              <Eyebrow accent="navy">The workforce</Eyebrow>
              <h2 id="workforce-heading" className="mt-6 text-headline font-bold text-navy">
                Ghana has too few doctors for its population.
              </h2>
              {comparison && (
                <>
                  <p className="mt-6 text-lead text-arsenic">
                    A 2024 study notes that Ghana had only 1.4 medical doctors per 10,000 people as of 2022, compared
                    with 8 per 10,000 in South Africa and 36 per 10,000 in the United States.
                  </p>
                  {/* One measure, three countries: Ghana in teal, the comparators in grey, every value labelled. */}
                  <figure className="mt-10 rounded-card bg-paper p-6 ring-1 ring-inset ring-smoke md:p-8">
                    <figcaption className="text-sm font-semibold text-graphite">
                      Medical doctors per 10,000 people, 2022
                    </figcaption>
                    <dl className="mt-6 grid gap-5">
                      {density.map((d, i) => {
                        const ghana = d.country === "Ghana";
                        return (
                          <div
                            key={d.country}
                            className="grid grid-cols-[6.5rem_minmax(0,1fr)_2.25rem] items-center gap-3 sm:grid-cols-[8rem_minmax(0,1fr)_2.5rem] sm:gap-4"
                          >
                            <dt className={`text-sm ${ghana ? "font-semibold text-navy" : "text-arsenic"}`}>
                              {d.country}
                            </dt>
                            <dd className="contents">
                              <span aria-hidden className="h-3 overflow-hidden rounded-r-[4px] bg-cloud">
                                <span
                                  className={`stat-bar block h-full rounded-r-[4px] ${ghana ? "bg-teal" : "bg-space"}`}
                                  style={{
                                    width: `${Math.max((d.value / DENSITY_MAX) * 100, 1.5)}%`,
                                    transitionDelay: `${200 + i * 160}ms`,
                                  }}
                                />
                              </span>
                              <span
                                className={`text-right font-semibold tabular-nums ${ghana ? "text-navy" : "text-arsenic"}`}
                              >
                                {d.value}
                              </span>
                            </dd>
                          </div>
                        );
                      })}
                    </dl>
                  </figure>
                  <Source href={STUDY_URL}>Wutor et al., BMC Health Services Research, 2024</Source>
                </>
              )}
            </div>

            <div className="grid content-start gap-5">
              {registered && (
                <article className="reveal rounded-card bg-paper p-6 ring-1 ring-inset ring-smoke md:p-8">
                  <p className="text-headline leading-none font-bold tracking-tight text-navy">
                    <CountUp value="11,867" />
                  </p>
                  <h3 className="mt-5 text-title font-semibold text-navy">
                    Many registered doctors may not be actively practising in Ghana
                  </h3>
                  <p className="mt-3 text-arsenic">
                    The same study cites Ghana Medical and Dental Council data showing 11,867 registered medical
                    doctors, but notes that this figure includes doctors who have migrated or may no longer be actively
                    practising, meaning the real active workforce may be lower.
                  </p>
                </article>
              )}
              {diagnostics && (
                <article className="reveal rounded-card bg-paper p-6 ring-1 ring-inset ring-smoke md:p-8">
                  <span className="grid size-12 place-items-center rounded-xl bg-navy text-green">
                    <Microscope aria-hidden className="size-6" />
                  </span>
                  <h3 className="mt-5 text-title font-semibold text-navy">Diagnostic access remains a major gap</h3>
                  <p className="mt-3 text-arsenic">
                    WAHP&apos;s feasibility study emphasises that diagnostic and laboratory centres in Ghana are
                    location sensitive, expensive to establish, and dependent on land costs, equipment costs, exchange
                    rates, duties and maintenance. It also recommends prioritising locations with high population
                    density but limited access to diagnostic services.
                  </p>
                </article>
              )}
            </div>
          </div>
        </section>
      )}

      {income && (
        <section aria-labelledby="pay-heading" className="bg-paper py-20 md:py-28">
          <div className="container-wahp grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            {/* The figures in a navy panel, green on navy as on the older build's stat cards. */}
            <div className="reveal grain on-dark relative overflow-hidden rounded-panel bg-navy p-8 text-white md:p-10">
              <Eyebrow accent="green">Physician compensation</Eyebrow>
              {/* Switches back and forth between cedis (green) and US dollars (red), owner's request, 6 Nov 2026. */}
              {usd ? (
                <CurrencyFlip
                  first="GH₵10K to 15K"
                  second="$790 to $1,180"
                  label="GH₵10,000 to 15,000, about $790 to $1,180 in US dollars"
                  caption="a month"
                  figureClassName="mt-8 text-[clamp(2.25rem,9vw,3rem)] leading-none font-bold tracking-tight whitespace-nowrap text-green"
                  secondClassName="text-red"
                  captionClassName="text-xl font-semibold text-white"
                />
              ) : (
                <>
                  <p className="mt-8 text-[clamp(2.25rem,9vw,3rem)] leading-none font-bold tracking-tight whitespace-nowrap text-green">
                    GH₵10K to 15K
                  </p>
                  <p className="mt-3 text-xl font-semibold text-white">a month</p>
                </>
              )}
              <p className="mt-6 text-lead text-white/85">
                51% of the 641 physicians surveyed in Ghana in March 2024 reported monthly incomes within this range.
              </p>
              {usd && (
                <p className="mt-4 text-white/75">
                  That is about <span className="font-semibold whitespace-nowrap text-red">$790 to $1,180</span> a month
                  at the Bank of Ghana&apos;s average rate for March 2024, GH₵12.67 to the US dollar.
                </p>
              )}
              <NavySource href={STUDY_URL} className="mt-6">
                Wutor et al., BMC Health Services Research, 2024 (641 doctors)
              </NavySource>

              {wageGap && (
                <div className="mt-8 border-t border-white/15 pt-8">
                  <p className="text-[clamp(2.25rem,9vw,3rem)] leading-none font-bold tracking-tight text-green">
                    <span aria-hidden>
                      <CountUp value="~22×" />
                    </span>
                    <span className="sr-only">About 22 times</span>
                  </p>
                  <p className="mt-4 text-lead text-white/85">
                    Historical gap between physician pay in the United States and in Ghana, adjusted for the cost of
                    living.
                  </p>
                  <NavySource href={WAGE_URL}>Vujicic et al., Human Resources for Health, 2004 estimate</NavySource>
                </div>
              )}
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

      <section aria-labelledby="gaps-heading" className="bg-white py-20 md:py-28">
        <div className="container-wahp">
          <div className="reveal max-w-3xl">
            <Eyebrow accent="navy">Main healthcare system gaps</Eyebrow>
            <h2 id="gaps-heading" className="mt-6 text-headline font-bold text-navy">
              Three system gaps holding healthcare back
            </h2>
            <p className="mt-6 text-lead text-arsenic">
              Each one compounds the others until practising becomes structurally harder than emigrating.
            </p>
          </div>

          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {gaps.map((g, i) => (
              <li
                key={g.n}
                className="reveal flex flex-col rounded-card bg-paper p-6 ring-1 ring-inset ring-smoke md:p-8"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="eyebrow text-navy">Gap {g.n}</p>
                  <span className="grid size-12 place-items-center rounded-xl bg-navy text-green">
                    <g.icon aria-hidden className="size-6" />
                  </span>
                </div>
                <h3 className="mt-6 text-title font-semibold text-navy">{g.title}</h3>
                <p className="mt-3 text-arsenic">{g.body}</p>
              </li>
            ))}
          </ol>

          <div className="reveal grain on-dark relative mt-8 overflow-hidden rounded-panel bg-navy p-8 text-white md:mt-10 md:p-12">
            <Quote aria-hidden className="size-9 text-green" />
            <p className="mt-6 max-w-4xl text-[clamp(1.375rem,1.1rem+1.2vw,2rem)] leading-snug font-semibold">
              These failures compound. A physician dealing with all three at once stops asking{" "}
              <span className="text-green">&ldquo;how do I improve my practice?&rdquo;</span> and starts asking{" "}
              <span className="text-green">&ldquo;where else can I go?&rdquo;</span>
            </p>
          </div>
        </div>
      </section>

      {migration && (
        <section aria-labelledby="migration-heading" className="bg-paper py-20 md:py-28">
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
              <Source href={STUDY_URL}>Wutor et al., BMC Health Services Research, 2024</Source>
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="patients-heading" className="bg-white py-20 md:py-28">
        <div className="container-wahp grid items-center gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div className="reveal">
            <Eyebrow accent="navy">The patient cost</Eyebrow>
            <h2 id="patients-heading" className="mt-6 text-headline font-bold text-navy">
              When physicians leave, <span className="text-graphite">patients pay.</span>
            </h2>
            <div className="mt-6 space-y-5 text-lead text-arsenic">
              <p>
                Every physician who emigrates leaves behind patients with fewer options. In many communities, the loss
                of a single doctor can mean the nearest provider is hours away. Preventable conditions go undiagnosed.
                Treatable illnesses become emergencies.
              </p>
              {criticalCare && (
                <p>
                  In a 2024 study of 460 primary health facilities in Greater Accra and Ashanti, 78.3% had no critical
                  care personnel.{" "}
                  <strong className="font-semibold text-navy">
                    This is not a statistic about staffing. It is a statement about access.
                  </strong>
                </p>
              )}
            </div>
          </div>

          {(criticalCare || emigrationCost) && (
            <div className="reveal grain on-dark relative overflow-hidden rounded-panel bg-navy p-8 text-white md:p-10">
              {criticalCare && (
                <div>
                  <p className="text-[clamp(2.5rem,7vw,3.25rem)] leading-none font-bold tracking-tight text-green">
                    <CountUp value="78.3%" />
                  </p>
                  <p className="mt-4 text-lead text-white/85">
                    Of primary health facilities surveyed in Greater Accra and Ashanti had no critical care personnel
                  </p>
                  <NavySource href={CRITICAL_CARE_URL}>
                    Afrifa-Yamoah et al., Internal and Emergency Medicine, 2024
                  </NavySource>
                </div>
              )}
              {emigrationCost && (
                <div className={criticalCare ? "mt-8 border-t border-white/15 pt-8" : ""}>
                  <p className="text-[clamp(2.5rem,7vw,3.25rem)] leading-none font-bold tracking-tight text-green">
                    <CountUp value="$2.17B" />
                  </p>
                  <p className="mt-4 text-lead text-white/85">
                    Estimated lost investment in educating doctors who left nine African countries to work in Australia,
                    Canada, the UK and the US
                  </p>
                  <NavySource href={EMIGRATION_COST_URL}>Mills et al., BMJ, 2011</NavySource>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

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
            West African Health Partners is not building another traditional hospital. WAHP is building the clinical
            environment that makes better care possible: equipped medical suites, integrated diagnostics, imaging,
            digital systems and operational support, planned as one coordinated platform. We are creating the
            infrastructure physicians need to practise optimally and the access patients need to receive timely,
            reliable care.
          </p>
        </CtaBand>
      </div>

      <StickyCallBar href={call.href} label={call.label} />
    </>
  );
}
