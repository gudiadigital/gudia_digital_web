import { Fragment } from "react";
import Link from "next/link";
import { Container } from "../Container";
import { Aurora } from "../Aurora";
import { HeroCanvas } from "../HeroCanvas";
import type { Locale } from "@/i18n/config";
import { pathFor } from "@/i18n/routes";
import type { Dictionary } from "@/i18n/dictionaries";

type Segment = { text: string; accent: boolean };

/**
 * Başlık parçalarını kelimelere böler. Bir kelime birden fazla parçadan
 * oluşabilir ("büyütüyoruz" vurgulu + "." vurgusuz), bu yüzden her kelime
 * kendi içinde parça dizisi tutar.
 */
function toWords(segments: readonly Segment[]): Segment[][] {
  const words: Segment[][] = [];
  let current: Segment[] = [];

  for (const segment of segments) {
    for (const piece of segment.text.split(/(\s+)/)) {
      if (!piece) continue;
      if (/^\s+$/.test(piece)) {
        if (current.length) {
          words.push(current);
          current = [];
        }
      } else {
        current.push({ text: piece, accent: segment.accent });
      }
    }
  }
  if (current.length) words.push(current);
  return words;
}

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { hero } = dict;
  const words = toWords(hero.title);
  const afterTitle = 0.2 + words.length * 0.05;

  return (
    <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden pt-14 pb-24 sm:pt-20">
      <Aurora />
      <HeroCanvas />
      <div className="grid-dots" aria-hidden="true" />

      <Container className="relative z-10">
        <p
          className="border-line bg-surface-soft text-muted fade-up inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.18em] backdrop-blur-sm"
          style={{ animationDelay: "0.05s" }}
        >
          <span className="bg-accent inline-block h-1.5 w-1.5 rounded-full" />
          {hero.eyebrow}
        </p>

        <h1 className="mt-7 max-w-5xl text-[2.5rem] font-semibold leading-[1.06] sm:text-6xl lg:text-7xl">
          {words.map((word, index) => (
            <Fragment key={index}>
              {index > 0 && " "}
              <span className="word-mask">
                <span
                  className="word-rise"
                  style={{ animationDelay: `${0.18 + index * 0.05}s` }}
                >
                  {word.map((part, partIndex) =>
                    part.accent ? (
                      <span key={partIndex} className="text-gradient">
                        {part.text}
                      </span>
                    ) : (
                      <span key={partIndex}>{part.text}</span>
                    ),
                  )}
                </span>
              </span>
            </Fragment>
          ))}
        </h1>

        <ul className="text-muted mt-8 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-display text-sm font-medium tracking-wide sm:text-base">
          {hero.pillars.map((pillar, index) => (
            <li
              key={pillar}
              className="fade-up flex items-center gap-3"
              style={{ animationDelay: `${afterTitle + index * 0.07}s` }}
            >
              {index > 0 && (
                <span aria-hidden="true" className="text-accent/50">
                  &bull;
                </span>
              )}
              {pillar}
            </li>
          ))}
        </ul>

        <p
          className="text-muted fade-up mt-7 max-w-2xl text-base leading-relaxed sm:text-lg"
          style={{ animationDelay: `${afterTitle + 0.3}s` }}
        >
          {hero.subtitle}
        </p>

        <div
          className="fade-up mt-9 flex flex-wrap items-center gap-3"
          style={{ animationDelay: `${afterTitle + 0.42}s` }}
        >
          <Link
            href={pathFor(locale, "contact")}
            className="bg-accent rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_38px_-12px_var(--accent)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-12px_var(--accent)]"
          >
            {hero.ctaPrimary}
          </Link>
          <Link
            href={pathFor(locale, "services")}
            className="border-line-strong text-ink hover:bg-surface-soft rounded-full border px-6 py-3.5 text-sm font-semibold backdrop-blur-sm transition-colors"
          >
            {hero.ctaSecondary}
          </Link>
        </div>

        <dl
          className="fade-up border-line mt-16 grid max-w-2xl grid-cols-1 gap-px overflow-hidden rounded-2xl border sm:grid-cols-3"
          style={{ animationDelay: `${afterTitle + 0.54}s` }}
        >
          {hero.stats.map((stat) => (
            <div
              key={stat.label}
              data-spotlight
              className="spotlight bg-surface-soft px-5 py-5 outline outline-1 outline-[var(--line)] backdrop-blur-sm"
            >
              <dt className="font-display text-gradient relative z-10 text-2xl font-semibold">
                {stat.value}
              </dt>
              <dd className="text-muted relative z-10 mt-1 text-sm">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </Container>

      <div
        className="scroll-cue text-muted absolute inset-x-0 bottom-7 z-10 hidden justify-center sm:flex"
        aria-hidden="true"
      >
        <span>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M6 13l6 6 6-6" />
          </svg>
        </span>
      </div>
    </section>
  );
}
