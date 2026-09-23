import type { Locale } from "@/i18n/config";

/**
 * Yayında olan tanıtım siteleri.
 *
 * `url` kartın açtığı adres: bizim kurduğumuz sitenin gerçekten servis
 * edildiği yer. Habitile ve İkra'nın ürün alan adları (habitile.app,
 * ikraapp.netlify.app) başka kurulumlara bakıyor; onlar projects.ts'te
 * projenin bağlantısı olarak duruyor.
 *
 * Projeler dizisinden ayrı tutuluyor: burada işin kendisi değil, o iş için
 * kurduğumuz site anlatılıyor. Görseller public/web/<slug>.webp altında,
 * 1200px genişliğinde masaüstü yakalamaları.
 *
 * `project` alanı doluysa kart, ilgili proje sayfasına da bağlanıyor.
 */
export type WebSite = {
  slug: string;
  title: string;
  /** Yayındaki adres; kartta alan adı olarak da yazılıyor. */
  url: string;
  /** public/web/ altındaki yakalama. */
  image: string;
  /** İlgili projenin slug'ı — proje sayfasına bağlanmak için. */
  project?: string;
  /** Sitenin tasarım dilini bir cümlede anlatan metin. */
  summary: Record<Locale, string>;
  /** Kartın altındaki kısa etiketler. */
  tags: Record<Locale, string[]>;
};

export const webSites: WebSite[] = [
  {
    slug: "snappet",
    title: "SnapPet",
    url: "https://gurkansvlms.github.io/SnapPetWeb/",
    image: "snappet.webp",
    project: "snappet",
    summary: {
      tr: "Tam kanama bir afiş açılışı ve altında kayan bir şerit. Uygulama ekranları masaya yayılmış kartlar gibi üst üste biniyor, özellikler yatay kaydırmalı bir deste.",
      en: "A full-bleed poster opening with a ticker running underneath. The app screens overlap like cards dealt on a table, and the features are a horizontally scrolled deck.",
    },
    tags: {
      tr: ["Afiş açılış", "Kayan şerit", "Kart destesi", "Reklam açılış sayfası"],
      en: ["Poster hero", "Ticker strip", "Card deck", "Ad landing page"],
    },
  },
  {
    slug: "habitile",
    title: "Habitile",
    url: "https://gurkansvlms.github.io/widgetai-habit-legal-site/",
    image: "habitile.webp",
    project: "habitile",
    summary: {
      tr: "Solda tam boy sabit bir panel, sağda tek sütun okuma alanı. Özellikler kare karolardan oluşan sıkı bir ızgarada; ilerleme halkası sayfa kaydırıldıkça çiziliyor.",
      en: "A full-height fixed panel on the left, a single reading column on the right. The features sit in a tight grid of square tiles, and the progress ring draws itself as you scroll.",
    },
    tags: {
      tr: ["Yan panel", "Karo ızgarası", "İlerleme halkası", "Destek ve yasal sayfalar"],
      en: ["Side panel", "Tile grid", "Progress ring", "Support and legal pages"],
    },
  },
  {
    slug: "life-planner",
    title: "Life Planner",
    url: "https://gurkansvlms.github.io/widgetai-legal-site/",
    image: "life-planner.webp",
    project: "life-planner",
    summary: {
      tr: "Gezinme sayfanın altında duran bir uygulama çubuğu. Açılış ortalanmış ve görselsiz; gösterge şeridi kenardan kenara uzanıyor, özellikler künye satırlarına dönüşüyor.",
      en: "Navigation sits at the bottom of the page like an app tab bar. The opening is centred and image-free, the metric strip runs edge to edge, and the features become spec-sheet rows.",
    },
    tags: {
      tr: ["Alt gezinme çubuğu", "Koyu tema", "7 dil", "Künye satırları"],
      en: ["Bottom nav bar", "Dark theme", "7 languages", "Spec-sheet rows"],
    },
  },
  {
    slug: "ikra",
    title: "İkra",
    url: "https://gurkansvlms.github.io/ikra-app-web/",
    image: "ikra.webp",
    project: "ikra",
    summary: {
      tr: "Her şey tek bir dikey eksende toplanıyor: açılış görseli bir kemerin içinde, ekranlar kemerli bir sıra, arkada sekiz köşeli yıldız örgüsü.",
      en: "Everything gathers on a single vertical axis: the opening image sits inside an arch, the screens form a row of arches, and an eight-point star lattice runs behind it.",
    },
    tags: {
      tr: ["Kemer motifi", "Merkez eksen", "TR / EN", "Sıfırdan kurulum"],
      en: ["Arch motif", "Centre axis", "TR / EN", "Built from scratch"],
    },
  },
  {
    slug: "deyimo",
    title: "Deyimo",
    url: "https://gurkansvlms.github.io/IdiomWeb/",
    image: "deyimo.webp",
    project: "deyimo",
    summary: {
      tr: "Gazete künyesi, ortalanmış bir manşet ve iki sütuna akan bir köşe yazısı. İlk harf büyütülmüş, sayfa boyunca ince çizgiler ve film greni var.",
      en: "A newspaper masthead, a centred headline and a column of text that flows into two. The first letter is dropped, and hairlines and film grain run through the whole page.",
    },
    tags: {
      tr: ["Gazete künyesi", "İki sütun akış", "TR / EN", "SSS ve yasal sayfalar"],
      en: ["Newspaper masthead", "Two-column flow", "TR / EN", "FAQ and legal pages"],
    },
  },
];
