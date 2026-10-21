import type { Metadata } from "next";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { RegionalRings } from "@/components/graphics/regional-rings";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";
import { Section, SectionIntro, StageBadge } from "@/components/ui/primitives";
import { approvedClaim } from "@/content/claims";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "For investors",
  description:
    "The WAHP thesis: shared clinical infrastructure for independent outpatient care, proven in Accra and designed to replicate across West Africa. Request an introduction.",
  alternates: { canonical: "/investors" },
};

const revenue = [
  {
    title: "Clinical suite leases",
    body: "Equipped consultation and examination rooms and outpatient suites, offered on flexible terms.",
    planned: false,
  },
  {
    title: "Laboratory services",
    body: "Clinical testing provided directly or through operating partnerships.",
    planned: true,
  },
  {
    title: "Diagnostic imaging",
    body: "X-ray, ultrasound, CT and other imaging, introduced as the facility scales.",
    planned: true,
  },
  {
    title: "Technology subscriptions",
    body: "Scheduling, billing, electronic health records, analytics and telemedicine.",
    planned: false,
  },
  {
    title: "Corporate & institutional programmes",
    body: "Workforce health screening, diagnostics programmes and referral partnerships.",
    planned: true,
  },
];

const thesis = [
  {
    n: "01",
    title: "A structural infrastructure gap",
    body: "Independent outpatient practice depends on premises, equipment, staff and diagnostics that are costly to assemble one practice at a time.",
  },
  {
    n: "02",
    title: "A differentiated model",
    body: "Not a hospital and not a room rental: a shared clinical platform that combines space, operations and diagnostics around independent physicians.",
  },
  {
    n: "03",
    title: "Phased execution",
    body: "Each capability — clinical space, laboratory, then imaging and digital — is introduced only once the previous phase is established.",
  },
  {
    n: "04",
    title: "Disciplined replication",
    body: "The flagship is designed as a template: prove the model in Accra, then extend it carefully to further sites over time.",
  },
  {
    n: "05",
    title: "Impact alongside returns",
    body: "Better-equipped independent practice can mean more connected outpatient care for the communities physicians serve.",
  },
];

export default function InvestorsPage() {
  return (
    <>
      <PageHero
        eyebrow="For investors"
        lead="Infrastructure first."
        rest="Built to scale with discipline."
        aside={
          <div className="rounded-panel bg-white/5 p-6 ring-1 ring-inset ring-white/15">
            <RegionalRings />
          </div>
        }
      >
        <p>
          WAHP is building a scalable medical infrastructure platform that gives physicians access to modern clinical
          space, integrated diagnostics, technology and operational support — starting in Ghana and designed for
          expansion across West Africa.
        </p>
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
          eyebrow="The thesis"
          lead="Why shared clinical"
          rest="infrastructure, why now."
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
              Detailed materials are shared privately with qualified parties on request.
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
            See the phased rollout plan
          </ButtonLink>
        </div>
      </Section>

      <Section tone="white" labelledBy="model-heading">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
          <SectionIntro
            id="model-heading"
            eyebrow="Business model"
            lead="Diversified revenue,"
            rest="one shared platform."
          >
            <p>
              The model is designed to generate recurring and transaction-based revenue from several parts of the
              outpatient care chain, with each stream supporting the others.
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
          eyebrow="Differentiation"
          lead="Where physician autonomy"
          rest="meets integrated infrastructure."
        />
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {[
            [
              "Traditional hospitals",
              "Infrastructure without independence",
              "Clinical infrastructure, but institutional schedules and priorities take precedence over individual clinical judgement.",
            ],
            [
              "Diagnostic chains",
              "Testing without a practice environment",
              "Specific testing services, but a physician still has to source space, staffing, systems and administration separately.",
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
            <h3 className="mt-4 text-title font-medium">Designed to combine both</h3>
            <ul className="mt-4 space-y-2 text-white/80">
              {[
                "Physician autonomy",
                "Clinical infrastructure",
                "Integrated diagnostics",
                "Shared administrative support",
                "Technology-enabled operations",
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

      <Section tone="paper" id="introduction" labelledBy="intro-heading" className="scroll-mt-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <SectionIntro id="intro-heading" eyebrow="Introduction" lead="Arrange a" rest="conversation.">
              <p>Tell us a little about yourself or your organisation and the WAHP team will follow up.</p>
            </SectionIntro>
            <div className="mt-8">
              <Notice title="Important notice">
                <span className="block">
                  This page is for information only and is not an offer to sell, or a solicitation of an offer to
                  purchase, securities. Any offering will be made only through definitive offering and subscription
                  documents, and only to persons verified as accredited investors pursuant to Rule 506(c) of Regulation
                  D.
                </span>
                <span className="mt-3 block">
                  An investment in WAHP is speculative, involves a high degree of risk and may result in the loss of the
                  entire investment. Statements about future events, expansion or market opportunity are forward-looking
                  and subject to significant risks and uncertainties. No financial documents are collected on this
                  website.
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
