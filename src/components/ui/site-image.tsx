import Image, { type StaticImageData } from "next/image";
import lobby from "../../../public/images/concepts/lobby.webp";
import consultation from "../../../public/images/concepts/consultation-suite.webp";
import laboratory from "../../../public/images/concepts/laboratory.webp";
import physicianConsultation from "../../../public/images/photos/physician-consultation.webp";
import diasporaPhysician from "../../../public/images/photos/diaspora-physician.webp";
import hospitalCorridor from "../../../public/images/photos/hospital-corridor.webp";
import founders from "../../../public/images/photos/founders.webp";
import patientJourney from "../../../public/images/photos/patient-journey.webp";
import pillarLaboratory from "../../../public/images/photos/pillar-laboratory.webp";
import pillarSuites from "../../../public/images/photos/pillar-suites.webp";
import pillarImaging from "../../../public/images/photos/pillar-imaging.webp";
import pillarDigital from "../../../public/images/photos/pillar-digital.webp";
import patientCheckup from "../../../public/images/photos/patient-checkup.webp";
import clinicConversation from "../../../public/images/photos/clinic-conversation.webp";
import physicianWithPatient from "../../../public/images/photos/physician-with-patient.webp";
import partnersMeeting from "../../../public/images/photos/partners-meeting.webp";
import investorBanner from "../../../public/images/photos/investor-banner.webp";
import familyConsultation from "../../../public/images/photos/family-consultation.webp";
import patientPortrait from "../../../public/images/photos/patient-portrait.webp";
import clinicInterior from "../../../public/images/photos/clinic-interior.webp";

/**
 * Every image on the site, with its kind:
 * - concept:      owner 3D renders of the planned facility (badge + caption, always)
 * - illustrative: photos and generated images copied from the WAHP source sites;
 *                 people and places shown are not WAHP staff, patients or facilities (badge)
 * - photo:        real photographs of WAHP people (no badge)
 * - diagram:      graphics copied from the source sites (no badge)
 * Provenance: docs/ASSET_INVENTORY.md.
 */
type Kind = "concept" | "illustrative" | "photo" | "diagram";

const images = {
  lobby: {
    src: lobby,
    kind: "concept",
    alt: "Concept rendering of a warm reception lobby with a curved oak reception desk and a seating area.",
  },
  consultation: {
    src: consultation,
    kind: "concept",
    alt: "Concept rendering of a calm consultation suite with an examination couch, a desk and natural light.",
  },
  laboratory: {
    src: laboratory,
    kind: "concept",
    alt: "Concept rendering of a bright laboratory with benches and analysers.",
  },
  physicianConsultation: {
    src: physicianConsultation,
    kind: "illustrative",
    alt: "A physician taking notes during a consultation.",
  },
  diasporaPhysician: {
    src: diasporaPhysician,
    kind: "illustrative",
    alt: "A physician at a laptop in a home office with an Accra poster on the wall.",
  },
  hospitalCorridor: {
    src: hospitalCorridor,
    kind: "illustrative",
    alt: "A crowded hospital corridor with patients waiting along the walls.",
  },
  founders: {
    src: founders,
    kind: "photo",
    alt: "WAHP co-founders Jonathan Francois and Emmanuel Adomfeh standing together at an event.",
  },
  patientJourney: {
    src: patientJourney,
    kind: "diagram",
    alt: "Patient journey in one building: check-in, consult, lab, imaging, results, treatment and follow-up.",
  },
  pillarSuites: {
    src: pillarSuites,
    kind: "illustrative",
    alt: "A physician consulting with a patient in a modern examination room.",
  },
  pillarLaboratory: {
    src: pillarLaboratory,
    kind: "illustrative",
    alt: "A bright diagnostic laboratory with benches and analysers.",
  },
  pillarImaging: {
    src: pillarImaging,
    kind: "illustrative",
    alt: "A patient positioned in an MRI scanner with a technologist nearby.",
  },
  pillarDigital: {
    src: pillarDigital,
    kind: "illustrative",
    alt: "A physician reviewing an electronic health record during a telemedicine call.",
  },
  patientCheckup: {
    src: patientCheckup,
    kind: "illustrative",
    alt: "A nurse listening to a young child's chest with a stethoscope.",
  },
  clinicConversation: {
    src: clinicConversation,
    kind: "illustrative",
    alt: "Clinicians and patients talking in a busy outpatient clinic.",
  },
  physicianWithPatient: {
    src: physicianWithPatient,
    kind: "illustrative",
    alt: "A smiling physician talking with a patient across a consultation desk.",
  },
  partnersMeeting: {
    src: partnersMeeting,
    kind: "illustrative",
    alt: "Three professionals reviewing plans and a tablet around a table.",
  },
  investorBanner: {
    src: investorBanner,
    kind: "illustrative",
    alt: "Two physicians walking through a bright, modern clinic atrium.",
  },
  familyConsultation: {
    src: familyConsultation,
    kind: "illustrative",
    alt: "A physician speaking with a mother and child at a consultation desk.",
  },
  patientPortrait: {
    src: patientPortrait,
    kind: "illustrative",
    alt: "An older woman in a kente head wrap and face mask.",
  },
  clinicInterior: {
    src: clinicInterior,
    kind: "illustrative",
    alt: "A calm, light-filled clinic waiting area with a reception desk.",
  },
} satisfies Record<string, { src: StaticImageData; kind: Kind; alt: string }>;

export type SiteImageName = keyof typeof images;

const badges: Partial<Record<Kind, string>> = { concept: "Concept rendering", illustrative: "Illustrative image" };
const conceptCaption =
  "Concept rendering — illustrates the planned environment, not an existing facility. People shown are illustrative.";

export function SiteImage({
  name,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  caption,
  aspect = "aspect-[4/3]",
  dark = false,
  fit = "cover",
  rounded = "rounded-panel",
}: {
  name: SiteImageName;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Overrides the default caption; pass null to hide it. Concept renders always keep a caption. */
  caption?: string | null;
  aspect?: string;
  dark?: boolean;
  fit?: "cover" | "contain";
  rounded?: string;
}) {
  const img = images[name];
  const badge = badges[img.kind];
  const text = img.kind === "concept" ? (caption ?? conceptCaption) : caption;
  return (
    <figure className={className}>
      <div className={`relative overflow-hidden bg-cloud ${rounded} ${aspect}`}>
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          className={fit === "contain" ? "object-contain" : "object-cover"}
        />
        {badge && (
          <span className="absolute top-3 left-3 rounded-full bg-navy/80 px-2.5 py-1 text-[0.68rem] font-semibold tracking-wide text-white backdrop-blur">
            {badge}
          </span>
        )}
      </div>
      {text && <figcaption className={`mt-3 text-xs ${dark ? "text-white/60" : "text-arsenic"}`}>{text}</figcaption>}
    </figure>
  );
}
