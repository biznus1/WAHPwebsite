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
    "Meet the team behind West African Health Partners: physicians and operators building a shared outpatient hub for independent doctors in Accra.",
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
        <SectionIntro id="team-heading" eyebrow="Core team" lead="The people building" rest="the Accra hub." />
        <div className="mt-14">
          <TeamGrid leaders={approvedLeaders} />
        </div>
      </Section>

      <CtaBand lead="Want to talk" rest="to the team?" primary={{ href: "/contact", label: "Get in touch" }} />
    </>
  );
}
