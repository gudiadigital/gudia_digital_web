import { Container } from "./Container";
import { Aurora } from "./Aurora";

/**
 * Alt sayfaların açılışı. `eyebrow` isteğe bağlı: hizmet detayında üst
 * kategoriyi ("Hizmetler") söylediği için bilgi taşıyor, Hakkımızda ve
 * İletişim'de ise başlığın hemen üstünde menüde tıklanan etiketi
 * tekrarladığı için kullanılmıyor.
 */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-28 pb-10 sm:pt-36 sm:pb-14">
      <Aurora />
      <div className="grid-dots" aria-hidden="true" />
      <Container className="relative z-10">
        {eyebrow && (
          <p className="text-accent fade-up mb-3 font-display text-xs font-semibold uppercase tracking-[0.18em]">
            {eyebrow}
          </p>
        )}
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
