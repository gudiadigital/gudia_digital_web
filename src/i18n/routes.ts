import {
  type Locale,
  type ServiceSlug,
  serviceSlugs,
  isLocale,
} from "./config";

/**
 * Klasör adları (canonical) İngilizce; her dil için görünen URL parçası ayrı.
 * Görünen yolu canonical yola çeviren rewrite tablosu next.config.ts içinde —
 * bu dosyadaki tablolar değişirse orası da güncellenmeli.
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

export const pageKeys = ["about", "services", "projects", "contact"] as const;

export type PageKey = (typeof pageKeys)[number];

/** Verilen dildeki görünen sayfa parçası: pageSegment("tr","about") → "hakkimizda" */
export function pageSegment(locale: Locale, key: PageKey): string {
  return pageSegments[key][locale];
}

/** Görünen sayfa parçasından sayfa anahtarını bulur. */
export function pageKeyFromSegment(
  locale: Locale,
  segment: string,
): PageKey | null {
  return pageKeys.find((key) => pageSegments[key][locale] === segment) ?? null;
}

/** Görünen hizmet parçasından canonical slug'ı bulur. */
export function serviceFromSegment(
  locale: Locale,
  segment: string,
): ServiceSlug | null {
  return (
    serviceSlugs.find(
      (slug) => serviceSegments[slug][locale] === segment,
    ) ?? null
  );
}
