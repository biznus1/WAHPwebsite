import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, FlaskConical, MonitorSmartphone, Play, ScanLine } from "lucide-react";
import { ClinicalFloorSchematic } from "@/components/graphics/clinical-floor-schematic";
import { HeroRings } from "@/components/graphics/hero-rings";
import { Wave } from "@/components/graphics/wave";
import { CountUp } from "@/components/motion/count-up";
import { LoopVideo } from "@/components/motion/loop-video";
import { AudiencePaths } from "@/components/sections/audience-paths";
import { AudienceCta } from "@/components/sections/audience-cta";
import { Comparison } from "@/components/sections/comparison";
import { ProblemStats } from "@/components/sections/problem-stats";
import { ButtonLink } from "@/components/ui/button";
import { SiteImage } from "@/components/ui/site-image";
import { Eyebrow, Section, SectionIntro, SplitHeading, StageBadge } from "@/components/ui/primitives";
import { approvedClaim } from "@/content/claims";
import { pageHeaders } from "@/content/editable";
import { pillars } from "@/content/platform";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: "West African Health Partners · Shared clinical space for independent doctors in Accra" },
  description:
    "WAHP is building a shared outpatient hub in Accra, Ghana, where independent physicians rent equipped consulting rooms and share reception, scheduling and records. A lab and imaging follow in later phases.",
  alternates: { canonical: "/" },
};

/** Groundwork figures; each renders only while its claim is approved in the claims register. */
const groundwork = [
  { claim: "traction-lois", value: "20", label: "Physician letters of intent" },
  { claim: "traction-research", value: "60+", label: "Physicians surveyed" },
  { claim: "leadership-profiles", value: "5", label: "Leadership team" },
  { claim: "traction-research", value: "3", label: "Studies completed" },
].filter((s) => approvedClaim(s.claim));

const pillarIcons = [Building2, FlaskConical, ScanLine, MonitorSmartphone];

