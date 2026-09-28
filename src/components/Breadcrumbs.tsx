import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { breadcrumbTrail } from "@/i18n/schema";
import type { PageTarget } from "@/i18n/seo";

/**
 * Sayfanın üstündeki içerik haritası: Ana Sayfa › Hizmetler › Mobil
 * Uygulama Geliştirme.
 *
 * Adlar ve adresler yapılandırılmış verideki BreadcrumbList ile aynı
 * fonksiyondan (breadcrumbTrail) geliyor; görünen yol ile arama motoruna
 * söylenen yol ayrışamıyor. Son eleman bulunulan sayfa, bağlantı değil.
 */
export function Breadcrumbs({
  locale,
  target,
}: {
  locale: Locale;
  target: PageTarget;
}) {
  const trail = breadcrumbTrail(locale, target);
  const label = getDictionary(locale).common.breadcrumb;

  return (
    <nav aria-label={label} className="fade-up mb-5">
      <ol className="text-muted flex flex-wrap items-center gap-x-2 text-xs sm:text-sm">
        {trail.map((crumb, index) => {
          const last = index === trail.length - 1;
          return (
            <li key={crumb.path} className="flex min-w-0 items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-ink/80 py-1">
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link
                    href={crumb.path}
                    className="hover:text-ink py-1 transition-colors"
                  >
                    {crumb.name}
                  </Link>
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
                    className="shrink-0 opacity-60"
                  >
                    <path d="M6 3.5 10.5 8 6 12.5" />
                  </svg>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
