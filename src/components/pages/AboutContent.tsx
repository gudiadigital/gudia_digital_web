import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { CallToAction } from "@/components/sections/CallToAction";
import type { PageContentProps } from "./types";

export function AboutContent({ locale, dict }: PageContentProps) {
  const { about } = dict;
  const [lede, ...rest] = about.story;

  return (
    <>
      <PageHeader title={about.title} subtitle={about.lead} />

      {/* Anlatı solda okunur bir ölçüde; misyon ve vizyon sağda, sayfa
          kaydıkça yerinde kalarak metne eşlik ediyor. */}
      <Container className="pt-6 pb-24">
        <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          <div data-reveal>
            <p className="max-w-[62ch] text-xl leading-[1.55] sm:text-[1.375rem]">
              {lede}
            </p>
            <div className="mt-8 space-y-6">
              {rest.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-muted max-w-[65ch] text-base leading-[1.75]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start" data-reveal data-reveal-delay={120}>
            <dl className="border-line border-t">
              {[
                { term: about.missionTitle, detail: about.mission },
                { term: about.visionTitle, detail: about.vision },
              ].map((entry) => (
                <div key={entry.term} className="border-line border-b py-7">
                  <dt className="text-accent-3 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.2em]">
                    {entry.term}
                  </dt>
                  <dd className="mt-3 text-[1.0625rem] leading-[1.6]">
                    {entry.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </Container>

      {/* Değerler kart ızgarası değil, satır satır bir tanım listesi:
          başlık solda sabit genişlikte, açıklama sağda tek ölçüde. */}
      <Container className="pb-24">
        <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl" data-reveal>
          {about.valuesTitle}
        </h2>
        <dl className="border-line mt-10 border-t">
          {about.values.map((value, index) => (
            <div
              key={value.title}
              className="value-row border-line grid gap-2 border-b py-7 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-10"
              data-reveal
              data-reveal-delay={index * 80}
            >
              <dt className="value-term font-display text-lg font-semibold">
                {value.title}
              </dt>
              <dd className="text-muted max-w-[60ch] text-base leading-[1.7]">
                {value.text}
              </dd>
            </div>
          ))}
        </dl>
      </Container>

      {/* Kurucular: sahte avatar yerine arkada devasa baş harf. */}
      <Container className="pb-24">
        <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl" data-reveal>
          {about.foundersTitle}
        </h2>
        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-14">
          {about.founders.map((founder, index) => (
            <article
              key={founder.name}
              className="founder border-line relative overflow-hidden border-t pt-8"
              data-reveal
              data-reveal-delay={index * 110}
            >
              <span className="founder-initial" aria-hidden="true">
                {founder.name.charAt(0)}
              </span>
              <div className="relative">
                <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">
                  {founder.name}
                </h3>
                <p className="text-accent-3 mt-2 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.2em]">
                  {founder.role}
                </p>
                <p className="text-muted mt-5 max-w-[52ch] text-base leading-[1.7]">
                  {founder.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>

      <CallToAction locale={locale} dict={dict} />
    </>
  );
}
