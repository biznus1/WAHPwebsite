import Image, { type StaticImageData } from "next/image";
import lobby from "../../../public/images/concepts/lobby.webp";
import consultation from "../../../public/images/concepts/consultation-suite.webp";
import laboratory from "../../../public/images/concepts/laboratory.webp";
import founders from "../../../public/images/photos/founders.webp";
import pillarLaboratory from "../../../public/images/photos/pillar-laboratory.webp";
import pillarImaging from "../../../public/images/photos/pillar-imaging.webp";
import patientPortrait from "../../../public/images/photos/patient-portrait.webp";
import investorLounge from "../../../public/images/photos/investor-lounge.webp";
import physicianTealScrubs from "../../../public/images/photos/physician-teal-scrubs.webp";
import diasporaDoctor from "../../../public/images/photos/diaspora-doctor.webp";
import clinicBpCheck from "../../../public/images/photos/clinic-bp-check.webp";
import midwivesNewborn from "../../../public/images/photos/midwives-newborn.webp";
import nurseChildWard from "../../../public/images/photos/nurse-child-ward.webp";
import doctorsMeeting from "../../../public/images/photos/doctors-meeting.webp";
import physicianLaptop from "../../../public/images/photos/physician-laptop.webp";
import physicianStethoscopeGreen from "../../../public/images/photos/physician-stethoscope-green.webp";
import doctorStethoscope from "../../../public/images/photos/doctor-stethoscope.webp";
import teamLaptopCelebration from "../../../public/images/photos/team-laptop-celebration.webp";
import hospitalCorridor from "../../../public/images/photos/hospital-corridor.webp";
import doctorWindow from "../../../public/images/photos/doctor-window.webp";
import partnersPresentation from "../../../public/images/photos/partners-presentation.webp";
import physicianMigration from "../../../public/images/photos/physician-migration.webp";
import investorsLobby from "../../../public/images/photos/investors-lobby.webp";

/**
 * Every image on the site, with its kind:
 * - concept:      owner 3D renders of the planned facility (no badge or caption, owner's choice; stated on /terms)
 * - illustrative: photos and generated images copied from the WAHP source sites;
 *                 people and places shown are not WAHP staff, patients or facilities (no badge, owner's choice;
 *                 stated on /terms#images)
 * - stock:        licensed stock / Creative Commons photos of health workers in Africa (no badge);
 *                 they are not WAHP staff or facilities.
 * Photos carry no on-image credit (owner's choice); attribution required by CC BY-SA is given on /terms#image-credits.
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
    alt: "WAHP cofounders Jonathan Francois and Emmanuel Adomfeh standing together at an event.",
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
    alt: "An older woman in a kente head wrap and face mask.",
  },
  investorLounge: {
    src: investorLounge,
    kind: "illustrative",
    position: "50% 35%",
    alt: "A smiling man in a navy suit and a kente patterned tie sits in a bright clinic lounge, with a reception desk behind him.",
  },

  diasporaDoctor: {
    src: diasporaDoctor,
    kind: "stock",
    position: "50% 25%",
    alt: "A smiling doctor in a white coat over blue scrubs, stethoscope round her neck, holding a clipboard outside a city building.",
  },
  physicianTealScrubs: {
    src: physicianTealScrubs,
    kind: "illustrative",
    position: "50% 12%",
    alt: "A smiling doctor in teal scrubs and glasses, stethoscope round his neck, arms folded.",
  },
  partnersPresentation: {
    src: partnersPresentation,
    kind: "illustrative",
    position: "50% 30%",
    alt: "A woman in a navy suit presents charts on a wall screen to colleagues in a high rise meeting room.",
  },
  clinicBpCheck: {
    src: clinicBpCheck,
    kind: "illustrative",
    alt: "A nurse takes a woman's blood pressure at the desk of a modern consulting room.",
  },
  midwivesNewborn: {
    src: midwivesNewborn,
    kind: "illustrative",
    alt: "Two clinicians in gowns, caps and masks hold a newborn baby wrapped in a striped blanket.",
  },
  nurseChildWard: {
    src: nurseChildWard,
    kind: "illustrative",
    alt: "A nurse takes a young boy's blood pressure on a bright children's ward while his father watches.",
  },
  doctorsMeeting: {
    src: doctorsMeeting,
    kind: "stock",
    position: "50% 30%",
    alt: "Doctors in white coats seated at a table during a meeting, with colleagues behind them.",
  },
  physicianLaptop: {
    src: physicianLaptop,
    kind: "stock",
    alt: "A smiling physician in a white coat working at a laptop.",
  },
  physicianStethoscopeGreen: {
    src: physicianStethoscopeGreen,
    kind: "stock",
    position: "50% 0%",
    alt: "A smiling doctor in a white coat and teal scrubs holds a stethoscope out towards the camera.",
  },
  doctorStethoscope: {
    src: doctorStethoscope,
    kind: "stock",
    alt: "A doctor in a white coat puts on her stethoscope.",
  },
  teamLaptopCelebration: {
    src: teamLaptopCelebration,
    kind: "stock",
    position: "50% 35%",
    alt: "Two young professionals high five over a laptop at an outdoor café table.",
  },
  hospitalCorridor: {
    src: hospitalCorridor,
    kind: "illustrative",
    alt: "A crowded hospital corridor: patients wait on benches and beds line the wall while a doctor walks through.",
  },
  physicianMigration: {
    src: physicianMigration,
    kind: "illustrative",
    position: "60% 40%",
    alt: "A doctor in a white coat sits at his desk, chin in hand, watching a plane take off outside the window. A passport lies on the desk.",
  },
  investorsLobby: {
    src: investorsLobby,
    kind: "illustrative",
    // Phones crop this wide banner to 16:9; keep both doctors (right of centre) in frame.
    position: "74% 50%",
    alt: "Two doctors in white coats look at a tablet together in a bright, modern clinic lobby.",
  },
  doctorWindow: {
    src: doctorWindow,
    kind: "illustrative",
    position: "60% 30%",
    alt: "A young doctor in a white coat looks out of a louvred window on a hospital ward.",
  },
} satisfies Record<string, { src: StaticImageData; kind: Kind; alt: string; position?: string }>;

export type SiteImageName = keyof typeof images;

/*
 * No on-image badges and no automatic concept captions (owner's choice, 5 Nov 2026). The Terms page says that
 * interior images of the hub are concept renderings and that other photos are illustrative.
 */

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
  /** Optional caption under the image. */
  caption?: string | null;
  aspect?: string;
  dark?: boolean;
  fit?: "cover" | "contain";
  rounded?: string;
}) {
  const img: { src: StaticImageData; kind: Kind; alt: string; position?: string } = images[name];
  const text = caption;
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
      </div>
      {text && <figcaption className={`mt-3 text-xs ${dark ? "text-white/60" : "text-arsenic"}`}>{text}</figcaption>}
    </figure>
  );
}
