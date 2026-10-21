"use client";

import { startTransition, useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2, Info, Loader2 } from "lucide-react";
import { submitEnquiry } from "@/app/actions/enquiry";
import type { EnquiryState, EnquiryTypeValue } from "@/lib/enquiry-schema";
import { buttonClasses } from "@/components/ui/button";
import { enquiryTypes } from "@/content/site";

const initial: EnquiryState = { status: "idle" };

const field =
  "mt-2 block w-full rounded-xl bg-white px-4 py-3 text-base text-phantom ring-1 ring-inset ring-steel placeholder:text-space focus:ring-2 focus:ring-teal focus:outline-none aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-[#B42318]";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm font-medium text-[#B42318]">
      <AlertCircle aria-hidden className="size-4" />
      {message}
    </p>
  );
}

export function EnquiryForm({
  defaultType = "general",
  lockType = false,
  defaultInterest = "",
  locationHint = "e.g. Accra, Ghana",
  contactEmail,
  heading,
}: {
  defaultType?: EnquiryTypeValue;
  lockType?: boolean;
  /** Pre-selects the physician "Professional interest" option (must match an option's text). */
  defaultInterest?: string;
  locationHint?: string;
  contactEmail: string | null;
  heading?: string;
}) {
  const [state, action, pending] = useActionState(submitEnquiry, initial);
  const [type, setType] = useState<EnquiryTypeValue>(defaultType);
  const startedRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Time-trap: record when the form became interactive (JS only; see isLikelyBot).
  useEffect(() => {
    if (startedRef.current) startedRef.current.value = String(Date.now());
  }, []);

  // Submit via a transition so React does not reset the fields after a validation error.
  // Without JS the native form action still posts to the server action.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(() => action(fd));
  };
  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  const errors = state.status === "invalid" ? state.fieldErrors : {};
  const err = (k: keyof typeof errors) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `err-${k}` : undefined,
  });

  if (state.status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-card bg-white p-8 ring-1 ring-inset ring-smoke md:p-10"
      >
        <CheckCircle2 aria-hidden className="size-10 text-teal" />
        <h3 className="mt-5 text-title font-medium text-navy">Enquiry sent</h3>
        <p className="mt-3 text-arsenic">{state.message}</p>
      </div>
    );
  }

  return (
    <form
      action={action}
      onSubmit={onSubmit}
      noValidate
      className="relative rounded-card bg-white p-6 ring-1 ring-inset ring-smoke md:p-10"
    >
      {heading && <h3 className="text-title font-medium text-navy">{heading}</h3>}

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {state.status === "not_configured" && (
          <div role="alert" className="mb-6 flex gap-3 rounded-xl bg-cloud p-4 text-navy ring-1 ring-inset ring-steel">
            <Info aria-hidden className="mt-0.5 size-5 shrink-0" />
            <div>
              <p className="font-semibold">Not sent (preview mode)</p>
              <p className="mt-1 text-arsenic">{state.message}</p>
              {contactEmail && (
                <p className="mt-2 text-arsenic">
                  Email us instead at{" "}
                  <a className="font-semibold text-navy underline" href={`mailto:${contactEmail}`}>
                    {contactEmail}
                  </a>
                  .
                </p>
              )}
            </div>
          </div>
        )}
        {(state.status === "error" || state.status === "rate_limited" || state.status === "invalid") && (
          <div
            role="alert"
            className="mb-6 flex gap-3 rounded-xl bg-white p-4 text-[#B42318] ring-1 ring-inset ring-[#B42318]/40"
          >
            <AlertCircle aria-hidden className="mt-0.5 size-5 shrink-0" />
            <p className="font-medium">{state.message}</p>
          </div>
        )}
      </div>

      <input ref={startedRef} type="hidden" name="startedAt" defaultValue="" />
      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {lockType ? (
        <input type="hidden" name="type" value={type} />
      ) : (
        <fieldset className={heading ? "mt-6" : ""}>
          <legend className="text-sm font-semibold text-navy">I am writing as…</legend>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {enquiryTypes.map((t) => (
              <label
                key={t.value}
                className="relative flex cursor-pointer flex-col rounded-xl px-4 py-3 ring-1 ring-inset ring-steel transition-colors has-[:checked]:bg-navy has-[:checked]:text-white has-[:checked]:ring-navy has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-teal"
              >
                <input
                  type="radio"
                  name="type"
                  value={t.value}
                  checked={type === t.value}
                  onChange={() => setType(t.value)}
                  className="sr-only"
                />
                <span className="font-semibold">{t.label}</span>
                <span className="mt-0.5 text-xs opacity-75">{t.hint}</span>
              </label>
            ))}
          </div>
          <FieldError id="err-type" message={errors.type} />
        </fieldset>
      )}

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="f-name" className="text-sm font-semibold text-navy">
            Full name
          </label>
          <input id="f-name" name="name" autoComplete="name" required className={field} {...err("name")} />
          <FieldError id="err-name" message={errors.name} />
        </div>
        <div>
          <label htmlFor="f-email" className="text-sm font-semibold text-navy">
            {type === "physician" || type === "investor" || type === "partnership" || type === "vendor"
              ? "Work email"
              : "Email"}
          </label>
          <input
            id="f-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={field}
            {...err("email")}
          />
          <FieldError id="err-email" message={errors.email} />
        </div>

        {type === "physician" && (
          <>
            <div>
              <label htmlFor="f-specialty" className="text-sm font-semibold text-navy">
                Specialty
              </label>
              <input
                id="f-specialty"
                name="specialty"
                placeholder="e.g. Cardiology"
                className={field}
                {...err("specialty")}
              />
              <FieldError id="err-specialty" message={errors.specialty} />
            </div>
            <div>
              <label htmlFor="f-location" className="text-sm font-semibold text-navy">
                City and country
              </label>
              <input
                id="f-location"
                name="location"
                placeholder={locationHint}
                autoComplete="address-level2"
                className={field}
                {...err("location")}
              />
              <FieldError id="err-location" message={errors.location} />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="f-interest" className="text-sm font-semibold text-navy">
                Professional interest
              </label>
              <select id="f-interest" name="interest" className={field} defaultValue={defaultInterest}>
                <option value="">Select one (optional)</option>
                <option>A consulting room at the Accra hub</option>
                <option>Diaspora physician wanting to practise in Ghana</option>
                <option>Front desk and admin support</option>
                <option>A clinical leadership role</option>
                <option>Just keep me updated</option>
              </select>
            </div>
          </>
        )}

        {(type === "investor" || type === "partnership" || type === "vendor" || type === "media") && (
          <div className="md:col-span-2">
            <label htmlFor="f-org" className="text-sm font-semibold text-navy">
              Organisation <span className="font-normal text-arsenic">(optional)</span>
            </label>
            <input
              id="f-org"
              name="organisation"
              autoComplete="organization"
              className={field}
              {...err("organisation")}
            />
          </div>
        )}

        <div className="md:col-span-2">
          <label htmlFor="f-message" className="text-sm font-semibold text-navy">
            Message{" "}
            {(type === "physician" || type === "investor") && (
              <span className="font-normal text-arsenic">(optional)</span>
            )}
          </label>
          <textarea id="f-message" name="message" rows={4} maxLength={2000} className={field} {...err("message")} />
          <p className="mt-2 text-sm text-arsenic">
            Please leave out medical details and any personal health information.
          </p>
          <FieldError id="err-message" message={errors.message} />
        </div>
      </div>

      <div className="mt-6">
        <label className="flex items-start gap-3 text-sm text-arsenic">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-0.5 size-5 shrink-0 rounded accent-navy"
            {...err("consent")}
          />
          <span>
            WAHP may use these details to reply to me, as set out in the{" "}
            <Link href="/privacy" className="font-semibold text-navy underline underline-offset-2">
              privacy notice
            </Link>
            .
          </span>
        </label>
        <FieldError id="err-consent" message={errors.consent} />
      </div>

      {type === "investor" && (
        <div className="mt-4">
          <label className="flex items-start gap-3 text-sm text-arsenic">
            <input
              type="checkbox"
              name="acknowledge"
              required
              className="mt-0.5 size-5 shrink-0 rounded accent-navy"
              {...err("acknowledge")}
            />
            <span>
              I understand this is not an offer to sell securities. Any offering will be made only through definitive
              offering documents to verified accredited investors, and investing carries a high degree of risk,
              including losing the whole investment.
            </span>
          </label>
          <FieldError id="err-acknowledge" message={errors.acknowledge} />
        </div>
      )}

      <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={pending} className={buttonClasses("primary", "lg")}>
          {pending && <Loader2 aria-hidden className="size-4 animate-spin" />}
          {pending ? "Sending…" : "Send enquiry"}
        </button>
        {contactEmail && (
          <p className="text-sm text-arsenic">
            Prefer email?{" "}
            <a href={`mailto:${contactEmail}`} className="font-semibold text-navy underline underline-offset-2">
              {contactEmail}
            </a>
          </p>
        )}
      </div>
    </form>
  );
}
