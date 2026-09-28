import Link from "next/link";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { ServiceIcon } from "@/components/ServiceIcon";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { CallToAction } from "@/components/sections/CallToAction";
import { serviceGroups, servicesByGroup } from "@/i18n/config";
import { pathFor } from "@/i18n/routes";
import type { PageContentProps } from "./types";

export function ServicesContent({ locale, dict }: PageContentProps) {
  return (
    <>
      <PageHeader
        eyebrow={dict.services.eyebrow}
        title={dict.services.title}
        subtitle={dict.services.subtitle}
      />

      {/* Kartlardan önce seçim: çalışma modelinin üç adımı (kur, iyileştir,
          büyüt) ve her adımın hizmetleri. Ziyaretçi hizmet adını bilmese de
          kendi durumundan yola çıkıp doğru sayfaya gidebiliyor. */}
      <section className="pt-6 sm:pt-10">
        <Container>
          <div className="max-w-2xl" data-reveal>
            <h2 className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
              {dict.services.chooserTitle}
            </h2>
            <p className="text-muted mt-4 text-base leading-relaxed sm:text-lg">
              {dict.approach.subtitle}
            </p>
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
            {serviceGroups.map((group, index) => {
              const content = dict.approach.groups[group];
              return (
                <div
                  key={group}
                  className="border-line flex flex-col border-t pt-6"
                  data-reveal
                  data-reveal-delay={index * 90}
                >
                  <p className="text-accent font-display text-xs font-semibold uppercase tracking-[0.18em]">
                    {content.label}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold">{content.title}</h3>
                  <p className="text-muted mt-3 flex-1 text-sm leading-relaxed sm:text-base">
                    {content.text}
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {servicesByGroup[group].map((slug) => (
                      <li key={slug}>
                        <Link
                          href={pathFor(locale, "services", slug)}
                          className="group hover:text-accent inline-flex items-start gap-2.5 text-sm font-medium transition-colors"
                        >
                          <ServiceIcon slug={slug} className="text-accent mt-0.5 h-4 w-4 shrink-0" />
                          <span>{dict.services.items[slug].title}</span>
                          <svg
                            viewBox="0 0 16 16"
                            width="14"
                            height="14"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            className="mt-0.5 shrink-0 transition-transform group-hover:translate-x-1"
                          >
                            <path d="M3 8h10M9 4l4 4-4 4" />
                          </svg>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <Services locale={locale} dict={dict} showHeading={false} />
      <Process dict={dict} />
      <CallToAction locale={locale} dict={dict} />
    </>
  );
}
