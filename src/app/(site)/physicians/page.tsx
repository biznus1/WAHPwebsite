import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { BOOK_CALL_ID, BookCallSection } from "@/components/sections/book-call";
import { Faq } from "@/components/sections/faq";
import { JourneySteps } from "@/components/sections/journey-steps";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { SiteImage } from "@/components/ui/site-image";
import { Section, SectionIntro, StageBadge } from "@/components/ui/primitives";
import { approvedClaim } from "@/content/claims";
import { callTypes, site } from "@/content/site";
import { faqLists, pageHeaders } from "@/content/editable";

export const metadata: Metadata = {
  title: "For physicians",
  description:
    "For independent physicians and specialists in Ghana. Register interest in consulting rooms and shared support at the WAHP hub we are building in Accra.",
  alternates: { canonical: "/physicians" },
};

const offer = [
  {
    title: "Your suite",
    body: "A modern consultation and treatment room prepared for patient care, with essential furnishings and clinical equipment. We plan to offer it by the hour, the day or the month.",
  },
  {
    title: "Practice support",
    body: "Shared reception, scheduling, records and day to day support for the clinical environment, so you can spend more of your time focused on patients and growing your practice.",
  },
  {
    title: "On site diagnostics",
    body: "Laboratory testing within the WAHP facility is planned for Phase 2, subject to approvals, giving you and your patients a more connected path from consultation to testing without sending them to a separate location. Imaging is planned for a later phase.",
  },
  {
    title: "Your practice. Your patients. Your future.",
    body: "Your patients stay your patients and you make the clinical decisions. Commit less capital to setup. Spend less time managing operations. Keep more of your attention on patients and practice growth.",
  },
];

const canBook = callTypes.some((c) => c.id === "physician");

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
          <ButtonLink href={canBook ? `#${BOOK_CALL_ID}` : "#register"} size="lg" arrow>
            {canBook ? "Book a call" : "Register interest"}
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
            eyebrow="The practice advantage"
            lead="Lower overhead. More control."
            rest="Greater potential."
          />
          <SiteImage name="physicianStethoscopeGreen" className="reveal" aspect="aspect-[16/10]" />
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
              <span className="eyebrow text-steel">For diaspora physicians</span>
              <span className="mt-2 block text-title font-medium">
                You&apos;ve thought about going back. WAHP gives you a credible path forward.
              </span>
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
          lead="From first conversation"
          rest="to your first patient."
        />
        <div className="mt-14">
          <JourneySteps
            note="Getting started with WAHP is designed to be simple and straightforward. We will confirm the details as the Accra hub gets closer to opening."
            steps={[
              {
                title: "Schedule a call",
                body: "Start with a 30 minute conversation about your practice, specialty and goals. We will introduce the WAHP model, the planned suites and next steps.",
              },
              {
                title: "Choose your suite",
                body: "When bookings open, select the suite and schedule that best fit how you want to practise, with options that can support your needs as your practice grows.",
              },
              {
                title: "Start practising",
                body: "When the hub opens, bring your patients and begin practising in a ready to use clinical setting, with access to WAHP services and digital tools as they come online.",
              },
            ]}
          />
        </div>
      </Section>

      <BookCallSection call="physician" lead="Your practice" rest="could start here.">
        <p>
          Schedule a 30 minute video call with our team to see what your practice could look like at the Accra hub.
          Prefer to write?{" "}
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
              eyebrow="Take the first step"
              lead="Tell us about"
              rest="your practice."
            >
              <p>
                Explore a new way to build and grow your practice with WAHP. Please leave out any patient information.
                We only use your details to get back to you.
              </p>
            </SectionIntro>
            {approvedClaim("traction-lois") && (
              <div className="reveal mt-10 rounded-card bg-white p-6 ring-1 ring-inset ring-smoke">
                <p className="text-headline font-semibold text-navy">20</p>
                <p className="mt-1 text-arsenic">physicians have already signed letters of intent with WAHP.</p>
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
