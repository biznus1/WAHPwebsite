import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/content/site";
import "./globals.css";

// Manrope (SIL Open Font License) — the brand's primary typeface, self-hosted.
const manrope = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
      weight: "200 800",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource-variable/manrope/files/manrope-latin-ext-wght-normal.woff2",
      weight: "200 800",
      style: "normal",
    },
  ],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "West African Health Partners — Infrastructure for independent medicine",
    template: "%s · West African Health Partners",
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
  },
  twitter: { card: "summary_large_image" },
  robots:
    process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true" ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#003366",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  logo: `${site.url}/brand/wahp-lockup.svg`,
  description: site.description,
  areaServed: "Ghana",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${manrope.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Enables scroll-reveal styles only when JS runs; content is never hidden without JS. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      </head>
      {/* Site chrome lives in (site)/layout.tsx so the admin at /keystatic renders without it. */}
      <body className="flex min-h-dvh flex-col">{children}</body>
    </html>
  );
}
