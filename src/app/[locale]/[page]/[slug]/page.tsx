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
import { projects } from "@/data/projects";
import { ServiceDetailContent } from "@/components/pages/ServiceDetailContent";
import { ProjectDetailContent } from "@/components/pages/ProjectDetailContent";

type Params = {
  params: Promise<{ locale: string; page: string; slug: string }>;
};

/**
 * İki tür detay sayfası da buradan üretiliyor:
 *  - hizmet: /tr/hizmetler/mobil-uygulama, /en/services/mobile-apps
 *  - proje:  /tr/projeler/pofu, /en/projects/pofu
 *
 * Hizmet slug'ları dile göre değişiyor, proje slug'ları değişmiyor: proje
 * adları ürün adı, çevrilmiyor.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => [
    ...serviceSlugs.map((slug) => ({
      locale,
      page: pageSegment(locale, "services"),
      slug: serviceSegment(locale, slug),
    })),
    ...projects.map((project) => ({
      locale,
      page: pageSegment(locale, "projects"),
      slug: project.slug,
    })),
  ]);
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, page, slug } = await params;
  if (!isLocale(locale)) return {};
  const key = pageKeyFromSegment(locale, page);

  if (key === "services") {
    const service = serviceFromSegment(locale, slug);
    if (!service) return {};
    const item = getDictionary(locale).services.items[service];
    return { title: item.title, description: item.short };
  }

  if (key === "projects") {
    const project = projects.find((candidate) => candidate.slug === slug);
    if (!project) return {};
    return { title: project.title, description: project.summary[locale] };
  }

  return {};
}

export default async function DetailPage({ params }: Params) {
  const { locale, page, slug } = await params;
  if (!isLocale(locale)) notFound();

  const key = pageKeyFromSegment(locale, page);
  const dict = getDictionary(locale);

  if (key === "services") {
    const service = serviceFromSegment(locale, slug);
    if (!service) notFound();
    return <ServiceDetailContent locale={locale} dict={dict} slug={service} />;
  }

  if (key === "projects") {
    const project = projects.find((candidate) => candidate.slug === slug);
    if (!project) notFound();
    return <ProjectDetailContent locale={locale} dict={dict} project={project} />;
  }

  notFound();
}
