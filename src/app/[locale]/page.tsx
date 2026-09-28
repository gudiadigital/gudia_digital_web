import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary, serviceTitles } from "@/i18n/dictionaries";
import { pageSchema } from "@/i18n/schema";
import { JsonLd } from "@/components/JsonLd";
import { Marquee } from "@/components/sections/Marquee";
import { ScrollStory } from "@/components/sections/ScrollStory";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { AboutStudio } from "@/components/sections/AboutStudio";
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
      <JsonLd data={pageSchema(locale, { kind: "page", key: "home" })} />
      <ScrollStory
        locale={locale}
        hero={dict.hero}
        approach={dict.approach}
        story={dict.story}
        serviceTitles={serviceTitles(dict)}
      />
      <Marquee locale={locale} dict={dict} />
      <Services locale={locale} dict={dict} />
      <FeaturedProjects locale={locale} dict={dict} />
      <Process dict={dict} />
      <AboutStudio locale={locale} dict={dict} />
      <CallToAction locale={locale} dict={dict} />
    </>
  );
}
