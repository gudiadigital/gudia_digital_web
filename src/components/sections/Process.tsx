import { Container, SectionHeading } from "../Container";
import type { Dictionary } from "@/i18n/dictionaries";

export function Process({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative isolate py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={dict.process.eyebrow}
          title={dict.process.title}
          subtitle={dict.process.subtitle}
        />

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dict.process.steps.map((step, index) => (
            <li
              key={step.title}
              data-reveal
              data-reveal-delay={index * 90}
              className="card rounded-2xl p-6"
            >
              <span className="font-display text-accent/40 text-3xl font-bold tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-base font-semibold">{step.title}</h3>
              <p className="text-muted mt-2 text-sm leading-relaxed">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
