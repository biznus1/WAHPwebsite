import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const paths = [
  {
    label: "Physicians",
    title: "Practise independently, without building alone.",
    body: "Register interest in clinical space and shared support at the Accra flagship.",
    cta: "Register interest",
    href: "/physicians#register",
    accent: "bg-teal",
  },
  {
    label: "Investors",
    title: "Back infrastructure that outpatient care can build on.",
    body: "Understand the model and phased plan, and request an introduction to the team.",
    cta: "Request a conversation",
    href: "/investors#introduction",
    accent: "bg-navy",
  },
  {
    label: "Partners",
    title: "Help shape a connected outpatient platform.",
    body: "Institutions, suppliers and health organisations exploring collaboration.",
    cta: "Discuss partnership",
    href: "/contact?type=partnership",
    accent: "bg-space",
  },
  {
    label: "Patients",
    title: "Understand what WAHP intends to offer.",
    body: "We are pre-launch and not yet seeing patients. Learn what is planned.",
    cta: "What's planned",
    href: "/patients",
    accent: "bg-smoke",
  },
];

/** Audience-segmented pathways — each with its own explicit next step. */
export function AudiencePaths() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {paths.map((p, i) => (
        <li key={p.label} className="reveal" style={{ transitionDelay: `${i * 70}ms` }}>
          <Link
            href={p.href}
            className="group flex h-full flex-col rounded-card bg-white p-6 ring-1 ring-inset ring-smoke transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(0,51,102,0.45)] hover:ring-steel md:p-7"
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-arsenic">
              <span aria-hidden className={`size-2.5 rounded-full ${p.accent}`} />
              {p.label}
            </span>
            <span className="mt-6 block text-xl font-semibold tracking-tight text-navy">{p.title}</span>
            <span className="mt-3 block flex-1 text-arsenic">{p.body}</span>
            <span className="mt-8 inline-flex items-center gap-2 font-semibold text-navy">
              {p.cta}
              <ArrowUpRight
                aria-hidden
                className="size-4 text-teal transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
