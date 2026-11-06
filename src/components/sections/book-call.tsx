import type { ReactNode } from "react";
import { CallBooking } from "@/components/forms/call-booking";
import { Section, SectionIntro } from "@/components/ui/primitives";
import { callTypes, type CallTypeId } from "@/content/site";

/** Anchor for "Book a call" buttons on the audience pages. */
export const BOOK_CALL_ID = "book-a-call";

/**
 * "Book a call" band for an audience page: the matching Calendly call, ready to book without
 * choosing who you are first. Renders nothing while the scheduling links are not approved.
 */
export function BookCallSection({
  call,
  lead,
  rest,
  children,
}: {
  call: CallTypeId;
  lead: ReactNode;
  rest: ReactNode;
  children?: ReactNode;
}) {
  const booking = callTypes.find((c) => c.id === call);
  if (!booking) return null;
  return (
    <Section tone="navy" id={BOOK_CALL_ID} labelledBy="book-call-heading" className="scroll-mt-20">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
        <SectionIntro id="book-call-heading" eyebrow="Book a call" lead={lead} rest={rest} dark>
          {children}
        </SectionIntro>
        <CallBooking call={booking} />
      </div>
    </Section>
  );
}
