import Link from "next/link";
import { serviceSlugs, type ServiceSlug } from "@/i18n/config";
import { pathFor } from "@/i18n/routes";
import { Container } from "@/components/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { webSites } from "@/data/webSites";
import { PageHeader } from "@/components/PageHeader";
import { ServiceIcon } from "@/components/ServiceIcon";
import { CallToAction } from "@/components/sections/CallToAction";
import { WebShowcase } from "@/components/sections/WebShowcase";
import type { PageContentProps } from "./types";

type ServiceDetailProps = PageContentProps & { slug: ServiceSlug };

export function ServiceDetailContent({ locale, dict, slug }: ServiceDetailProps) {
  const service = dict.services.items[slug];
  const others = serviceSlugs.filter((candidate) => candidate !== slug);
  /*
   * Bu hizmet kapsamındaki işler. Ana alanı bu hizmet olanlar ve ek
   * kapsamında bu hizmeti taşıyanlar birlikte; hiç yoksa bölüm çıkmıyor.
   */
  /*
   * Web sitesi hizmetinde yukarıdaki vitrin zaten beş siteyi tarayıcı
   * penceresi olarak gösteriyor; aynı işler burada ikinci kez çıkmasın.
   */
  const vitrindeOlan = new Set(
    webSites.map((site) => site.project).filter(Boolean),
  );
  const references = projects.filter(
    (project) =>
      (project.service === slug || project.alsoServices?.includes(slug)) &&
      !(slug === "web-sitesi" && vitrindeOlan.has(project.slug)),
  );

  return (
    <>
      <PageHeader
        eyebrow={dict.services.eyebrow}
        title={service.title}
        subtitle={service.short}
      />

      <Container>
        <Link
          href={pathFor(locale, "services")}
          className="text-muted hover:text-ink inline-flex items-center gap-1.5 text-sm transition-colors"
        >
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M13 8H3M7 4L3 8l4 4" />
          </svg>
          {dict.common.backToServices}
        </Link>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <span className="border-line bg-surface-soft text-accent mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border">
              <ServiceIcon slug={slug} className="h-6 w-6" />
            </span>

            <p className="text-base leading-relaxed sm:text-lg">{service.intro}</p>

            <h2 className="mt-12 text-xl font-semibold">{dict.common.whatWeDo}</h2>
            <ul className="mt-5 space-y-3">
              {service.features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <svg
                    viewBox="0 0 16 16"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="mt-0.5 shrink-0"
                  >
                    <path d="M3 8.5l3.2 3.2L13 5" />
                  </svg>
                  <span className="text-muted text-sm leading-relaxed sm:text-base">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card rounded-2xl p-7">
              <h2 className="text-accent font-display text-xs font-semibold uppercase tracking-[0.18em]">
                {dict.common.whatYouGet}
              </h2>
              <ul className="mt-5 space-y-4">
                {service.deliverables.map((item) => (
                  <li key={item} className="text-sm leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={pathFor(locale, "contact")}
                className="bg-accent mt-7 block rounded-full px-5 py-3 text-center text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                {dict.cta.button}
              </Link>
            </div>
          </aside>
        </div>

        {/* Web sitesi hizmetinde önce yayındaki siteler geliyor: bu alanda
            anlatılan işin kanıtı doğrudan sitenin kendisi. */}
        {slug === "web-sitesi" && <WebShowcase locale={locale} dict={dict} />}

        {references.length > 0 && (
          <div className="border-line mt-20 border-t pt-12">
            <h2
              className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl"
              data-reveal
            >
              {dict.projects.referencesTitle}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {references.map((project, index) => (
                <div
                  key={project.slug}
                  data-reveal
                  data-reveal-delay={(index % 3) * 90}
                  /* İlk kart tam genişlikte: tek proje varsa da boş hücre kalmıyor */
                  className={index % 3 === 0 ? "h-full sm:col-span-2" : "h-full"}
                >
                  <ProjectCard
                    project={project}
                    locale={locale}
                    dict={dict}
                    featured={index % 3 === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="border-line mt-20 border-t pt-10">
          <h2 className="text-lg font-semibold">{dict.services.allLink}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other) => (
              <Link
                key={other}
                href={pathFor(locale, "services", other)}
                className="card group flex items-center gap-3 rounded-xl p-4 transition-colors hover:border-[var(--line-strong)]"
              >
                <ServiceIcon slug={other} className="text-accent h-5 w-5 shrink-0" />
                <span className="text-sm font-medium">
                  {dict.services.items[other].title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Container>

      <CallToAction locale={locale} dict={dict} />
    </>
  );
}
