"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { buttonClasses } from "@/components/ui/button";
import { primaryNav } from "@/content/site";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a,button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const focusables = Array.from(panel.querySelectorAll<HTMLElement>("a,button"));
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

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
          scrolled || open ? "bg-paper/90 shadow-[0_1px_0_var(--color-smoke)] backdrop-blur-md" : "bg-paper"
        }`}
      >
        <div className="container-wahp flex h-18 items-center justify-between gap-6 md:h-20">
          <Link href="/" className="shrink-0 rounded-md" aria-label="West African Health Partners — home">
            <Logo className="h-9 w-auto md:h-10" title={null} />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors ${
                        active ? "text-navy" : "text-arsenic hover:text-navy"
                      }`}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-teal transition-transform duration-300 ${
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
            <Link
              href="/contact"
              className={buttonClasses("primary", "md", "!h-10 !px-4 text-sm sm:!h-11 sm:!px-5 sm:text-[0.95rem]")}
            >
              Get in touch
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full text-navy ring-1 ring-inset ring-steel lg:hidden"
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
        <div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="on-dark fixed inset-x-0 top-18 bottom-0 z-40 overflow-y-auto bg-navy text-white md:top-20 lg:hidden"
        >
          <nav aria-label="Mobile" className="container-wahp flex min-h-full flex-col py-8">
            <ul className="space-y-1">
              {primaryNav.map((item, i) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href} className="animate-rise" style={{ animationDelay: `${i * 40}ms` }}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className="flex items-baseline justify-between gap-4 border-b border-white/10 py-4"
                    >
                      <span
                        className={`text-3xl font-semibold tracking-tight ${active ? "underline decoration-teal decoration-2 underline-offset-8" : ""}`}
                      >
                        {item.label}
                      </span>
                      <span className="text-right text-sm text-white/60">{item.description}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ul className="mt-8 grid grid-cols-2 gap-3 text-white/80">
              <li>
                <Link href="/leadership" className="block py-2">
                  Leadership
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="block py-2">
                  Privacy
                </Link>
              </li>
            </ul>
            <div className="mt-auto pt-10">
              <Link href="/contact" className={buttonClasses("primary", "lg", "w-full")}>
                Get in touch
              </Link>
              <p className="mt-4 text-center text-sm text-white/60">WAHP is pre-launch and not yet seeing patients.</p>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
