import Link from "next/link";
import { Container, SectionHeading } from "../Container";
import { ServiceIcon } from "../ServiceIcon";
import { serviceSlugs, groupOfService, type Locale } from "@/i18n/config";
import { pathFor } from "@/i18n/routes";
import type { Dictionary } from "@/i18n/dictionaries";

export function Services({
  locale,
  dict,
  showHeading = true,
}: {
  locale: Locale;
  dict: Dictionary;
  showHeading?: boolean;
}) {
  return (
    <section id="hizmetler" className="scroll-mt-24 py-20 sm:py-24">
      <Container>
        {showHeading && (
          <SectionHeading
            eyebrow={dict.services.eyebrow}
            title={dict.services.title}
            subtitle={dict.services.subtitle}
          />
        )}

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {serviceSlugs.map((slug, index) => {
            const service = dict.services.items[slug];
            return (
              <Link
                key={slug}
                href={pathFor(locale, "services", slug)}
                data-reveal
                data-reveal-delay={(index % 3) * 100}
                data-spotlight
                className="card spotlight group relative flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)]"
              >
                <span className="border-line bg-surface-soft text-accent relative z-10 mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border transition-colors group-hover:border-[var(--accent)]">
                  <ServiceIcon slug={slug} className="h-5 w-5" />
                </span>

                <span className="text-muted font-display relative z-10 mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.16em]">
                  {dict.services.groupLabels[groupOfService[slug]]}
                </span>
                <h3 className="relative z-10 text-lg font-semibold">{service.title}</h3>
                <p className="text-muted relative z-10 mt-2.5 flex-1 text-sm leading-relaxed">
                  {service.short}
                </p>

                <span className="text-accent relative z-10 mt-5 inline-flex items-center gap-1.5 text-sm font-medium">
                  {dict.services.detailLink}
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
                    className="transition-transform group-hover:translate-x-1"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
