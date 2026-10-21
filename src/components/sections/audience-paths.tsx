import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
import { SiteImage, type SiteImageName } from "@/components/ui/site-image";

/**
 * "Who we serve" cards, after the card style of WAHP's newer site build: an accent edge, the WAHP mark on the
 * photo, one line of copy and a single next step. The three main audiences lead; partners and patients follow.
 */
const paths: {
  title: string;
  image: SiteImageName;
  body: string;
  cta: string;
  href: string;
  /** Accent edge and mark colour. */
  accent: { bar: string; mark: string };
}[] = [
  {
    title: "Physicians",
    image: "physicianTealScrubs",
    body: "Rent an equipped consulting room in Accra and keep your own practice, without building a clinic first.",
    cta: "See how it works",
    href: "/physicians",
    accent: { bar: "bg-teal", mark: "text-teal" },
  },
  {
    title: "Diaspora physicians",
    image: "doctorStethoscope",
    body: "See patients in Accra during your weeks home, mentor, or help us build. You set the pace.",
    cta: "Explore your options",
    href: "/diaspora-physicians",
    accent: { bar: "bg-navy", mark: "text-navy" },
  },
  {
    title: "Investors",
    image: "investorLounge",
    body: "Back a shared outpatient hub in Accra, built so the model can move to Kumasi and beyond.",
    cta: "See the opportunity",
    href: "/investors",
    accent: { bar: "bg-navy-700", mark: "text-navy-700" },
  },
  {
    title: "Partners",
    image: "communityScreening",
    body: "Hospitals, labs, suppliers and health organisations who want to work with us.",
    cta: "Discuss partnership",
    href: "/contact?type=partnership",
    accent: { bar: "bg-teal", mark: "text-teal" },
  },
  {
    title: "Patients",
    image: "nurseChildWard",
    body: "We are not open and are not seeing patients yet. Here is what we plan to offer.",
    cta: "What's planned",
    href: "/patients",
    accent: { bar: "bg-space", mark: "text-navy" },
  },
];

export function AudiencePaths() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
      {paths.map((p, i) => {
        const lead = i < 3;
        return (
          <li
            key={p.title}
            className={`reveal ${lead ? "lg:col-span-2" : "lg:col-span-3"} ${i === 4 ? "sm:col-span-2 lg:col-span-3" : ""}`}
            style={{ transitionDelay: `${(i % 3) * 90}ms` }}
          >
            <Link
              href={p.href}
              className="group relative flex h-full flex-col overflow-hidden rounded-card bg-white shadow-[0_18px_40px_-32px_rgba(0,51,102,0.45)] ring-1 ring-inset ring-smoke transition-[box-shadow,transform] duration-500 ease-soft hover:-translate-y-1 hover:shadow-[0_28px_56px_-30px_rgba(0,51,102,0.5)]"
            >
              <span aria-hidden className={`absolute inset-x-0 top-0 z-10 h-1.5 ${p.accent.bar}`} />
              <span className="relative block">
                <SiteImage
                  name={p.image}
                  rounded="rounded-none"
                  aspect={lead ? "aspect-[3/2]" : "aspect-[2/1]"}
                  className="reveal-media"
                  sizes={
                    lead
                      ? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      : "(min-width: 1024px) 50vw, 100vw"
                  }
                />
                <span
                  aria-hidden
                  className="absolute top-4 right-4 flex size-12 items-center justify-center rounded-2xl bg-white shadow-md"
                >
                  <LogoMark className={`size-7 ${p.accent.mark}`} />
                </span>
              </span>
              <span className="flex flex-1 flex-col p-6 md:p-7">
                <span className="block text-title font-semibold text-navy">{p.title}</span>
                <span className="mt-3 block flex-1 text-arsenic">{p.body}</span>
                <span className="mt-6 flex items-center gap-2 border-t border-smoke pt-5 font-semibold text-navy">
                  {p.cta}
                  <ArrowRight
                    aria-hidden
                    className={`size-4 transition-transform duration-300 group-hover:translate-x-1 ${p.accent.mark}`}
                  />
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
