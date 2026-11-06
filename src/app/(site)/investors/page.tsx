import type { Metadata } from "next";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { ExpansionMap } from "@/components/graphics/expansion-map";
import { BOOK_CALL_ID, BookCallSection } from "@/components/sections/book-call";
import { PageHero } from "@/components/sections/page-hero";
import { StatCards, type StatCard } from "@/components/sections/stat-cards";
import { ButtonLink } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";
import { Eyebrow, Section, SectionIntro, StageBadge } from "@/components/ui/primitives";
import { approvedClaim } from "@/content/claims";
import { SiteImage } from "@/components/ui/site-image";
import { callTypes, site } from "@/content/site";
import { pageHeaders } from "@/content/editable";

export const metadata: Metadata = {
  title: "For investors",
  description:
    "Why WAHP: shared outpatient infrastructure for independent physicians, built first in Accra and planned for Kumasi and the wider region. Request an introduction.",
  alternates: { canonical: "/investors" },
};

const revenue = [
  {
    title: "Consulting room rental",
    body: "Physicians rent equipped consulting and examination rooms by the hour, day or month.",
    planned: false,
  },
  {
    title: "Laboratory services",
    body: "Tests run in the hub's own lab, or with a partner laboratory.",
    planned: true,
  },
  {
    title: "Diagnostic imaging",
    body: "CT, MRI and other scans, added once the hub is well used.",
    planned: true,
  },
  {
    title: "Technology subscriptions",
    body: "Scheduling, billing, electronic records and telemedicine, paid for monthly by practices.",
    planned: false,
  },
  {
    title: "Employer and institutional programmes",
    body: "Staff health screening for Accra employers, testing programmes and referral partnerships.",
    planned: true,
  },
];

const thesis = [
  {
    n: "01",
    title: "The gap is the building, not the doctors",
    body: "Ghana has skilled physicians. What they lack is affordable premises, equipment, staff and diagnostics, and few can pay for all of it alone.",
  },
  {
    n: "02",
    title: "Between a hospital and a rented room",
    body: "Physicians keep their own practice and patients, and share the space, staff, systems and diagnostics that a hospital would normally provide.",
  },
  {
    n: "03",
    title: "Built in phases",
    body: "Consulting rooms and records first, then the lab, then imaging. Each phase opens only after the one before it is working.",
  },
  {
    n: "04",
    title: "Accra first, then Kumasi",
    body: "The Accra hub is our test of the model. If it works there, Kumasi comes next, and other West African cities after that.",
  },
  {
    n: "05",
    title: "Good for patients too",
    body: "When independent doctors are better equipped, their patients get consultations, tests and results in one place.",
  },
];

/** Market figures from the older build's investors page ("Why Ghana, why now"). Each shows only while its claim is approved. */
const market: (StatCard & { claim: string })[] = [
  {
    claim: "market-ghana-curative",
    value: "$1.21B",
    label: "Estimated Ghana curative and ancillary healthcare market",
    source: "WAHP estimate · Ghana Ministry of Health, 2023",
  },
  {
    claim: "stat-physicians-accra",
    value: "42%",
    label: "Of Ghana's physicians are concentrated in Accra",
    source: "WHO Ghana",
  },
  {
    claim: "stat-private-expenditure",
    value: "36.7%",
    label: "Of Ghana's health expenditure occurs in private facilities",
    source: "Ghana Ministry of Health, 2023",
  },
  {
    claim: "market-accra-sam",
    value: "$214M",
    label: "Estimated Greater Accra serviceable market",
    source: "WAHP estimate, using Greater Accra's share of the population",
  },
];

const canBook = callTypes.some((c) => c.id === "investor");

