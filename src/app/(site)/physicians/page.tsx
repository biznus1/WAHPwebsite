import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { Faq } from "@/components/sections/faq";
import { JourneySteps } from "@/components/sections/journey-steps";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { SiteImage } from "@/components/ui/site-image";
import { Section, SectionIntro, StageBadge } from "@/components/ui/primitives";
import { approvedClaim } from "@/content/claims";
import { site } from "@/content/site";
import { faqLists, pageHeaders } from "@/content/editable";

export const metadata: Metadata = {
  title: "For physicians",
  description:
    "For independent physicians and specialists in Ghana. Register interest in consulting rooms and shared support at the WAHP hub we are building in Accra.",
  alternates: { canonical: "/physicians" },
};

const offer = [
  {
    title: "Consulting rooms, ready to use",
    body: "Furnished consultation and examination rooms in Accra that you book by the hour, the day or the month.",
  },
  {
    title: "A front desk you share",
    body: "Reception, scheduling and records run by the hub, so you are not hiring and managing your own staff.",
  },
  {
    title: "Tests down the corridor",
    body: "We plan a laboratory in the building for Phase 2, subject to approvals, so patients are not sent across town for bloods.",
  },
  {
    title: "Your practice, your name",
    body: "Your patients stay your patients. You make the clinical decisions and you keep your own name on the door.",
  },
];

export default function PhysiciansPage() {
  return (
    <>
      <PageHero
        eyebrow={pageHeaders.physicians.eyebrow}
        lead={pageHeaders.physicians.lead}
        rest={pageHeaders.physicians.rest}
        status={<StageBadge stage="pre-launch" label="Registering interest · Accra flagship in development" dark />}
        aside={
          <SiteImage name="consultation" priority dark aspect="aspect-[4/3]" sizes="(min-width: 1024px) 40vw, 100vw" />
        }
      >
        <p>{pageHeaders.physicians.intro}</p>
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
        <div className="grid items-end gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionIntro
            id="offer-heading"
            eyebrow="The proposition"
            lead="What you would get"
            rest="at the Accra hub."
          />
          <SiteImage name="doctorClinicKinshasa" className="reveal" aspect="aspect-[16/10]" />
        </div>
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
          Rates, opening hours and equipment lists are not confirmed yet. We will send them to registered physicians
          first.
        </p>
      </Section>

      {/* Diaspora physicians have their own page. */}
      <section aria-label="For diaspora physicians" className="bg-paper pb-4">
        <div className="container-wahp">
          <Link
            href="/diaspora-physicians"
            className="reveal group relative flex flex-col gap-4 overflow-hidden rounded-card bg-navy p-7 text-white transition-transform duration-500 ease-soft hover:-translate-y-0.5 sm:flex-row sm:items-center sm:justify-between md:p-9"
          >
            <span>
              <span className="eyebrow text-steel">Practising abroad?</span>
              <span className="mt-2 block text-title font-medium">We have a separate path for doctors abroad.</span>
            </span>
            <span className="inline-flex items-center gap-2 font-semibold">
              See the diaspora path
              <ArrowRight aria-hidden className="size-4 text-steel transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </section>

      <Section tone="white" labelledBy="journey-heading">
        <SectionIntro
          id="journey-heading"
          eyebrow="How it works"
          lead="From your first message"
          rest="to your first patient."
        />
        <div className="mt-14">
          <JourneySteps
            note="This is how we expect it to run. We will confirm the details as the Accra hub gets closer to opening."
            steps={[
              {
                title: "Register interest",
                body: "Tell us your specialty, where you practise now and what you need.",
              },
              {
                title: "A conversation",
                body: "One of our physicians calls you to talk through your practice and how WAHP fits.",
              },
              {
                title: "Planning your rooms",
                body: "We plan room bookings around the physicians who have signed up.",
              },
              {
                title: "Getting set up",
                body: "You meet the front desk team and learn the booking and records systems before your first clinic.",
              },
            ]}
          />
        </div>
      </Section>

      <Section tone="paper" id="register" labelledBy="register-heading" className="scroll-mt-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <SectionIntro id="register-heading" eyebrow="Register interest" lead="Tell us about" rest="your practice.">
              <p>Please leave out any patient information. We only use your details to get back to you.</p>
            </SectionIntro>
            {approvedClaim("traction-lois") && (
              <div className="reveal mt-10 rounded-card bg-white p-6 ring-1 ring-inset ring-smoke">
                <p className="text-headline font-semibold text-navy">20</p>
                <p className="mt-1 text-arsenic">
                  physicians have signed letters of intent to practise at our first hub in Accra.
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
          <Faq items={faqLists.physicians} />
        </div>
      </Section>
    </>
  );
}
