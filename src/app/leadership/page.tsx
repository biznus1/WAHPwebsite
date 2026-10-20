import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui/primitives";
import { leaders } from "@/content/leadership";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Leadership",
  description: "The leadership team of West African Health Partners.",
  alternates: { canonical: "/leadership" },
};

export default function LeadershipPage() {
  const approved = leaders.filter((l) => l.publicApproved);
  return (
    <>
      <PageHero eyebrow="Leadership" lead="The people" rest="building WAHP.">
        <p>Names and roles of WAHP&apos;s leadership team are published here once confirmed.</p>
      </PageHero>

      <Section tone="paper" labelledBy="team-heading">
        <h2 id="team-heading" className="sr-only">
          Leadership team
        </h2>
        {approved.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {approved.map((l) => (
              <li key={l.name} className="reveal rounded-card bg-white p-7 ring-1 ring-inset ring-smoke">
                <p className="text-title font-medium text-navy">{l.name}</p>
                <p className="mt-1 text-arsenic">{l.title}</p>
                {l.linkedin && (
                  <a
                    href={l.linkedin}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="mt-5 inline-block font-semibold text-navy underline underline-offset-4"
                  >
                    LinkedIn<span className="sr-only"> profile of {l.name} (opens in a new tab)</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="reveal mx-auto max-w-2xl rounded-panel bg-white p-10 text-center ring-1 ring-inset ring-smoke md:p-14">
            <p className="text-title font-medium text-navy">Leadership profiles are being finalised.</p>
            <p className="mt-4 text-arsenic">
              We publish names and roles only once they are confirmed. In the meantime, the team is happy to make an
              introduction.
            </p>
            {site.linkedin && (
              <a
                href={site.linkedin}
                rel="noopener noreferrer"
                target="_blank"
                className="mt-8 inline-block font-semibold text-navy underline decoration-teal decoration-2 underline-offset-4"
              >
                Follow WAHP on LinkedIn<span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </div>
        )}
      </Section>

      <CtaBand lead="Speak with" rest="the team." primary={{ href: "/contact", label: "Get in touch" }} />
    </>
  );
}
