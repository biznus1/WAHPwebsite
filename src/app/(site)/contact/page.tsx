import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail } from "lucide-react";
import { CallScheduler } from "@/components/forms/call-scheduler";
import { CallSchedulerFromUrl } from "@/components/forms/call-scheduler-from-url";
import { ContactFormFromUrl } from "@/components/forms/contact-form-from-url";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { Notice } from "@/components/ui/notice";
import { Eyebrow, SplitHeading } from "@/components/ui/primitives";
import { callTypes, site } from "@/content/site";
import { pageHeaders } from "@/content/editable";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact West African Health Partners. Book a 30 minute introductory call or send us a message: physicians, investors, partners, suppliers, press and everyone else.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const booking = callTypes.length > 0;
  return (
    <>
      <section className="bg-paper pt-16 pb-16 md:pt-24 md:pb-24">
        <div className="container-wahp">
          <div className="max-w-3xl">
            <Eyebrow>{pageHeaders.contact.eyebrow}</Eyebrow>
            <SplitHeading
              as="h1"
              size="display"
              lead={pageHeaders.contact.lead}
              rest={pageHeaders.contact.rest}
              className="mt-6"
            />
            <p className="mt-6 text-lead text-arsenic">{pageHeaders.contact.intro}</p>
          </div>

          {booking && (
            <div id="schedule" className="mt-12 scroll-mt-24 md:mt-16">
              <Suspense fallback={<CallScheduler callTypes={callTypes} defaultCall={callTypes[0].id} />}>
                <CallSchedulerFromUrl callTypes={callTypes} />
              </Suspense>
            </div>
          )}
        </div>
      </section>

      <section
        id="message"
        aria-labelledby="message-heading"
        className={`scroll-mt-20 py-16 md:py-24 ${booking ? "border-t border-smoke bg-cloud" : "bg-paper pt-0 md:pt-0"}`}
      >
        <div className="container-wahp grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <SplitHeading id="message-heading" lead="Prefer email?" rest="Reach us directly." />
            <p className="mt-6 text-lead text-arsenic">
              Whatever your question, whether you are a physician, diaspora doctor, investor or strategic partner, one
              message gets it to the right person on our team. We read every message and look forward to speaking with
              you.
            </p>

            <ul className="mt-10 space-y-6" aria-label="Other ways to reach WAHP">
              {site.contactEmail && (
                <li className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-teal ring-1 ring-inset ring-smoke">
                    <Mail aria-hidden className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-arsenic">Email us</p>
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
                    <p className="text-sm font-semibold text-arsenic">Follow on LinkedIn</p>
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
                    <p className="mt-1 text-sm text-arsenic">Stay in the loop as the platform gets built.</p>
                  </div>
                </li>
              )}
            </ul>

            <div className="mt-10">
              <Notice title="Not for medical enquiries">
                WAHP is not open yet and cannot give care or medical advice. In an emergency, call 112. Please do not
                send any health information through this form or when booking a call.
              </Notice>
            </div>
          </div>

          <Suspense fallback={<EnquiryForm contactEmail={site.contactEmail} />}>
            <ContactFormFromUrl contactEmail={site.contactEmail} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
