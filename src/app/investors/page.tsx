import type { Metadata } from "next";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { RegionalRings } from "@/components/graphics/regional-rings";
import { Roadmap } from "@/components/graphics/roadmap";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";
import { Section, SectionIntro } from "@/components/ui/primitives";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "For investors",
  description:
    "The WAHP thesis: shared clinical infrastructure for independent outpatient care, proven in Accra and designed to replicate across West Africa. Request an introduction.",
  alternates: { canonical: "/investors" },
};

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
          WAHP is developing a healthcare infrastructure platform for independent outpatient medicine, beginning with a
          flagship in Accra, Ghana.
        </p>
        <div className="mt-8">
          <ButtonLink href="#introduction" size="lg" arrow>
            Request an introduction
          </ButtonLink>
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
      </Section>

      <Section tone="navy" labelledBy="exec-heading">
        <SectionIntro
          id="exec-heading"
          eyebrow="Execution"
          lead="A phased plan,"
          rest="with honest status labels."
          dark
        >
          <p>WAHP is pre-launch. Timelines are shared directly once confirmed.</p>
        </SectionIntro>
        <div className="mt-14">
          <Roadmap dark />
        </div>
      </Section>

      <Section tone="paper" id="introduction" labelledBy="intro-heading" className="scroll-mt-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <SectionIntro id="intro-heading" eyebrow="Introduction" lead="Arrange a" rest="conversation.">
              <p>Tell us a little about yourself or your organisation and the WAHP team will follow up.</p>
            </SectionIntro>
            <div className="mt-8">
              <Notice title="Important information">
                This website is for information only. It is not an offer to sell, or a solicitation of an offer to buy,
                any securities, and it does not contain financial projections or investment terms. Any investment
                discussion takes place privately and subject to applicable law.
              </Notice>
            </div>
          </div>
          <EnquiryForm defaultType="investor" lockType contactEmail={site.contactEmail} />
        </div>
      </Section>
    </>
  );
}
