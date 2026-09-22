import { type Project, platformOf } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function ProjectCard({
  project,
  locale,
  dict,
}: {
  project: Project;
  locale: Locale;
  dict: Dictionary;
}) {
  const platforms =
    project.platforms ??
    project.links
      .map((link) => platformOf[link.kind])
      .filter((value): value is string => Boolean(value));

  return (
    <article
      data-spotlight
      className="card spotlight group flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)]"
    >
      <div className="bg-surface-soft relative z-10 aspect-[16/10] overflow-hidden">
        {project.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={`/projeler/${project.image}`}
            alt={project.title}
            loading="lazy"
            className={
              project.iconStyle
                ? "mx-auto h-full w-auto py-8 transition-transform duration-500 group-hover:scale-105"
                : "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            }
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-display text-gradient text-3xl font-semibold">
              {project.title}
            </span>
          </div>
        )}
      </div>

      <div className="relative z-10 flex flex-1 flex-col p-6">
        <p className="text-accent font-display text-[0.6875rem] font-semibold uppercase tracking-[0.16em]">
          {dict.services.items[project.service].title}
          {platforms.length > 0 && (
            <span className="text-muted"> · {platforms.join(" + ")}</span>
          )}
        </p>

        <h3 className="mt-2.5 text-lg font-semibold">{project.title}</h3>
        <p className="text-muted mt-2.5 flex-1 text-sm leading-relaxed">
          {project.summary[locale]}
        </p>

        {project.links.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer noopener"
                className="border-line hover:border-accent hover:text-accent text-muted rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
              >
                {dict.projects.linkLabels[link.kind]}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
