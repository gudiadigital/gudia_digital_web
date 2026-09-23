import Link from "next/link";
import { improvements } from "@/data/improvements";
import { projectPath } from "@/i18n/routes";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * Dijital ürün iyileştirme hizmetindeki örnekler.
 *
 * Proje kartı değil, bilinçli olarak farklı görünüyor: kart bir işi
 * tanıtır, burada anlatılan ise o iş üzerinde yapılan iyileştirme.
 * Solda ürünün kimliği ve ölçülebilir durumu, sağda yapılan işin dökümü.
 */
export function ProductImprovements({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const copy = dict.improvements;

  return (
    <section className="border-line mt-20 border-t pt-12">
      <div className="max-w-2xl" data-reveal>
        <p className="text-accent font-display mb-3 text-xs font-semibold uppercase tracking-[0.18em]">
          {copy.eyebrow}
        </p>
        <h2 className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
          {copy.title}
        </h2>
        <p className="text-muted mt-4 leading-relaxed">{copy.subtitle}</p>
      </div>

      <div className="mt-10 grid gap-px overflow-hidden">
        {improvements.map((item, index) => (
          <article
            key={item.project}
            className="border-line grid gap-8 border-t py-10 lg:grid-cols-[minmax(0,17rem)_1fr] lg:gap-14"
            data-reveal
            data-reveal-delay={index * 100}
          >
            {/* Kimlik ve ölçülebilir durum */}
            <div>
              <div className="flex items-center gap-3.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/projeler/${item.icon}`}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  width={112}
                  height={112}
                  className="improve-icon"
                />
                <div>
                  <h3 className="font-display text-lg font-semibold">
                    {item.title}
                  </h3>
                  <Link
                    href={projectPath(locale, item.project)}
                    className="text-muted hover:text-accent text-sm transition-colors"
                  >
                    {copy.projectLink}
                  </Link>
                </div>
              </div>

              <dl className="border-line mt-6 grid gap-2.5 border-t pt-5">
                {item.metrics[locale].map((metric) => (
                  <div
                    key={metric.k}
                    className="flex items-baseline justify-between gap-4 text-sm"
                  >
                    <dt className="text-muted">{metric.k}</dt>
                    <dd className="text-ink tabular-nums">{metric.v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Yapılan iş */}
            <ul className="grid gap-4">
              {item.items[locale].map((line) => (
                <li key={line} className="flex gap-3.5">
                  <svg
                    viewBox="0 0 16 16"
                    width="17"
                    height="17"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="mt-1 shrink-0"
                  >
                    <path d="M3 8.5l3.2 3.2L13 5" />
                  </svg>
                  <span className="text-muted max-w-[62ch] leading-[1.7]">
                    {line}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
