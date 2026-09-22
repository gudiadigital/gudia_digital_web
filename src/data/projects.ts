import type { Locale, ServiceSlug } from "@/i18n/config";

export type ProjectLinkKind =
  | "appstore"
  | "playstore"
  | "steam"
  | "web"
  | "trendyol"
  | "instagram";

export type ProjectLink = { kind: ProjectLinkKind; url: string };

export type Project = {
  slug: string;
  title: string;
  /** Kısa tanıtım — her dil için ayrı. */
  summary: Record<Locale, string>;
  service: ServiceSlug;
  year: number;
  /** public/projeler/ altındaki görsel adı; yoksa kart tipografik görünür. */
  image?: string;
  /** true ise kart görseli ikon gibi (kare, ortalanmış) gösterilir. */
  iconStyle?: boolean;
  links: ProjectLink[];
  /**
   * Platform rozetleri normalde bağlantılardan türetilir. Mağaza linki
   * olmayan ama o platformda yayında olan uygulamalar için elle verilir.
   */
  platforms?: string[];
};

/** iOS / Android / PC rozetleri bağlantılardan türetilir. */
export const platformOf: Partial<Record<ProjectLinkKind, string>> = {
  appstore: "iOS",
  playstore: "Android",
  steam: "PC",
};

export const projects: Project[] = [
  {
    slug: "logo-kidzania",
    title: "Logo Yazılım × KidZania İstanbul",
    service: "markali-oyunlar",
    year: 2026,
    image: "logo-kidzania.jpg",
    summary: {
      tr: "KidZania İstanbul'daki Logo Yazılım Yazılım Geliştirme Merkezi için kurgulanan interaktif deneyim. Çocuklar gerçek bir yazılım ekibi gibi çalışıp kendi projelerini üretiyor.",
      en: "An interactive experience built for the Logo Yazılım Software Development Centre at KidZania İstanbul, where children work like a real software team and ship their own projects.",
    },
    links: [{ kind: "web", url: "https://istanbul.kidzania.com/yazilim-gelistirme-merkezi" }],
  },
  {
    slug: "date-for-dead",
    title: "Date For Dead",
    service: "markali-oyunlar",
    year: 2026,
    image: "date-for-dead.jpg",
    summary: {
      tr: "Steam'de yayınlanan, mezarlıkta geçen kara mizahlı bir flört oyunu. Elle çizilmiş sanat yönetimi ve kendine özgü oynanış döngüsü.",
      en: "A darkly comic dating game set in a graveyard, released on Steam. Hand-drawn art direction and a gameplay loop of its own.",
    },
    links: [{ kind: "steam", url: "https://store.steampowered.com/app/4622170/Date_For_Dead/" }],
  },
  {
    slug: "ikra",
    title: "İkra",
    service: "mobil-uygulama",
    year: 2026,
    image: "icon-ikra.jpg",
    iconStyle: true,
    platforms: ["iOS", "Android"],
    summary: {
      tr: "Namaz vakitleri, Kur'an okuma, kıble ve günlük zikir takibiyle İslami yaşam asistanı. On bir dilde yayında, App Store'da 4.6 puan.",
      en: "An Islamic lifestyle companion with prayer times, Quran reading, qibla and daily dhikr tracking. Live in eleven languages, rated 4.6 on the App Store.",
    },
    links: [
      { kind: "appstore", url: "https://apps.apple.com/app/id6756602687" },
      { kind: "instagram", url: "https://www.instagram.com/ikra.mobile/" },
    ],
  },
  {
    slug: "snappet",
    title: "SnapPet",
    service: "mobil-uygulama",
    year: 2026,
    image: "icon-snappet.jpg",
    iconStyle: true,
    platforms: ["iOS", "Android"],
    summary: {
      tr: "Sokakta gördüğünüz kedi ve köpekleri fotoğraflayıp koleksiyona dönüştüren kamera tabanlı kart oyunu. iOS ve Android sürümleri var.",
      en: "A camera-based card game that turns the cats and dogs you meet on the street into a collection. Available on iOS and Android.",
    },
    links: [
      { kind: "appstore", url: "https://apps.apple.com/app/id6784579838" },
      { kind: "instagram", url: "https://www.instagram.com/playsnappet/" },
    ],
  },
  {
    slug: "photosensia",
    title: "PhotoSensia Kids",
    service: "mobil-uygulama",
    year: 2026,
    image: "photosensia.jpg",
    summary: {
      tr: "Çocuklar için tasarlanmış, sade ve güvenli bir fotoğraf uygulaması. App Store ve Google Play'de yayında.",
      en: "A simple, safe photo app designed for children. Live on the App Store and Google Play.",
    },
    links: [
      { kind: "appstore", url: "https://apps.apple.com/app/id6624305795" },
      { kind: "playstore", url: "https://play.google.com/store/apps/details?id=com.photosensia.photosensiaforkids" },
    ],
  },
  {
    slug: "pofu",
    title: "Pofu",
    service: "mobil-uygulama",
    year: 2026,
    image: "icon-pofu.jpg",
    iconStyle: true,
    summary: {
      tr: "Kadınlara özel kalori ve beslenme takibi. HealthKit ve Apple Watch entegrasyonu, ana ekran widget'ları ve saat uygulamasıyla birlikte.",
      en: "Calorie and nutrition tracking built for women, with HealthKit and Apple Watch integration, home screen widgets and a watch app.",
    },
    links: [
      { kind: "appstore", url: "https://apps.apple.com/app/id6778044605" },
      { kind: "instagram", url: "https://www.instagram.com/pofu.app/" },
    ],
  },
  {
    slug: "habitile",
    title: "Habitile",
    service: "mobil-uygulama",
    year: 2026,
    image: "icon-habitile.jpg",
    iconStyle: true,
    summary: {
      tr: "Sakin ve widget öncelikli alışkanlık takibi. Ana ekrandan, kilit ekranından veya Apple Watch'tan tek dokunuşla işaretliyorsunuz; affeden seriler bir günü kaçırınca ilerlemeyi silmiyor. Altı dilde yayında.",
      en: "A calm, widget-first habit tracker. Check habits with one tap from the Home Screen, Lock Screen or Apple Watch, and forgiving streaks mean one missed day won't wipe your progress. Live in six languages.",
    },
    links: [{ kind: "appstore", url: "https://apps.apple.com/app/id6779264379" }],
  },
  {
    slug: "divonia",
    title: "Divonia Studios",
    service: "web-sitesi",
    year: 2026,
    summary: {
      tr: "Bir oyun stüdyosu için kurumsal web sitesi: stüdyonun işlerini ve kimliğini yansıtan sade, hızlı bir tanıtım sitesi.",
      en: "A corporate website for a game studio: a clean, fast presence that reflects the studio's work and identity.",
    },
    links: [{ kind: "web", url: "https://divoniastudios.com" }],
  },
  {
    slug: "aysquilt",
    title: "AysQuilt",
    service: "e-ticaret-optimizasyonu",
    year: 2026,
    image: "aysquilt.jpg",
    summary: {
      tr: "El yapımı çanta charm ve aksesuar markasının Trendyol mağazası: ürün görselleri, başlık ve açıklama metinleri dönüşüm için yeniden düzenlendi.",
      en: "A handmade bag charm and accessory brand's Trendyol store: product imagery, titles and descriptions rebuilt around conversion.",
    },
    links: [
      { kind: "trendyol", url: "https://www.trendyol.com/magaza/aysquilt-m-1070133" },
      { kind: "instagram", url: "https://www.instagram.com/aysquilt/" },
    ],
  },
];

/** Ana sayfada gösterilecek öne çıkanlar. */
export const featuredSlugs = ["logo-kidzania", "date-for-dead", "ikra"] as const;

export function serviceOf(project: Project): ServiceSlug {
  return project.service;
}
