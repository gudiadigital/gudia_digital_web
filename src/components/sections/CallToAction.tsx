import Link from "next/link";
import { Container } from "../Container";
import type { Locale } from "@/i18n/config";
import { pathFor } from "@/i18n/routes";
import type { Dictionary } from "@/i18n/dictionaries";

export function CallToAction({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div
          data-reveal
          className="card glow-ring relative isolate overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-14"
        >
          <div className="nebula" aria-hidden="true" />
          <div className="relative z-10">
            <h2 className="text-2xl font-semibold sm:text-3xl">
              {dict.cta.title}
            </h2>
            <p className="text-muted mx-auto mt-4 max-w-xl text-base leading-relaxed">
              {dict.cta.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={pathFor(locale, "contact")}
                className="bg-accent rounded-full px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_32px_-12px_var(--accent)] transition-transform hover:-translate-y-0.5"
              >
                {dict.cta.button}
              </Link>
              <a
                href={`mailto:${dict.contact.email}`}
                className="text-muted hover:text-ink text-sm font-medium transition-colors"
              >
                {dict.contact.email}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
