import Link from "next/link";
import { Container } from "../Container";
import type { Locale } from "@/i18n/config";
import { pathFor } from "@/i18n/routes";
import type { Dictionary } from "@/i18n/dictionaries";

export function Hero({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const { hero } = dict;

  return (
    <section className="relative isolate overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div className="nebula" aria-hidden="true" />

      <Container className="relative z-10">
        <p className="border-line bg-surface-soft text-muted inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium">
          <span className="bg-accent inline-block h-1.5 w-1.5 rounded-full" />
          {hero.eyebrow}
        </p>

        <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
          {hero.title.map((part, index) =>
            part.accent ? (
              <span key={index} className="text-gradient">
                {part.text}
              </span>
            ) : (
              <span key={index}>{part.text}</span>
            ),
          )}
        </h1>

        <ul className="text-muted mt-7 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-display text-sm font-medium tracking-wide sm:text-base">
          {hero.pillars.map((pillar, index) => (
            <li key={pillar} className="flex items-center gap-3">
              {index > 0 && (
                <span aria-hidden="true" className="text-accent/50">
                  &bull;
                </span>
              )}
              {pillar}
            </li>
          ))}
        </ul>

        <p className="text-muted mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
          {hero.subtitle}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link
            href={pathFor(locale, "contact")}
            className="bg-accent rounded-full px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_32px_-12px_var(--accent)] transition-transform hover:-translate-y-0.5"
          >
            {hero.ctaPrimary}
          </Link>
          <Link
            href={pathFor(locale, "services")}
            className="border-line-strong text-ink hover:bg-surface-soft rounded-full border px-6 py-3 text-sm font-semibold transition-colors"
          >
            {hero.ctaSecondary}
          </Link>
        </div>

        <dl className="border-line mt-14 grid max-w-2xl grid-cols-1 gap-px overflow-hidden rounded-2xl border sm:grid-cols-3">
          {hero.stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-surface-soft px-5 py-5 outline outline-1 outline-[var(--line)]"
            >
              <dt className="font-display text-gradient text-2xl font-semibold">
                {stat.value}
              </dt>
              <dd className="text-muted mt-1 text-sm">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
