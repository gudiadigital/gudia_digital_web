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
  long = false,
}: {
  breadcrumb?: { locale: Locale; target: PageTarget };
  title: string;
  subtitle?: string;
  /**
   * Cümle uzunluğunda başlık (rehber yazısı): daha küçük yazılıyor.
   * Varsayılan boyutta telefonda ilk ekranın tamamını kaplıyordu.
   */
  long?: boolean;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-28 pb-10 sm:pt-36 sm:pb-14">
      <Aurora />
      <Container className="relative z-10">
        {breadcrumb && <Breadcrumbs {...breadcrumb} />}
        <h1
          className={`fade-up max-w-4xl font-semibold ${
            long
              ? "text-[clamp(1.875rem,4.4vw,3.25rem)] leading-[1.1] tracking-[-0.03em]"
              : "text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.04] tracking-[-0.035em]"
          }`}
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
