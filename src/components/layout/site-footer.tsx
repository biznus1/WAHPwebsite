import Link from "next/link";
import { Logo, LogoMark } from "@/components/brand/logo";
import { footerNav, site } from "@/content/site";

export function SiteFooter() {
  const year = site.copyrightYear;
  return (
    <footer className="grain on-dark relative overflow-hidden bg-navy text-white">
      <LogoMark className="pointer-events-none absolute -right-24 -bottom-32 size-[30rem] text-navy-700/45 md:size-[38rem]" />
      <div className="container-wahp relative py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo tone="reversed" className="h-11 w-auto" />
            <p className="mt-6 max-w-sm text-white/75">
              Shared clinical infrastructure for independent outpatient medicine — beginning in Accra, Ghana.
            </p>
            {site.contactEmail ? (
              <a
                href={`mailto:${site.contactEmail}`}
                className="mt-6 inline-block font-semibold text-white underline decoration-teal decoration-2 underline-offset-4 hover:decoration-white"
              >
                {site.contactEmail}
              </a>
            ) : (
              <Link
                href="/contact"
                className="mt-6 inline-block font-semibold text-white underline decoration-teal decoration-2 underline-offset-4 hover:decoration-white"
              >
                Contact the WAHP team
              </Link>
            )}
            <ul className="mt-6 flex gap-3" aria-label="WAHP on social media">
              {[
                ["LinkedIn", site.linkedin],
                ["YouTube", site.youtube],
              ]
                .filter((x): x is [string, string] => Boolean(x[1]))
                .map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center rounded-full px-4 text-sm font-semibold text-white ring-1 ring-inset ring-white/30 hover:ring-white"
                    >
                      {label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {footerNav.map((group) => (
              <nav key={group.heading} aria-label={group.heading}>
                <h2 className="eyebrow text-white/55">{group.heading}</h2>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-white/85 underline-offset-4 transition-colors hover:text-white hover:underline"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-6 border-t border-white/15 pt-8 text-sm text-white/60 md:grid-cols-[2fr_1fr]">
          <p className="max-w-3xl">
            <strong className="font-semibold text-white/80">Pre-launch notice.</strong> WAHP is in development. No
            clinical services are currently offered and this website does not provide medical advice. In an emergency,
            call 112 or go to the nearest emergency department. Nothing on this site is an offer of securities.
          </p>
          <p className="md:text-right">© {year} West African Health Partners. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
