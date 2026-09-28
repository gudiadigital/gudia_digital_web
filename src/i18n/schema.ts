import {
  listedProjects,
  type Project,
  type ProjectLinkKind,
  type ProjectSchema,
} from "@/data/projects";
import {
  groupOfService,
  locales,
  serviceGroups,
  servicesByGroup,
  type Locale,
  type ServiceSlug,
} from "./config";
import { getDictionary, type Dictionary } from "./dictionaries";
import { pathFor, projectPath, type PageKey } from "./routes";
import { pageCopy, type PageTarget } from "./seo";
import { SITE_URL, absoluteUrl } from "./site";

/**
 * Sayfaların yapılandırılmış verisi (schema.org JSON-LD), sayfa başına tek
 * bir @graph.
 *
 * Her şey sözlükten, projects.ts'ten ve pageCopy()'den okunuyor; burada
 * yeni bilgi yazılmıyor. Google, sayfada görünmeyen bilgiyi işaretleyen
 * yapılandırılmış veriyi yok sayabiliyor, yanıltıcı bulursa siteye elle
 * işlem de uygulayabiliyor.
 *
 * Kimlikler (@id) iki türlü:
 *  - Gerçek dünyadaki şeyler (stüdyo, kurucular, hizmetler, işler) dilden
 *    bağımsız: TR ve EN sayfaları aynı düğümü anlatıyor.
 *  - Belgeler (sayfanın kendisi, içerik haritası, liste) sayfanın kanonik
 *    adresinden türüyor: "https://gudiadigital.com/tr/hakkimizda/#webpage".
 *
 * Başka bir düğümü yalnızca @id ile anan her başvurunun karşılığı aynı
 * sayfada bulunuyor; bu yüzden her sayfada en azından kısa bir stüdyo ve
 * site düğümü var (check:seo bunu denetliyor).
 */

type Node = Record<string, unknown>;

export type JsonLdGraph = {
  "@context": "https://schema.org";
  "@graph": Node[];
};

type Founder = Dictionary["about"]["founders"][number];

const ORG = `${SITE_URL}/#organization`;
const WEBSITE = `${SITE_URL}/#website`;
const LOGO = `${SITE_URL}/#logo`;
const LOGO_URL = `${SITE_URL}/brand/icon-512.png`;
const DIVONIA = `${SITE_URL}/#org-divonia-studios`;

const personId = (id: string) => `${SITE_URL}/#${id}`;
const serviceId = (slug: ServiceSlug) => `${SITE_URL}/#service-${slug}`;
const workId = (slug: string) => `${SITE_URL}/#work-${slug}`;
const ref = (id: string) => ({ "@id": id });

const TURKIYE = { "@type": "Country", name: "Türkiye" };

/** Hizmetler, sitedeki sırasıyla: kur → iyileştir → büyüt. */
const orderedServices = serviceGroups.flatMap((group) => servicesByGroup[group]);

/**
 * Başka stüdyoların düğümleri. Kimliği biz veriyoruz, onlarınkini
 * kullanmıyoruz. Date For Dead'in Steam kaydında geliştirici ve yayıncı
 * Divonia Studios.
 */
const THIRD_PARTY = {
  divonia: {
    "@type": "Organization",
    "@id": DIVONIA,
    name: "Divonia Studios",
    url: "https://divoniastudios.com",
  },
} satisfies Record<NonNullable<ProjectSchema["authorOrg"]>, Node>;

/** Uygulamanın yüklendiği yerler (installUrl). */
const INSTALL_KINDS: ProjectLinkKind[] = ["appstore", "playstore"];
/** İşin kendi sitesi yoksa adresi olarak kullanılabilecek mağaza sayfaları. */
const STORE_KINDS: ProjectLinkKind[] = ["appstore", "playstore", "steam", "trendyol"];
/** Bir markayı tanıtan bağlantılar (Brand.sameAs). */
const BRAND_KINDS: ProjectLinkKind[] = ["trendyol", "instagram"];

/** Boş listeyi hiç yazmamak için: JSON.stringify undefined alanı atlıyor. */
function nonEmpty<T>(list: readonly T[]): T[] | undefined {
  return list.length > 0 ? [...list] : undefined;
}

