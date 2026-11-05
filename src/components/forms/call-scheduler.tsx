"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { CalendarDays, Check, Clock, ExternalLink, Video } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import type { CallType, CallTypeId } from "@/content/site";

const noop = () => () => {};
/** True once React has hydrated: the inline calendar needs script, so its button only appears then. */
function useHydrated() {
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
 * "I am a…" picker plus booking panel, after the older site's Contact page.
 * The panel for the checked option is shown with CSS (:has), so it also works without script.
 * Calendly's calendar is loaded inline only when the visitor asks for it (Calendly sets its own cookies);
 * "Open in Calendly" always works.
 */
export function CallScheduler({ callTypes, defaultCall }: { callTypes: CallType[]; defaultCall: CallTypeId }) {
  const hydrated = useHydrated();
  const [selected, setSelected] = useState<CallTypeId>(defaultCall);
  const [showTimes, setShowTimes] = useState(false);

  return (
    <div className="call-scheduler grid overflow-hidden rounded-card bg-white ring-1 ring-inset ring-smoke lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <fieldset className="border-b border-smoke p-6 md:p-10 lg:border-r lg:border-b-0">
        <legend className="float-left w-full text-title font-medium text-navy">I am a…</legend>
        <p className="clear-left pt-2 text-arsenic">
          Choose the option that fits you best. It helps us prepare, so we make the most of the call.
        </p>
        <div className="mt-6 grid gap-3">
          {callTypes.map((c, i) => (
            <label
              key={c.id}
              className="group relative flex cursor-pointer gap-4 rounded-xl p-4 ring-1 ring-inset ring-steel transition-colors hover:ring-navy has-[:checked]:bg-navy has-[:checked]:text-white has-[:checked]:ring-navy has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-teal"
            >
              <input
                type="radio"
                name="call"
                value={c.id}
                defaultChecked={c.id === defaultCall}
                onChange={() => setSelected(c.id)}
                className="sr-only"
              />
              <span
                aria-hidden
                className="text-sm font-semibold tabular-nums text-graphite group-has-[:checked]:text-teal-300"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">{c.label}</span>
                <span className="mt-1 block text-sm text-arsenic group-has-[:checked]:text-white/80">{c.hint}</span>
              </span>
              <Check
                aria-hidden
                className="size-5 shrink-0 text-teal-300 opacity-0 transition-opacity group-has-[:checked]:opacity-100"
              />
            </label>
          ))}
        </div>
      </fieldset>

      <div className="p-6 md:p-10">
        <h2 className="text-title font-medium text-navy">Schedule your call</h2>
        <p className="mt-2 text-arsenic">Pick a time that works for you.</p>

        {callTypes.map((c) => (
          <div key={c.id} className="call-panel mt-6" data-call={c.id}>
            <div className="rounded-xl bg-paper p-5 ring-1 ring-inset ring-smoke">
              <p className="text-sm font-semibold text-graphite">Booking type</p>
              <p className="mt-1 text-xl font-semibold text-navy">{c.event}</p>
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

            {showTimes && selected === c.id ? (
              <iframe
                src={embedUrl(c.href)}
                title={`Available times for a ${c.event} with WAHP (Calendly)`}
                className="mt-6 h-[44rem] w-full rounded-xl bg-white ring-1 ring-inset ring-smoke"
              />
            ) : (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                {hydrated && (
                  <button
                    type="button"
                    data-js-only
                    onClick={() => setShowTimes(true)}
                    className={buttonClasses("primary", "lg")}
                  >
                    Show available times
                  </button>
                )}
                <a
                  href={c.href}
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
              {showTimes && selected === c.id ? (
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-navy underline"
                >
                  Open this calendar in Calendly instead<span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <>
                  Times load from Calendly, our booking service, only when you ask. See our{" "}
                  <Link href="/privacy#booking" className="font-semibold text-navy underline">
                    privacy notice
                  </Link>
                  .
                </>
              )}
            </p>
          </div>
        ))}

        <p className="mt-8 border-t border-smoke pt-6 text-arsenic">
          This is a <strong className="font-semibold text-navy">30 minute introductory conversation</strong>. No
          commitment, no pressure. We want to understand your goals and share how WAHP might fit.
        </p>
      </div>
    </div>
  );
}
