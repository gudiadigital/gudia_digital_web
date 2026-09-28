import { serviceGroups, servicesByGroup } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { guidePath, pathFor, projectPath } from "@/i18n/routes";
import { absoluteUrl } from "@/i18n/site";
import { listedProjects, webProjects } from "@/data/projects";
import { publishedGuides } from "@/data/guides";

/*
 * /llms.txt (llmstxt.org): tarayıcı ajanları için sitenin kısa Markdown
 * özeti. Arama görünürlüğüne ölçülmüş bir etkisi yok; Google kullanmıyor.
 * Düşük maliyetli bir önlem, o kadar.
 *
 * Elle yazılmıyor: her satır sözlükten, projects.ts'ten ve routes.ts'ten
 * derleme sırasında üretiliyor, sitedeki metinden ayrışamıyor. 60 satırı
 * geçmemeli; check:seo satır sayısını ve bağlantıları denetliyor.
 */

// Statik export: dosya derleme sırasında bir kez out/llms.txt olarak yazılıyor.
export const dynamic = "force-static";

/** Markdown bağlantı; çapa absoluteUrl()'un eklediği sondaki /'tan sonra geliyor. */
const link = (label: string, path: string, anchor?: string) =>
  `[${label}](${absoluteUrl(path)}${anchor ? `#${anchor}` : ""})`;

export function GET() {
  const tr = getDictionary("tr");
  const en = getDictionary("en");
  // Hizmetler sitedeki sırasıyla: kur → iyileştir → büyüt.
  const services = serviceGroups.flatMap((group) => servicesByGroup[group]);

  const lines = [
    `# ${tr.meta.siteName} (${en.meta.siteName})`,
    "",
    `> ${tr.about.entity}`,
    "",
    en.about.entity,
    "",
    `## ${tr.about.foundersTitle} / ${en.about.foundersTitle}`,
    ...tr.about.founders.map((founder, index) => {
      const english = en.about.founders[index];
      return `- ${founder.name}: ${founder.role} / ${english.role} (${link("TR", pathFor("tr", "about"), founder.id)}, ${link("EN", pathFor("en", "about"), english.id)})`;
    }),
    "",
    `## ${tr.nav.services} / ${en.nav.services}`,
    ...services.map(
      (slug) =>
        `- ${link(tr.services.items[slug].title, pathFor("tr", "services", slug))} / ${link(en.services.items[slug].title, pathFor("en", "services", slug))}`,
    ),
    "",
    `## ${tr.nav.projects} / ${en.nav.projects}`,
    ...[...listedProjects, ...webProjects].map(
      (project) =>
        `- ${project.title}: ${link("TR", projectPath("tr", project.slug))}, ${link("EN", projectPath("en", project.slug))}`,
    ),
    // Rehberler yalnızca yayındayken; taslaklar burada da yok.
    ...(publishedGuides.length > 0
      ? [
          "",
          `## ${tr.nav.guides} / ${en.nav.guides}`,
          ...publishedGuides.map(
            (guide) =>
              `- ${link(guide.title.tr, guidePath("tr", guide.slug.tr))} / ${link(guide.title.en, guidePath("en", guide.slug.en))}`,
          ),
        ]
      : []),
    "",
    `## ${tr.nav.contact} / ${en.nav.contact}`,
    `- ${link(tr.contact.seo.title, pathFor("tr", "contact"))} / ${link(en.contact.seo.title, pathFor("en", "contact"))}`,
    `- ${tr.contact.emailLabel} / ${en.contact.emailLabel}: ${tr.contact.email}`,
  ];

  return new Response(`${lines.join("\n")}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
