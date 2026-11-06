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
          The four pillars
        </h2>
        <PlatformSystem />
      </Section>

      <Section tone="navy" labelledBy="integration-heading">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionIntro
            id="integration-heading"
            eyebrow="The integration"
            lead="Any single pillar can be built separately."
            rest="The value is in connecting all four."
            dark
          />
          <div className="reveal space-y-5 text-lead text-white/75 lg:pt-14">
            <p>
              A lab on its own gives physicians access to testing. Imaging on its own provides diagnostic information.
              Digital tools on their own help organise care. But physicians still lose time when these services operate
              in separate systems, locations and workflows.
            </p>
            <p>
              WAHP is designed to bring the core tools of outpatient practice into one connected environment. A
              physician will be able to see a patient, order laboratory testing or, in a later phase, imaging, review
              available results, update the treatment plan and arrange follow up without having to coordinate across
              multiple disconnected facilities.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="white" labelledBy="spaces-heading">
        <SectionIntro
          id="spaces-heading"
          eyebrow="The patient experience"
          lead="One building. Complete care."
          rest="What the platform will look like from the patient's perspective."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <SiteImage name="lobby" className="reveal" />
          <SiteImage name="consultation" className="reveal" />
          <SiteImage name="laboratory" className="reveal" />
        </div>
      </Section>

      <Section tone="navy" id="phases" labelledBy="phases-heading" className="scroll-mt-20">
        <SectionIntro
          id="phases-heading"
          eyebrow="In stages"
          lead="Four pillars,"
          rest="built to scale across West Africa."
          dark
        >
          <p>We add the next pillar only when the one before it is open and working, starting with the suites.</p>
        </SectionIntro>
        <div className="mt-14">
          <Roadmap dark />
        </div>
      </Section>

      <CtaBand
        lead="The platform is being built."
        rest="The question is where you fit."
        primary={{ href: "/contact?type=partnership#schedule", label: "Discuss a partnership" }}
        secondary={{ href: "/physicians#register", label: "I am a physician" }}
      >
        <p>
          Different next steps for different audiences, from physicians to hospitals, labs and suppliers in Ghana. Pick
          the path that matches you.
        </p>
      </CtaBand>
    </>
  );
}
