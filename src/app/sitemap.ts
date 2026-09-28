import type { MetadataRoute } from "next";
import { locales, serviceSlugs } from "@/i18n/config";
import { pathFor, projectPath } from "@/i18n/routes";
import { projects } from "@/data/projects";
import { absoluteUrl as url } from "@/i18n/site";

// Statik export: dosya derleme sırasında bir kez üretilir.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return locales.flatMap((locale) => [
    { url: url(pathFor(locale)), lastModified: now, priority: 1 },
    { url: url(pathFor(locale, "services")), lastModified: now, priority: 0.9 },
    ...serviceSlugs.map((slug) => ({
      url: url(pathFor(locale, "services", slug)),
      lastModified: now,
      priority: 0.8,
    })),
    { url: url(pathFor(locale, "about")), lastModified: now, priority: 0.7 },
    { url: url(pathFor(locale, "projects")), lastModified: now, priority: 0.7 },
    ...projects.map((project) => ({
      url: url(projectPath(locale, project.slug)),
      lastModified: now,
      priority: 0.6,
    })),
    { url: url(pathFor(locale, "contact")), lastModified: now, priority: 0.7 },
    { url: url(pathFor(locale, "privacy")), lastModified: now, priority: 0.3 },
  ]);
}
