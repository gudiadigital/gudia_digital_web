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
  "mobil-oyun",
  "pc-oyun",
  "trendyol-sosyal-medya",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
