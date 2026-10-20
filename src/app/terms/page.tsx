import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";

export const metadata: Metadata = {
  title: "Website terms",
  description: "Terms of use for the West African Health Partners website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Website terms" updated="20 October 2026">
      <section>
        <h2>Information only</h2>
        <p>
          This website describes the proposed WAHP model and its development. WAHP is pre-launch; descriptions of
          facilities, services and phases describe intentions and may change.
        </p>
      </section>
      <section>
        <h2>Not medical advice</h2>
        <p>
          Nothing on this website is medical advice, and WAHP does not currently provide medical services. In an
          emergency, call 112 or go to the nearest emergency department.
        </p>
      </section>
      <section>
        <h2>Not an offer of securities</h2>
        <p>
          Nothing on this website is an offer to sell, or a solicitation of an offer to buy, any securities or other
          investment, in any jurisdiction.
        </p>
      </section>
      <section>
        <h2>Images</h2>
        <p>
          Images labelled &ldquo;concept rendering&rdquo; are illustrations of planned environments. They do not depict
          existing facilities, and people shown are illustrative.
        </p>
      </section>
      <section>
        <h2>Intellectual property</h2>
        <p>
          The WAHP name, logo and website content belong to West African Health Partners and may not be used without
          permission.
        </p>
      </section>
    </LegalPage>
  );
}
