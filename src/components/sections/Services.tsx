import Link from "next/link";
import { Container, SectionHeading } from "../Container";
import { ServiceIcon } from "../ServiceIcon";
import {
  serviceSlugs,
  groupOfService,
  type ServiceSlug,
  type Locale,
} from "@/i18n/config";
import { pathFor } from "@/i18n/routes";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * Kart genişlikleri kasıtlı olarak eşit değil. Üç eşit sütunluk ızgara
 * düzeni tanıdık ama karaktersiz; her satırda bir kart geniş olunca göz
 * bir ritim yakalıyor ve geniş kartlarda teslim edilenleri de gösterecek
 * yer kalıyor.
 *
 * Satır toplamları üçe tamamlanıyor: 2+1 / 1+2 / 1+2
 */
const span: Record<ServiceSlug, 1 | 2> = {
  "mobil-uygulama": 2,
  "web-sitesi": 1,
  "markali-oyunlar": 1,
  "dijital-urun-iyilestirme": 2,
  "sosyal-medya-icerik": 1,
  "e-ticaret-optimizasyonu": 2,
};

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
        {showHeading ? (
          <SectionHeading
            eyebrow={dict.services.eyebrow}
            title={dict.services.title}
            subtitle={dict.services.subtitle}
          />
        ) : (
          /* Hizmetler sayfasında görünen başlık sayfanın h1'i; kartlar h3.
             Arada h2 olmazsa ekran okuyucu başlık ağacında seviye atlıyor. */
          <h2 className="sr-only">{dict.nav.services}</h2>
        )}

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {serviceSlugs.map((slug, index) => {
            const service = dict.services.items[slug];
            const wide = span[slug] === 2;

            return (
              <Link
                key={slug}
                href={pathFor(locale, "services", slug)}
                data-reveal
                data-reveal-delay={(index % 3) * 90}
                data-spotlight
                className={`card spotlight group relative flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)] active:translate-y-0 ${
                  wide ? "lg:col-span-2 lg:p-8" : ""
                }`}
              >
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <span className="border-line bg-surface-soft text-accent inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors group-hover:border-[var(--accent)]">
                    <ServiceIcon slug={slug} className="h-5 w-5" />
                  </span>
                  <span className="text-muted font-display text-[0.6875rem] font-semibold uppercase tracking-[0.16em]">
                    {dict.services.groupLabels[groupOfService[slug]]}
                  </span>
                </div>

                <h3
                  className={`relative z-10 mt-5 font-semibold ${
                    wide ? "text-xl lg:text-2xl" : "text-lg"
                  }`}
                >
                  {service.title}
                </h3>

                <p
                  className={`text-muted relative z-10 mt-2.5 flex-1 leading-relaxed ${
                    wide ? "max-w-xl text-sm lg:text-base" : "text-sm"
                  }`}
                >
                  {service.short}
                </p>

                {/* Geniş kartlarda teslim edilenler de görünüyor */}
                {wide && (
                  <ul className="border-line relative z-10 mt-6 hidden gap-x-6 gap-y-2 border-t pt-5 lg:grid lg:grid-cols-2">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="text-muted flex items-start gap-2 text-sm"
                      >
                        <span
                          aria-hidden="true"
                          className="bg-accent/60 mt-2 h-1 w-1 shrink-0 rounded-full"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

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
