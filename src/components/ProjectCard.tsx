import Link from "next/link";
import { ServiceIcon } from "./ServiceIcon";
import { projectPath } from "@/i18n/routes";
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
      className={`card spotlight tilt group relative flex flex-col overflow-hidden rounded-2xl transition-colors duration-300 hover:border-[var(--line-strong)] ${
        featured ? "sm:col-span-2" : ""
      }`}
    >
      {/*
        Görsel alanının üç biçimi var:
        1. ikon  — uygulama ikonu; arkada kendi bulanık büyütülmüş kopyası,
                   önde yuvarlatılmış köşeli net ikon. Daha önce ikon geniş
                   kutunun ortasında küçücük yüzüyordu, kenarlarda kocaman
                   boşluk kalıyordu.
        2. fotoğraf — kutuyu tamamen dolduran görsel.
        3. görselsiz — hizmet ikonu, sessiz bir alan. Kötü bir ekran
                   görüntüsü koymaktansa boş bırakmak daha iyi duruyor.
      */}
      <div
        className={`bg-surface-soft relative z-10 overflow-hidden ${
          featured ? "aspect-[16/8]" : "aspect-[16/10]"
        }`}
      >
        {project.image && project.iconStyle ? (
          <div className="icon-stage">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/projeler/${project.image}`}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="icon-stage-bg"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/projeler/${project.image}`}
              alt={project.title}
              loading="lazy"
              className="icon-stage-fg"
            />
          </div>
        ) : project.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={`/projeler/${project.image}`}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className="text-line-strong flex h-full items-center justify-center"
            aria-hidden="true"
          >
            <ServiceIcon slug={project.service} className="h-12 w-12" />
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
          {/*
            Bağlantı yalnızca başlıkta ama ::after ile kartın tamamına
            yayılıyor. Mağaza rozetleri ayrı bağlantı olduğu için onları
            iç içe koymak geçersiz olurdu; rozetler üstte kalıyor.
          */}
          <Link
            href={projectPath(locale, project.slug)}
            className="stretched-link group-hover:text-accent transition-colors"
          >
            {project.title}
          </Link>
        </h3>
        <p
          className={`text-muted mt-2.5 flex-1 leading-relaxed ${
            featured ? "max-w-2xl text-sm sm:text-base" : "text-sm"
          }`}
        >
          {project.summary[locale]}
        </p>

        {project.links.length > 0 && (
          <div className="relative z-20 mt-5 flex flex-wrap gap-2">
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
