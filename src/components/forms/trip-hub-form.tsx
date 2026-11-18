"use client";

import { useActionState, useEffect } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { openTripHub } from "@/app/actions/trip-hub";
import type { TripHubState } from "@/lib/trip-hub";
import { buttonClasses } from "@/components/ui/button";

const initial: TripHubState = { status: "idle" };

export function TripHubForm() {
  const [state, action, pending] = useActionState(openTripHub, initial);

  // With JavaScript the browser goes straight to the hub; the link below covers the case where it doesn't.
  useEffect(() => {
    if (state.status === "open") window.location.assign(state.url);
  }, [state]);

  if (state.status === "open") {
    return (
      <p role="status" className="mt-5 text-arsenic">
        Opening the trip hub.{" "}
        <a
          href={state.url}
          rel="noopener noreferrer"
          className="font-semibold text-navy underline decoration-teal decoration-2 underline-offset-4"
        >
          Open it here
        </a>{" "}
        if nothing happens.
      </p>
    );
  }

  const failed = state.status !== "idle";
  return (
    <form action={action} className="mt-5">
      <label htmlFor="trip-password" className="text-sm font-semibold text-navy">
        Team password
      </label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <input
          id="trip-password"
          name="password"
          type="password"
          required
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          aria-invalid={failed ? true : undefined}
          aria-describedby={failed ? "trip-password-error" : undefined}
          className="block h-11 w-full rounded-xl bg-white px-4 text-base text-phantom ring-1 ring-inset ring-steel focus:ring-2 focus:ring-teal focus:outline-none aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-[#B42318]"
        />
        <button type="submit" disabled={pending} className={buttonClasses("primary", "md")}>
          {pending && <Loader2 aria-hidden className="size-4 animate-spin" />}
          Open
        </button>
      </div>
      {failed && (
        <p
          id="trip-password-error"
          role="alert"
          className="mt-2 flex items-center gap-1.5 text-sm font-medium text-[#B42318]"
        >
          <AlertCircle aria-hidden className="size-4" />
          {state.message}
        </p>
      )}
    </form>
  );
}
