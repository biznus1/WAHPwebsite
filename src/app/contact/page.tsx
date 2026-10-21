import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail } from "lucide-react";
import { ContactFormFromUrl } from "@/components/forms/contact-form-from-url";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { Notice } from "@/components/ui/notice";
import { Eyebrow, SplitHeading } from "@/components/ui/primitives";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact West African Health Partners. Enquiries are routed to the right team: physicians, investors, partnerships, media and general.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="container-wahp grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <Eyebrow>Contact</Eyebrow>
          <SplitHeading as="h1" size="display" lead="Let's talk." rest="Tell us who you are." className="mt-6" />
          <p className="mt-6 text-lead text-arsenic">
            Choose your enquiry type and we&apos;ll route it to the right person at WAHP. A member of the team will
            follow up by email.
          </p>

          <ul className="mt-10 space-y-6" aria-label="Other ways to reach WAHP">
            {site.contactEmail && (
              <li className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-teal ring-1 ring-inset ring-smoke">
                  <Mail aria-hidden className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-arsenic">Email</p>
                  <p>
                    <a
                      href={`mailto:${site.contactEmail}`}
                      className="text-lg font-semibold text-navy underline decoration-teal decoration-2 underline-offset-4"
                    >
                      {site.contactEmail}
                    </a>
                  </p>
                </div>
              </li>
            )}
            {site.linkedin && (
              <li className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-navy ring-1 ring-inset ring-smoke">
                  in
                </span>
                <div>
                  <p className="text-sm font-semibold text-arsenic">LinkedIn</p>
                  <p>
                    <a
                      href={site.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-navy underline decoration-teal decoration-2 underline-offset-4"
                    >
                      West African Health Partners<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </p>
                </div>
              </li>
            )}
          </ul>

          {site.scheduling.length > 0 && (
            <div className="mt-10 rounded-card bg-white p-6 ring-1 ring-inset ring-smoke">
              <p className="font-semibold text-navy">Prefer to talk? Schedule a call.</p>
              <p className="mt-1 text-sm text-arsenic">
                20-minute introductory conversation. No commitment. No pressure.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {site.scheduling.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded-full px-4 py-2 text-sm font-semibold text-navy ring-1 ring-inset ring-steel hover:ring-navy"
                    >
                      {s.label}
                      <span className="sr-only"> (opens Calendly in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-10">
            <Notice title="Not for medical enquiries">
              WAHP is pre-launch and does not provide care or medical advice. In an emergency, call 112. Please do not
              send health information through this form.
            </Notice>
          </div>
        </div>

        <Suspense fallback={<EnquiryForm contactEmail={site.contactEmail} />}>
          <ContactFormFromUrl contactEmail={site.contactEmail} />
        </Suspense>
      </div>
    </section>
  );
}
