import Image, { type StaticImageData } from "next/image";
import lobby from "../../../public/images/concepts/lobby.webp";
import consultation from "../../../public/images/concepts/consultation-suite.webp";
import laboratory from "../../../public/images/concepts/laboratory.webp";

/*
 * Owner-supplied 3D concept renders (Drive: WAHP-Website-Photos/the-platform).
 * They depict a facility that does not yet exist, so every use is captioned as a
 * concept rendering. Provenance: docs/ASSET_INVENTORY.md.
 */
const images = {
  lobby: {
    src: lobby,
    alt: "Concept rendering of a warm reception lobby with a curved oak reception desk and a seating area.",
  },
  consultation: {
    src: consultation,
    alt: "Concept rendering of a calm consultation suite with an examination couch, a desk and natural light.",
  },
  laboratory: { src: laboratory, alt: "Concept rendering of a bright laboratory with benches and analysers." },
} satisfies Record<string, { src: StaticImageData; alt: string }>;

export type ConceptImageName = keyof typeof images;

export function ConceptImage({
  name,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  caption = "Concept rendering — illustrates the planned environment, not an existing facility. People shown are illustrative.",
  aspect = "aspect-[4/3]",
  dark = false,
}: {
  name: ConceptImageName;
  className?: string;
  sizes?: string;
  priority?: boolean;
  caption?: string;
  aspect?: string;
  dark?: boolean;
}) {
  const img = images[name];
  return (
    <figure className={className}>
      <div className={`relative overflow-hidden rounded-panel bg-cloud ${aspect}`}>
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          className="object-cover"
        />
        <span className="absolute top-4 left-4 rounded-full bg-navy/80 px-3 py-1 text-[0.7rem] font-semibold tracking-wide text-white backdrop-blur">
          Concept rendering
        </span>
      </div>
      <figcaption className={`mt-3 text-xs ${dark ? "text-white/60" : "text-arsenic"}`}>{caption}</figcaption>
    </figure>
  );
}
