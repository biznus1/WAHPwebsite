import { Wave } from "@/components/graphics/wave";
import { Eyebrow } from "@/components/ui/primitives";
import { SiteImage } from "@/components/ui/site-image";
import { approvedClaim } from "@/content/claims";

/**
 * "The infrastructure gap", after the section of the same name on the older WordPress build (owner's request,
 * 5 Nov 2026): a headline with highlighted words, a hospital corridor, and an emigration card with a bar.
 * Differences from the original: the sourced 71.8% figure replaces "72%" (inconsistent attribution), the
 * unsourced "WHO target 15%" bar is left out, the highlights are light teal (green is for CTAs), and the
 * reason doctors leave is stated as WAHP's view, not as a survey finding.
 */
export function InfrastructureGap({ above = "text-paper", below = "text-white" }: { above?: string; below?: string }) {
  const migration = approvedClaim("stat-migration-intent");
  return (
    <section
      id="the-problem"
      aria-labelledby="infra-gap-heading"
      className="grain on-dark relative scroll-mt-20 overflow-hidden bg-navy text-white"
    >
      <Wave flip className={`-mt-px ${above}`} />
      <div className="container-wahp py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="reveal max-w-xl">
            <Eyebrow dark>The infrastructure gap</Eyebrow>
            <h2 id="infra-gap-heading" className="mt-5 text-headline font-bold text-white">
              The <span className="text-teal-300">talent</span> exists. The{" "}
              <span className="text-teal-300">infrastructure</span> around it is fragmented, inefficient and ready for{" "}
              <span className="text-teal-300">transformation.</span>
            </h2>
            <p className="mt-6 text-lead text-white/75">
              {migration && "71.8% of doctors surveyed in Ghana said they intend to work abroad. "}
              We do not believe it is because they want to leave. Too often the infrastructure to practise at their best
              is simply not there.
            </p>
          </div>
          <SiteImage
            name="hospitalCorridor"
            className="reveal reveal-media"
            aspect="aspect-[16/10]"
            dark
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>

        {migration && (
          <div className="reveal mt-14 grid items-center gap-8 rounded-panel bg-white/[0.05] p-5 ring-1 ring-white/10 ring-inset md:mt-20 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12 md:p-8">
            <SiteImage
              name="doctorWindow"
              className="reveal-media"
              aspect="aspect-[4/3]"
              rounded="rounded-card"
              dark
              sizes="(min-width: 768px) 40vw, 100vw"
            />
            <div className="md:pr-4">
              <h3 className="text-title font-semibold text-white">
                <span className="text-teal-300">71.8%</span> intend to work abroad
              </h3>
              <p className="mt-4 text-white/75">
                In a published survey of doctors working in Ghana, 71.8% said they intend to work abroad. WAHP exists to
                make staying the easier choice.
              </p>
              <div className="mt-8">
                <div className="flex items-baseline justify-between gap-4 text-sm">
                  <span className="eyebrow text-steel">Intend to work abroad</span>
                  <span className="font-semibold text-white tabular-nums">71.8%</span>
                </div>
                <div aria-hidden className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="stat-bar h-full rounded-full bg-gradient-to-r from-teal to-teal-300"
                    style={{ width: "71.8%", transitionDelay: "300ms" }}
                  />
                </div>
                <p className="mt-4 text-xs text-white/60">Source: Published survey of doctors working in Ghana</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Wave className={`-mb-px ${below}`} />
    </section>
  );
}
