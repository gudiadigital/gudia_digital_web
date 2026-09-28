import { Fragment } from "react";
import Link from "next/link";
import { serviceSlugs, type Locale, type ServiceSlug } from "@/i18n/config";
import { fill, type ServiceItem, type SourceLink } from "@/i18n/dictionaries";
import { pathFor, projectPath } from "@/i18n/routes";
import { Container } from "@/components/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { webSites } from "@/data/webSites";
import { PageHeader } from "@/components/PageHeader";
import { ServiceIcon } from "@/components/ServiceIcon";
import { CallToAction } from "@/components/sections/CallToAction";
import { Process } from "@/components/sections/Process";
import { WebShowcase } from "@/components/sections/WebShowcase";
import { ProductImprovements } from "@/components/sections/ProductImprovements";
import type { PageContentProps } from "./types";

type ServiceDetailProps = PageContentProps & { slug: ServiceSlug };

/**
 * Sözlükte slug'la anılan proje. Yazım hatası derlemeyi durdursun diye
 * bulunamazsa hata veriyor; bağlantı sessizce kaybolmasın.
 */
function projectBySlug(slug: string) {
  const project = projects.find((candidate) => candidate.slug === slug);
  if (!project) throw new Error(`Sözlükte bilinmeyen proje: "${slug}"`);
  return project;
}

/** "Kaynak: …" satırı; iddianın hemen altında, resmî sayfaya bağlantıyla. */
function SourceLine({ label, sources }: { label: string; sources: SourceLink[] }) {
  return (
    <p className="text-muted mt-3 text-sm leading-relaxed">
      <span className="text-ink/70">{label}:</span>{" "}
      {sources.map((source, index) => (
        <Fragment key={source.url}>
          {index > 0 && " · "}
          <a
            href={source.url}
            target="_blank"
            rel="noreferrer noopener"
            className="text-ink/70 hover:text-ink underline underline-offset-2 transition-colors"
          >
            {source.label}
          </a>
        </Fragment>
      ))}
    </p>
  );
}

/** SSS cevabının altında, cevabın andığı projelerin sayfalarına bağlantı. */
function ProjectLine({
  label,
  slugs,
  locale,
}: {
  label: string;
  slugs: string[];
  locale: Locale;
}) {
  return (
    <p className="text-muted mt-3 text-sm leading-relaxed">
      <span className="text-ink/70">{label}:</span>{" "}
      {slugs.map(projectBySlug).map((project, index) => (
        <Fragment key={project.slug}>
          {index > 0 && " · "}
          <Link
            href={projectPath(locale, project.slug)}
            className="text-ink/70 hover:text-accent underline underline-offset-2 transition-colors"
          >
            {project.title}
          </Link>
        </Fragment>
      ))}
    </p>
  );
}

function CheckIcon() {
  return (
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
  );
}

