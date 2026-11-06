"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { CalendarDays, Clock, ExternalLink, Video } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import type { CallType } from "@/content/site";

const noop = () => () => {};
/** True once React has hydrated: the inline calendar needs script, so its button only appears then. */
export function useHydrated() {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}

function embedUrl(href: string) {
  const params = new URLSearchParams({
    embed_domain: window.location.host,
    embed_type: "Inline",
    hide_event_type_details: "1",
    primary_color: "003366",
  });
  return `${href}?${params}`;
}

/**
 * One Calendly booking: what the call is, then "Show available times" (loads Calendly's calendar inline,
 * only on request, because Calendly sets its own cookies) and "Open in Calendly" (always works, also
 * without script).
 */
export function BookingPanel({
  call,
  showTimes,
  onShowTimes,
}: {
  call: CallType;
  showTimes: boolean;
  onShowTimes: () => void;
}) {
  const hydrated = useHydrated();
  return (
    <>
      <div className="rounded-xl bg-paper p-5 ring-1 ring-inset ring-smoke">
        <p className="text-sm font-semibold text-graphite">Booking type</p>
        <p className="mt-1 text-xl font-semibold text-navy">{call.event}</p>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-arsenic">
          <li className="flex items-center gap-2">
            <Clock aria-hidden className="size-4 text-teal" />
            30 minutes
          </li>
          <li className="flex items-center gap-2">
            <Video aria-hidden className="size-4 text-teal" />
            Video call on Zoom
          </li>
          <li className="flex items-center gap-2">
            <CalendarDays aria-hidden className="size-4 text-teal" />
            Times in your time zone
          </li>
        </ul>
      </div>

      {showTimes ? (
        <iframe
          src={embedUrl(call.href)}
          title={`Available times for a ${call.event} with WAHP (Calendly)`}
          className="mt-6 h-[44rem] w-full rounded-xl bg-white ring-1 ring-inset ring-smoke"
        />
      ) : (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          {hydrated && (
            <button type="button" data-js-only onClick={onShowTimes} className={buttonClasses("primary", "lg")}>
              Show available times
            </button>
          )}
          <a
            href={call.href}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses(hydrated ? "ghost" : "primary", "lg")}
          >
            Open in Calendly
            <ExternalLink aria-hidden className="size-4" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      )}

      <p className="mt-4 text-sm text-arsenic">
        {showTimes ? (
          <a href={call.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy underline">
            Open this calendar in Calendly instead<span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : (
          <>
            Available time slots load directly on the page from Calendly, our booking service, only when you ask. See
            our{" "}
            <Link href="/privacy#booking" className="font-semibold text-navy underline">
              privacy notice
            </Link>
            .
          </>
        )}
      </p>
    </>
  );
}

export function IntroCallNote() {
  return (
    <p className="mt-8 border-t border-smoke pt-6 text-arsenic">
      This is a <strong className="font-semibold text-navy">30 minute introductory conversation</strong>. No commitment.
      No pressure. We just want to understand your goals and share how WAHP might fit.
    </p>
  );
}

/** A single booking card for a page that already knows who it is talking to (physicians, investors…). */
export function CallBooking({ call }: { call: CallType }) {
  const [showTimes, setShowTimes] = useState(false);
  return (
    // Teal focus rings even inside navy sections, where focus rings are otherwise white.
    <div className="reveal rounded-card bg-white p-6 text-phantom ring-1 ring-inset ring-smoke md:p-10 [&_:focus-visible]:outline-teal">
      <h3 className="text-title font-medium text-navy">Schedule your call</h3>
      <p className="mt-2 text-arsenic">Pick a time that works for you.</p>
      <div className="mt-6">
        <BookingPanel call={call} showTimes={showTimes} onShowTimes={() => setShowTimes(true)} />
      </div>
      <IntroCallNote />
    </div>
  );
}
