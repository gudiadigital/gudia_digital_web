import {
  type Locale,
  type ServiceSlug,
  serviceSlugs,
  isLocale,
} from "./config";

/**
 * Klasör adları (canonical) İngilizce; her dil için görünen URL parçası ayrı.
 * Middleware, görünen yolu canonical yola rewrite eder — adres çubuğunda
 * ziyaretçi kendi dilindeki URL'i görür.
 */
export type RouteKey = "home" | "about" | "services" | "projects" | "contact";

const pageSegments: Record<Exclude<RouteKey, "home">, Record<Locale, string>> = {
  about: { tr: "hakkimizda", en: "about" },
  services: { tr: "hizmetler", en: "services" },
  projects: { tr: "projeler", en: "projects" },
  contact: { tr: "iletisim", en: "contact" },
};

const serviceSegments: Record<ServiceSlug, Record<Locale, string>> = {
  "mobil-uygulama": { tr: "mobil-uygulama", en: "mobile-app" },
  "web-sitesi": { tr: "web-sitesi", en: "web-development" },
  "mobil-oyun": { tr: "mobil-oyun", en: "mobile-game" },
  "pc-oyun": { tr: "pc-oyun", en: "pc-game" },
  "trendyol-sosyal-medya": {
    tr: "trendyol-sosyal-medya",
    en: "ecommerce-social",
  },
};

/** Ziyaretçiye gösterilecek yolu üretir. */
export function pathFor(
  locale: Locale,
  key: RouteKey = "home",
  service?: ServiceSlug,
): string {
  if (key === "home") return `/${locale}`;
  const base = `/${locale}/${pageSegments[key][locale]}`;
  if (key === "services" && service) {
    return `${base}/${serviceSegments[service][locale]}`;
  }
  return base;
}

/** Aynı sayfanın diğer dildeki karşılığını verir (dil değiştirici için). */
export function switchLocalePath(
  targetLocale: Locale,
  key: RouteKey,
  service?: ServiceSlug,
): string {
  return pathFor(targetLocale, key, service);
}

/**
 * Görünen yolu canonical klasör yoluna çevirir.
 * Rewrite gerekmiyorsa null döner.
 */
export function canonicalPath(pathname: string): string | null {
  const parts = pathname.split("/").filter(Boolean);
  const [locale, page, sub] = parts;
  if (!locale || !isLocale(locale) || !page) return null;

  const pageKey = (
    Object.keys(pageSegments) as Array<Exclude<RouteKey, "home">>
  ).find((key) => pageSegments[key][locale] === page);
  if (!pageKey) return null;

  let canonical = `/${locale}/${pageKey}`;

  if (pageKey === "services" && sub) {
    const slug = serviceSlugs.find(
      (candidate) => serviceSegments[candidate][locale] === sub,
    );
    if (!slug) return null;
    canonical += `/${slug}`;
  } else if (sub) {
    return null;
  }

  return canonical === pathname ? null : canonical;
}

/** Canonical servis slug'ını verilen dildeki görünen slug'a çevirir. */
export function serviceSegment(locale: Locale, slug: ServiceSlug): string {
  return serviceSegments[slug][locale];
}

/** Tarayıcıda görünen yolu {dil, sayfa, servis} olarak çözer. */
export function parsePath(pathname: string): {
  locale: Locale;
  key: RouteKey;
  service?: ServiceSlug;
} | null {
  const [locale, page, sub] = pathname.split("/").filter(Boolean);
  if (!locale || !isLocale(locale)) return null;
  if (!page) return { locale, key: "home" };

  const pageKey = (
    Object.keys(pageSegments) as Array<Exclude<RouteKey, "home">>
  ).find(
    (key) => pageSegments[key][locale] === page || key === page,
  );
  if (!pageKey) return null;

  if (pageKey === "services" && sub) {
    const service = serviceSlugs.find(
      (candidate) =>
        serviceSegments[candidate][locale] === sub || candidate === sub,
    );
    return service ? { locale, key: pageKey, service } : { locale, key: pageKey };
  }

  return { locale, key: pageKey };
}