export function ServiceDetailContent({ locale, dict, slug }: ServiceDetailProps) {
  const service: ServiceItem = dict.services.items[slug];
  const others = serviceSlugs.filter((candidate) => candidate !== slug);
  /*
   * Bu hizmet kapsamındaki işler: ana alanı bu hizmet olanlar ve ek
   * kapsamında bu hizmeti taşıyanlar birlikte. Hiç yoksa bölüm çıkmıyor.
   *
   * Web sitesi hizmetinde yukarıdaki vitrin, kendi uygulamalarımız için
   * kurduğumuz siteleri tarayıcı penceresi olarak gösteriyor; aynı işler
   * referans listesinde ikinci kez çıkmasın diye eleniyor.
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
      {/* Alt başlık yok: kısa tanım (short) kartlarda kalıyor, burada onun
          yerini hemen aşağıdaki cevap alıyor; ikisi alt alta tekrar ediyordu. */}
      <PageHeader
        breadcrumb={{ locale, target: { kind: "service", slug } }}
        title={service.title}
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

        {/* Cevap: hizmet nedir, kimler için. Başlıktan hemen sonra ve açılış
            hareketi olmadan duruyor (Hakkımızda'daki kimlik paragrafı gibi):
            arama ve yapay zekâ araçlarının alıntıladığı yer burası, hiçbir
            koşulda gizli başlamamalı. */}
        <p className="border-line mt-8 max-w-[68ch] border-y py-7 text-lg leading-[1.6] sm:text-xl">
          {service.answer}
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <span className="border-line bg-surface-soft text-accent mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border">
              <ServiceIcon slug={slug} className="h-6 w-6" />
            </span>

            <p className="text-muted text-base leading-relaxed sm:text-lg">{service.intro}</p>
            {/* Girişteki sayı ya da kural doğrulanabilsin diye resmî kaynağı
                girişin hemen altında; sayfanın sonunda iddiadan kopuyordu. */}
            {service.sources && (
              <SourceLine label={dict.common.source} sources={service.sources} />
            )}

            <h2 className="mt-12 text-xl font-semibold">{dict.services.forWhomTitle}</h2>
            <ul className="mt-5 space-y-3">
              {service.forWhom.map((situation) => (
                <li key={situation} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="bg-accent mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full"
                  />
                  <span className="text-muted text-sm leading-relaxed sm:text-base">
                    {situation}
                  </span>
                </li>
              ))}
            </ul>

            {/* Kanıt: anlatılan tekniğin yayındaki kendi uygulamamızdaki
                karşılığı; her satır o projenin sayfasına gidiyor. */}
            {service.proof && (
              <>
                <h2 className="mt-12 text-xl font-semibold">{dict.services.proofTitle}</h2>
                <dl className="border-line mt-5 border-t">
                  {service.proof.map((item) => {
                    const project = projectBySlug(item.project);
                    return (
                      <div
                        key={item.project}
                        className="border-line grid gap-1 border-b py-4 sm:grid-cols-[minmax(0,7.5rem)_1fr] sm:gap-6"
                      >
                        <dt>
                          <Link
                            href={projectPath(locale, project.slug)}
                            className="font-display hover:text-accent font-semibold transition-colors"
                          >
                            {project.title}
                          </Link>
                        </dt>
                        <dd className="text-muted text-sm leading-relaxed sm:text-base">
                          {item.text}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </>
            )}

            <h2 className="mt-12 text-xl font-semibold">
              {fill(dict.common.whatWeDo, { service: service.title })}
            </h2>
            <ul className="mt-5 space-y-3">
              {service.features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <CheckIcon />
                  <span className="text-muted text-sm leading-relaxed sm:text-base">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card rounded-2xl p-7">
              <h2 className="font-display text-lg font-semibold">
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

        {/* Ürün iyileştirmede de kanıt işin kendisi: kendi uygulamalarımızda
            yapılan mağaza ve sürüm çalışması örnek olarak gösteriliyor. */}
        {slug === "dijital-urun-iyilestirme" && (
          <ProductImprovements locale={locale} dict={dict} />
        )}

        {references.length > 0 && (
          <div className="border-line mt-20 border-t pt-12">
            <h2
              className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl"
              data-reveal
            >
              {fill(dict.projects.referencesTitle, { service: service.title })}
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
      </Container>

      <Process dict={dict} />

      <Container>
        {/* SSS: akordeon yok, her cevap sunucuda basılı ve açık. Soru ve
            cevaplar yapılandırılmış verideki FAQPage ile birebir aynı
            (schema.ts); check:seo ikisinin ayrışmadığını denetliyor. */}
        <section className="border-line border-t pt-12">
          <h2 className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl" data-reveal>
            {dict.services.faqTitle}
          </h2>
          <div className="border-line mt-8 border-t">
            {service.faq.map((item) => (
              <div
                key={item.q}
                className="border-line grid gap-3 border-b py-7 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-12"
              >
                <h3 className="font-display text-lg font-semibold leading-snug">{item.q}</h3>
                <div>
                  <p className="text-muted max-w-[65ch] leading-[1.75]">{item.a}</p>
                  {item.projects && (
                    <ProjectLine
                      label={dict.services.faqProjects}
                      slugs={item.projects}
                      locale={locale}
                    />
                  )}
                  {item.sources && (
                    <SourceLine label={dict.common.source} sources={item.sources} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

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
