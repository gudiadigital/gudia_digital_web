import { Container, SectionHeading } from "../Container";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * Adımlar yan yana dizilmek yerine kaydırdıkça üst üste yığılıyor.
 * Her kart bir öncekinden biraz aşağıda yapışıyor, böylece sıranın
 * ilerlediği fiziksel olarak görünüyor — dört kutuyu aynı anda okumak
 * yerine adım adım geçiliyor.
 *
 * Yapışma yalnızca geniş ekranlarda; dar ekranda normal akış daha iyi.
 */
export function Process({ dict }: { dict: Dictionary }) {
  const steps = dict.process.steps;

  return (
    <section className="relative isolate py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={dict.process.eyebrow}
          title={dict.process.title}
          subtitle={dict.process.subtitle}
        />

        <ol className="process-stack mt-14">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="process-step"
              style={{ "--i": index } as React.CSSProperties}
            >
              <div className="card rounded-2xl p-7 sm:p-9">
                <span className="text-muted font-mono text-xs tabular-nums tracking-[0.16em]">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(steps.length).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-xl font-semibold sm:text-2xl">
                  {step.title}
                </h3>
                <p className="text-muted mt-3 max-w-2xl leading-relaxed">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