function firstSentence(text: string): string {
  return text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text;
}

/**
 * Stüdyonun adı iki dilde de aynı ("Gudia Dijital"), İngilizcesi alternatif
 * ad. Aynı kimliğe dile göre farklı ad vermek, arama motoruna iki ayrı
 * kurummuş gibi görünüyor; site adı da tek olmalı.
 */
function brandNames() {
  return {
    name: getDictionary("tr").meta.siteName,
    alternateName: [getDictionary("en").meta.siteName],
  };
}

/**
 * Bir düğüm dizisini JSON-LD belgesine çevirir. İç içe diziler açılıyor,
 * koşula bağlı düğümlerden boş kalanlar (false, null, undefined) atılıyor.
 */
export function graph(
  ...nodes: Array<Node | Node[] | false | null | undefined>
): JsonLdGraph {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.flat().filter((node): node is Node => Boolean(node)),
  };
}

/** Sayfanın ziyaretçiye görünen yolu, ör. "/tr/projeler/pofu". */
function targetPath(locale: Locale, target: PageTarget): string {
  switch (target.kind) {
    case "service":
      return pathFor(locale, "services", target.slug);
    case "project":
      return projectPath(locale, target.project.slug);
    case "page":
      return pathFor(locale, target.key);
  }
}

/** İçerik haritasında sayfanın adı: menüdeki etiket, KVKK'da metnin başlığı. */
function pageName(dict: Dictionary, key: PageKey): string {
  return key === "privacy" ? dict.privacy.title : dict.nav[key];
}

export type Crumb = { name: string; path: string };

/**
 * Ana sayfadan bu sayfaya uzanan yol; son eleman sayfanın kendisi.
 * Hem yapılandırılmış verideki BreadcrumbList hem sayfada görünen içerik
 * haritası buradan okumalı ki ikisi ayrışmasın.
 */
export function breadcrumbTrail(locale: Locale, target: PageTarget): Crumb[] {
  const dict = getDictionary(locale);
  const home = { name: dict.nav.home, path: pathFor(locale) };
  const here = { path: targetPath(locale, target) };

  switch (target.kind) {
    case "service":
      return [
        home,
        { name: dict.nav.services, path: pathFor(locale, "services") },
        { ...here, name: dict.services.items[target.slug].title },
      ];
    case "project":
      return [
        home,
        { name: dict.nav.projects, path: pathFor(locale, "projects") },
        { ...here, name: target.project.title },
      ];
    case "page":
      if (target.key === "home") return [home];
      return [home, { ...here, name: pageName(dict, target.key) }];
  }
}

function breadcrumbList(locale: Locale, target: PageTarget): Node {
  const trail = breadcrumbTrail(locale, target);
  const url = absoluteUrl(targetPath(locale, target));
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    // Son eleman bulunulan sayfa; Google onda adres beklemiyor.
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      ...(index < trail.length - 1 ? { item: absoluteUrl(crumb.path) } : {}),
    })),
  };
}

/** Sayfanın kendisi; adı ve açıklaması <title> ve meta açıklamayla aynı kaynaktan (pageCopy). */
function webPage(
  locale: Locale,
  target: PageTarget,
  type: string,
  extra: Node = {},
): Node {
  const url = absoluteUrl(targetPath(locale, target));
  const { title, description } = pageCopy(locale, target);
  const isHome = target.kind === "page" && target.key === "home";
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: locale,
    isPartOf: ref(WEBSITE),
    ...(isHome ? {} : { breadcrumb: ref(`${url}#breadcrumb`) }),
    ...extra,
  };
}

