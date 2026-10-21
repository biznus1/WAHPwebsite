import type { Metadata } from "next";
import { Roadmap } from "@/components/graphics/roadmap";
import { PlatformSystem } from "@/components/graphics/platform-system";
import { CtaBand } from "@/components/sections/cta-band";
import { Section, SectionIntro, StageBadge } from "@/components/ui/primitives";
import { Notice } from "@/components/ui/notice";
import { ConceptImage } from "@/components/ui/concept-image";
import { pillars } from "@/content/platform";

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

      <Section tone="white" labelledBy="detail-heading">
        <SectionIntro id="detail-heading" eyebrow="In detail" lead="What each component" rest="is designed to do." />
        <div className="mt-14 divide-y divide-smoke border-y border-smoke">
          {pillars.map((p) => (
            <article
              key={p.id}
              id={p.id}
              className="reveal grid gap-6 py-10 md:grid-cols-[8rem_minmax(0,1fr)_minmax(0,1fr)] md:gap-10"
            >
              <p className="text-headline font-semibold text-teal">{p.number}</p>
              <div>
                <h3 className="text-title font-medium text-navy">{p.title}</h3>
                <div className="mt-4">
                  <StageBadge stage={p.stage} label={p.stageLabel} />
                </div>
              </div>
              <div>
                <p className="text-lg text-arsenic">{p.summary}</p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-arsenic marker:text-teal">
                  {p.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
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
        <div className="mt-10 max-w-3xl">
          <Notice title="About availability">
            WAHP is pre-launch. No clinical, laboratory or imaging services are operating today. Services will begin
            only once facilities are complete, staffed, licensed and approved.
          </Notice>
        </div>
      </Section>

      <Section tone="navy" labelledBy="phases-heading">
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
