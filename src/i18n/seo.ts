import type { Metadata } from "next";
import type { Project } from "@/data/projects";
import type { Locale, ServiceSlug } from "./config";
import { getDictionary } from "./dictionaries";
import type { RouteKey } from "./routes";

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
 *
 * `title` ve `description` pageCopy()'den gelmeli; burada değiştirilmiyor.
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

  return {
    title,
    description,
    alternates: {
      canonical: paths[locale],
      languages: { ...paths, "x-default": paths.tr },
    },
    openGraph: {
      type: "website",
      siteName: meta.siteName,
      title: shareTitle,
      description,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      url: paths[locale],
      images: [
        { url: "/brand/og.jpg", width: 1200, height: 630, alt: shareTitle },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: ["/brand/og.jpg"],
    },
  };
}

/** Başlığı ve açıklaması istenen sayfa. */
export type PageTarget =
  | { kind: "page"; key: RouteKey }
  | { kind: "service"; slug: ServiceSlug }
  | { kind: "project"; project: Project };

/**
 * Sayfanın arama başlığı ve açıklaması; <title>, meta açıklama ve paylaşım
 * kartı buradan besleniyor. Yapılandırılmış verideki sayfa adı ve açıklama
 * da aynı metni kullanmalı, iki yerde ayrı ayrı türetilmesin.
 *
 * Sözlükte ya da projede elle yazılmış `seo` alanı varsa o, olduğu gibi
 * kullanılır. Yoksa (yalnızca bazı projeler) başlık proje adı, açıklama
 * da tanıtım metninden kısaltılır.
 *
 * Başlık " · Gudia Dijital" eki olmadan döner; eki layout'taki şablon koyuyor.
 */
export function pageCopy(
  locale: Locale,
  target: PageTarget,
): { title: string; description: string } {
  const dict = getDictionary(locale);

  switch (target.kind) {
    case "service":
      return dict.services.items[target.slug].seo;
    case "project": {
      const { project } = target;
      const seo = project.seo?.[locale];
      return {
        title: seo?.title ?? project.title,
        description: seo?.description ?? metaDescription(project.summary[locale]),
      };
    }
    case "page":
      if (target.key === "home") {
        return { title: dict.meta.title, description: dict.meta.description };
      }
      return dict[target.key].seo;
  }
}

/*
 * Nokta her zaman cümle sonu değil: "Kanun No. 6698", "Dr.", "vb." ve
 * "2.617" gibi yerlerde cümle bölünürse açıklama yarıda kalıyordu
 * (/en/privacy/ "…Law No." ile bitiyordu). Bu noktalar bölmeden önce
 * geçici bir işaretle saklanıp sonra geri konuyor.
 */
const ABBREVIATIONS = /\b(No|Nr|Dr|vb|vs|St|Md)\./g;
const KEPT_DOT = "\u0000";

/**
 * Arama sonucunda kesilmeyecek uzunlukta açıklama: cümle cümle ekleyip
 * 160 karakteri aşmadan durur. Böyle çıkan metin çok kısaysa (ör. yalnızca
 * ilk cümle sığmışsa) sözcük sınırından kesilip üç nokta konur.
 */
export function metaDescription(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;

  const guarded = clean
    .replace(ABBREVIATIONS, `$1${KEPT_DOT}`)
    .replace(/\.(?=\d)/g, KEPT_DOT);
  const sentences = guarded.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [];
  let out = "";
  for (const sentence of sentences) {
    const next = (out + sentence).trim();
    if (next.length > max) break;
    out = next + " ";
  }
  out = out.trim().replaceAll(KEPT_DOT, ".");
  if (out.length >= 110) return out;

  const cut = clean.slice(0, 157);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:—–-]+$/, "")}…`;
}
