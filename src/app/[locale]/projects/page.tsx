import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pathFor } from "@/i18n/routes";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { CallToAction } from "@/components/sections/CallToAction";
import { projects } from "@/data/projects";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.nav.projects, description: dict.projects.subtitle };
}

export default async function ProjectsPage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

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
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article key={project.slug} className="card rounded-2xl p-6">
                <p className="text-accent font-display text-xs font-semibold uppercase tracking-[0.18em]">
                  {dict.services.items[project.service].title} · {project.year}
                </p>
                <h2 className="mt-3 text-lg font-semibold">{project.title}</h2>
                <p className="text-muted mt-2.5 text-sm leading-relaxed">
                  {project.summary[locale]}
                </p>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-accent mt-5 inline-block text-sm font-medium"
                  >
                    {dict.projects.viewProject}
                  </a>
                )}
              </article>
            ))}
          </div>
        )}
      </Container>

      <CallToAction locale={locale} dict={dict} />
    </>
  );
}
