import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[background-color,color,box-shadow,transform] duration-200 active:translate-y-px disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap";

/*
 * Green buttons carry navy text: white on #8BC900 is ~2:1 contrast and fails
 * WCAG AA, navy on green is ~6:1. Documented in docs/BRAND_IMPLEMENTATION.md.
 */
const variants: Record<Variant, string> = {
  primary: "bg-green text-navy hover:bg-green/85",
  secondary: "bg-navy text-white hover:bg-navy-900",
  ghost: "text-navy ring-1 ring-inset ring-steel hover:ring-navy hover:bg-white",
  light: "text-white ring-1 ring-inset ring-white/35 hover:ring-white hover:bg-white/5",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-13 px-7 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  className = "",
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className">) {
  return (
    <Link href={href} className={buttonClasses(variant, size, className)} {...rest}>
      {children}
      {arrow && (
        <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </Link>
  );
}