export default function InvestorsPage() {
  return (
    <>
      <PageHero
        eyebrow={pageHeaders.investors.eyebrow}
        lead={pageHeaders.investors.lead}
        rest={pageHeaders.investors.rest}
        aside={
          <div className="overflow-hidden rounded-panel bg-navy/40 ring-1 ring-inset ring-white/15">
            <ExpansionMap />
          </div>
        }
      >
        <p>{pageHeaders.investors.intro}</p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <ButtonLink href={canBook ? `#${BOOK_CALL_ID}` : "#introduction"} size="lg" arrow>
            {canBook ? "Book a call" : "Request an introduction"}
          </ButtonLink>
          <p className="text-sm text-white/70">Accredited investors only. Verification required.</p>
        </div>
      </PageHero>

      <Section tone="paper" labelledBy="thesis-heading">
        <SectionIntro
          id="thesis-heading"
          eyebrow="Why we are building this"
          lead="Why shared clinics,"
          rest="and why they work."
        />
        <ol className="mt-14 grid gap-px overflow-hidden rounded-panel bg-smoke ring-1 ring-inset ring-smoke md:grid-cols-2 lg:grid-cols-3">
          {thesis.map((t, i) => (
            <li
              key={t.n}
              className={`reveal bg-white p-7 md:p-9 ${i === 0 ? "lg:col-span-1" : ""}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="text-sm font-bold text-navy">{t.n}</span>
              <h3 className="mt-4 text-title font-medium text-navy">{t.title}</h3>
              <p className="mt-3 text-arsenic">{t.body}</p>
            </li>
          ))}
          <li className="reveal flex flex-col justify-between bg-navy p-7 text-white md:p-9 on-dark">
            <p className="text-xl font-medium">
              We share detailed materials privately with qualified investors who ask.
            </p>
            <div className="mt-8">
              <ButtonLink href="#introduction" arrow>
                Request materials
              </ButtonLink>
            </div>
          </li>
        </ol>
        <div className="mt-8">
          <ButtonLink href="/platform#phases" variant="ghost" arrow>
            See the phases
          </ButtonLink>
        </div>
      </Section>

      {/* Why Ghana, why now: after the older build's section of the same name, in its navy and green. */}
      <section
        aria-labelledby="ghana-heading"
        className="grain on-dark relative overflow-hidden bg-navy py-20 text-white md:py-28"
      >
        <div className="container-wahp">
          <div className="reveal mx-auto max-w-3xl text-center [&_.eyebrow]:justify-center">
            <Eyebrow accent="green">Why Ghana, why now</Eyebrow>
            <h2 id="ghana-heading" className="mt-6 text-headline font-bold text-white">
              Launching in a market with <span className="text-green">demand, talent and regional reach.</span>
            </h2>
            <p className="mt-6 text-lead text-white/80">
              WAHP plans to launch in Ghana, where urban growth, a concentration of physicians, rising demand for
              private care and the need for more efficient outpatient infrastructure make a compelling first market.
            </p>
          </div>
          <StatCards
            items={market.filter((m) => approvedClaim(m.claim))}
            sourceTone="green"
            className="mt-14 sm:grid-cols-2 lg:grid-cols-4"
          />
          <div className="reveal mx-auto mt-14 max-w-3xl space-y-5 text-lead text-white/80">
            <p>
              Greater Accra and Ashanti are major centres of population, clinical activity and private healthcare
              demand. WAHP&apos;s research also found persistent gaps in diagnostic availability, private practice
              infrastructure, regulatory consistency and service delivery.
            </p>
            <p>
              Ghana gives WAHP the chance to prove the model in a sophisticated West African healthcare market before
              expanding selectively into other cities with high demand.
            </p>
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-white/70">
            Market sizes are WAHP estimates built from public data. They are forecasts, not guarantees: please read the
            important notice at the end of this page.
          </p>
        </div>
      </section>

      <Section tone="white" labelledBy="model-heading">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
          <SectionIntro
            id="model-heading"
            eyebrow="How the hub earns"
            lead="Several sources of income,"
            rest="one building."
          >
            <p>
              Income comes from monthly subscriptions and from each room booking, test and scan. A patient seen in a
              consulting room is likely to need the lab too, so the parts support each other.
            </p>
          </SectionIntro>
          <ul className="divide-y divide-smoke border-y border-smoke">
            {revenue.map((r, i) => (
              <li
                key={r.title}
                className="reveal grid gap-2 py-6 sm:grid-cols-[3rem_minmax(0,1fr)]"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <span className="text-sm font-bold text-navy">0{i + 1}</span>
                <div>
                  <p className="flex flex-wrap items-center gap-3 text-lg font-semibold text-navy">
                    {r.title}
                    {r.planned && <StageBadge stage="planned" />}
                  </p>
                  <p className="mt-1 text-arsenic">{r.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="paper" labelledBy="position-heading">
        <SectionIntro
          id="position-heading"
          eyebrow="How we differ"
          lead="Independence for the doctor,"
          rest="infrastructure under one roof."
        />
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {[
            [
              "Traditional hospitals",
              "Equipment, but little independence",
              "The facilities are there, but the hospital sets the schedule and the priorities, not the physician.",
            ],
            [
              "Diagnostic chains",
              "Tests, but nowhere to practise",
              "They run the tests, but the physician still has to find rooms, staff, systems and admin somewhere else.",
            ],
          ].map(([k, t, b]) => (
            <div key={k} className="reveal rounded-card bg-white p-7 ring-1 ring-inset ring-smoke md:p-8">
              <p className="eyebrow text-arsenic">{k}</p>
              <h3 className="mt-4 text-title font-medium text-navy">{t}</h3>
              <p className="mt-3 text-arsenic">{b}</p>
            </div>
          ))}
          <div className="reveal on-dark rounded-card bg-navy p-7 text-white md:p-8">
            <p className="eyebrow text-steel">The WAHP platform</p>
            <h3 className="mt-4 text-title font-medium">Both, in one building</h3>
            <ul className="mt-4 space-y-2 text-white/80">
              {[
                "The physician runs their own practice",
                "Equipped consulting rooms",
                "Lab and scans on site, in phases",
                "Shared reception and admin",
                "One records and scheduling system",
              ].map((x) => (
                <li key={x} className="flex gap-3">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-teal" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {approvedClaim("traction-research") && (
          <div className="mt-14">
            <h3 className="eyebrow mb-5 text-arsenic">Groundwork to date</h3>
            <dl className="grid gap-px overflow-hidden rounded-card bg-smoke sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["60+", "Physicians surveyed"],
                ["3", "Studies completed: market, feasibility and phased rollout"],
                ["5", "Core team members in place"],
                ["20", "Physician Letters of Intent signed"],
              ].map(([v, l]) => (
                <div key={l} className="flex flex-col bg-white p-6 md:p-7">
                  <dt className="order-2 mt-2 text-arsenic">{l}</dt>
                  <dd className="order-1 text-headline font-semibold text-navy">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </Section>

      <BookCallSection call="investor" lead="Meet the founders." rest="Book a 30 minute call." tone="white">
        <p>
          An introductory video call about the Accra hub and how it is planned, phase by phase. Prefer to write?{" "}
          <a
            href="#introduction"
            className="font-semibold text-navy underline decoration-teal decoration-2 underline-offset-4"
          >
            Register your interest
          </a>{" "}
          instead.
        </p>
        <p className="mt-4 text-base">
          A call is not an offer to sell securities. Please read the important notice below.
        </p>
      </BookCallSection>

      {/* Who may invest: after the older build's section of the same name, in its navy and green. */}
      <section
        id="introduction"
        aria-labelledby="intro-heading"
        className="grain on-dark relative scroll-mt-20 overflow-hidden border-b border-white/10 bg-navy py-20 text-white md:py-28"
      >
        <div className="container-wahp">
          <div className="reveal mx-auto max-w-3xl text-center [&_.eyebrow]:justify-center">
            <Eyebrow accent="green">Who may invest</Eyebrow>
            <h2 id="intro-heading" className="mt-6 text-headline font-bold text-white">
              Help build the infrastructure behind <span className="text-green">better healthcare delivery.</span>
            </h2>
          </div>
          <SiteImage
            name="investorsLobby"
            className="reveal reveal-media mt-12"
            aspect="aspect-[16/9] md:aspect-[16/5]"
            dark
            sizes="(min-width: 1280px) 1200px, 100vw"
          />
          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
            <div>
              <div className="reveal rounded-[1.25rem] bg-white/[0.06] p-6 ring-1 ring-white/15 ring-inset md:p-8">
                <h3 className="text-title font-semibold text-white">Register your interest</h3>
                <p className="mt-4 text-lead text-white/80">
                  Share your details and our team will follow up with next steps and verification instructions. This
                  does not create any obligation to invest.
                </p>
                <p className="mt-4 font-semibold text-green">Accredited investors only. Verification required.</p>
              </div>
              <div className="mt-8">
                <Notice title="Important notice">
                  <span className="block">
                    This page is for information only. It is not an offer to sell securities, or a request for an offer
                    to buy them. Any offering will be made only through formal offering and subscription documents, and
                    only to people verified as accredited investors under{" "}
                    {/* Manrope's contextual alternates would turn "(c)" into a copyright sign. */}
                    <span className="whitespace-nowrap [font-feature-settings:'calt'_0,'liga'_0]">Rule 506(c)</span> of
                    Regulation D.
                  </span>
                  <span className="mt-3 block">
                    An investment in WAHP is speculative and high risk, and you could lose all of it. What we say here
                    about the future, including expansion and market size, is a forecast and carries real risks and
                    uncertainty. This website does not collect financial documents.
                  </span>
                </Notice>
              </div>
            </div>
            <EnquiryForm defaultType="investor" lockType contactEmail={site.contactEmail} />
          </div>
        </div>
      </section>
    </>
  );
}
