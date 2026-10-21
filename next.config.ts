import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// Conservative security headers. 'unsafe-inline' is needed for Next's inline bootstrap scripts
// without nonce-based CSP; tighten with nonces if third-party scripts are ever added.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws:" : ""}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

// The site admin (/keystatic) loads its own font from Google and, in GitHub mode, talks to GitHub from the browser.
const adminCsp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https://avatars.githubusercontent.com https://raw.githubusercontent.com",
  "font-src 'self' https://fonts.gstatic.com",
  `connect-src 'self' https://api.github.com https://github.com${isDev ? " ws:" : ""}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self' https://github.com",
  "object-src 'none'",
].join("; ");

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Preserve URLs from the existing Squarespace site (westahp.com).
  async redirects() {
    return [
      { source: "/founders", destination: "/leadership", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/what-we-do", destination: "/platform", permanent: true },
      { source: "/admin", destination: "/keystatic", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
        ],
      },
      // Later entries override earlier ones for the same header key.
      {
        source: "/keystatic/:path*",
        headers: [
          { key: "Content-Security-Policy", value: adminCsp },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Cache-Control", value: "no-store" },
        ],
      },
      {
        source: "/api/keystatic/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