/** Stüdyonun tam kaydı: ana sayfa, Hakkımızda ve İletişim'de. */
function organization(locale: Locale): Node {
  const dict = getDictionary(locale);
  // Kuruluş tarihi, resmî unvan, vergi numarası ve telefon bilerek yok:
  // stüdyo kayıtlı bir şirket değil, sitede de bunlar yazmıyor.
  return {
    "@type": "Organization",
    "@id": ORG,
    ...brandNames(),
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      "@id": LOGO,
      url: LOGO_URL,
      contentUrl: LOGO_URL,
      width: 512,
      height: 512,
    },
    image: ref(LOGO),
    description: dict.meta.description,
    disambiguatingDescription: firstSentence(dict.about.entity),
    email: dict.contact.email,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: dict.contact.email,
      url: absoluteUrl(pathFor(locale, "contact")),
      availableLanguage: [...locales],
    },
    address: { "@type": "PostalAddress", addressCountry: "TR" },
    areaServed: TURKIYE,
    knowsLanguage: [...locales],
    founder: dict.about.founders.map((founder) => ref(personId(founder.id))),
    sameAs: nonEmpty(dict.meta.profiles),
  };
}

/** Diğer sayfalarda stüdyonun kısa kaydı; başvurular karşılıksız kalmasın. */
function organizationStub(): Node {
  return {
    "@type": "Organization",
    "@id": ORG,
    ...brandNames(),
    url: `${SITE_URL}/`,
    logo: LOGO_URL,
  };
}

/**
 * Site adı için Google WebSite kaydını ana sayfada arıyor; tam kayıt
 * orada, diğer sayfalarda kısası. Arama kutusu (SearchAction) yok: sitede
 * arama yok, Google da o özelliği kaldırdı.
 */
function website(full: boolean): Node {
  const { name, alternateName } = brandNames();
  return {
    "@type": "WebSite",
    "@id": WEBSITE,
    url: `${SITE_URL}/`,
    name,
    ...(full
      ? { alternateName, inLanguage: [...locales], publisher: ref(ORG) }
      : {}),
  };
}

function person(locale: Locale, founder: Founder, full: boolean): Node {
  const base = {
    "@type": "Person",
    "@id": personId(founder.id),
    name: founder.name,
    jobTitle: founder.role.split(" · "),
    worksFor: ref(ORG),
  };
  if (!full) return base;
  return {
    ...base,
    url: `${absoluteUrl(pathFor(locale, "about"))}#${founder.id}`,
    description: founder.bio,
    alternateName: founder.alternateName?.trim() || undefined,
    sameAs: nonEmpty(founder.profiles),
  };
}

function persons(locale: Locale, full: boolean): Node[] {
  return getDictionary(locale).about.founders.map((founder) =>
    person(locale, founder, full),
  );
}

function service(locale: Locale, slug: ServiceSlug, full: boolean): Node {
  const dict = getDictionary(locale);
  const item = dict.services.items[slug];
  const base = {
    "@type": "Service",
    "@id": serviceId(slug),
    name: item.title,
    url: absoluteUrl(pathFor(locale, "services", slug)),
    provider: ref(ORG),
  };
  if (!full) return base;
  return {
    ...base,
    serviceType: item.title,
    description: item.intro,
    areaServed: TURKIYE,
    category: dict.services.groupLabels[groupOfService[slug]],
  };
}

/**
 * Portfolyodaki iş. Adres: işin kendi sitesi, yoksa ilk mağaza sayfası.
 * Gudia'nın işle ilişkisi yalnızca `schema.relation` doluysa yazılıyor.
 */
function work(locale: Locale, project: Project): Node {
  const { schema, links } = project;
  const authorOrg = schema.authorOrg && THIRD_PARTY[schema.authorOrg];
  const urlsOf = (kinds: ProjectLinkKind[]) =>
    links.filter((link) => kinds.includes(link.kind)).map((link) => link.url);

  return {
    "@type": schema.type,
    "@id": workId(project.slug),
    name: schema.name?.[locale] ?? project.title,
    description: project.summary[locale],
    image: project.image ? `${SITE_URL}/projeler/${project.image}` : undefined,
    url: links.find((link) => link.kind === "web")?.url ?? urlsOf(STORE_KINDS)[0],
    sameAs: nonEmpty(links.map((link) => link.url)),
    installUrl: nonEmpty(urlsOf(INSTALL_KINDS)),
    applicationCategory: schema.applicationCategory,
    operatingSystem: schema.operatingSystem,
    gamePlatform: schema.gamePlatform,
    mainEntityOfPage: ref(
      `${absoluteUrl(projectPath(locale, project.slug))}#webpage`,
    ),
    ...(schema.relation ? { [schema.relation]: ref(ORG) } : {}),
    ...(authorOrg
      ? { author: ref(authorOrg["@id"]), publisher: ref(authorOrg["@id"]) }
      : {}),
    ...(schema.aboutBrand
      ? {
          about: {
            "@type": "Brand",
            name: schema.aboutBrand,
            sameAs: nonEmpty(urlsOf(BRAND_KINDS)),
          },
        }
      : {}),
  };
}

