import { Container } from "./Container";
import { Aurora } from "./Aurora";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-28 pb-10 sm:pt-36 sm:pb-14">
      <Aurora />
      <div className="grid-dots" aria-hidden="true" />
      <Container className="relative z-10" >
        <p className="text-accent fade-up mb-3 font-display text-xs font-semibold uppercase tracking-[0.18em]">
          {eyebrow}
        </p>
        <h1
          className="fade-up max-w-3xl text-4xl font-semibold leading-[1.12] sm:text-5xl"
          style={{ animationDelay: "0.08s" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="text-muted fade-up mt-5 max-w-2xl text-base leading-relaxed sm:text-lg"
            style={{ animationDelay: "0.18s" }}
          >
            {subtitle}
          </p>
        )}
      </Container>
    </section>
  );
}
