import type { MetadataRoute } from "next";
import { locales, serviceSlugs } from "@/i18n/config";
import { guidePath, pathFor, projectPath } from "@/i18n/routes";
import { projects } from "@/data/projects";
import { publishedGuides } from "@/data/guides";
import { absoluteUrl as url } from "@/i18n/site";

// Statik export: dosya derleme sırasında bir kez üretilir.
export const dynamic = "force-static";

/*
 * Burada yalnızca adresler var. <lastmod>'u derleme sonrasında
 * scripts/lastmod.mjs ekliyor: sayfanın içeriği bir önceki yayındakinden
 * farklıysa bu derlemenin zamanı, aynıysa eski tarih kalıyor. Buraya
 * derleme zamanı yazılırsa her sayfa her yayında "değişti" görünüyor ve
 * arama motorları tarihi yok saymayı öğreniyor. priority de yok: Google
 * okumuyor.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) => [
    { url: url(pathFor(locale)) },
    { url: url(pathFor(locale, "services")) },
    ...serviceSlugs.map((slug) => ({ url: url(pathFor(locale, "services", slug)) })),
    { url: url(pathFor(locale, "about")) },
    { url: url(pathFor(locale, "projects")) },
    ...projects.map((project) => ({ url: url(projectPath(locale, project.slug)) })),
    { url: url(pathFor(locale, "contact")) },
    { url: url(pathFor(locale, "privacy")) },
    // Rehberler yalnızca yayındayken; hiç yoksa dizin sayfası da yok.
    ...(publishedGuides.length > 0 ? [{ url: url(pathFor(locale, "guides")) }] : []),
    ...publishedGuides.map((guide) => ({ url: url(guidePath(locale, guide.slug[locale])) })),
  ]);
}
