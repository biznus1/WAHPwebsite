import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LoopVideo } from "@/components/motion/loop-video";
import { Wave } from "@/components/graphics/wave";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow, SplitHeading } from "@/components/ui/primitives";

/** One card per main audience, each going straight to the right enquiry path. */
const cards = [
  {
    title: "I am a physician in Ghana",
    body: "Rent an equipped consulting room in Accra and keep your own practice.",
    cta: "Talk to our team",
    href: "/contact?type=physician",
    more: { href: "/physicians", label: "For physicians" },
  },
  {
    title: "I am a diaspora physician",
    body: "See patients in Accra during your weeks home, mentor, or help us build.",
    cta: "Talk about your plans",
    href: "/contact?type=physician",
    more: { href: "/diaspora-physicians", label: "For diaspora physicians" },
  },
  {
    title: "I am an investor",
    body: "Meet the founders and see how the Accra hub is planned, phase by phase.",
    cta: "Request an introduction",
    href: "/contact?type=investor",
    more: { href: "/investors", label: "For investors" },
  },
];

/**
 * Closing band for Home: the hero footage again under a navy overlay, with one card per audience.
 * After the "I am a physician / diaspora physician / investor" band that closed the older site.
 */
export function AudienceCta() {
  return (
    <section
      aria-labelledby="next-step-heading"
      className="grain on-dark relative isolate overflow-hidden border-b border-white/10 bg-navy text-white"
    >
      <LoopVideo src="/video/hero-clinic" start="visible" className="-z-20 object-[38%_30%]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-navy/[0.86]" />
      <Wave flip className="-mt-px text-white" />

      <div className="container-wahp pt-12 pb-20 md:pt-16 md:pb-28">
        <div className="reveal mx-auto max-w-2xl text-center [&_.eyebrow]:justify-center">
          <Eyebrow dark>Take the next step</Eyebrow>
          <SplitHeading id="next-step-heading" lead="Let's talk." rest="Tell us where you fit." dark className="mt-5" />
          <p className="mt-6 text-lead text-white/75">Choose who you are below. Someone from our team will reply.</p>
        </div>

        <ul className="mt-12 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-5">
          {cards.map((c, i) => (
            <li
              key={c.title}
              className="reveal flex flex-col rounded-card bg-white/[0.07] p-6 ring-1 ring-inset ring-white/15 backdrop-blur-sm md:p-7"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <h3 className="text-xl font-semibold text-white">{c.title}</h3>
              <p className="mt-3 flex-1 text-white/75">{c.body}</p>
              <div className="mt-6 flex flex-col items-start gap-4">
                <ButtonLink href={c.href} arrow>
                  {c.cta}
                </ButtonLink>
                <Link
                  href={c.more.href}
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-teal-300 hover:text-white"
                >
                  {c.more.label}
                  <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </li>
          ))}
        </ul>

        <p className="reveal mt-10 text-center text-white/70">
          Partner, supplier or journalist?{" "}
          <Link
            href="/contact"
            className="font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
          >
            Use the contact form
          </Link>
        </p>
      </div>
    </section>
  );
}
