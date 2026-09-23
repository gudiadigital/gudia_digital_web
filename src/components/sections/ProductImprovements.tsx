import Link from "next/link";
import { improvements } from "@/data/improvements";
import { projectPath } from "@/i18n/routes";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * Dijital ürün iyileştirme hizmetindeki örnekler.
 *
 * Bölüm bilinçli olarak yalnızca metin: bu hizmette gösterilecek bir
 * "önce/sonra" görseli yok, anlatılacak bir iş sırası var. Her ürünün
 * altında aşamalar numaralı olarak, yapıldıkları sırayla yazıyor.
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

      <div className="mt-12 grid gap-14">
        {improvements.map((item, index) => (
          <article key={item.project} data-reveal data-reveal-delay={index * 90}>
            <header className="border-line flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b pb-4">
              <h3 className="font-display text-xl font-semibold sm:text-2xl">
                {item.title}
              </h3>
              <Link
                href={projectPath(locale, item.project)}
                className="text-muted hover:text-accent text-sm transition-colors"
              >
                {copy.projectLink}
              </Link>
              <p className="text-muted w-full text-sm">
                {item.standing[locale]}
              </p>
            </header>

            {/*
              Sıralı liste: aşamalar yapıldıkları sırada okunuyor. Numara
              kendi sütununda, metin 68 karakterlik bir ölçüde kalıyor.
            */}
            <ol className="mt-2 grid">
              {item.stages[locale].map((stage, stageIndex) => (
                <li
                  key={stage.k}
                  className="border-line grid gap-x-6 gap-y-1.5 border-b py-6 sm:grid-cols-[3rem_minmax(0,1fr)]"
                >
                  <span
                    className="text-accent font-display text-sm font-semibold tabular-nums"
                    aria-hidden="true"
                  >
                    {String(stageIndex + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h4 className="font-semibold">{stage.k}</h4>
                    <p className="text-muted mt-2 max-w-[68ch] leading-[1.75]">
                      {stage.v}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </section>
  );
}