/** Entrance delay for `.hero-in` / `.hero-line`, and the stat cards' light sweep. */
const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default function HomePage() {
  const hero = pageHeaders.home;
  return (
    <>
      {/* 1 — Hero: one statement, one line of support, two actions, the groundwork in numbers. */}
      {/* Pulled up under the header (which is transparent over the hero) so the footage starts at the very top. */}
      <section data-hero className="grain on-dark relative isolate -mt-18 overflow-hidden bg-navy text-white md:-mt-20">
        {/* Phones: the footage covers the hero's first screen (header to buttons) behind the original deep navy,
            framed on the doctor. Covering one screen rather than the whole tall hero halves the zoom; it fades into
            navy above the stat cards (owner requests, 5 Nov 2026).
            Larger screens: it fills the hero behind a navy overlay that opens up towards the right. */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-20 h-svh max-h-[56rem] min-h-[40rem] md:inset-0 md:h-auto md:max-h-none md:min-h-0"
        >
          <LoopVideo src="/video/hero-clinic" className="object-[63%_50%] md:object-[38%_30%]" />
        </div>
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-svh max-h-[56rem] min-h-[40rem] bg-[linear-gradient(to_bottom,rgba(0,51,102,0.75)_0%,rgba(0,51,102,0.75)_72%,#003366_100%)] md:hidden"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 md:bg-[linear-gradient(90deg,rgba(0,51,102,0.86)_0%,rgba(0,51,102,0.78)_42%,rgba(0,51,102,0.62)_58%,rgba(0,51,102,0.15)_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,#003366_0%,rgba(0,51,102,0.5)_18%,transparent_40%),radial-gradient(60%_50%_at_85%_15%,rgba(0,135,158,0.2),transparent_70%)]"
        />
        <div aria-hidden className="scroll-sink pointer-events-none absolute -top-48 -right-56 -z-10 md:-right-32">
          <HeroRings className="size-[44rem] text-white/[0.07] md:size-[56rem]" />
        </div>

        <div className="container-wahp relative pt-32 pb-12 md:pt-44 md:pb-16">
          <div className="scroll-recede max-w-4xl">
            <div className="hero-in" style={delay(0)}>
              <Eyebrow dark>West African Health Partners</Eyebrow>
            </div>
            <h1 className="mt-7 text-display font-bold text-white [filter:drop-shadow(0_2px_18px_rgba(0,25,51,0.55))]">
              <span className="hero-line block" style={delay(80)}>
                {hero.lead}
              </span>
              <span
                className="hero-line block bg-gradient-to-r from-teal-300 to-steel bg-clip-text text-transparent"
                style={delay(160)}
              >
                {hero.rest}
              </span>
            </h1>
            <p
              className="hero-in mt-7 max-w-xl text-lead text-white/80 md:text-white/90 [text-shadow:0_1px_14px_rgba(0,25,51,0.75)]"
              style={delay(260)}
            >
              {hero.intro}
            </p>
            <div className="hero-in mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" style={delay(360)}>
              <ButtonLink href="/platform" size="lg" arrow>
                See how it works
              </ButtonLink>
              <ButtonLink href="/contact" size="lg" variant="light">
                Get in touch
              </ButtonLink>
              <span className="sm:ml-3">
                <StageBadge stage="pre-launch" label={hero.badge} dark />
              </span>
            </div>
            {site.overviewVideo && (
              <a
                href={site.overviewVideo}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-in group mt-8 inline-flex items-center gap-3 rounded-full pr-3 text-white [text-shadow:0_1px_14px_rgba(0,25,51,0.75)]"
                style={delay(440)}
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/40 backdrop-blur-sm transition-colors ring-inset group-hover:bg-white/20 group-hover:ring-white">
                  <Play aria-hidden className="ml-0.5 size-4 fill-current" />
                </span>
                <span>
                  <span className="block font-semibold underline decoration-white/0 underline-offset-4 transition-colors group-hover:decoration-white/60">
                    Watch the overview
                  </span>
                  <span className="block text-sm text-white/80">
                    On YouTube<span className="sr-only"> (opens in a new tab)</span>
                  </span>
                </span>
              </a>
            )}
          </div>

          {groundwork.length > 0 && (
            <dl className="mt-16 grid grid-cols-2 gap-3 md:mt-24 md:grid-cols-4" aria-label="Where WAHP stands today">
              {groundwork.map((s, i) => (
                // Each card animates when it scrolls into view (on phones they start below the fold):
                // a staggered rise, the count up, the underline drawing in, then one soft light sweep.
                <div
                  key={s.label}
                  className="reveal stat-card relative overflow-hidden rounded-card bg-navy/45 px-5 py-6 ring-1 ring-inset ring-white/15 backdrop-blur-md md:px-7 md:py-8"
                  style={{ ...delay(i * 110), transitionDelay: `${i * 110}ms` }}
                >
                  <dd className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                    <CountUp value={s.value} delay={250 + i * 110} />
                  </dd>
                  <dt className="mt-2 text-sm text-white/70">{s.label}</dt>
                  <span
                    aria-hidden
                    className="stat-bar absolute inset-x-5 bottom-0 h-0.5 rounded-full bg-gradient-to-r from-teal to-steel/60 md:inset-x-7"
                    style={{ transitionDelay: `${450 + i * 110}ms` }}
                  />
                </div>
              ))}
            </dl>
          )}
        </div>
        <Wave className="-mb-px text-paper" />
      </section>

      {/* 2 — Who we serve */}
      <Section tone="paper" labelledBy="serve-heading" className="!pt-12 md:!pt-16">
        <SectionIntro
          id="serve-heading"
          align="center"
          eyebrow="Who we serve"
          lead="For doctors in Ghana and abroad,"
          rest="and the people who back them."
        />
        <div className="mt-14">
          <AudiencePaths />
        </div>
      </Section>

      {/* 3 — The infrastructure gap */}
      <section aria-labelledby="gap-heading" className="grain on-dark relative bg-navy text-white">
        <Wave flip className="-mt-px text-paper" />
        <div className="container-wahp py-16 md:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <SectionIntro
              id="gap-heading"
              eyebrow="The problem we're solving"
              lead="Ghana trains good doctors."
              rest="Too many plan to practise elsewhere."
              dark
            >
              <p>
                Opening a private practice here means finding premises, buying equipment and hiring staff on your own.
                Patients still cross town for tests. We want staying to be the easier choice.
              </p>
              <Link
                href="/the-problem"
                className="group mt-6 inline-flex items-center gap-2 text-base font-semibold text-teal-300 hover:text-white"
              >
                Why doctors leave
                <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </SectionIntro>
            <SiteImage
              name="doctorsMeeting"
              className="reveal reveal-media"
              aspect="aspect-[16/10]"
              dark
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div className="mt-14">
            <ProblemStats dark />
          </div>
        </div>
        <Wave className="-mb-px text-paper" />
      </section>

      {/* 4 — The platform */}
      <Section tone="paper" labelledBy="platform-heading">
        <SectionIntro
          id="platform-heading"
          align="center"
          eyebrow="What we're building"
          lead="One building."
          rest="Many independent practices."
        >
          <p>Consulting rooms and a shared front desk come first. A lab follows in Phase 2, and imaging after that.</p>
        </SectionIntro>
        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
          <div className="reveal rounded-panel bg-navy p-5 md:p-8">
            <ClinicalFloorSchematic className="mx-auto max-w-[36rem]" />
          </div>
          <ul className="space-y-3" aria-label="The four parts of the hub">
            {pillars.map((p, i) => {
              const Icon = pillarIcons[i];
              return (
                <li key={p.id} className="reveal" style={{ transitionDelay: `${i * 90}ms` }}>
                  <Link
                    href="/platform"
                    className="group flex items-center gap-4 rounded-card bg-white p-4 ring-1 ring-inset ring-smoke transition-[box-shadow,transform] duration-500 ease-soft hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-28px_rgba(0,51,102,0.5)] md:p-5"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-cloud text-teal">
                      <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                    </span>
                    <span className="flex-1 font-semibold text-navy">{p.title}</span>
                    <StageBadge stage={p.stage} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="reveal mt-12 text-center">
          <ButtonLink href="/platform" variant="ghost" size="lg" arrow>
            How the hub works
          </ButtonLink>
        </div>
      </Section>

      {/* Inside the hub: concept footage of the planned lobby, shown untinted, with the text on its own card. */}
      <section aria-labelledby="lobby-heading" className="relative isolate overflow-hidden bg-cloud">
        {/* Phones: the footage gets its own space above the card. Larger screens: it fills the band behind the card. */}
        <div className="absolute inset-x-0 top-0 -z-10 h-[30rem] md:inset-0 md:h-auto">
          <LoopVideo src="/video/hub-lobby" start="visible" className="object-[68%_55%] md:object-center" />
        </div>
        <div className="container-wahp flex items-end pt-[26rem] pb-8 md:min-h-[46rem] md:pt-24 md:pb-12">
          <div className="reveal max-w-md rounded-panel bg-white/95 p-7 shadow-[0_30px_60px_-30px_rgba(0,51,102,0.45)] md:p-9">
            <Eyebrow>Inside the Accra hub</Eyebrow>
            <SplitHeading
              id="lobby-heading"
              lead="One front desk"
              rest="for every practice in the building."
              className="mt-4"
            />
            <p className="mt-4 text-arsenic">
              This is a concept of the reception we are planning in Accra. Patients check in once, wait in one calm room
              and are called through by their own doctor.
            </p>
            <div className="mt-7">
              <ButtonLink href="/platform" arrow>
                See the platform
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* 5 — The missing middle */}
      <Section tone="white" labelledBy="compare-heading">
        <SectionIntro
          id="compare-heading"
          align="center"
          eyebrow="Where WAHP fits"
          lead="Between the large hospital"
          rest="and going it alone."
        >
          <p>
            Hospitals have infrastructure but no autonomy. Clinics have autonomy but no infrastructure. WAHP is designed
            to combine both.
          </p>
        </SectionIntro>
        <div className="reveal mt-14">
          <Comparison />
        </div>
        <p className="reveal mt-8 text-center">
          <Link href="/physicians" className="group inline-flex items-center gap-2 font-semibold text-navy">
            What this means for your practice
            <ArrowRight aria-hidden className="size-4 text-teal transition-transform group-hover:translate-x-0.5" />
          </Link>
        </p>
      </Section>

      {/* 6 — Next step: one door per audience, over the hero footage. */}
      <AudienceCta />
    </>
  );
}
