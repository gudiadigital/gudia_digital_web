import Link from "next/link";
import { formatDate } from "@/i18n/config";
import { guidePath } from "@/i18n/routes";
import { publishedGuides } from "@/data/guides";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { CallToAction } from "@/components/sections/CallToAction";
import type { PageContentProps } from "./types";

/**
 * Rehber dizini: yayındaki rehberler, en yenisi önde. Yalnızca en az bir
 * rehber yayındayken üretiliyor ([page]/page.tsx); boş hâli yok.
 */
export function GuidesContent({ locale, dict }: PageContentProps) {
  const t = dict.guides;
  const authorName = (id: string) =>
    dict.about.founders.find((founder) => founder.id === id)?.name ?? "";

  return (
    <>
      <PageHeader
        breadcrumb={{ locale, target: { kind: "page", key: "guides" } }}
        title={t.title}
        subtitle={t.subtitle}
      />

      <Container className="pb-8">
        <ul className="border-line border-t">
          {publishedGuides.map((guide) => (
            <li key={guide.id} className="border-line border-b py-8">
              <h2 className="max-w-[40ch] text-xl font-semibold leading-snug tracking-[-0.02em] sm:text-2xl">
                <Link
                  href={guidePath(locale, guide.slug[locale])}
                  className="hover:text-accent transition-colors"
                >
                  {guide.title[locale]}
                </Link>
              </h2>
              <p className="text-muted mt-3 max-w-[65ch] leading-[1.7]">
                {guide.description[locale]}
              </p>
              <p className="text-muted mt-4 text-sm">
                {authorName(guide.author)} ·{" "}
                <time dateTime={guide.updatedAt}>
                  {t.updated}: {formatDate(guide.updatedAt, locale)}
                </time>
              </p>
            </li>
          ))}
        </ul>
      </Container>

      <CallToAction locale={locale} dict={dict} />
    </>
  );
}
