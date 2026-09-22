import Link from "next/link";
import { pathFor } from "@/i18n/routes";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { CallToAction } from "@/components/sections/CallToAction";
import { projects } from "@/data/projects";
import type { PageContentProps } from "./types";

export function ProjectsContent({ locale, dict }: PageContentProps) {
  return (
    <>
      <PageHeader
        eyebrow={dict.projects.eyebrow}
        title={dict.projects.title}
        subtitle={dict.projects.subtitle}
      />

      <Container>
        {projects.length === 0 ? (
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
            {projects.map((project, index) => (
              <div
                key={project.slug}
                data-reveal
                data-reveal-delay={(index % 2) * 100}
                className={index % 4 === 0 ? "sm:col-span-2" : ""}
              >
                <ProjectCard
                  project={project}
                  locale={locale}
                  dict={dict}
                  featured={index % 4 === 0}
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
