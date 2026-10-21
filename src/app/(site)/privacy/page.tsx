import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/sections/legal-page";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: "How West African Health Partners handles personal information submitted through this website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy notice" updated="20 October 2026">
      <section>
        <h2>Who we are</h2>
        <p>
          This website is operated by West African Health Partners (&ldquo;WAHP&rdquo;). WAHP is not open yet and does
          not provide any healthcare services.
        </p>
      </section>
      <section>
        <h2>What we collect</h2>
        <p>When you submit an enquiry, we collect the details you choose to provide:</p>
        <ul>
          <li>Your name and email address</li>
          <li>
            Your enquiry type and, where relevant, organisation, specialty, city and country, and professional interest
          </li>
          <li>The content of your message</li>
        </ul>
        <p>
          Please do not send health or medical information. This website does not use advertising or analytics cookies.
          Our hosting provider may process technical data such as IP addresses to deliver and secure the site.
        </p>
      </section>
      <section>
        <h2>How we use it</h2>
        <ul>
          <li>To respond to your enquiry and follow up on your stated interest</li>
          <li>To protect the website against abuse (for example, rate limiting)</li>
        </ul>
        <p>We do not sell your personal information.</p>
      </section>
      <section>
        <h2>Legal basis and your rights</h2>
        <p>
          We process enquiry data with your consent and to respond to your request. Subject to applicable law, including
          Ghana&apos;s Data Protection Act, 2012 (Act 843), you may ask to access, correct or delete your information,
          or withdraw consent.
        </p>
      </section>
      <section>
        <h2>Retention</h2>
        <p>We keep enquiry information only as long as needed to respond and maintain a record of the conversation.</p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          Questions about this notice:{" "}
          {site.contactEmail ? (
            <a className="font-semibold text-navy underline" href={`mailto:${site.contactEmail}`}>
              {site.contactEmail}
            </a>
          ) : (
            <Link className="font-semibold text-navy underline" href="/contact">
              contact us
            </Link>
          )}
          .
        </p>
      </section>
    </LegalPage>
  );
}
