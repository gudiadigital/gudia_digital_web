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

/**
 * YYYY-MM-DD tarihini sayfanın dilinde yazar: "28 Eylül 2026",
 * "28 September 2026". UTC'de okunuyor; derleme makinesinin saat dilimi
 * günü kaydırmasın.
 */
export function formatDate(iso: string, locale: Locale): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(
    locale === "tr" ? "tr-TR" : "en-GB",
    { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" },
  );
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
