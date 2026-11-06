import type { Metadata } from "next";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { BOOK_CALL_ID, BookCallSection } from "@/components/sections/book-call";
import { Faq } from "@/components/sections/faq";
import { JourneySteps } from "@/components/sections/journey-steps";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { SiteImage } from "@/components/ui/site-image";
import { Section, SectionIntro, StageBadge } from "@/components/ui/primitives";
import { approvedClaim } from "@/content/claims";
import { faqLists, pageHeaders } from "@/content/editable";
import { callTypes, site } from "@/content/site";

export const metadata: Metadata = {
  title: "For diaspora physicians",
  description:
    "For West African doctors practising abroad. See patients in Accra during your weeks at home, mentor, or help us build the hub, at a pace that suits you.",
  alternates: { canonical: "/diaspora-physicians" },
};

const paths = [
  {
    label: "The practice path",
    title: "I want to practise.",
    body: "You did not build a career in medicine just to come home as a visitor. WAHP is building a ready path to practise in Ghana, with equipped consulting rooms and shared support in Accra, and a lab and imaging planned for later phases. Start during the weeks you are already home. Grow into more when you are ready, without the cost of building your own facility. Just the work you trained for, in the place you keep coming back to.",
  },
  {
    label: "The partner path",
    title: "I want to be involved beyond the exam room.",
    body: "There is more than one way to be useful here. Some of the people who will matter most to this work will contribute through networks, governance, and the experience of building institutions that hold up over time. If that describes you, we would welcome the introduction, with no agenda beyond a conversation.",
  },
];

const canBook = callTypes.some((c) => c.id === "diaspora");

export default function DiasporaPhysiciansPage() {
  const hero = pageHeaders.diaspora;
  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        lead={hero.lead}
        rest={hero.rest}
        status={<StageBadge stage="pre-launch" label="Registering interest · Accra flagship in development" dark />}
        aside={
          <SiteImage
            name="doctorStethoscope"
            priority
            dark
            aspect="aspect-[4/3]"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        }
      >
        <p>{hero.intro}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={canBook ? `#${BOOK_CALL_ID}` : "#register"} size="lg" arrow>
            {canBook ? "Book a call" : "Register interest"}
          </ButtonLink>
          <ButtonLink href="/platform" size="lg" variant="light">
            See the platform
          </ButtonLink>
        </div>
      </PageHero>

      <Section tone="paper" labelledBy="paths-heading">
        <SectionIntro id="paths-heading" align="center" eyebrow="Two paths" lead="Practise. Partner." rest="Or both." />
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {paths.map((p, i) => (
            <div
              key={p.label}
              className="reveal relative overflow-hidden rounded-card bg-white p-7 ring-1 ring-inset ring-smoke md:p-9"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span aria-hidden className={`absolute inset-x-0 top-0 h-1.5 ${i === 0 ? "bg-teal" : "bg-navy"}`} />
              <p className="eyebrow text-arsenic">{p.label}</p>
              <h3 className="mt-4 text-title font-medium text-navy">{p.title}</h3>
              <p className="mt-3 text-arsenic">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="white" labelledBy="how-heading">
        <SectionIntro id="how-heading" eyebrow="How it works" lead="You do not need to move" rest="back tomorrow." />
        <div className="mt-14">
          <JourneySteps
            note="You do not need to quit your practice abroad, move back permanently, or make any irreversible decisions. You remain responsible for meeting Ghana's requirements to practise."
            steps={[
              {
                title: "Have a conversation",
                body: "Schedule a call with the WAHP team. Tell us where you are, what interests you, and how you hope to engage. We will help you understand the pathways available.",
              },
              {
                title: "Choose your path",
                body: "Practise during visits, mentor, advise, support the mission, or explore a deeper role privately. WAHP meets you where you are.",
              },
              {
                title: "Start building",
                body: "Whether you begin clinically or strategically, you become part of a larger effort to strengthen healthcare delivery in West Africa.",
              },
            ]}
          />
        </div>
      </Section>

      <BookCallSection call="diaspora" lead="You have been thinking" rest="about this for years.">
        <p>
          One 30 minute call is all it takes to turn that thought into a plan, whether you want to practise during your
          visits, mentor, or explore a deeper role. Prefer to write?{" "}
          <a href="#register" className="font-semibold text-white underline decoration-white/40 underline-offset-4">
            Register your interest
          </a>{" "}
          instead.
        </p>
      </BookCallSection>

      <Section tone="paper" id="register" labelledBy="register-heading" className="scroll-mt-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <SectionIntro
              id="register-heading"
              eyebrow="Register interest"
              lead="Tell us where"
              rest="you practise now."
            >
              <p>
                Tell us what interests you and how you hope to engage. Please leave out any patient information. We only
                use your details to get back to you.
              </p>
            </SectionIntro>
            {approvedClaim("traction-lois") && (
              <div className="reveal mt-10 rounded-card bg-white p-6 ring-1 ring-inset ring-smoke">
                <p className="text-headline font-semibold text-navy">20</p>
                <p className="mt-1 text-arsenic">
                  physicians have signed letters of intent to practise at the first WAHP hub in Accra.
                </p>
              </div>
            )}
          </div>
          <EnquiryForm
            defaultType="physician"
            lockType
            defaultInterest="Diaspora physician wanting to practise in Ghana"
            locationHint="e.g. London, United Kingdom"
            contactEmail={site.contactEmail}
          />
        </div>
      </Section>

      <Section tone="white" labelledBy="faq-heading">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
          <SectionIntro id="faq-heading" eyebrow="Questions" lead="Questions from" rest="diaspora physicians." />
          <Faq items={faqLists.diaspora} />
        </div>
      </Section>
    </>
  );
}
