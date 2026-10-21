import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/** Indexing is disabled unless NEXT_PUBLIC_ALLOW_INDEXING=true (set only for the approved production launch). */
export default function robots(): MetadataRoute.Robots {
  const allow = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
  return {
    rules: allow
      ? { userAgent: "*", allow: "/", disallow: ["/keystatic", "/api/"] }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
