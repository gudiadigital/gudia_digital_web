export const locales = ["tr", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "tr";

export const localeLabels: Record<Locale, string> = {
  tr: "Türkçe",
  en: "English",
};

/** Slug'lar iki dilde de ortak; birincil pazar TR olduğu için Türkçe tutuldu. */
export const serviceSlugs = [
  "mobil-uygulama",
  "web-sitesi",
  "markali-oyunlar",
  "dijital-urun-iyilestirme",
  "sosyal-medya-icerik",
  "e-ticaret-optimizasyonu",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

/** Stüdyonun çalışma modeli: kur → iyileştir → büyüt. */
export const serviceGroups = ["build", "improve", "grow"] as const;

export type ServiceGroup = (typeof serviceGroups)[number];

export const servicesByGroup: Record<ServiceGroup, readonly ServiceSlug[]> = {
  build: ["mobil-uygulama", "web-sitesi", "markali-oyunlar"],
  improve: ["dijital-urun-iyilestirme"],
  grow: ["sosyal-medya-icerik", "e-ticaret-optimizasyonu"],
};

export const groupOfService: Record<ServiceSlug, ServiceGroup> = {
  "mobil-uygulama": "build",
  "web-sitesi": "build",
  "markali-oyunlar": "build",
  "dijital-urun-iyilestirme": "improve",
  "sosyal-medya-icerik": "grow",
  "e-ticaret-optimizasyonu": "grow",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
