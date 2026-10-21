import type { ReactNode } from "react";
import { LogoMark } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { SplitHeading } from "@/components/ui/primitives";

export function CtaBand({
  lead = "Let's build this",
  rest = "together.",
  children,
  primary = { href: "/contact", label: "Get in touch" },
  secondary,
}: {
  lead?: ReactNode;
  rest?: ReactNode;
  children?: ReactNode;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="container-wahp">
        <div className="reveal grain on-dark relative overflow-hidden rounded-panel bg-navy px-6 py-14 text-white md:px-14 md:py-20">
          <LogoMark className="pointer-events-none absolute -top-24 -right-24 size-[26rem] text-navy-700/60 md:size-[32rem]" />
          <div className="relative max-w-2xl">
            <SplitHeading lead={lead} rest={rest} dark />
            {children && <div className="mt-6 text-lead text-white/75">{children}</div>}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={primary.href} size="lg" arrow>
                {primary.label}
              </ButtonLink>
              {secondary && (
                <ButtonLink href={secondary.href} size="lg" variant="light">
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
