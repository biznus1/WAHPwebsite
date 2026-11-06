import { Wave } from "@/components/graphics/wave";
import { Eyebrow } from "@/components/ui/primitives";
import { SiteImage } from "@/components/ui/site-image";

/**
 * "The infrastructure gap", after the section of the same name on the older WordPress build (owner's request,
 * 5 Nov 2026). On The Problem page since 6 Nov 2026, after the physician migration section, so the 71.8%
 * figure and its card are not repeated here. Highlights in the older build's green (6.3:1 on navy).
 * The reason doctors leave is stated as WAHP's view, not as a survey finding.
 */
export function InfrastructureGap({ above = "text-white", below = "text-paper" }: { above?: string; below?: string }) {
  return (
    <section
      id="infrastructure-gap"
      aria-labelledby="infra-gap-heading"
      className="grain on-dark relative scroll-mt-20 overflow-hidden bg-navy text-white"
    >
      <Wave flip className={`-mt-px ${above}`} />
      <div className="container-wahp py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="reveal max-w-xl">
            <Eyebrow accent="green">The infrastructure gap</Eyebrow>
            <h2 id="infra-gap-heading" className="mt-5 text-headline font-bold text-white">
              The <span className="text-green">talent</span> exists. The{" "}
              <span className="text-green">infrastructure</span> around it is fragmented, inefficient and ready for{" "}
              <span className="text-green">transformation.</span>
            </h2>
            <p className="mt-6 text-lead text-white/80">
              We believe doctors do not leave because they want to. They leave because the infrastructure to practise at
              their highest level is not there.
            </p>
          </div>
          <SiteImage
            name="doctorWindow"
            className="reveal reveal-media"
            aspect="aspect-[4/3]"
            dark
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </div>
      <Wave className={`-mb-px ${below}`} />
    </section>
  );
}
