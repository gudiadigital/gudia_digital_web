import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { PageHeader } from "@/components/PageHeader";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { CallToAction } from "@/components/sections/CallToAction";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.nav.services, description: dict.services.subtitle };
}

export default async function ServicesPage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <PageHeader
        eyebrow={dict.services.eyebrow}
        title={dict.services.title}
        subtitle={dict.services.subtitle}
      />
      <Services locale={locale} dict={dict} showHeading={false} />
      <Process dict={dict} />
      <CallToAction locale={locale} dict={dict} />
    </>
  );
}
