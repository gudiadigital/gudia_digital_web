import { type Project, platformOf } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function ProjectCard({
  project,
  locale,
  dict,
  featured = false,
}: {
  project: Project;
  locale: Locale;
  dict: Dictionary;
  /** Öne çıkan kart: iki sütun genişliğinde, görsel ve başlık büyür. */
  featured?: boolean;
}) {
  const platforms = project.links
    .map((link) => platformOf[link.kind])
    .filter((value): value is string => Boolean(value));

  return (
    <article
      data-spotlight
      className={`card spotlight tilt group flex flex-col overflow-hidden rounded-2xl transition-colors duration-300 hover:border-[var(--line-strong)] ${
        featured ? "sm:col-span-2" : ""
      }`}
    >
      <div
        className={`bg-surface-soft relative z-10 overflow-hidden ${
          featured ? "aspect-[16/8]" : "aspect-[16/10]"
        }`}
      >
        {project.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={`/projeler/${project.image}`}
            alt={project.title}
            loading="lazy"
            className={
              project.iconStyle
                ? "mx-auto h-full w-auto py-8"
                : "h-full w-full object-cover"
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

        <h3
          className={`mt-2.5 font-semibold ${
            featured ? "text-xl sm:text-2xl" : "text-lg"
          }`}
        >
          {project.title}
        </h3>
        <p
          className={`text-muted mt-2.5 flex-1 leading-relaxed ${
            featured ? "max-w-2xl text-sm sm:text-base" : "text-sm"
          }`}
        >
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
