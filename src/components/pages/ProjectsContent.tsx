import Link from "next/link";
import { pathFor } from "@/i18n/routes";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { CallToAction } from "@/components/sections/CallToAction";
import { listedProjects } from "@/data/projects";
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
      <PageHeader title={dict.projects.title} subtitle={dict.projects.subtitle} />

      <Container>
        {listedProjects.length === 0 ? (
          <div className="card rounded-2xl px-6 py-16 text-center sm:px-14">
            <p className="text-muted mx-auto max-w-xl text-base leading-relaxed">
              {dict.projects.empty}
            </p>
            <Link
              href={pathFor(locale, "contact")}
              className="bg-accent mt-8 inline-flex rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
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
                />
              </div>
            ))}
          </div>
        )}
      </Container>

      <CallToAction locale={locale} dict={dict} />
    </>
  );
}
