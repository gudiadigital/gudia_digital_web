import { Container } from "../Container";
import type { Dictionary } from "@/i18n/dictionaries";

export function Stats({ dict }: { dict: Dictionary }) {
  return (
    <section className="py-14">
      <Container>
        <dl className="border-line grid grid-cols-1 gap-px overflow-hidden rounded-2xl border sm:grid-cols-3">
          {dict.hero.stats.map((stat, index) => (
            <div
              key={stat.label}
              data-spotlight
              data-reveal
              data-reveal-delay={index * 90}
              className="spotlight bg-surface-soft px-6 py-6 outline outline-1 outline-[var(--line)]"
            >
              <dt className="font-display relative z-10 text-3xl font-semibold tabular-nums">
                {stat.value}
              </dt>
              <dd className="text-muted relative z-10 mt-1.5 text-sm">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
