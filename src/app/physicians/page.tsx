import type { Metadata } from "next";
import { Check } from "lucide-react";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { Faq } from "@/components/sections/faq";
import { JourneySteps } from "@/components/sections/journey-steps";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { ConceptImage } from "@/components/ui/concept-image";
import { Section, SectionIntro, StageBadge } from "@/components/ui/primitives";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "For physicians",
  description:
    "For independent physicians, specialists and diaspora clinicians: register interest in professional clinical space and shared operational support at WAHP's planned Accra flagship.",
  alternates: { canonical: "/physicians" },
};

const offer = [
  {
    title: "Professional clinical space",
    body: "Consultation and examination suites designed for outpatient practice, in a consistent, patient-ready environment.",
  },
  {
    title: "Shared operations",
    body: "Reception, patient flow and administrative support shared across practices, so you are not hiring and managing it alone.",
  },
  {
    title: "Diagnostics nearby",
    body: "An integrated laboratory is planned on site, subject to phase and approvals — keeping tests close to the consultation.",
  },
  {
    title: "Your practice, your name",
    body: "The model is built for independent physicians: you keep your patients, your clinical judgement and your identity.",
  },
];

const faqs = [
  {
    q: "Who is WAHP designed for?",
    a: "Independent physicians and specialists in outpatient practice — including Ghanaian physicians already practising in Accra and diaspora clinicians considering practising in Ghana.",
  },
  {
    q: "Is WAHP open yet?",
    a: "No. WAHP is pre-launch and the Accra flagship is in development. Registering interest helps us plan suites and support around real physician needs; it is not a booking or a commitment.",
  },
  {
    q: "Which specialties can participate?",
    a: "The flagship is designed for outpatient specialties that work from consultation and examination rooms. Specialty mix will be confirmed as planning progresses — tell us yours when you register.",
  },
  {
    q: "What will participation cost, and how will it work?",
    a: "Flexible lease options — for example by the hour, day or month — are planned. Rates and terms are not yet published; we will share details directly with interested physicians once they are confirmed.",
  },
  {
    q: "What support will be shared?",
    a: "The proposed model includes reception and patient flow, administrative support and common facility standards. Integrated laboratory services are planned for a later phase, subject to approvals.",
  },
  {
    q: "Is WAHP licensed?",
    a: "WAHP will operate in full compliance with applicable Ghanaian healthcare and facility regulations. Licensing and regulatory processes are being pursued in accordance with national standards.",
  },
  {
    q: "What happens after I register interest?",
    a: "A member of the WAHP team reviews your details and follows up by email to understand your practice and keep you informed as the flagship develops.",
  },
];

export default function PhysiciansPage() {
  return (
    <>
      <PageHero
        eyebrow="For physicians"
        lead="Practise independently."
        rest="Don't build it alone."
        status={<StageBadge stage="pre-launch" label="Registering interest · Accra flagship in development" dark />}
        aside={
          <ConceptImage
            name="consultation"
            priority
            dark
            aspect="aspect-[4/3]"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        }
      >
        <p>
          WAHP is building professional clinical space and a shared operational backbone for independent physicians — so
          more of your time goes to patients, and less to running a facility.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#register" size="lg" arrow>
            Register interest
          </ButtonLink>
          <ButtonLink href="/platform" size="lg" variant="light">
            How the platform works
          </ButtonLink>
        </div>
      </PageHero>

      <Section tone="paper" labelledBy="offer-heading">
        <SectionIntro id="offer-heading" eyebrow="The proposition" lead="What WAHP intends" rest="to provide." />
        <ul className="mt-14 grid gap-4 md:grid-cols-2">
          {offer.map((o, i) => (
            <li
              key={o.title}
              className="reveal flex gap-5 rounded-card bg-white p-7 ring-1 ring-inset ring-smoke md:p-8"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-cloud text-teal">
                <Check aria-hidden className="size-5" />
              </span>
              <div>
                <h3 className="text-title font-medium text-navy">{o.title}</h3>
                <p className="mt-2 text-arsenic">{o.body}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-arsenic">
          Rates, hours, equipment lists and availability are not yet confirmed and will be shared directly when they
          are.
        </p>
      </Section>

      <Section tone="navy" id="diaspora" labelledBy="diaspora-heading" className="scroll-mt-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionIntro
            id="diaspora-heading"
            eyebrow="Diaspora physicians"
            lead="Considering practice"
            rest="in Ghana?"
            dark
          >
            <p>
              For clinicians abroad thinking about practising in Ghana, building a facility from a distance is often the
              hardest part. WAHP is designed so that the clinical space and operational foundation are already in place.
            </p>
          </SectionIntro>
          <ul className="reveal space-y-5 self-end">
            {[
              [
                "Infrastructure in place",
                "Professional suites and shared support, rather than a facility to build on arrival.",
              ],
              [
                "Flexible participation",
                "Lease options planned to suit different schedules, including physicians who split time.",
              ],
              ["Your own licensing", "Physicians remain responsible for meeting Ghanaian requirements to practise."],
            ].map(([t, b]) => (
              <li key={t} className="flex gap-4">
                <span aria-hidden className="mt-2 size-2 shrink-0 rounded-full bg-teal" />
                <div>
                  <p className="font-semibold">{t}</p>
                  <p className="mt-1 text-white/70">{b}</p>
                </div>
              </li>
            ))}
            <li className="pt-4">
              <ButtonLink href="#register" variant="light" arrow>
                Register as a diaspora physician
              </ButtonLink>
            </li>
          </ul>
        </div>
      </Section>

      <Section tone="white" labelledBy="journey-heading">
        <SectionIntro
          id="journey-heading"
          eyebrow="How it works"
          lead="From first enquiry"
          rest="to practising with WAHP."
        />
        <div className="mt-14">
          <JourneySteps
            note="Indicative process. Details will be confirmed as the flagship approaches opening."
            steps={[
              {
                title: "Register interest",
                body: "Tell us about your specialty, location and what you're looking for.",
              },
              { title: "Conversation", body: "We discuss your practice, eligibility and how the model could fit." },
              {
                title: "Space & access planning",
                body: "As the flagship develops, we plan suite access around participating physicians.",
              },
              {
                title: "Operational onboarding",
                body: "Shared support, standards and systems are introduced before you begin.",
              },
            ]}
          />
        </div>
      </Section>

      <Section tone="paper" id="register" labelledBy="register-heading" className="scroll-mt-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <SectionIntro id="register-heading" eyebrow="Register interest" lead="Tell us about" rest="your practice.">
              <p>No patient information, please. We use your details only to follow up on your interest.</p>
            </SectionIntro>
          </div>
          <EnquiryForm defaultType="physician" lockType contactEmail={site.contactEmail} />
        </div>
      </Section>

      <Section tone="white" labelledBy="faq-heading">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
          <SectionIntro id="faq-heading" eyebrow="Questions" lead="Physician" rest="FAQs." />
          <Faq items={faqs} />
        </div>
      </Section>
    </>
  );
}
