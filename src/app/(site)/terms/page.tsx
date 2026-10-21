import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";

export const metadata: Metadata = {
  title: "Website terms",
  description: "Terms of use for the West African Health Partners website.",
  alternates: { canonical: "/terms" },
};

const credits = [
  {
    title: "Woman in a kente head wrap and face mask",
    by: "Unsplash contributor",
    licence: "Unsplash licence",
    href: "https://unsplash.com/photos/gi3Jox2cdrI",
  },
  {
    title: "Doctor putting on a stethoscope",
    by: "Unsplash contributor",
    licence: "Unsplash licence",
    href: "https://unsplash.com/photos/9aBsCd9Fvgc",
  },
  {
    title: "A young girl sits with a doctor receiving medical care (shown as an edited adaptation)",
    by: "Carla Keithley",
    licence: "CC BY-SA 2.0, via Wikimedia Commons",
    href: "https://commons.wikimedia.org/wiki/File:A_young_girl_sits_with_a_doctor_receiving_medical_care.jpg",
  },
  {
    title: "A uniformed nurse listening to a patient's BP (shown as an edited adaptation)",
    by: "Kwameghana",
    licence: "CC BY-SA 4.0, via Wikimedia Commons",
    href: "https://commons.wikimedia.org/wiki/File:A_uniformed_nurse_listening_to_a_patient%27s_BP.jpg",
  },
  {
    title: "Checking blood pressure (shown as an edited adaptation)",
    by: "Pambelle12",
    licence: "CC BY-SA 4.0, via Wikimedia Commons",
    href: "https://commons.wikimedia.org/wiki/File:Checking_blood_pressure.jpg",
  },
  {
    title: "US, Ghana midwives team up in maternity ward at African Lion 2025 (shown as an edited adaptation)",
    by: "U.S. Army photo by 1st Lt. Katherine Sibilla",
    licence: "public domain, via Wikimedia Commons",
    href: "https://commons.wikimedia.org/wiki/File:US,_Ghana_midwives_team_up_in_maternity_ward_at_African_Lion_2025_(9047753).jpg",
  },
  {
    title: "Nurse caring for child in hospital setting (shown as an edited adaptation)",
    by: "Speak Media Uganda",
    licence: "Pexels licence",
    href: "https://www.pexels.com/photo/34185202/",
  },
  {
    title: "A laughing woman in a doctor's gown (shown as an edited adaptation)",
    by: "Carmel Nsenga",
    licence: "Pexels licence",
    href: "https://www.pexels.com/photo/18844981/",
  },
  {
    title: "Elderly people in the yard of a rural hospital",
    by: "Pexels contributor",
    licence: "Pexels licence",
    href: "https://www.pexels.com/photo/4483669/",
  },
  {
    title: "Community health outreach",
    by: "Pexels contributor",
    licence: "Pexels licence",
    href: "https://www.pexels.com/photo/4483695/",
  },
  {
    title: "Physician working at a laptop",
    by: "Pexels contributor",
    licence: "Pexels licence",
    href: "https://www.pexels.com/photo/4989179/",
  },
];

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
      <section id="image-credits">
        <h2>Image credits</h2>
        <p>
          Stock and Creative Commons photos show health workers in Africa. They are not WAHP staff, patients or
          facilities. Photos were resized or cropped; adaptations of CC BY-SA images are shared under the same licence.
        </p>
        <ul>
          {credits.map((c) => (
            <li key={c.href}>
              <a className="font-semibold text-navy underline" href={c.href} target="_blank" rel="noopener noreferrer">
                {c.title}
              </a>{" "}
              — {c.by}, {c.licence}
            </li>
          ))}
        </ul>
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
