import type { ReactNode } from "react";
import { LogoMark } from "@/components/brand/logo";
import { Eyebrow, SplitHeading } from "@/components/ui/primitives";

/** Hero for internal pages: navy, two-tone headline, watermark mark per brand covers. */
export function PageHero({
  eyebrow,
  lead,
  rest,
  children,
  aside,
  status,
}: {
  eyebrow: string;
  lead: ReactNode;
  rest: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
  status?: ReactNode;
}) {
  return (
    <section className="grain on-dark relative overflow-hidden bg-navy text-white">
      <LogoMark className="pointer-events-none absolute top-1/2 -right-40 size-[36rem] -translate-y-1/2 text-navy-700/55 md:-right-24 md:size-[44rem]" />
      <div className="container-wahp relative grid gap-12 py-20 md:py-28 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
        <div>
          <Eyebrow dark>{eyebrow}</Eyebrow>
          <SplitHeading as="h1" size="display" dark lead={lead} rest={rest} className="mt-6" />
          {children && <div className="mt-8 max-w-2xl text-lead text-white/78">{children}</div>}
          {status && <div className="mt-8">{status}</div>}
        </div>
        {aside && <div className="animate-rise [animation-delay:120ms]">{aside}</div>}
      </div>
    </section>
  );
}
