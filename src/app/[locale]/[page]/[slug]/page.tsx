import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, serviceSlugs, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  pageSegment,
  pageKeyFromSegment,
  serviceSegment,
  serviceFromSegment,
} from "@/i18n/routes";
import { ServiceDetailContent } from "@/components/pages/ServiceDetailContent";

type Params = {
  params: Promise<{ locale: string; page: string; slug: string }>;
};

/** Hizmet detay sayfaları: /tr/hizmetler/mobil-uygulama, /en/services/mobile-app */
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    serviceSlugs.map((slug) => ({
      locale,
      page: pageSegment(locale, "services"),
      slug: serviceSegment(locale, slug),
    })),
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, page, slug } = await params;
  if (!isLocale(locale) || pageKeyFromSegment(locale, page) !== "services") {
    return {};
  }
  const service = serviceFromSegment(locale, slug);
  if (!service) return {};

  const item = getDictionary(locale).services.items[service];
  return { title: item.title, description: item.short };
}

export default async function ServiceDetailPage({ params }: Params) {
  const { locale, page, slug } = await params;
  if (!isLocale(locale)) notFound();
  if (pageKeyFromSegment(locale, page) !== "services") notFound();

  const service = serviceFromSegment(locale, slug);
  if (!service) notFound();

  return (
    <ServiceDetailContent
      locale={locale}
      dict={getDictionary(locale)}
      slug={service}
    />
  );
}
