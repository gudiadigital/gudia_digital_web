import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { CallToAction } from "@/components/sections/CallToAction";
import type { PageContentProps } from "./types";

export function AboutContent({ locale, dict }: PageContentProps) {
  const { about } = dict;

  return (
    <>
      <PageHeader eyebrow={about.eyebrow} title={about.title} subtitle={about.lead} />

      <Container className="pb-4">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div className="space-y-5">
            {about.story.map((paragraph) => (
              <p key={paragraph} className="text-muted text-base leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="space-y-4">
            <div className="card rounded-2xl p-6">
              <h2 className="text-accent font-display text-xs font-semibold uppercase tracking-[0.18em]">
                {about.missionTitle}
              </h2>
              <p className="mt-3 text-base leading-relaxed">{about.mission}</p>
            </div>
            <div className="card rounded-2xl p-6">
              <h2 className="text-accent font-display text-xs font-semibold uppercase tracking-[0.18em]">
                {about.visionTitle}
              </h2>
              <p className="mt-3 text-base leading-relaxed">{about.vision}</p>
            </div>
          </div>
        </div>
      </Container>

      <Container className="py-20">
        <h2 className="text-2xl font-semibold sm:text-3xl">{about.valuesTitle}</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {about.values.map((value) => (
            <div key={value.title} className="card rounded-2xl p-6">
              <h3 className="text-base font-semibold">{value.title}</h3>
              <p className="text-muted mt-2.5 text-sm leading-relaxed">
                {value.text}
              </p>
            </div>
          ))}
        </div>
      </Container>

      <Container className="pb-8">
        <h2 className="text-2xl font-semibold sm:text-3xl">{about.foundersTitle}</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {about.founders.map((founder) => (
            <div key={founder.name} className="card rounded-2xl p-7">
              <div
                className="from-accent/25 to-accent-2/25 mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br"
                aria-hidden="true"
              >
                <span className="font-display text-lg font-semibold">
                  {founder.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
              </div>
              <h3 className="text-lg font-semibold">{founder.name}</h3>
              <p className="text-accent mt-1 text-sm font-medium">{founder.role}</p>
              <p className="text-muted mt-3.5 text-sm leading-relaxed">
                {founder.bio}
              </p>
            </div>
          ))}
        </div>
      </Container>

      <CallToAction locale={locale} dict={dict} />
    </>
  );
}