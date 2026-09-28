import { Container } from "./Container";
import { Aurora } from "./Aurora";
import { Breadcrumbs } from "./Breadcrumbs";
import type { Locale } from "@/i18n/config";
import type { PageTarget } from "@/i18n/seo";

/**
 * Alt sayfaların açılışı. Başlığın üstünde içerik haritası duruyor
 * (`breadcrumb`); sayfanın nerede olduğunu o söylüyor.
 *
 * Eskiden hizmet sayfalarında burada üst kategori ("Hizmetler") yazan bir
 * etiket vardı. İçerik haritası aynı adı hemen üstünde söylediği için
 * kaldırıldı; Hakkımızda ve İletişim'de de menü etiketini tekrarlamasın
 * diye zaten kullanılmıyordu.
 */
export function PageHeader({
  breadcrumb,
  title,
  subtitle,
}: {
  breadcrumb?: { locale: Locale; target: PageTarget };
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-28 pb-10 sm:pt-36 sm:pb-14">
      <Aurora />
      <Container className="relative z-10">
        {breadcrumb && <Breadcrumbs {...breadcrumb} />}
        <h1
          className="fade-up max-w-4xl text-[clamp(2.5rem,6vw,4.25rem)] font-semibold leading-[1.04] tracking-[-0.035em]"
          style={{ animationDelay: "0.08s" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="text-muted fade-up mt-6 max-w-[60ch] text-base leading-relaxed sm:text-lg"
            style={{ animationDelay: "0.18s" }}
          >
            {subtitle}
          </p>
        )}
      </Container>
    </section>
  );
}
