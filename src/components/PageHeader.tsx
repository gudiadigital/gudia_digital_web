import { Container } from "./Container";

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
    <section className="relative isolate overflow-hidden pt-14 pb-10 sm:pt-20 sm:pb-14">
      <div className="nebula" aria-hidden="true" />
      <Container className="relative z-10">
        <p className="text-accent mb-3 font-display text-xs font-semibold uppercase tracking-[0.18em]">
          {eyebrow}
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-[1.12] sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="text-muted mt-5 max-w-2xl text-base leading-relaxed sm:text-lg">
            {subtitle}
          </p>
        )}
      </Container>
    </section>
  );
}
