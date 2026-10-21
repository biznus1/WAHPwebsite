import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { Eyebrow, Section, SectionIntro } from "@/components/ui/primitives";
import { SiteImage } from "@/components/ui/site-image";
import { pageHeaders } from "@/content/editable";

export const metadata: Metadata = {
  title: "About",
  description:
    "WAHP's mission is to create an environment where West African physicians have the tools, technology and support to practise at their highest level — starting in Ghana.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Physician-first design",
    body: "Every decision starts with one question: does this make the physician's practice better? The platform exists to serve physicians, not the other way around.",
  },
  {
    title: "Integration over isolation",
    body: "Fragmented healthcare is the problem. Every system we build, partnership we form and tool we adopt must connect to the whole.",
  },
  {
    title: "Build to replicate",
    body: "Accra is not the destination. Every system, process and operational decision is designed to work in the next city, and the one after that.",
  },
  {
    title: "Radical transparency",
    body: "With physicians, investors and partners, we share the data, the challenges and the progress honestly. Trust is earned through transparency.",
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
              To create an environment where West African physicians have the tools, technology and support to practise
              at their highest level.
            </p>
            <p className="mt-6 text-lead text-arsenic">
              WAHP exists to strengthen independent medical practice by bringing clinical space, diagnostics, technology
              and practice support into one connected environment — starting in Ghana, with a model designed to grow
              across West Africa.
            </p>
          </div>
          <div className="reveal space-y-10 lg:pt-14">
            <div>
              <Eyebrow as="h2">Our vision</Eyebrow>
              <p className="mt-4 text-title font-medium text-navy">
                Where practising in West Africa is a career advantage, not a sacrifice.
              </p>
              <p className="mt-4 text-lead text-arsenic">
                A West Africa where physicians do not have to choose between staying home and practising well — where a
                doctor in Accra has access to the same quality of diagnostics, imaging and operational infrastructure as
                a doctor in Atlanta.
              </p>
            </div>
            <div>
              <Eyebrow as="h2">Where we start</Eyebrow>
              <p className="mt-4 text-lead text-arsenic">
                Phase 1 is planned for Accra. We are pre-launch: services will begin only once the facility is complete,
                staffed, licensed and approved. WAHP will operate in full compliance with applicable Ghanaian healthcare
                and facility regulations, and licensing and regulatory processes are being pursued in accordance with
                national standards.
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
              caption="Co-founders Jonathan Francois, MD (CEO) and Emmanuel Adomfeh, MD, MPH (COO)."
            />
          </div>
          <blockquote className="reveal space-y-5 text-lead text-arsenic">
            <p>
              Some of the most meaningful things we build in life start with shared experience, shared values and shared
              vision.
            </p>
            <p>
              My co-founder, Emmanuel Adomfeh, and I trained together during internal medicine residency, and over the
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
            <footer className="pt-2 text-base font-semibold text-navy">
              — Jonathan Francois, MD, Co-Founder &amp; CEO
            </footer>
          </blockquote>
        </div>
      </Section>

      <Section tone="paper" labelledBy="values-heading">
        <SectionIntro
          id="values-heading"
          eyebrow="Our values"
          lead="Operating principles,"
          rest="not marketing slogans."
        />
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