/**
 * Hizmet sayfasındaki SSS. Soru ve cevaplar sayfada görünen metnin
 * kendisi (aynı sözlük alanı); check:seo ayrışmadıklarını denetliyor.
 * Google 7 Mayıs 2026'dan beri SSS zengin sonucu göstermiyor; bu düğüm
 * görünüm için değil, soru-cevabın makinece okunabilmesi için.
 */
function faqPage(locale: Locale, url: string, slug: ServiceSlug): Node | undefined {
  const faq = getDictionary(locale).services.items[slug].faq;
  if (faq.length === 0) return undefined;
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    inLanguage: locale,
    isPartOf: ref(`${url}#webpage`),
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** Hizmetler ve Projeler sayfasındaki sıralı liste. */
function itemList(locale: Locale, target: PageTarget, items: Crumb[]): Node {
  const url = absoluteUrl(targetPath(locale, target));
  return {
    "@type": "ItemList",
    "@id": `${url}#list`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

/** Sayfanın bütün yapılandırılmış verisi; sayfa bunu <JsonLd> ile basıyor. */
export function pageSchema(locale: Locale, target: PageTarget): JsonLdGraph {
  const dict = getDictionary(locale);
  const url = absoluteUrl(targetPath(locale, target));

  if (target.kind === "service") {
    return graph(
      organizationStub(),
      website(false),
      webPage(locale, target, "ItemPage", {
        mainEntity: ref(serviceId(target.slug)),
      }),
      service(locale, target.slug, true),
      faqPage(locale, url, target.slug),
      breadcrumbList(locale, target),
    );
  }

  if (target.kind === "project") {
    const { project } = target;
    return graph(
      organizationStub(),
      website(false),
      webPage(locale, target, "ItemPage", {
        mainEntity: ref(workId(project.slug)),
      }),
      work(locale, project),
      project.schema.authorOrg && THIRD_PARTY[project.schema.authorOrg],
      breadcrumbList(locale, target),
    );
  }

  switch (target.key) {
    case "home":
      return graph(
        organization(locale),
        website(true),
        webPage(locale, target, "WebPage", { about: ref(ORG) }),
        persons(locale, false),
        orderedServices.map((slug) => service(locale, slug, false)),
      );
    case "about":
      return graph(
        organization(locale),
        website(false),
        webPage(locale, target, "AboutPage", { mainEntity: ref(ORG) }),
        persons(locale, true),
        breadcrumbList(locale, target),
      );
    case "contact":
      // Kurucular kısa kayıtla geliyor: stüdyo kaydındaki kurucu
      // başvuruları bu sayfada da karşılıksız kalmasın.
      return graph(
        organization(locale),
        website(false),
        webPage(locale, target, "ContactPage", { mainEntity: ref(ORG) }),
        persons(locale, false),
        breadcrumbList(locale, target),
      );
    case "services":
      return graph(
        organizationStub(),
        website(false),
        webPage(locale, target, "CollectionPage", {
          mainEntity: ref(`${url}#list`),
        }),
        itemList(
          locale,
          target,
          orderedServices.map((slug) => ({
            name: dict.services.items[slug].title,
            path: pathFor(locale, "services", slug),
          })),
        ),
        breadcrumbList(locale, target),
      );
    case "projects":
      return graph(
        organizationStub(),
        website(false),
        webPage(locale, target, "CollectionPage", {
          mainEntity: ref(`${url}#list`),
        }),
        itemList(
          locale,
          target,
          listedProjects.map((project) => ({
            name: project.title,
            path: projectPath(locale, project.slug),
          })),
        ),
        breadcrumbList(locale, target),
      );
    case "privacy":
      return graph(
        organizationStub(),
        website(false),
        webPage(locale, target, "WebPage"),
        breadcrumbList(locale, target),
      );
  }
}
