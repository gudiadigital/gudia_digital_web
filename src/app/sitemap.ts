import type { MetadataRoute } from "next";
import { locales, serviceSlugs } from "@/i18n/config";
import { pathFor } from "@/i18n/routes";

export const SITE_URL = "https://gudiadijital.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return locales.flatMap((locale) => [
    { url: `${SITE_URL}${pathFor(locale)}`, lastModified: now, priority: 1 },
    { url: `${SITE_URL}${pathFor(locale, "services")}`, lastModified: now, priority: 0.9 },
    ...serviceSlugs.map((slug) => ({
      url: `${SITE_URL}${pathFor(locale, "services", slug)}`,
      lastModified: now,
      priority: 0.8,
    })),
    { url: `${SITE_URL}${pathFor(locale, "about")}`, lastModified: now, priority: 0.7 },
    { url: `${SITE_URL}${pathFor(locale, "projects")}`, lastModified: now, priority: 0.7 },
    { url: `${SITE_URL}${pathFor(locale, "contact")}`, lastModified: now, priority: 0.7 },
  ]);
}
