import type { Metadata } from "next";
import type { Locale } from "./config";
import { getDictionary } from "./dictionaries";

/**
 * Alt sayfaların arama ve paylaşım bilgisi.
 *
 * Layout'taki metadata ana sayfa için yazılmıştı ve alt sayfalar onu olduğu
 * gibi devralıyordu: 44 sayfanın 42'si kanonik adres olarak ana sayfayı
 * gösteriyordu. Arama motoru bu durumda alt sayfaları ana sayfanın kopyası
 * sayıp dizine almayabiliyor. Paylaşım kartı da (og:title, og:url) her
 * sayfada ana sayfanınkiydi.
 *
 * Next'te alt sayfanın `openGraph` alanı üst sayfanınkini birleştirmiyor,
 * tamamen yerine geçiyor; bu yüzden kart burada eksiksiz kuruluyor.
 */
export function pageMetadata({
  locale,
  paths,
  title,
  description,
}: {
  locale: Locale;
  /** Sayfanın her dildeki yolu, ör. { tr: "/tr/projeler/pofu", en: "/en/projects/pofu" } */
  paths: Record<Locale, string>;
  title: string;
  description: string;
}): Metadata {
  const { meta } = getDictionary(locale);
  const shareTitle = `${title} · ${meta.siteName}`;
  const summary = metaDescription(description);

  return {
    title,
    description: summary,
    alternates: {
      canonical: paths[locale],
      languages: { ...paths, "x-default": paths.tr },
    },
    openGraph: {
      type: "website",
      siteName: meta.siteName,
      title: shareTitle,
      description: summary,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      url: paths[locale],
      images: [
        { url: "/brand/og.jpg", width: 1200, height: 630, alt: meta.siteName },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: summary,
      images: ["/brand/og.jpg"],
    },
  };
}

/**
 * Arama sonucunda kesilmeyecek uzunlukta açıklama: cümle cümle ekleyip
 * 160 karakteri aşmadan durur. İlk cümle tek başına uzunsa sözcük
 * sınırından kesilip üç nokta konur.
 */
export function metaDescription(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;

  const sentences = clean.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [clean];
  let out = "";
  for (const sentence of sentences) {
    const next = (out + sentence).trim();
    if (next.length > max) break;
    out = next + " ";
  }
  out = out.trim();
  if (out) return out;

  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}
