import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isLocale } from "@/i18n/config";
import { pageCopy, pageMetadata } from "@/i18n/seo";
import { getDictionary } from "@/i18n/dictionaries";
import { pageSchema } from "@/i18n/schema";
import {
  pageKeys,
  pageSegment,
  pathFor,
  pageKeyFromSegment,
} from "@/i18n/routes";
import { JsonLd } from "@/components/JsonLd";
import { AboutContent } from "@/components/pages/AboutContent";
import { ServicesContent } from "@/components/pages/ServicesContent";
import { ProjectsContent } from "@/components/pages/ProjectsContent";
import { ContactContent } from "@/components/pages/ContactContent";
import { PrivacyContent } from "@/components/pages/PrivacyContent";

type Params = { params: Promise<{ locale: string; page: string }> };

/**
 * Hakkımızda / Hizmetler / Projeler / İletişim / KVKK sayfalarının tamamı buradan
 * üretilir. Klasör adı yerine dile göre değişen URL parçası kullanıldığı için
 * (/tr/hakkimizda, /en/about) tek bir dinamik segment yeterli oluyor.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    pageKeys.map((key) => ({ locale, page: pageSegment(locale, key) })),
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, page } = await params;
  if (!isLocale(locale)) return {};
  const key = pageKeyFromSegment(locale, page);
  if (!key) return {};

  return pageMetadata({
    locale,
    paths: { tr: pathFor("tr", key), en: pathFor("en", key) },
    ...pageCopy(locale, { kind: "page", key }),
  });
}

export default async function LocalizedPage({ params }: Params) {
  const { locale, page } = await params;
  if (!isLocale(locale)) notFound();

  const key = pageKeyFromSegment(locale, page);
  if (!key) notFound();

  const dict = getDictionary(locale);
  const schema = <JsonLd data={pageSchema(locale, { kind: "page", key })} />;

  switch (key) {
    case "about":
      return (
        <>
          {schema}
          <AboutContent locale={locale} dict={dict} />
        </>
      );
    case "services":
      return (
        <>
          {schema}
          <ServicesContent locale={locale} dict={dict} />
        </>
      );
    case "projects":
      return (
        <>
          {schema}
          <ProjectsContent locale={locale} dict={dict} />
        </>
      );
    case "contact":
      return (
        <>
          {schema}
          <ContactContent locale={locale} dict={dict} />
        </>
      );
    case "privacy":
      return (
        <>
          {schema}
          <PrivacyContent locale={locale} dict={dict} />
        </>
      );
  }
}
