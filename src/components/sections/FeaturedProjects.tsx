import Link from "next/link";
import { Container, SectionHeading } from "../Container";
import { ProjectCard } from "../ProjectCard";
import { projects, featuredSlugs } from "@/data/projects";
import { pathFor } from "@/i18n/routes";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function FeaturedProjects({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const featured = featuredSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));

  if (featured.length === 0) return null;

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow={dict.projects.featuredEyebrow}
          title={dict.projects.featuredTitle}
          subtitle={dict.projects.featuredSubtitle}
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {featured.map((project, index) => (
            <div
              key={project.slug}
              data-reveal
              data-reveal-delay={index * 110}
              className={index === 0 ? "sm:col-span-2" : ""}
            >
              <ProjectCard
                project={project}
                locale={locale}
                dict={dict}
                featured={index === 0}
              />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center" data-reveal>
          <Link
            href={pathFor(locale, "projects")}
            className="border-line-strong text-ink hover:bg-surface-soft inline-flex rounded-full border px-6 py-3 text-sm font-semibold transition-colors"
          >
            {dict.projects.allProjects}
          </Link>
        </div>
      </Container>
    </section>
  );
}
