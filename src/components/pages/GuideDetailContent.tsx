import { Fragment } from "react";
import Link from "next/link";
import { formatDate, type Locale } from "@/i18n/config";
import { pathFor, projectPath } from "@/i18n/routes";
import { projects } from "@/data/projects";
import type { Guide } from "@/data/guides";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { ServiceIcon } from "@/components/ServiceIcon";
import { CallToAction } from "@/components/sections/CallToAction";
import type { PageContentProps } from "./types";

type GuideDetailProps = PageContentProps & { guide: Guide };

function Separator() {
  return <span className="mx-2 opacity-60"> · </span>;
}

function DateLine({
  label,
  iso,
  locale,
}: {
  label: string;
  iso: string;
  locale: Locale;
}) {
  return (
    <span>
      {label}: <time dateTime={iso}>{formatDate(iso, locale)}</time>
    </span>
  );
}

/**
 * Tek bir rehber: imza ve tarihler, soru biçimli başlıklar, her başlığın
 * altında önce kısa cevap sonra ayrıntı, en sonda kaynaklar, ilgili hizmet
 * ve projeler.
 *
 * Başlıklar ve cevaplar sunucuda basılı, açılış hareketi yok: arama ve
 * yapay zekâ araçlarının alıntıladığı yer burası, hiçbir koşulda gizli
 * başlamamalı. Yapılandırılmış verideki Article da aynı alanlardan
 * okunuyor (schema.ts).
 */
export function GuideDetailContent({ locale, dict, guide }: GuideDetailProps) {
  const t = dict.guides;
  const author = dict.about.founders.find((founder) => founder.id === guide.author);
  if (!author) throw new Error(`Rehber yazarı Hakkımızda'da yok: "${guide.author}"`);
  const service = dict.services.items[guide.service];
  const related = (guide.relatedProjects ?? []).map((slug) => {
    const project = projects.find((candidate) => candidate.slug === slug);
    if (!project) throw new Error(`Rehberde bilinmeyen proje: "${slug}"`);
    return project;
  });

  return (
    <>
      <PageHeader
        breadcrumb={{ locale, target: { kind: "guide", guide } }}
        title={guide.title[locale]}
        subtitle={guide.description[locale]}
        long
      />

      <Container>
        <Link
          href={pathFor(locale, "guides")}
          className="text-muted hover:text-ink inline-flex items-center gap-1.5 text-sm transition-colors"
        >
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M13 8H3M7 4L3 8l4 4" />
          </svg>
          {t.backToGuides}
        </Link>

        {/* İmza Hakkımızda'daki kurucu kartına gidiyor (aynı çapa,
            yapılandırılmış verideki kişi adresi). Ayraçlar metnin içinde:
            etiketleri atan okuyucularda ad ile tarih birbirine yapışmasın. */}
        <p className="border-line text-muted mt-8 border-y py-5 text-sm leading-relaxed">
          {t.byline}:{" "}
          <Link
            href={`${pathFor(locale, "about")}/#${author.id}`}
            className="text-ink/80 hover:text-accent underline underline-offset-2 transition-colors"
          >
            {author.name}
          </Link>
          <Separator />
          <DateLine label={t.published} iso={guide.publishedAt} locale={locale} />
          <Separator />
          <DateLine label={t.updated} iso={guide.updatedAt} locale={locale} />
        </p>

        <article className="mt-4 max-w-[68ch]">
          {guide.sections[locale].map((section) => (
            <section key={section.h2} className="border-line border-b py-10">
              <h2 className="text-2xl font-semibold leading-snug tracking-[-0.025em]">
                {section.h2}
              </h2>
              <p className="mt-5 text-lg leading-[1.6]">{section.answer}</p>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="text-muted mt-5 leading-[1.75]">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </article>

        <div className="mt-12 grid max-w-[68ch] gap-10">
          {guide.sources.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold">{t.sourcesTitle}</h2>
              <ul className="mt-4 space-y-2.5">
                {guide.sources.map((source) => (
                  <li key={source.url} className="text-sm leading-relaxed">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-ink/80 hover:text-ink underline underline-offset-2 transition-colors"
                    >
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <h2 className="text-lg font-semibold">{t.serviceLabel}</h2>
            <Link
              href={pathFor(locale, "services", guide.service)}
              className="card group mt-4 flex items-center gap-3 rounded-xl p-4 transition-colors hover:border-[var(--line-strong)]"
            >
              <ServiceIcon slug={guide.service} className="text-accent h-5 w-5 shrink-0" />
              <span className="text-sm font-medium">{service.title}</span>
            </Link>
          </section>

          {related.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold">{t.projectsLabel}</h2>
              <p className="text-muted mt-4 text-sm leading-relaxed">
                {related.map((project, index) => (
                  <Fragment key={project.slug}>
                    {index > 0 && " · "}
                    <Link
                      href={projectPath(locale, project.slug)}
                      className="text-ink/70 hover:text-accent underline underline-offset-2 transition-colors"
                    >
                      {project.title}
                    </Link>
                  </Fragment>
                ))}
              </p>
            </section>
          )}
        </div>
      </Container>

      <div className="mt-16">
        <CallToAction locale={locale} dict={dict} />
      </div>
    </>
  );
}
