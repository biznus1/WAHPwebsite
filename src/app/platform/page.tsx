import type { Metadata } from "next";
import { Roadmap } from "@/components/graphics/roadmap";
import { PlatformSystem } from "@/components/graphics/platform-system";
import { CtaBand } from "@/components/sections/cta-band";
import { Section, SectionIntro } from "@/components/ui/primitives";
import { ConceptImage } from "@/components/ui/concept-image";

export const metadata: Metadata = {
  title: "The platform",
  description:
    "How WAHP's proposed model fits together: professional clinical space, a shared operational backbone, integrated laboratory services and future imaging and digital enablement.",
  alternates: { canonical: "/platform" },
};

export default function PlatformPage() {
  return (
    <>
      <section className="bg-paper pt-16 pb-6 md:pt-24">
        <div className="container-wahp">
          <SectionIntro as="h1" eyebrow="The platform" lead="One shared foundation," rest="many independent practices.">
            <p>
              WAHP brings together the components an outpatient practice depends on and makes them shared. Each is
              introduced in sequence — and each is labelled here by its actual stage.
            </p>
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
            eyebrow="The integration"
            lead="Any pillar can be built separately."
            rest="The value is in connecting all four."
            dark
          />
          <div className="reveal space-y-5 text-lead text-white/75 lg:pt-14">
            <p>
              A lab on its own gives access to testing. Imaging on its own provides diagnostic information. Digital
              tools on their own help organise care. But physicians still lose time when these services operate in
              separate systems, locations and workflows.
            </p>
            <p>
              WAHP is designed so a physician can see a patient, order laboratory testing or imaging, review results,
              update the treatment plan and arrange follow-up — without coordinating across disconnected facilities.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="white" labelledBy="spaces-heading">
        <SectionIntro id="spaces-heading" eyebrow="The spaces" lead="What the hub" rest="is designed to feel like." />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <ConceptImage
            name="consultation"
            className="reveal"
            caption="Concept rendering of a consultation suite — not an existing facility. People shown are illustrative."
          />
          <ConceptImage
            name="laboratory"
            className="reveal"
            caption="Concept rendering of the planned laboratory — not an operating service. People shown are illustrative."
          />
        </div>
      </Section>

      <Section tone="navy" id="phases" labelledBy="phases-heading" className="scroll-mt-20">
        <SectionIntro id="phases-heading" eyebrow="Sequencing" lead="Built in phases," rest="each one earned." dark>
          <p>Capabilities are added only once the phase before them is established.</p>
        </SectionIntro>
        <div className="mt-14">
          <Roadmap dark />
        </div>
      </Section>

      <CtaBand
        lead="Shape the platform"
        rest="with us."
        primary={{ href: "/contact?type=partnership", label: "Discuss a partnership" }}
        secondary={{ href: "/physicians#register", label: "Physician interest" }}
      >
        <p>Physicians, institutions and suppliers can speak with WAHP about participation and collaboration.</p>
      </CtaBand>
    </>
  );
}
