import Link from "next/link";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { ServiceIcon } from "@/components/ServiceIcon";
import { CallToAction } from "@/components/sections/CallToAction";
import { pathFor, projectPath } from "@/i18n/routes";
import { listedProjects, platformOf, type Project } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

/** Puanı "4,5" / "4.5" olarak dile uygun yazar. */
function formatScore(score: number, locale: Locale) {
  return score.toLocaleString(locale === "tr" ? "tr-TR" : "en-GB", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

function formatDate(iso: string, locale: Locale) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(
    locale === "tr" ? "tr-TR" : "en-GB",
    { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" },
  );
}

/**
 * Tek bir projenin detay sayfası: uzun anlatım, mağaza ekran görüntüleri,
 * künye, puan ve dış bağlantılar (App Store, Google Play, Steam, web sitesi).
 *
 * Puan statik olarak tutuluyor çünkü site sunucusuz; bu yüzden hangi tarihte
 * okunduğu da yazılıyor, ziyaretçi güncelliğini bilsin.
 */
export function ProjectDetailContent({
  locale,
  dict,
  project,
}: {
  locale: Locale;
  dict: Dictionary;
  project: Project;
}) {
  const t = dict.projects;
  const platforms = project.links
    .map((link) => platformOf[link.kind])
    .filter((value): value is string => Boolean(value));
  const shots = Array.from({ length: project.shots ?? 0 }, (_, i) => i + 1);
  const others = listedProjects
    .filter((item) => item.slug !== project.slug)
    .slice(0, 4);
  const facts = project.facts?.[locale] ?? [];
  /*
   * Başlık işin türüne göre: uygulama ve oyunlarda görseller mağaza
   * listesinden geliyor, web ve e-ticaret işlerinde sitenin kendisinden.
   */
  const fromStore = project.links.some((link) =>
    ["appstore", "playstore", "steam"].includes(link.kind),
  );
  const screensTitle = fromStore ? t.screensTitle : t.screensTitleSite;

  return (
    <>
      <PageHeader title={project.title} subtitle={project.summary[locale]} />

      <Container className="pb-20">
        <Link
          href={pathFor(locale, "projects")}
          className="text-muted hover:text-ink inline-flex items-center gap-1.5 text-sm transition-colors"
        >
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
          >
            <path d="M13 8H3M7 4L3 8l4 4" />
          </svg>
          {t.backToProjects}
        </Link>

        <div className="mt-10 grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          <div>
            <p className="text-accent font-display text-[0.6875rem] font-semibold uppercase tracking-[0.16em]">
              {dict.services.items[project.service].title}
              {platforms.length > 0 && (
                <span className="text-muted"> · {platforms.join(" + ")}</span>
              )}
            </p>

            <div className="mt-7 space-y-5" data-reveal>
              {(project.detail?.[locale] ?? [project.summary[locale]]).map(
                (paragraph, index) => (
                  <p
                    key={paragraph}
                    className={
                      index === 0
                        ? "max-w-[62ch] text-xl leading-[1.55]"
                        : "text-muted max-w-[65ch] text-base leading-[1.75]"
                    }
                  >
                    {paragraph}
                  </p>
                ),
              )}
            </div>
          </div>

          {/* Künye + puan + bağlantılar: kaydırdıkça yerinde kalan sütun */}
          <aside className="lg:sticky lg:top-28 lg:self-start" data-reveal data-reveal-delay={120}>
            {project.rating && (
              <div className="border-line border-t py-7">
                <p className="text-accent-3 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.2em]">
                  {t.ratingLabel}
                </p>
                <p className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-semibold tabular-nums">
                    {formatScore(project.rating.score, locale)}
                  </span>
                  <span className="text-muted text-sm tabular-nums">
                    / 5 · {project.rating.count} {t.ratingCount}
                  </span>
                </p>
                <p className="text-muted mt-2 text-xs">
                  {formatDate(project.rating.asOf, locale)} {t.ratingAsOf}
                </p>
              </div>
            )}

            {facts.length > 0 && (
              <dl className="border-line border-t py-7">
                <dt className="text-accent-3 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.2em]">
                  {t.factsTitle}
                </dt>
                <dd className="mt-4 grid gap-3">
                  {facts.map((fact) => (
                    <span key={fact.k} className="flex justify-between gap-6 text-sm">
                      <span className="text-muted">{fact.k}</span>
                      <span className="text-ink text-right">{fact.v}</span>
                    </span>
                  ))}
                </dd>
              </dl>
            )}

            {project.links.length > 0 && (
              <div className="border-line border-y py-7">
                <p className="text-accent-3 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.2em]">
                  {t.linksTitle}
                </p>
                <ul className="mt-4 grid gap-2.5">
                  {project.links.map((link) => (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="border-line hover:border-accent hover:text-accent text-ink flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-colors"
                      >
                        {t.linkLabels[link.kind]}
                        <svg
                          viewBox="0 0 16 16"
                          width="14"
                          height="14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          className="shrink-0"
                        >
                          <path d="M6 3h7v7M13 3L4 12" />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </Container>

      {shots.length > 0 && (
        <Container className="pb-24">
          <h2
            className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl"
            data-reveal
          >
            {screensTitle}
          </h2>
          {/*
            Yatay kaydırılan şerit: telefon ekran görüntüleri dikey olduğu
            için ızgaraya dizmek sayfayı gereksiz uzatıyor. Şeritte hepsi
            aynı yükseklikte, yan yana geziliyor.
          */}
          <ul className="shot-rail mt-8" data-reveal data-reveal-delay={90}>
            {shots.map((n) => (
              <li key={n}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/projeler/${project.slug}/ss-${n}.webp`}
                  alt={`${project.title} — ${n}`}
                  loading={n === 1 ? "eager" : "lazy"}
                  decoding="async"
                  className="shot"
                />
              </li>
            ))}
          </ul>
        </Container>
      )}

      <Container className="pb-24">
        <div className="border-line border-t pt-10">
          <h2 className="text-lg font-semibold">{t.otherProjects}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={projectPath(locale, other.slug)}
                className="card group flex items-center gap-3 rounded-xl p-4 transition-colors hover:border-[var(--line-strong)]"
              >
                <ServiceIcon
                  slug={other.service}
                  className="text-accent h-5 w-5 shrink-0"
                />
                <span className="text-sm font-medium">{other.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </Container>

      <CallToAction locale={locale} dict={dict} />
    </>
  );
}
