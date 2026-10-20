import type { Metadata } from "next";
import { Building2, HeartPulse, Users } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Faq } from "@/components/sections/faq";
import { ConceptImage } from "@/components/ui/concept-image";
import { Notice } from "@/components/ui/notice";
import { Section, SectionIntro, StageBadge } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "For patients",
  description:
    "What WAHP intends to offer patients in Accra: more coordinated outpatient care in one professional setting. WAHP is pre-launch and not yet seeing patients.",
  alternates: { canonical: "/patients" },
};

const intents = [
  {
    icon: Users,
    title: "Independent physicians, one setting",
    body: "Several independent physicians and specialists practising from one professional outpatient facility.",
  },
  {
    icon: HeartPulse,
    title: "Tests closer to your consultation",
    body: "An integrated laboratory is planned on site, so tests could happen nearer to where you see your physician.",
  },
  {
    icon: Building2,
    title: "A consistent, welcoming environment",
    body: "Shared reception and patient flow designed to make visits calmer and more predictable.",
  },
];

export default function PatientsPage() {
  return (
    <>
      <PageHero
        eyebrow="For patients"
        lead="More connected care,"
        rest="coming to Accra."
        status={<StageBadge stage="pre-launch" label="Not yet seeing patients" dark />}
        aside={
          <ConceptImage name="lobby" priority dark aspect="aspect-[16/10]" sizes="(min-width: 1024px) 40vw, 100vw" />
        }
      >
        <p>
          WAHP is building a shared outpatient facility in Accra where independent physicians can practise with the
          support of shared operations and, in a later phase, an on-site laboratory.
        </p>
      </PageHero>

      <Section tone="paper" className="!pt-12 !pb-0">
        <div className="max-w-4xl space-y-4">
          <Notice title="WAHP is not yet open and does not offer appointments" tone="important">
            We are not currently providing medical care, consultations, tests or advice. Please continue to see your
            existing healthcare provider.
          </Notice>
          <Notice title="In an emergency">
            Call <strong>112</strong> or go to the nearest hospital emergency department. Do not use this website or its
            forms for urgent or medical matters, and please do not send us any medical information.
          </Notice>
        </div>
      </Section>

      <Section tone="paper" labelledBy="intent-heading">
        <SectionIntro
          id="intent-heading"
          eyebrow="What we intend"
          lead="What care at WAHP"
          rest="is designed to feel like."
        />
        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {intents.map(({ icon: Icon, title, body }, i) => (
            <li
              key={title}
              className="reveal rounded-card bg-white p-7 ring-1 ring-inset ring-smoke md:p-8"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-cloud text-teal ring-1 ring-inset ring-smoke">
                <Icon aria-hidden className="size-6" strokeWidth={1.75} />
              </span>
              <h3 className="mt-6 text-title font-medium text-navy">{title}</h3>
              <p className="mt-3 text-arsenic">{body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white" labelledBy="pfaq-heading">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
          <SectionIntro id="pfaq-heading" eyebrow="Questions" lead="Patient" rest="FAQs." />
          <Faq
            items={[
              {
                q: "Can I book an appointment?",
                a: "Not yet. WAHP is pre-launch and is not seeing patients. We will announce clearly when services are available.",
              },
              {
                q: "Where will WAHP be?",
                a: "The first facility is planned for Accra, Ghana. We will share the location once it is confirmed.",
              },
              {
                q: "Will WAHP replace my doctor?",
                a: "No. WAHP provides infrastructure for independent physicians. Patients will see independent physicians who practise from the facility.",
              },
              {
                q: "How can I stay informed?",
                a: "Use the general enquiry option on our contact page. Please don't include any health information.",
              },
            ]}
          />
        </div>
      </Section>

      <CtaBand
        lead="Questions about"
        rest="what's planned?"
        primary={{ href: "/contact?type=general", label: "Send a general enquiry" }}
      >
        <p>For general questions only — please do not share medical details.</p>
      </CtaBand>
    </>
  );
}
