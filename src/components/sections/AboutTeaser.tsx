import Link from "next/link";
import { Container } from "../Container";
import type { Locale } from "@/i18n/config";
import { pathFor } from "@/i18n/routes";
import type { Dictionary } from "@/i18n/dictionaries";

export function AboutTeaser({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div data-reveal>
            <p className="text-accent mb-3 font-display text-xs font-semibold uppercase tracking-[0.18em]">
              {dict.about.eyebrow}
            </p>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              {dict.about.title}
            </h2>
            <p className="text-muted mt-5 text-base leading-relaxed sm:text-lg">
              {dict.about.lead}
            </p>
            <p className="text-muted mt-4 text-base leading-relaxed">
              {dict.about.story[1]}
            </p>
            <Link
              href={pathFor(locale, "about")}
              className="text-accent mt-7 inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-80"
            >
              {dict.nav.about}
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {dict.about.values.map((value, index) => (
              <div
                key={value.title}
                data-reveal
                data-reveal-delay={index * 90}
                className="card rounded-2xl p-5"
              >
                <h3 className="text-sm font-semibold">{value.title}</h3>
                <p className="text-muted mt-2 text-sm leading-relaxed">
                  {value.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
