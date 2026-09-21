import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { CallToAction } from "@/components/sections/CallToAction";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <Services locale={locale} dict={dict} />
      <AboutTeaser locale={locale} dict={dict} />
      <Process dict={dict} />
      <CallToAction locale={locale} dict={dict} />
    </>
  );
}
