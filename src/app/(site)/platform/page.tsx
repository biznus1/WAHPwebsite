import type { Metadata } from "next";
import { Roadmap } from "@/components/graphics/roadmap";
import { PlatformSystem } from "@/components/graphics/platform-system";
import { CtaBand } from "@/components/sections/cta-band";
import { Section, SectionIntro } from "@/components/ui/primitives";
import { SiteImage } from "@/components/ui/site-image";
import { pageHeaders } from "@/content/editable";

export const metadata: Metadata = {
  title: "The platform",
  description:
    "How the WAHP hub in Accra fits together: consulting rooms, shared reception and admin, a planned on site lab, imaging in a later phase, and the records system that links them.",
  alternates: { canonical: "/platform" },
};

export default function PlatformPage() {
  return (
    <>
      <section className="bg-paper pt-16 pb-6 md:pt-24">
        <div className="container-wahp">
          <SectionIntro
            as="h1"
            eyebrow={pageHeaders.platform.eyebrow}
            lead={pageHeaders.platform.lead}
            rest={pageHeaders.platform.rest}
          >
            <p>{pageHeaders.platform.intro}</p>
          </SectionIntro>
        </div>
      </section>

      <Section tone="paper" className="!pt-10" labelledBy="system-heading">
        <h2 id="system-heading" className="sr-only">
          Platform components
        </h2>
        <PlatformSystem />
      </Section>

      <Section tone="navy" labelledBy="integration-heading">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionIntro
            id="integration-heading"
            eyebrow="Why one building"
            lead="Each part exists somewhere in Accra."
            rest="The difference is having them together."
            dark
          />
          <div className="reveal space-y-5 text-lead text-white/75 lg:pt-14">
            <p>
              Today a patient in Accra might see a doctor in one place, queue for tests in another and come back days
              later for the results. Each stop has its own paperwork, and the physician spends time chasing reports
              instead of treating.
            </p>
            <p>
              In the WAHP hub, the physician sees the patient, orders tests, reads the results in the same record,
              adjusts the plan and books the next visit. One building, one file.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="white" labelledBy="spaces-heading">
        <SectionIntro id="spaces-heading" eyebrow="The spaces" lead="How we picture" rest="the Accra hub." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <SiteImage
            name="lobby"
            className="reveal"
            caption="Concept rendering of the reception. This is a plan, not a finished building, and the people are illustrative."
          />
          <SiteImage
            name="consultation"
            className="reveal"
            caption="Concept rendering of a consulting room. This is a plan, not a finished building, and the people are illustrative."
          />
          <SiteImage
            name="laboratory"
            className="reveal"
            caption="Concept rendering of the planned lab. It is not operating, and the people are illustrative."
          />
        </div>
      </Section>

      <Section tone="navy" id="phases" labelledBy="phases-heading" className="scroll-mt-20">
        <SectionIntro
          id="phases-heading"
          eyebrow="In stages"
          lead="One phase at a time,"
          rest="starting with the rooms."
          dark
        >
          <p>We add the next service only when the one before it is open and working.</p>
        </SectionIntro>
        <div className="mt-14">
          <Roadmap dark />
        </div>
      </Section>

      <CtaBand
        lead="Help us build"
        rest="the Accra hub."
        primary={{ href: "/contact?type=partnership", label: "Discuss a partnership" }}
        secondary={{ href: "/physicians#register", label: "Physician interest" }}
      >
        <p>Physicians, hospitals, labs and suppliers in Ghana: tell us how you would like to work with us.</p>
      </CtaBand>
    </>
  );
}
