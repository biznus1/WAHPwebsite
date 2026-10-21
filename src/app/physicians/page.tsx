import type { Metadata } from "next";
import { Check } from "lucide-react";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { Faq } from "@/components/sections/faq";
import { JourneySteps } from "@/components/sections/journey-steps";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { ConceptImage } from "@/components/ui/concept-image";
import { Section, SectionIntro, StageBadge } from "@/components/ui/primitives";
import { approvedClaim } from "@/content/claims";
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
        <SectionIntro
          id="diaspora-heading"
          eyebrow="Diaspora physicians"
          lead="You've thought about going back."
          rest="Practise. Partner. Or both."
          dark
        >
          <p>
            Diaspora physicians bring clinical expertise, global perspective and a deep connection to West Africa. WAHP
            is designed to give you a credible path to return, collaborate, mentor and help strengthen healthcare
            delivery back home — at whatever pace makes sense.
          </p>
        </SectionIntro>
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {[
            {
              label: "The practice path",
              title: "I want to practise.",
              body: "A ready path to practise in Ghana, with equipped clinical space and support designed to be in place. Start during the weeks you are already home, and grow into more when you are ready.",
            },
            {
              label: "The partner path",
              title: "I want to be involved beyond the exam room.",
              body: "Some of the people who will matter most to this work will contribute through networks, governance and experience building institutions. If that describes you, we would welcome the introduction.",
            },
          ].map((p) => (
            <div key={p.label} className="reveal rounded-card bg-white/5 p-7 ring-1 ring-inset ring-white/15 md:p-9">
              <p className="eyebrow text-steel">{p.label}</p>
              <h3 className="mt-4 text-title font-medium">{p.title}</h3>
              <p className="mt-3 text-white/75">{p.body}</p>
            </div>
          ))}
        </div>
        <ol className="mt-4 grid gap-px overflow-hidden rounded-card bg-white/10 md:grid-cols-3">
          {[
            ["Have a conversation", "Tell us where you are, what interests you and how you hope to engage."],
            ["Choose your path", "Practise during visits, mentor, advise or explore a deeper role privately."],
            ["Start building", "Begin clinically or strategically, as part of a larger effort to strengthen care."],
          ].map(([t, b], i) => (
            <li key={t} className="reveal bg-navy p-6 md:p-8" style={{ transitionDelay: `${i * 60}ms` }}>
              <span className="text-sm font-bold text-steel">0{i + 1}</span>
              <p className="mt-3 text-lg font-semibold">{t}</p>
              <p className="mt-1 text-white/70">{b}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm text-white/60">
            You do not need to move back tomorrow or make irreversible decisions. Physicians remain responsible for
            meeting Ghanaian requirements to practise.
          </p>
          <ButtonLink href="#register" variant="light" arrow>
            Register as a diaspora physician
          </ButtonLink>
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
            {approvedClaim("traction-lois") && (
              <div className="reveal mt-10 rounded-card bg-white p-6 ring-1 ring-inset ring-smoke">
                <p className="text-headline font-semibold text-navy">20</p>
                <p className="mt-1 text-arsenic">
                  physicians have already signed Letters of Intent to practise at the first WAHP hub.
                </p>
              </div>
            )}
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
