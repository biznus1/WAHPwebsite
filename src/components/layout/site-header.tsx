"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { buttonClasses } from "@/components/ui/button";
import { callTypes, mobileNav, primaryNav, type NavGroup, type NavItem } from "@/content/site";

/** Header call to action: book a call once the Calendly links are approved, as on the older site. */
const cta =
  callTypes.length > 0
    ? { href: "/contact#schedule", label: "Schedule a call", short: "Book a call" }
    : { href: "/contact", label: "Get in touch", short: "Get in touch" };

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

const isGroup = (entry: NavItem | NavGroup): entry is NavGroup => "children" in entry;

/*
 * Phone menu rows, after the older build's drop-down: Manrope 16px bold in navy, 10px × 20px padding,
 * a faint rule between rows, sub-items set in a further 8px. The current page, an open group and hover
 * are filled with brand green. Its text stays navy (white on this green is about 2:1, too faint to read).
 */
const menuRow =
  "flex w-full items-center gap-2.5 px-5 py-2.5 text-base leading-5 font-bold text-navy transition-colors hover:bg-green focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-teal";
const menuRule = "border-b border-black/[0.17] last:border-b-0";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Close the menu on route change.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // True while the Home hero is still behind the header; the header is transparent/navy over it.
  const [overHero, setOverHero] = useState(pathname === "/");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const hero = document.querySelector("[data-hero]");
      setOverHero(hero ? hero.getBoundingClientRect().bottom > 96 : false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a,button,summary")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const focusables = Array.from(panel.querySelectorAll<HTMLElement>("a,button,summary"));
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  // On Home the header floats over the hero (transparent at the top, frosted navy while scrolling through it)
  // and softens to light once the hero has scrolled away.
  const blend = overHero && !open;

  return (
    <>
      <header
        data-blend={blend || undefined}
        className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-700 ease-soft ${
          blend
            ? scrolled
              ? "bg-navy/75 backdrop-blur-md"
              : "bg-transparent"
            : scrolled || open
              ? "bg-paper/90 shadow-[0_1px_0_var(--color-smoke)] backdrop-blur-md"
              : "bg-paper"
        }`}
      >
        <div className="container-wahp flex h-18 items-center justify-between gap-3 min-[380px]:gap-6 md:h-20">
          <Link href="/" className="shrink-0 rounded-md" aria-label="West African Health Partners home">
            <Logo tone={blend ? "reversed" : "primary"} className="h-8 w-auto min-[380px]:h-9 md:h-10" title={null} />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href} className={item.wideOnly ? "max-xl:hidden" : undefined}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative rounded-full px-2 py-2 text-[0.95rem] font-medium whitespace-nowrap transition-colors duration-500 min-[1120px]:px-3 xl:px-4 ${
                        blend
                          ? active
                            ? "text-white"
                            : "text-white/80 hover:text-white"
                          : active
                            ? "text-navy"
                            : "text-arsenic hover:text-navy"
                      }`}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={`absolute inset-x-2 -bottom-0.5 min-[1120px]:inset-x-3 xl:inset-x-4 h-0.5 rounded-full bg-teal transition-transform duration-300 ${
                          active ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {/* Under 360px wide this button would push the header off screen; the menu still has Contact. */}
            <Link
              href={cta.href}
              className={buttonClasses(
                "primary",
                "md",
                "!h-10 !px-4 text-sm max-[359px]:hidden sm:!h-11 sm:!px-5 sm:text-[0.95rem]",
              )}
            >
              {/* The full label does not fit beside the logo and menu button on phones. */}
              <span className="sm:hidden">{cta.short}</span>
              <span className="max-sm:hidden">{cta.label}</span>
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className={`inline-flex size-11 items-center justify-center rounded-full ring-1 ring-inset transition-colors duration-500 lg:hidden ${
                blend ? "text-white ring-white/40" : "text-navy ring-steel"
              }`}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => (open ? close() : setOpen(true))}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Rendered outside <header>: its backdrop-filter would otherwise become the containing block for this fixed panel. */}
      {open && (
        // A white panel dropping from under the header, as on the older build; tapping below it closes it.
        <div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-x-0 top-18 bottom-0 z-40 md:top-20 lg:hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <nav
            aria-label="Mobile"
            className="menu-drop max-h-full overflow-y-auto rounded-b-[10px] bg-white shadow-[0_18px_40px_-12px_rgba(0,25,51,0.35)]"
          >
            <ul>
              {mobileNav.map((entry) => {
                if (!isGroup(entry)) {
                  return (
                    <li key={entry.href} className={menuRule}>
                      <Link
                        href={entry.href}
                        aria-current={isActive(pathname, entry.href) ? "page" : undefined}
                        onClick={() => setOpen(false)}
                        className={`${menuRow} aria-[current=page]:bg-green`}
                      >
                        {entry.label}
                      </Link>
                    </li>
                  );
                }
                // Native disclosure, so groups open and close before the page's script loads (and in the preview).
                const current = entry.children.some((c) => isActive(pathname, c.href));
                return (
                  <li key={entry.label} className={menuRule}>
                    <details open={current} className="group/menu">
                      <summary
                        className={`${menuRow} cursor-pointer list-none group-open/menu:bg-green [&::-webkit-details-marker]:hidden`}
                      >
                        {entry.label}
                        <ChevronDown
                          aria-hidden
                          className="size-3.5 stroke-[3] transition-transform group-open/menu:rotate-180"
                        />
                      </summary>
                      <ul className="menu-sub">
                        {entry.children.map((c) => (
                          <li key={c.href} className="border-t border-black/[0.17]">
                            <Link
                              href={c.href}
                              aria-current={isActive(pathname, c.href) ? "page" : undefined}
                              onClick={() => setOpen(false)}
                              className={`${menuRow} pl-7 aria-[current=page]:bg-green`}
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
