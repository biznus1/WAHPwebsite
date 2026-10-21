import Image, { type StaticImageData } from "next/image";
import lobby from "../../../public/images/concepts/lobby.webp";
import consultation from "../../../public/images/concepts/consultation-suite.webp";
import laboratory from "../../../public/images/concepts/laboratory.webp";
import founders from "../../../public/images/photos/founders.webp";
import pillarLaboratory from "../../../public/images/photos/pillar-laboratory.webp";
import pillarImaging from "../../../public/images/photos/pillar-imaging.webp";
import patientPortrait from "../../../public/images/photos/patient-portrait.webp";
import investorLounge from "../../../public/images/photos/investor-lounge.webp";
import doctorChildConsultation from "../../../public/images/photos/doctor-child-consultation.webp";
import communityScreening from "../../../public/images/photos/community-bp-screening.webp";
import clinicBpCheck from "../../../public/images/photos/clinic-bp-check.webp";
import midwivesNewborn from "../../../public/images/photos/midwives-newborn.webp";
import nurseChildWard from "../../../public/images/photos/nurse-child-ward.webp";
import villageHospitalYard from "../../../public/images/photos/village-hospital-yard.webp";
import physicianLaptop from "../../../public/images/photos/physician-laptop.webp";
import doctorClinicKinshasa from "../../../public/images/photos/doctor-clinic-kinshasa.webp";
import doctorStethoscope from "../../../public/images/photos/doctor-stethoscope.webp";
import communityOutreach from "../../../public/images/photos/community-outreach.webp";

/**
 * Every image on the site, with its kind:
 * - concept:      owner 3D renders of the planned facility (badge + caption, always)
 * - illustrative: photos and generated images copied from the WAHP source sites;
 *                 people and places shown are not WAHP staff, patients or facilities (badge)
 * - stock:        licensed stock / Creative Commons photos of health workers in Africa (credit, no badge);
 *                 they are not WAHP staff or facilities. Full credits: /terms#image-credits
 * - photo:        real photographs of WAHP people (no badge)
 * - diagram:      graphics copied from the source sites (no badge)
 * Provenance: docs/ASSET_INVENTORY.md.
 */
type Kind = "concept" | "illustrative" | "stock" | "photo" | "diagram";

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
  founders: {
    src: founders,
    kind: "photo",
    alt: "WAHP co-founders Jonathan Francois and Emmanuel Adomfeh standing together at an event.",
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
  patientPortrait: {
    src: patientPortrait,
    kind: "stock",
    credit: "Photo: Unsplash",
    alt: "An older woman in a kente head wrap and face mask.",
  },
  investorLounge: {
    src: investorLounge,
    kind: "illustrative",
    position: "50% 35%",
    alt: "A smiling man in a navy suit and kente-pattern tie sits in a light-filled clinic lounge with a reception desk behind him.",
  },

  doctorChildConsultation: {
    src: doctorChildConsultation,
    kind: "illustrative",
    credit: "Adapted from a photo by Carla Keithley, CC BY-SA 2.0",
    alt: "A doctor in a white coat and stethoscope holds a young girl in a pink wrap in a bright, modern consulting room.",
  },
  communityScreening: {
    src: communityScreening,
    kind: "illustrative",
    credit: "Adapted from a photo by Kwameghana, CC BY-SA 4.0",
    alt: "A nurse in a green uniform takes a patient's blood pressure at an outdoor community health screening.",
  },
  clinicBpCheck: {
    src: clinicBpCheck,
    kind: "illustrative",
    credit: "Adapted from a photo by Pambelle12, CC BY-SA 4.0",
    alt: "A nurse takes a woman's blood pressure at the desk of a modern consulting room.",
  },
  midwivesNewborn: {
    src: midwivesNewborn,
    kind: "stock",
    credit: "U.S. Army photo, public domain",
    alt: "Two midwives in a maternity ward in Ghana hold a newborn baby.",
  },
  nurseChildWard: {
    src: nurseChildWard,
    kind: "illustrative",
    credit: "Adapted from a photo by Speak Media Uganda / Pexels",
    alt: "A nurse takes a young boy's blood pressure on a bright children's ward while his father watches.",
  },
  villageHospitalYard: {
    src: villageHospitalYard,
    kind: "stock",
    credit: "Photo: Pexels",
    alt: "Older patients wait on chairs in the yard of a rural hospital while a health worker attends to them.",
  },
  physicianLaptop: {
    src: physicianLaptop,
    kind: "stock",
    credit: "Photo: Pexels",
    alt: "A smiling physician in a white coat working at a laptop.",
  },
  doctorClinicKinshasa: {
    src: doctorClinicKinshasa,
    kind: "illustrative",
    position: "50% 30%",
    credit: "Adapted from a photo by Carmel Nsenga / Pexels",
    alt: "A laughing doctor in green scrubs with a stethoscope in a bright clinic.",
  },
  doctorStethoscope: {
    src: doctorStethoscope,
    kind: "stock",
    credit: "Photo: Unsplash",
    alt: "A doctor in a white coat puts on her stethoscope.",
  },
  communityOutreach: {
    src: communityOutreach,
    kind: "stock",
    credit: "Photo: Pexels",
    alt: "Health workers attend to older community members at an outdoor health outreach.",
  },
} satisfies Record<string, { src: StaticImageData; kind: Kind; alt: string; credit?: string; position?: string }>;

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
  const img: { src: StaticImageData; kind: Kind; alt: string; credit?: string; position?: string } = images[name];
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
          style={img.position ? { objectPosition: img.position } : undefined}
        />
        {img.credit && (
          <span className="absolute right-2 bottom-2 rounded bg-phantom/60 px-1.5 py-0.5 text-[0.6rem] leading-tight text-white">
            {img.credit}
          </span>
        )}
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
