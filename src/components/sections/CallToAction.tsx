import Link from "next/link";
import { Container } from "../Container";
import type { Locale } from "@/i18n/config";
import { pathFor } from "@/i18n/routes";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * Kapanış çağrısı. Ortalanmış degrade kutu değil: sayfanın geri kalanıyla
 * aynı dilde, soldan hizalı, üstünde tek bir çizgi. Kutu hem her şablonda
 * görülen bir kalıptı hem de sayfanın akışını kesiyordu.
 */
export function CallToAction({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="pb-24 sm:pb-28">
      <Container>
        <div className="border-line border-t pt-12" data-reveal>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-16">
            <h2 className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
              {dict.cta.title}
            </h2>
            <div>
              <p className="text-muted max-w-[56ch] text-base leading-[1.7]">
                {dict.cta.subtitle}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link
                  href={pathFor(locale, "contact")}
                  className="bg-accent rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                >
                  {dict.cta.button}
                </Link>
                <a
                  href={`mailto:${dict.contact.email}`}
                  className="mail-link text-sm font-medium"
                >
                  {dict.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
