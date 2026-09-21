import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  isLocale,
  locales,
  serviceSlugs,
  type ServiceSlug,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pathFor } from "@/i18n/routes";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { ServiceIcon } from "@/components/ServiceIcon";
import { CallToAction } from "@/components/sections/CallToAction";

type Params = { params: Promise<{ locale: string; slug: string }> };

function isServiceSlug(value: string): value is ServiceSlug {
  return (serviceSlugs as readonly string[]).includes(value);
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    serviceSlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isServiceSlug(slug)) return {};
  const service = getDictionary(locale).services.items[slug];
  return { title: service.title, description: service.short };
}

export default async function ServiceDetailPage({ params }: Params) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isServiceSlug(slug)) notFound();

  const dict = getDictionary(locale);
  const service = dict.services.items[slug];
  const others = serviceSlugs.filter((candidate) => candidate !== slug);

  return (
    <>
      <PageHeader
        eyebrow={dict.services.eyebrow}
        title={service.title}
        subtitle={service.short}
      />

      <Container>
        <Link
          href={pathFor(locale, "services")}
          className="text-muted hover:text-ink inline-flex items-center gap-1.5 text-sm transition-colors"
        >
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M13 8H3M7 4L3 8l4 4" />
          </svg>
          {dict.common.backToServices}
        </Link>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <span className="border-line bg-surface-soft text-accent mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border">
              <ServiceIcon slug={slug} className="h-6 w-6" />
            </span>

            <p className="text-base leading-relaxed sm:text-lg">{service.intro}</p>

            <h2 className="mt-12 text-xl font-semibold">{dict.common.whatWeDo}</h2>
            <ul className="mt-5 space-y-3">
              {service.features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <svg
                    viewBox="0 0 16 16"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="mt-0.5 shrink-0"
                  >
                    <path d="M3 8.5l3.2 3.2L13 5" />
                  </svg>
                  <span className="text-muted text-sm leading-relaxed sm:text-base">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card rounded-2xl p-7">
              <h2 className="text-accent font-display text-xs font-semibold uppercase tracking-[0.18em]">
                {dict.common.whatYouGet}
              </h2>
              <ul className="mt-5 space-y-4">
                {service.deliverables.map((item) => (
                  <li key={item} className="text-sm leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={pathFor(locale, "contact")}
                className="bg-accent mt-7 block rounded-full px-5 py-3 text-center text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                {dict.cta.button}
              </Link>
            </div>
          </aside>
        </div>

        <div className="border-line mt-20 border-t pt-10">
          <h2 className="text-lg font-semibold">{dict.services.allLink}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((other) => (
              <Link
                key={other}
                href={pathFor(locale, "services", other)}
                className="card group flex items-center gap-3 rounded-xl p-4 transition-colors hover:border-[var(--line-strong)]"
              >
                <ServiceIcon slug={other} className="text-accent h-5 w-5 shrink-0" />
                <span className="text-sm font-medium">
                  {dict.services.items[other].title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Container>

      <CallToAction locale={locale} dict={dict} />
    </>
  );
}
