import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  pageKeys,
  pageSegment,
  pageKeyFromSegment,
  type PageKey,
} from "@/i18n/routes";
import { AboutContent } from "@/components/pages/AboutContent";
import { ServicesContent } from "@/components/pages/ServicesContent";
import { ProjectsContent } from "@/components/pages/ProjectsContent";
import { ContactContent } from "@/components/pages/ContactContent";

type Params = { params: Promise<{ locale: string; page: string }> };

/**
 * Hakkımızda / Hizmetler / Projeler / İletişim sayfalarının tamamı buradan
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

  const dict = getDictionary(locale);
  const meta: Record<PageKey, Metadata> = {
    about: { title: dict.nav.about, description: dict.about.lead },
    services: { title: dict.nav.services, description: dict.services.subtitle },
    projects: { title: dict.nav.projects, description: dict.projects.subtitle },
    contact: { title: dict.nav.contact, description: dict.contact.subtitle },
  };
  return meta[key];
}

export default async function LocalizedPage({ params }: Params) {
  const { locale, page } = await params;
  if (!isLocale(locale)) notFound();

  const key = pageKeyFromSegment(locale, page);
  if (!key) notFound();

  const dict = getDictionary(locale);

  switch (key) {
    case "about":
      return <AboutContent locale={locale} dict={dict} />;
    case "services":
      return <ServicesContent locale={locale} dict={dict} />;
    case "projects":
      return <ProjectsContent locale={locale} dict={dict} />;
    case "contact":
      return <ContactContent locale={locale} dict={dict} />;
  }
}
