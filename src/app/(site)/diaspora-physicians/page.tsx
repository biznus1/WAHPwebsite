import type { Metadata } from "next";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { Faq } from "@/components/sections/faq";
import { JourneySteps } from "@/components/sections/journey-steps";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { SiteImage } from "@/components/ui/site-image";
import { Section, SectionIntro, StageBadge } from "@/components/ui/primitives";
import { approvedClaim } from "@/content/claims";
import { faqLists, pageHeaders } from "@/content/editable";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "For diaspora physicians",
  description:
    "For West African physicians practising abroad: a path to practise in Ghana during visits home, mentor, or help build WAHP's Accra flagship — at your own pace.",
  alternates: { canonical: "/diaspora-physicians" },
};

const paths = [
  {
    label: "The practice path",
    title: "I want to practise.",
    body: "Equipped clinical space and shared support in Accra. Start during the weeks you are already home, and grow into more when you are ready.",
  },
  {
    label: "The partner path",
    title: "I want to help build.",
    body: "Contribute through your networks, advice or experience building institutions. If that describes you, we would welcome the introduction.",
  },
];

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
          <ButtonLink href="#register" size="lg" arrow>
            Register interest
          </ButtonLink>
          <ButtonLink href="/platform" size="lg" variant="light">
            See the platform
          </ButtonLink>
        </div>
      </PageHero>

      <Section tone="paper" labelledBy="paths-heading">
        <SectionIntro id="paths-heading" align="center" eyebrow="Two paths" lead="Practise, partner," rest="or both." />
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
        <SectionIntro id="how-heading" eyebrow="How it works" lead="Start with" rest="a conversation." />
        <div className="mt-14">
          <JourneySteps
            note="You do not need to move back tomorrow. Physicians remain responsible for meeting Ghanaian requirements to practise."
            steps={[
              { title: "Have a conversation", body: "Tell us where you are and how you hope to engage." },
              { title: "Choose your path", body: "Practise during visits, mentor, advise or explore a deeper role." },
              { title: "Start building", body: "Begin clinically or strategically, at the pace that suits you." },
            ]}
          />
        </div>
      </Section>

      <Section tone="paper" id="register" labelledBy="register-heading" className="scroll-mt-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <SectionIntro id="register-heading" eyebrow="Register interest" lead="Tell us where" rest="you practise.">
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
          <EnquiryForm
            defaultType="physician"
            lockType
            defaultInterest="Diaspora physician — practising in Ghana"
            locationHint="e.g. London, United Kingdom"
            contactEmail={site.contactEmail}
          />
        </div>
      </Section>

      <Section tone="white" labelledBy="faq-heading">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
          <SectionIntro id="faq-heading" eyebrow="Questions" lead="Diaspora physician" rest="FAQs." />
          <Faq items={faqLists.diaspora} />
        </div>
      </Section>
    </>
  );
}
