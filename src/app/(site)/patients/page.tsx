import type { Metadata } from "next";
import { Building2, HeartPulse, Users } from "lucide-react";
import { PatientJourney } from "@/components/graphics/patient-journey";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Faq } from "@/components/sections/faq";
import { SiteImage } from "@/components/ui/site-image";
import { Notice } from "@/components/ui/notice";
import { Section, SectionIntro, StageBadge } from "@/components/ui/primitives";
import { faqLists, pageHeaders } from "@/content/editable";

export const metadata: Metadata = {
  title: "For patients",
  description:
    "What we are building for patients in Accra: consultations, tests and follow up in one building. WAHP is not open yet and is not seeing patients.",
  alternates: { canonical: "/patients" },
};

const intents = [
  {
    icon: Users,
    title: "Several doctors, one address",
    body: "Independent physicians and specialists seeing patients from the same building in Accra.",
  },
  {
    icon: HeartPulse,
    title: "Tests without crossing town",
    body: "We plan a laboratory in the building, so you would not have to travel elsewhere for routine tests.",
  },
  {
    icon: Building2,
    title: "A calm front desk",
    body: "One reception team that knows your appointment, so visits start on time and feel less rushed.",
  },
];

export default function PatientsPage() {
  return (
    <>
      <PageHero
        eyebrow={pageHeaders.patients.eyebrow}
        lead={pageHeaders.patients.lead}
        rest={pageHeaders.patients.rest}
        status={<StageBadge stage="pre-launch" label="Not yet seeing patients" dark />}
        aside={
          <SiteImage
            name="patientPortrait"
            priority
            dark
            aspect="aspect-[16/10]"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        }
      >
        <p>{pageHeaders.patients.intro}</p>
      </PageHero>

      <Section tone="paper" className="!pt-12 !pb-0">
        <div className="max-w-4xl space-y-4">
          <Notice title="WAHP is not open yet and does not take appointments" tone="important">
            We do not provide medical care, consultations, tests or advice at the moment. Please keep seeing your
            current doctor or clinic.
          </Notice>
          <Notice title="In an emergency">
            Call <strong>112</strong> or go to the nearest hospital emergency department. This website and its forms are
            not for urgent or medical matters, so please do not send us any medical information.
          </Notice>
        </div>
      </Section>

      <Section tone="paper" labelledBy="intent-heading">
        <SectionIntro
          id="intent-heading"
          eyebrow="What we are planning"
          lead="What a visit to WAHP"
          rest="should feel like."
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
        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="reveal">
            <h3 className="text-title font-medium text-navy">See your doctor, get tested, go home.</h3>
            <p className="mt-4 text-lead text-arsenic">
              Today many patients in Accra see a doctor in one place, take a taxi to a lab in another and come back days
              later for results. We want the consultation, the tests and the follow up to happen in one building. The
              laboratory and imaging come in later phases.
            </p>
          </div>
          <PatientJourney />
        </div>
      </Section>

      <Section tone="white" labelledBy="pfaq-heading">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <SectionIntro id="pfaq-heading" eyebrow="Questions" lead="Questions from" rest="patients." />
            <SiteImage name="midwivesNewborn" className="reveal mt-10" aspect="aspect-[3/2]" />
          </div>
          <Faq items={faqLists.patients} />
        </div>
      </Section>

      <CtaBand
        lead="Want to know more"
        rest="about our plans?"
        primary={{ href: "/contact?type=general", label: "Send a general enquiry" }}
      >
        <p>This is for general questions only. Please do not share medical details.</p>
      </CtaBand>
    </>
  );
}
