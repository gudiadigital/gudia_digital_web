import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { preload } from "react-dom";
import "../fonts.css";
import "../globals.css";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Motion } from "@/components/Motion";
import { SmoothScroll } from "@/components/SmoothScroll";
import { locales, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/*
 * Fontlar src/app/fonts.css'te tanımlı, dosyaları public/fonts altında.
 * İlk boyamada gereken dört dosya önden yükleniyor: Türkçe metin latin-ext
 * dosyasına da ihtiyaç duyduğu için o da listede.
 */
const FONT_FILES = [
  "/fonts/space-grotesk-latin.woff2",
  "/fonts/space-grotesk-latin-ext.woff2",
  "/fonts/inter-latin.woff2",
  "/fonts/inter-latin-ext.woff2",
];

const SITE_URL = "https://gudiadigital.com";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.title,
      template: `%s · ${dict.meta.siteName}`,
    },
    description: dict.meta.description,
    // Google arama sonucundaki ikon için kare ve 48'in katı boyut şart;
    // bu yüzden 96 piksel ve boyutu belirtilmiş.
    icons: {
      icon: [
        {
          url: "/brand/favicon-light.png",
          sizes: "96x96",
          type: "image/png",
          media: "(prefers-color-scheme: light)",
        },
        {
          url: "/brand/favicon-dark.png",
          sizes: "96x96",
          type: "image/png",
          media: "(prefers-color-scheme: dark)",
        },
      ],
      apple: "/brand/apple-touch-icon.png",
    },
    // Ana sayfanın değerleri; alt sayfalar kendi adreslerini
    // src/i18n/seo.ts üzerinden bildiriyor.
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}`])),
        "x-default": "/tr",
      },
    },
    openGraph: {
      type: "website",
      siteName: dict.meta.siteName,
      title: dict.meta.title,
      description: dict.meta.description,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      url: `/${locale}`,
      images: [
        {
          url: "/brand/og.jpg",
          width: 1200,
          height: 630,
          alt: dict.meta.siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: ["/brand/og.jpg"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale as Locale);

  for (const href of FONT_FILES) {
    preload(href, { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  }

  return (
    <html
      lang={locale}
      className="h-full"
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="bg-accent sr-only rounded-lg px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]"
        >
          {dict.common.skipToContent}
        </a>
        <div className="grain" aria-hidden="true" />
        <SmoothScroll />
        <Motion />
        <Header locale={locale} nav={dict.nav} siteName={dict.meta.siteName} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  );
}
