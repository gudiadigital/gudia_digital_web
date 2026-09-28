import Link from "next/link";
import { projects } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { projectPath } from "@/i18n/routes";

/**
 * Hero'nun hemen altındaki kayan şerit: yayında olan işlerin adları.
 *
 * Önceden hizmet başlıklarını kaydırıyordu; hemen altındaki Hizmetler
 * bölümü zaten aynı altı başlığı sayıyordu, yani şerit bir şey eklemiyordu.
 * Gerçek ürün adları hem tekrar değil hem de kanıt.
 *
 * İlk kopyadaki adlar proje sayfalarına bağlantı. Döngü kesintisiz görünsün
 * diye şerit iki kez yazılıyor; ikinci kopya ekran okuyucudan gizli ve
 * düz metin, aynı bağlantılar iki kez sayılmasın ve sekmeyle iki kez
 * gezilmesin.
 */
export function Marquee({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section
      className="marquee border-line overflow-hidden border-y py-5"
      aria-label={dict.projects.featuredEyebrow}
    >
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center"
            aria-hidden={copy === 1 ? "true" : undefined}
          >
            {projects.map((project) => (
              <span
                key={project.slug}
                className="text-muted font-display flex shrink-0 items-center gap-8 pr-8 text-sm font-medium tracking-wide sm:text-base"
              >
                {copy === 0 ? (
                  <Link
                    href={projectPath(locale, project.slug)}
                    className="hover:text-ink transition-colors"
                  >
                    {project.title}
                  </Link>
                ) : (
                  project.title
                )}
                <span
                  className="bg-line-strong h-3.5 w-px shrink-0"
                  aria-hidden="true"
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
