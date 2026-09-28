import Link from "next/link";
import { pathFor } from "@/i18n/routes";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { CallToAction } from "@/components/sections/CallToAction";
import { listedProjects, webProjects } from "@/data/projects";
import type { PageContentProps } from "./types";

/*
 * 1 geniş + 2 dar deseni. Toplam sayı 3'e bölündüğünde 2 kalıyorsa son
 * kart tek başına kalıp yanında boş hücre bırakıyor; o durumda son kart
 * da genişletiliyor.
 */
function isWide(index: number, total: number) {
  if (index % 3 === 0) return true;
  return index === total - 1 && total % 3 === 2;
}

export function ProjectsContent({ locale, dict }: PageContentProps) {
  return (
    <>
      <PageHeader
        breadcrumb={{ locale, target: { kind: "page", key: "projects" } }}
        title={dict.projects.title}
        subtitle={dict.projects.subtitle}
      />

      <Container>
        {/* Kart başlıkları h3; h1 ile arasında seviye atlamasın diye. */}
        <h2 className="sr-only">{dict.nav.projects}</h2>
        {listedProjects.length === 0 ? (
          <div className="card rounded-2xl px-6 py-16 text-center sm:px-14">
            <p className="text-muted mx-auto max-w-xl text-base leading-relaxed">
              {dict.projects.empty}
            </p>
            <Link
              href={pathFor(locale, "contact")}
              className="bg-accent mt-8 inline-flex rounded-full px-6 py-3 text-sm font-semibold text-on-accent transition-transform hover:-translate-y-0.5"
            >
              {dict.projects.emptyCta}
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {listedProjects.map((project, index) => (
              <div
                key={project.slug}
                data-reveal
                data-reveal-delay={(index % 3) * 100}
                /*
                 * Her üçüncü kart tam genişlikte: 1 geniş + 2 dar deseni
                 * ızgarayı boşluksuz dolduruyor. Dörtte bir desende geniş
                 * kart sıraya sığmadığı için yanında boş hücre kalıyordu.
                 */
                className={
                  isWide(index, listedProjects.length)
                    ? "h-full sm:col-span-2"
                    : "h-full"
                }
              >
                <ProjectCard
                  project={project}
                  locale={locale}
                  dict={dict}
                  featured={isWide(index, listedProjects.length)}
                  /* Yalnızca ilk kart başlığın hemen altında, ilk ekranda. */
                  eager={index === 0}
                />
              </div>
            ))}
          </div>
        )}

        {/* Web sitesi işleri ayrı bir alt bölümde: ana ızgarada uygulama ve
            oyunların arasına karışmıyorlar ama bu sayfadan da bağlantı
            alıyorlar. Kart düzeni yukarıdakiyle aynı (1 geniş + 2 dar). */}
        {webProjects.length > 0 && (
          <section className="border-line mt-20 border-t pt-12">
            <h2
              className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl"
              data-reveal
            >
              {dict.projects.websitesTitle}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {webProjects.map((project, index) => (
                <div
                  key={project.slug}
                  data-reveal
                  data-reveal-delay={(index % 3) * 100}
                  className={
                    isWide(index, webProjects.length)
                      ? "h-full sm:col-span-2"
                      : "h-full"
                  }
                >
                  <ProjectCard
                    project={project}
                    locale={locale}
                    dict={dict}
                    featured={isWide(index, webProjects.length)}
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </Container>

      <CallToAction locale={locale} dict={dict} />
    </>
  );
}
