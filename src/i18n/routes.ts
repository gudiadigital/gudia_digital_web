import {
  type Locale,
  type ServiceSlug,
  serviceSlugs,
  isLocale,
} from "./config";

/**
 * Sayfa anahtarları (canonical) İngilizce; her dil için görünen URL parçası
 * ayrı. Statik export'ta rewrite yok: [page] ve [page]/[slug] rotaları
 * generateStaticParams ile doğrudan bu tablolardan üretiliyor, yani yeni ya da
 * değişen bir URL için yalnızca bu dosyaya dokunmak yeterli.
 */
export type RouteKey =
  | "home"
  | "about"
  | "services"
  | "projects"
  | "contact"
  | "privacy"
  | "guides";

const pageSegments: Record<Exclude<RouteKey, "home">, Record<Locale, string>> = {
  about: { tr: "hakkimizda", en: "about" },
  services: { tr: "hizmetler", en: "services" },
  projects: { tr: "projeler", en: "projects" },
  contact: { tr: "iletisim", en: "contact" },
  privacy: { tr: "kvkk", en: "privacy" },
  guides: { tr: "rehber", en: "guides" },
};

const serviceSegments: Record<ServiceSlug, Record<Locale, string>> = {
  "mobil-uygulama": { tr: "mobil-uygulama", en: "mobile-apps" },
  "web-sitesi": { tr: "web-sitesi", en: "web-development" },
  "markali-oyunlar": { tr: "markali-oyunlar", en: "branded-games" },
  "dijital-urun-iyilestirme": {
    tr: "dijital-urun-iyilestirme",
    en: "product-improvement",
  },
  "sosyal-medya-icerik": { tr: "sosyal-medya-icerik", en: "social-content" },
  "e-ticaret-optimizasyonu": {
    tr: "e-ticaret-optimizasyonu",
    en: "ecommerce-optimization",
  },
};

/**
 * Proje detay yolu: /tr/projeler/pofu, /en/projects/pofu
 * Proje slug'ları ürün adı olduğu için iki dilde de aynı.
 */
export function projectPath(locale: Locale, slug: string): string {
  return `/${locale}/${pageSegments.projects[locale]}/${slug}`;
}

/**
 * Rehber yolu: /tr/rehber/<slug>, /en/guides/<slug>. Rehberin slug'ı dile
 * göre değişiyor ve src/data/guides.ts'te duruyor.
 *
 * Bu dosya rehber verisini bilerek içe aktarmıyor: Header (istemci
 * bileşeni) burayı kullanıyor, içe aktarılırsa yayına kapalı taslakların
 * metni de tarayıcı paketine giriyor.
 */
export function guidePath(locale: Locale, slug: string): string {
  return `/${locale}/${pageSegments.guides[locale]}/${slug}`;
}

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
  /** Proje detayındaysak slug; dil değiştirirken aynı projede kalmak için. */
  project?: string;
  /** Rehber detayındaysak bu dildeki slug; karşılığını Header buluyor. */
  guide?: string;
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

  // Proje slug'ları çevrilmiyor, olduğu gibi taşınıyor.
  if (pageKey === "projects" && sub) {
    return { locale, key: pageKey, project: sub };
  }

  if (pageKey === "guides" && sub) {
    return { locale, key: pageKey, guide: sub };
  }

  if (pageKey === "services" && sub) {
    const service = serviceSlugs.find(
      (candidate) =>
        serviceSegments[candidate][locale] === sub || candidate === sub,
    );
    return service ? { locale, key: pageKey, service } : { locale, key: pageKey };
  }

  return { locale, key: pageKey };
}

export const pageKeys = [
  "about",
  "services",
  "projects",
  "contact",
  "privacy",
  // Rehber dizini yalnızca yayında en az bir rehber varken üretiliyor
  // ([page]/page.tsx); boş dizin sayfası hiç çıkmıyor.
  "guides",
] as const;

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
