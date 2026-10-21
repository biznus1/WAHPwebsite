import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { TeamGrid } from "@/components/sections/team-grid";
import { Section, SectionIntro } from "@/components/ui/primitives";
import { approvedLeaders } from "@/content/leadership";
import { pageHeaders } from "@/content/editable";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "The core team of West African Health Partners: physicians and operators building shared clinical infrastructure for independent practice, starting in Accra.",
  alternates: { canonical: "/leadership" },
};

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        eyebrow={pageHeaders.leadership.eyebrow}
        lead={pageHeaders.leadership.lead}
        rest={pageHeaders.leadership.rest}
      >
        <p>{pageHeaders.leadership.intro}</p>
      </PageHero>

      <Section tone="paper" labelledBy="team-heading">
        <SectionIntro
          id="team-heading"
          eyebrow="Core team"
          lead="The operating team"
          rest="building WAHP day to day."
        />
        <div className="mt-14">
          <TeamGrid leaders={approvedLeaders} />
        </div>
      </Section>

      <CtaBand lead="Speak with" rest="the team." primary={{ href: "/contact", label: "Get in touch" }} />
    </>
  );
}
