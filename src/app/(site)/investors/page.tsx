import type { Metadata } from "next";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { ExpansionMap } from "@/components/graphics/expansion-map";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";
import { Section, SectionIntro, StageBadge } from "@/components/ui/primitives";
import { approvedClaim } from "@/content/claims";
import { SiteImage } from "@/components/ui/site-image";
import { site } from "@/content/site";
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
          <ButtonLink href="#introduction" size="lg" arrow>
            Request an introduction
          </ButtonLink>
          <p className="text-sm text-white/70">Accredited investors only. Verification required.</p>
        </div>
      </PageHero>

      <Section tone="paper" labelledBy="thesis-heading">
        <SectionIntro
          id="thesis-heading"
          eyebrow="Why we are building this"
          lead="Why shared clinics,"
          rest="and why Ghana now."
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

      <section aria-label="Image" className="bg-paper pt-16 md:pt-24">
        <div className="container-wahp">
          <SiteImage
            name="communityOutreach"
            className="reveal"
            aspect="aspect-[16/7] md:aspect-[16/5]"
            sizes="(min-width: 1280px) 1200px, 100vw"
          />
        </div>
      </section>

      <Section tone="paper" id="introduction" labelledBy="intro-heading" className="scroll-mt-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <SectionIntro id="intro-heading" eyebrow="Introduction" lead="Arrange a" rest="conversation.">
              <p>Tell us a little about you or your organisation. One of our cofounders will reply by email.</p>
            </SectionIntro>
            <div className="mt-8">
              <Notice title="Important notice">
                <span className="block">
                  This page is for information only. It is not an offer to sell securities, or a request for an offer to
                  buy them. Any offering will be made only through formal offering and subscription documents, and only
                  to people verified as accredited investors under Rule 506(c) of Regulation D.
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
      </Section>
    </>
  );
}
