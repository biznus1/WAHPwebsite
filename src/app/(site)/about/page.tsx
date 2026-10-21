import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { Eyebrow, Section, SectionIntro } from "@/components/ui/primitives";
import { SiteImage } from "@/components/ui/site-image";
import { pageHeaders } from "@/content/editable";

export const metadata: Metadata = {
  title: "About",
  description:
    "WAHP is a team of physicians and operators building a shared outpatient hub in Accra, so doctors in Ghana have the space, diagnostics and support to practise at their best.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Physicians first",
    body: "Every decision starts with one question: does this make a doctor's practice better? The hub works for physicians, not the other way round.",
  },
  {
    title: "Everything connected",
    body: "Patients in Ghana lose days moving between separate clinics, labs and offices. Whatever we build has to link up with the rest.",
  },
  {
    title: "Built to repeat",
    body: "Accra is the first hub, not the only one. We set up every process so it can work again in Kumasi and beyond.",
  },
  {
    title: "Straight talk",
    body: "We tell physicians, investors and partners where things really stand, including what is still only a plan.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow={pageHeaders.about.eyebrow} lead={pageHeaders.about.lead} rest={pageHeaders.about.rest}>
        <p>{pageHeaders.about.intro}</p>
      </PageHero>

      <Section tone="paper" labelledBy="mission-heading">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="reveal">
            <Eyebrow as="h2" id="mission-heading">
              Our mission
            </Eyebrow>
            <p className="mt-6 text-headline font-semibold text-navy">
              To give West African physicians the space, tools and support to practise at their best, at home.
            </p>
            <p className="mt-6 text-lead text-arsenic">
              We are bringing consulting rooms, a shared front desk, diagnostics and digital records under one roof in
              Accra, so independent doctors can run their own practices without building a clinic alone. Kumasi is the
              next city we have in mind; West Africa is the long term aim.
            </p>
          </div>
          <div className="reveal space-y-10 lg:pt-14">
            <div>
              <Eyebrow as="h2">Our vision</Eyebrow>
              <p className="mt-4 text-title font-medium text-navy">
                Where practising in West Africa is a career advantage, not a sacrifice.
              </p>
              <p className="mt-4 text-lead text-arsenic">
                A doctor in Accra should not have to leave Ghana to practise well. We want them to have the same
                diagnostics and support as a doctor in Atlanta, without getting on a plane.
              </p>
            </div>
            <div>
              <Eyebrow as="h2">Where we start</Eyebrow>
              <p className="mt-4 text-lead text-arsenic">
                Phase 1 is the Accra hub. It is not open yet: services start only once the building is finished,
                staffed, licensed and approved. We are working through Ghana&apos;s healthcare and facility licensing now,
                and WAHP will meet every national requirement before it opens.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Founder's letter */}
      <Section tone="white" labelledBy="origin-heading">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <SectionIntro id="origin-heading" eyebrow="The origin" lead="Why we started" rest="WAHP." />
            <SiteImage
              name="founders"
              className="reveal mt-10"
              aspect="aspect-[3/4]"
              sizes="(min-width: 1024px) 30vw, 100vw"
              caption="Cofounders Jonathan Francois, MD (CEO) and Emmanuel Adomfeh, MD, MPH (COO)."
            />
          </div>
          <blockquote className="reveal space-y-5 text-lead text-arsenic">
            <p>
              Some of the most meaningful things we build in life start with shared experience, shared values and shared
              vision.
            </p>
            <p>
              My cofounder, Emmanuel Adomfeh, and I trained together during internal medicine residency, and over the
              years our friendship has grown into a mission.
            </p>
            <p>
              For the past five years, we have travelled to West Africa, particularly Ghana, multiple times. Each trip
              made the same realities impossible to ignore: a fragmented healthcare system, ongoing brain drain, and
              limited access to affordable, reliable diagnostics.
            </p>
            <p className="text-title font-medium text-navy">
              Rather than just talk about the problem, we decided to build.
            </p>
            <p>
              That is what led to the creation of West African Health Partners. We are working to build infrastructure
              that helps physicians practise sustainably and helps patients access the care and diagnostics they need
              more easily and affordably.
            </p>
            <p>
              To me, this is also part of a bigger story: a new generation of young diaspora leaders choosing not only
              to stay connected to the motherland, but to help build it. We may have trained abroad, but we carry with
              us a responsibility to contribute, collaborate and create solutions that matter back home.
            </p>
            <footer className="pt-2 text-base font-semibold text-navy">Jonathan Francois, MD, Cofounder and CEO</footer>
          </blockquote>
        </div>
      </Section>

      <Section tone="paper" labelledBy="values-heading">
        <SectionIntro id="values-heading" eyebrow="Our values" lead="How we work," rest="day to day." />
        <ul className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {values.map((v, i) => (
            <li
              key={v.title}
              className="reveal rounded-card bg-white p-7 ring-1 ring-inset ring-smoke md:p-8"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="text-sm font-bold text-navy">0{i + 1}</span>
              <h3 className="mt-4 text-title font-medium text-navy">{v.title}</h3>
              <p className="mt-3 text-arsenic">{v.body}</p>
            </li>
          ))}
        </ul>
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
