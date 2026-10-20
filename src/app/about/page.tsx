import type { Metadata } from "next";
import { Roadmap } from "@/components/graphics/roadmap";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { ConceptImage } from "@/components/ui/concept-image";
import { Section, SectionIntro } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "About",
  description:
    "WAHP's mission is to build scalable, cost-efficient healthcare infrastructure that enables providers to deliver high-quality outpatient care and diagnostics across Ghana and West Africa.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "Clinically credible",
    body: "Designed around how outpatient physicians actually work, and the standards their patients deserve.",
  },
  {
    title: "Institutionally disciplined",
    body: "Phased, transparent and evidence-led. We describe what exists, what is planned and what is an ambition — separately.",
  },
  {
    title: "Grounded in the region",
    body: "Built in Ghana, for Ghana first — with a model intended to serve communities across West Africa over time.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About WAHP" lead="A stronger foundation" rest="for outpatient care.">
        <p>
          West African Health Partners exists to give independent physicians the infrastructure that institutions take
          for granted — and to make outpatient care more connected for the people they serve.
        </p>
      </PageHero>

      <Section tone="paper" labelledBy="mission-heading">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="reveal">
            <h2 id="mission-heading" className="eyebrow flex items-center gap-3 text-arsenic">
              <span aria-hidden className="h-0.5 w-8 rounded-full bg-teal" />
              Mission
            </h2>
            <p className="mt-6 text-headline font-semibold text-navy">
              To build scalable, cost-efficient healthcare infrastructure that enables providers to deliver high-quality
              outpatient care and diagnostics across Ghana and West Africa.
            </p>
          </div>
          <div className="reveal space-y-10 lg:pt-14">
            <div>
              <h2 className="eyebrow flex items-center gap-3 text-arsenic">
                <span aria-hidden className="h-0.5 w-8 rounded-full bg-teal" />
                Vision
              </h2>
              <p className="mt-4 text-lead text-arsenic">
                Foundational infrastructure that enables modern, scalable healthcare delivery in Ghana and across West
                Africa.
              </p>
            </div>
            <div>
              <h2 className="eyebrow flex items-center gap-3 text-arsenic">
                <span aria-hidden className="h-0.5 w-8 rounded-full bg-teal" />
                Where we start
              </h2>
              <p className="mt-4 text-lead text-arsenic">
                Our flagship is planned for Accra. We are pre-launch: the facility is in development and services will
                begin only once it is complete, staffed, licensed and approved.
              </p>
              <p className="mt-4 text-lead text-arsenic">
                WAHP will operate in full compliance with applicable Ghanaian healthcare and facility regulations.
                Licensing and regulatory processes are being pursued in accordance with national standards.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="white" className="!py-0">
        <ConceptImage
          name="lobby"
          aspect="aspect-[16/9] md:aspect-[21/9]"
          sizes="(min-width: 1280px) 1200px, 100vw"
          className="reveal -translate-y-0"
        />
      </Section>

      <Section tone="white" labelledBy="principles-heading">
        <SectionIntro
          id="principles-heading"
          eyebrow="How we work"
          lead="Three principles"
          rest="behind every decision."
        />
        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {principles.map((p, i) => (
            <li
              key={p.title}
              className="reveal rounded-card bg-paper p-7 ring-1 ring-inset ring-steel/60 md:p-8"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="text-sm font-bold text-navy">0{i + 1}</span>
              <h3 className="mt-4 text-title font-medium text-navy">{p.title}</h3>
              <p className="mt-3 text-arsenic">{p.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="navy" labelledBy="strategy-heading">
        <SectionIntro
          id="strategy-heading"
          eyebrow="Development strategy"
          lead="Staged growth,"
          rest="one proven step at a time."
          dark
        />
        <div className="mt-14">
          <Roadmap dark />
        </div>
      </Section>

      <CtaBand
        lead="Meet the team"
        rest="behind WAHP."
        primary={{ href: "/leadership", label: "Leadership" }}
        secondary={{ href: "/contact", label: "Contact us" }}
      />
    </>
  );
}
