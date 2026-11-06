"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import type { CallType, CallTypeId } from "@/content/site";
import { BookingPanel, IntroCallNote } from "./call-booking";

/**
 * "I am a…" picker plus booking panel, after the older site's Contact page.
 * The panel for the checked option is shown with CSS (:has), so it also works without script.
 * Calendly's calendar is loaded inline only when the visitor asks for it (Calendly sets its own cookies);
 * "Open in Calendly" always works.
 */
export function CallScheduler({ callTypes, defaultCall }: { callTypes: CallType[]; defaultCall: CallTypeId }) {
  const [selected, setSelected] = useState<CallTypeId>(defaultCall);
  const [showTimes, setShowTimes] = useState(false);

  return (
    <div className="call-scheduler grid overflow-hidden rounded-card bg-white ring-1 ring-inset ring-smoke lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <fieldset className="border-b border-smoke p-6 md:p-10 lg:border-r lg:border-b-0">
        <legend className="float-left w-full text-title font-medium text-navy">I am a…</legend>
        <p className="clear-left pt-2 text-arsenic">
          Select the option that best describes you. This helps us prepare for your call so we can make the most of the
          30 minutes together.
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
            {/* Once someone has asked for times, switching the option loads that calendar straight away. */}
            <BookingPanel call={c} showTimes={showTimes && selected === c.id} onShowTimes={() => setShowTimes(true)} />
          </div>
        ))}

        <IntroCallNote />
      </div>
    </div>
  );
}
