import { PageHeader } from "@/components/PageHeader";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { CallToAction } from "@/components/sections/CallToAction";
import type { PageContentProps } from "./types";

export function ServicesContent({ locale, dict }: PageContentProps) {

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