import Link from "next/link";
import { Container, SectionHeading } from "../Container";
import { serviceGroups, servicesByGroup, type Locale } from "@/i18n/config";
import { pathFor } from "@/i18n/routes";
import type { Dictionary } from "@/i18n/dictionaries";

export function Approach({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="relative isolate py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={dict.approach.eyebrow}
          title={dict.approach.title}
          subtitle={dict.approach.subtitle}
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {serviceGroups.map((group, index) => {
            const content = dict.approach.groups[group];
            return (
              <div key={group} className="card flex flex-col rounded-2xl p-7">
                <div className="flex items-center gap-3">
                  <span className="border-line bg-surface-soft text-accent font-display inline-flex h-8 w-8 items-center justify-center rounded-lg border text-xs font-bold tabular-nums">
                    {index + 1}
                  </span>
                  <span className="text-accent font-display text-xs font-semibold uppercase tracking-[0.18em]">
                    {content.label}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-semibold">{content.title}</h3>
                <p className="text-muted mt-2.5 flex-1 text-sm leading-relaxed">
                  {content.text}
                </p>

                <ul className="border-line mt-6 space-y-2 border-t pt-5">
                  {servicesByGroup[group].map((slug) => (
                    <li key={slug}>
                      <Link
                        href={pathFor(locale, "services", slug)}
                        className="text-muted hover:text-ink inline-flex items-center gap-2 text-sm transition-colors"
                      >
                        <span
                          aria-hidden="true"
                          className="bg-accent/60 h-1 w-1 rounded-full"
                        />
                        {dict.services.items[slug].title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
