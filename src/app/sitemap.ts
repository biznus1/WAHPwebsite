import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const routes = [
  "",
  "/platform",
  "/physicians",
  "/diaspora-physicians",
  "/investors",
  "/patients",
  "/about",
  "/leadership",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${site.url}${r}`,
    changeFrequency: "monthly",
    priority: r === "" ? 1 : r === "/privacy" || r === "/terms" ? 0.3 : 0.7,
  }));
}
