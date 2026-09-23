import Link from "next/link";
import { webSites } from "@/data/webSites";
import { projectPath } from "@/i18n/routes";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

/*
 * İlk kart iki sütun genişliğinde; geri kalanlar ikişerli sıralara diziliyor.
 * Kalanların sayısı tekse son kart yalnız kalıp yanında boş hücre bırakıyor,
 * o yüzden o da genişletiliyor.
 */
function isWide(index: number, total: number) {
  if (index === 0) return true;
  return index === total - 1 && (total - 1) % 2 === 1;
}

/**
 * Yayında olan tanıtım sitelerinin vitrini.
 *
 * Proje kartlarından ayrı duruyor: orada anlatılan uygulama, burada o
 * uygulama için kurduğumuz site.
 */
export function WebShowcase({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const copy = dict.webShowcase;

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

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {webSites.map((site, index) => {
          const wide = isWide(index, webSites.length);
          const host = site.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
          return (
            <article
              key={site.slug}
              data-spotlight
              data-reveal
              data-reveal-delay={(index % 3) * 90}
              className={`card spotlight tilt group relative flex h-full flex-col overflow-hidden rounded-2xl transition-colors duration-300 hover:border-[var(--line-strong)] ${
                wide ? "sm:col-span-2" : ""
              }`}
            >
              {/* Tarayıcı penceresi: üstte adres çubuğu, altında sitenin
                  ana ekranı. İmleç kartın üstündeyken görüntü yavaşça
                  kayıp sayfanın devamını gösteriyor. */}
              <div className="relative z-10">
                <div className="browser-frame" aria-hidden="true">
                  <span className="browser-dot" />
                  <span className="browser-dot" />
                  <span className="browser-dot" />
                  <span className="browser-url">{host}</span>
                </div>
                <div className={`site-window ${wide ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/web/${site.image}`}
                    alt={`${site.title} sitesinin ana ekranı`}
                    loading={wide ? "eager" : "lazy"}
                    decoding="async"
                    width={1200}
                    height={750}
                  />
                </div>
              </div>

              <div className="relative z-10 flex flex-1 flex-col p-6">
                <h3 className={`font-semibold ${wide ? "text-xl sm:text-2xl" : "text-lg"}`}>
                  {/*
                    Kartın tamamı canlı siteye gidiyor. Proje sayfası ikinci
                    bir bağlantı olarak altta duruyor; iç içe geçmiyorlar.
                  */}
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="stretched-link group-hover:text-accent transition-colors"
                  >
                    {site.title}
                  </a>
                </h3>

                <p
                  className={`text-muted mt-2.5 flex-1 leading-relaxed ${
                    wide ? "max-w-2xl text-sm sm:text-base" : "text-sm"
                  }`}
                >
                  {site.summary[locale]}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {site.tags[locale].map((tag) => (
                    <span
                      key={tag}
                      className="border-line text-muted rounded-full border px-3 py-1.5 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="relative z-20 mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold">
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-accent inline-flex items-center gap-1.5"
                  >
                    {copy.visit}
                    <svg
                      viewBox="0 0 16 16"
                      width="12"
                      height="12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
                    </svg>
                  </a>
                  {site.project && (
                    <Link
                      href={projectPath(locale, site.project)}
                      className="text-muted hover:text-ink transition-colors"
                    >
                      {copy.project}
                    </Link>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
