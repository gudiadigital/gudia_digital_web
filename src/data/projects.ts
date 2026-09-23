import type { Locale, ServiceSlug } from "@/i18n/config";

export type ProjectLinkKind =
  | "appstore"
  | "playstore"
  | "steam"
  | "web"
  | "trendyol"
  | "instagram";

export type ProjectLink = { kind: ProjectLinkKind; url: string };

/** Mağaza puanı. Statik site olduğu için ölçüm tarihiyle birlikte tutulur. */
export type ProjectRating = {
  score: number;
  count: number;
  /** Hangi mağazadan okundu (şu an yalnızca App Store TR vitrini). */
  store: "appstore";
  /** YYYY-MM-DD — sayfada "… itibarıyla" olarak gösterilir. */
  asOf: string;
};

export type Project = {
  slug: string;
  title: string;
  /** Kısa tanıtım — her dil için ayrı. */
  summary: Record<Locale, string>;
  /** Detay sayfasındaki uzun anlatım; her paragraf bir dizi elemanı. */
  detail?: Record<Locale, string[]>;
  /** Detay sayfasındaki künye satırları (sürüm, platform, dil sayısı…). */
  facts?: Record<Locale, { k: string; v: string }[]>;
  rating?: ProjectRating;
  /**
   * public/projeler/<slug>/ altındaki ekran görüntüsü sayısı.
   * Dosyalar ss-1.jpg … ss-N.jpg olarak adlandırılır.
   */
  shots?: number;
  service: ServiceSlug;
  year: number;
  /** public/projeler/ altındaki görsel adı; yoksa kart tipografik görünür. */
  image?: string;
  /** true ise kart görseli ikon gibi (kare, ortalanmış) gösterilir. */
  iconStyle?: boolean;
  links: ProjectLink[];
};

/** iOS / Android / PC rozetleri bağlantılardan türetilir. */
export const platformOf: Partial<Record<ProjectLinkKind, string>> = {
  appstore: "iOS",
  playstore: "Android",
  steam: "PC",
};

/*
 * Sıra Gürkan'ın belirlediği gibi: Pofu, SnapPet, Habitile, İkra, sonra
 * kalan uygulama, ardından markalı oyunlar, en sonda web ve e-ticaret.
 * Hem Projeler sayfası hem ana sayfadaki öne çıkanlar bu diziden okuyor.
 *
 * Geniş kart yuvaları 0, 3 ve 6'ya düşüyor (bkz. ProjectsContent); o üç
 * sıradaki işin görseli yüksek çözünürlüklü olmalı.
 */
export const projects: Project[] = [
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
    detail: {
      tr: [
        "Pofu, kadınlar için tasarlanmış bir kalori ve beslenme takip uygulaması. Tabağınızın fotoğrafını çekiyorsunuz; uygulama yemeği tanıyıp kalorisini ve makrolarını çıkarıyor.",
        "Çoğu kalori uygulaması herkese aynı kural kitabını uyguluyor: sabit bir hedef, her sabah düşmesi beklenen bir tartı. Pofu iştah, su tutma ve enerji dalgalanmalarını hesaba katacak şekilde kurgulandı.",
        "HealthKit ve Apple Watch entegrasyonu, ana ekran widget'ları ve bir saat uygulamasıyla birlikte geliyor.",
      ],
      en: [
        "Pofu is a calorie and nutrition tracker built for women. You photograph your plate and the app recognises the meal, then works out its calories and macros.",
        "Most calorie apps apply one rulebook to everyone: a fixed target and a scale that is supposed to drop every morning. Pofu was designed to account for appetite, water retention and energy swings instead.",
        "It ships with HealthKit and Apple Watch integration, Home Screen widgets and a watch app.",
      ],
    },
    facts: {
      tr: [
        { k: "Sürüm", v: "2.0.4" },
        { k: "Platform", v: "iOS" },
        { k: "Dil", v: "6" },
        { k: "Kategori", v: "Sağlık & Fitness" },
      ],
      en: [
        { k: "Version", v: "2.0.4" },
        { k: "Platform", v: "iOS" },
        { k: "Languages", v: "6" },
        { k: "Category", v: "Health & Fitness" },
      ],
    },
    rating: { score: 5.0, count: 2, store: "appstore", asOf: "2026-09-23" },
    shots: 6,
    links: [
      { kind: "appstore", url: "https://apps.apple.com/app/id6778044605" },
      { kind: "instagram", url: "https://www.instagram.com/pofu.app/" },
    ],
  },
  {
    slug: "snappet",
    title: "SnapPet",
    service: "mobil-uygulama",
    year: 2026,
    image: "icon-snappet.jpg",
    iconStyle: true,
    summary: {
      tr: "Sokakta gördüğünüz kedi ve köpekleri fotoğraflayıp koleksiyona dönüştüren kamera tabanlı kart oyunu. iOS ve Android sürümleri var.",
      en: "A camera-based card game that turns the cats and dogs you meet on the street into a collection. Available on iOS and Android.",
    },
    detail: {
      tr: [
        "SnapPet, sokakta gördüğünüz kedi ve köpekleri kameranızla fotoğraflayıp koleksiyona dönüştüren bir kart oyunu. Her hayvan kendi nadirliği, adı ve özellikleriyle benzersiz bir karta dönüşüyor.",
        "Aynı fotoğraf her zaman aynı kartı üretiyor: hazır görsel yüklemek yok, rastgele kutu açma yok. Bulduğunuz şey gerçekten sizin bulduğunuz şey.",
        "iOS ve Android'de, on bir dilde yayında.",
      ],
      en: [
        "SnapPet is a card game that turns the street cats and dogs around you into a collection you build with your camera. Each animal becomes a unique card with its own rarity, name and traits.",
        "The same photo always produces the same card: no importing existing pictures, no random gacha. What you find is genuinely what you found.",
        "Live on iOS and Android in eleven languages.",
      ],
    },
    facts: {
      tr: [
        { k: "Sürüm", v: "1.0.8" },
        { k: "Platform", v: "iOS + Android" },
        { k: "Dil", v: "11" },
        { k: "Kategori", v: "Oyun" },
      ],
      en: [
        { k: "Version", v: "1.0.8" },
        { k: "Platform", v: "iOS + Android" },
        { k: "Languages", v: "11" },
        { k: "Category", v: "Games" },
      ],
    },
    rating: { score: 5.0, count: 9, store: "appstore", asOf: "2026-09-23" },
    shots: 6,
    links: [
      { kind: "appstore", url: "https://apps.apple.com/app/id6784579838" },
      { kind: "playstore", url: "https://play.google.com/store/apps/details?id=com.easestack.snappet" },
      { kind: "instagram", url: "https://www.instagram.com/playsnappet/" },
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
    detail: {
      tr: [
        "Habitile, widget öncelikli ve sakin bir alışkanlık takibi. Uygulamayı açmaya gerek kalmadan ana ekrandan, kilit ekranından veya Apple Watch'tan tek dokunuşla işaretliyorsunuz.",
        "Etkileşimli widget'lar, Live Activity ve bir saat uygulaması var. Affeden seriler sayesinde bir günü kaçırmak biriken ilerlemeyi sıfırlamıyor.",
        "Altı dilde yayında.",
      ],
      en: [
        "Habitile is a calm, widget-first habit tracker. You check habits with one tap from the Home Screen, Lock Screen or Apple Watch, without opening the app.",
        "It has interactive widgets, Live Activities and a watch app. Forgiving streaks mean one missed day doesn't wipe the progress you've built.",
        "Live in six languages.",
      ],
    },
    facts: {
      tr: [
        { k: "Sürüm", v: "1.0" },
        { k: "Platform", v: "iOS + watchOS" },
        { k: "Dil", v: "6" },
        { k: "Kategori", v: "Verimlilik" },
      ],
      en: [
        { k: "Version", v: "1.0" },
        { k: "Platform", v: "iOS + watchOS" },
        { k: "Languages", v: "6" },
        { k: "Category", v: "Productivity" },
      ],
    },
    shots: 6,
    links: [{ kind: "appstore", url: "https://apps.apple.com/app/id6779264379" }],
  },
  {
    slug: "ikra",
    title: "İkra",
    service: "mobil-uygulama",
    year: 2026,
    image: "icon-ikra.jpg",
    iconStyle: true,
    summary: {
      tr: "Namaz vakitleri, Kur'an okuma, kıble ve günlük zikir takibiyle İslami yaşam asistanı. iOS ve Android'de, yirmi bir dilde yayında.",
      en: "An Islamic lifestyle companion with prayer times, Quran reading, qibla and daily dhikr tracking. Live on iOS and Android in twenty-one languages.",
    },
    detail: {
      tr: [
        "İkra; namaz vakitleri, Kur'an okuma, kıble, dua, zikir, hadis ve İslami takvimi tek uygulamada toplayan günlük bir yaşam asistanı.",
        "Esmaü'l-Hüsna, günlük ayet ve ibadet takibi gibi bölümlerle gün boyunca kullanılacak şekilde kurgulandı.",
        "İkisi de yayında olan iOS ve Android sürümleri var; mağaza metinleri yirmi bir dile çevrildi.",
      ],
      en: [
        "Ikra is a daily Islamic companion that brings prayer times, Quran reading, qibla, duas, dhikr, hadith and the Islamic calendar into one app.",
        "Sections like the 99 Names of Allah, a daily verse and worship tracking are built for use throughout the day.",
        "Both the iOS and Android versions are live, and the store listing is translated into twenty-one languages.",
      ],
    },
    facts: {
      tr: [
        { k: "Sürüm", v: "2.0.7" },
        { k: "Platform", v: "iOS + Android" },
        { k: "Dil", v: "21" },
        { k: "Kategori", v: "Referans" },
      ],
      en: [
        { k: "Version", v: "2.0.7" },
        { k: "Platform", v: "iOS + Android" },
        { k: "Languages", v: "21" },
        { k: "Category", v: "Reference" },
      ],
    },
    rating: { score: 4.5, count: 87, store: "appstore", asOf: "2026-09-23" },
    shots: 6,
    links: [
      { kind: "appstore", url: "https://apps.apple.com/app/id6756602687" },
      { kind: "playstore", url: "https://play.google.com/store/apps/details?id=com.gurkan.ikra" },
      { kind: "instagram", url: "https://www.instagram.com/ikra.mobile/" },
    ],
  },
  {
    slug: "photosensia",
    title: "PhotoSensia Kids",
    service: "mobil-uygulama",
    year: 2026,
    image: "icon-photosensia.jpg",
    iconStyle: true,
    summary: {
      tr: "Çocuklar için tasarlanmış, sade ve güvenli bir fotoğraf uygulaması. App Store ve Google Play'de yayında.",
      en: "A simple, safe photo app designed for children. Live on the App Store and Google Play.",
    },
    detail: {
      tr: [
        "PhotoSensia Kids, çocuklara fotoğrafçılığı oyunlaştırarak öğreten bir eğitim uygulaması. Türkiye Fotoğraf Sanatı Federasyonu (TFSF) tarafından tavsiye ediliyor.",
        "Küçük fotoğrafçılar görevlerle ilerliyor: her bölüm bir çekim tekniğini anlatıyor ve çocuğun kendi telefonuyla denemesini istiyor.",
        "iOS ve Android'de yayında.",
      ],
      en: [
        "PhotoSensia Kids is an educational app that teaches children photography through play. It is recommended by the Photographic Arts Federation of Türkiye (TFSF).",
        "Young photographers progress through missions: each one explains a shooting technique and asks the child to try it with their own phone.",
        "Live on iOS and Android.",
      ],
    },
    facts: {
      tr: [
        { k: "Sürüm", v: "4.1.4" },
        { k: "Platform", v: "iOS + Android" },
        { k: "Kategori", v: "Eğitim" },
        { k: "Tavsiye", v: "TFSF" },
      ],
      en: [
        { k: "Version", v: "4.1.4" },
        { k: "Platform", v: "iOS + Android" },
        { k: "Category", v: "Education" },
        { k: "Endorsed by", v: "TFSF" },
      ],
    },
    rating: { score: 5.0, count: 8, store: "appstore", asOf: "2026-09-23" },
    shots: 6,
    links: [
      { kind: "appstore", url: "https://apps.apple.com/app/id6624305795" },
      { kind: "playstore", url: "https://play.google.com/store/apps/details?id=com.photosensia.photosensiaforkids" },
    ],
  },
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
    detail: {
      tr: [
        "KidZania İstanbul'daki Logo Yazılım Yazılım Geliştirme Merkezi için kurgulanan interaktif deneyim.",
        "Çocuklar merkeze girdiklerinde gerçek bir yazılım ekibi gibi çalışıyor: görevi alıyor, üzerinde çalışıyor ve sonunda kendi projelerini ortaya çıkarıyor.",
        "Deneyim fiziksel mekânla birlikte tasarlandı; ekranlardaki akış merkezin kendi düzenine göre kurgulandı.",
      ],
      en: [
        "An interactive experience built for the Logo Yazılım Software Development Centre at KidZania İstanbul.",
        "Children entering the centre work like a real software team: they take a brief, work through it and end up shipping a project of their own.",
        "The experience was designed together with the physical space, so the on-screen flow follows the centre's own layout.",
      ],
    },
    facts: {
      tr: [
        { k: "Yıl", v: "2026" },
        { k: "Tür", v: "Mekâna özel deneyim" },
        { k: "Konum", v: "KidZania İstanbul" },
      ],
      en: [
        { k: "Year", v: "2026" },
        { k: "Type", v: "Location-based experience" },
        { k: "Venue", v: "KidZania İstanbul" },
      ],
    },
    shots: 3,
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
    detail: {
      tr: [
        "Steam'de yayınlanan, mezarlıkta geçen kara mizahlı bir flört oyunu.",
        "Elle çizilmiş sanat yönetimi ve kendine özgü bir oynanış döngüsü var; hikâye seçimlerle ilerliyor.",
        "PC için yayınlandı.",
      ],
      en: [
        "A darkly comic dating game set in a graveyard, released on Steam.",
        "It has hand-drawn art direction and a gameplay loop of its own, with a story that moves forward through choices.",
        "Released for PC.",
      ],
    },
    facts: {
      tr: [
        { k: "Platform", v: "PC (Steam)" },
        { k: "Tür", v: "Görsel roman" },
        { k: "Yıl", v: "2026" },
      ],
      en: [
        { k: "Platform", v: "PC (Steam)" },
        { k: "Genre", v: "Visual novel" },
        { k: "Year", v: "2026" },
      ],
    },
    shots: 6,
    links: [{ kind: "steam", url: "https://store.steampowered.com/app/4622170/Date_For_Dead/" }],
  },
  {
    slug: "divonia",
    title: "Divonia Studios",
    service: "web-sitesi",
    year: 2026,
    image: "icon-divonia.jpg",
    iconStyle: true,
    summary: {
      tr: "Bir oyun stüdyosu için kurumsal web sitesi: stüdyonun işlerini ve kimliğini yansıtan sade, hızlı bir tanıtım sitesi.",
      en: "A corporate website for a game studio: a clean, fast presence that reflects the studio's work and identity.",
    },
    detail: {
      tr: [
        "Bir oyun stüdyosu için kurumsal web sitesi: stüdyonun işlerini ve kimliğini yansıtan sade, hızlı bir tanıtım sitesi.",
        "Site stüdyonun yayınladığı oyunları ve iş birliklerini tek sayfada topluyor; ziyaretçi birkaç saniyede ne yaptıklarını görüyor.",
      ],
      en: [
        "A corporate website for a game studio: a clean, fast presence that reflects the studio's work and identity.",
        "The site gathers the studio's released games and collaborations on a single page, so a visitor sees what they do within seconds.",
      ],
    },
    facts: {
      tr: [
        { k: "Tür", v: "Kurumsal site" },
        { k: "Yıl", v: "2026" },
      ],
      en: [
        { k: "Type", v: "Corporate site" },
        { k: "Year", v: "2026" },
      ],
    },
    shots: 4,
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
    detail: {
      tr: [
        "El yapımı çanta charm ve aksesuar markasının Trendyol mağazası.",
        "Ürün görselleri, başlık ve açıklama metinleri dönüşüm için yeniden düzenlendi: aynı ürünler, aramada daha görünür ve satın alma kararını kolaylaştıran bir düzen.",
      ],
      en: [
        "The Trendyol store of a handmade bag charm and accessory brand.",
        "Product imagery, titles and descriptions were rebuilt around conversion: the same products, made more visible in search and easier to decide on.",
      ],
    },
    facts: {
      tr: [
        { k: "Kanal", v: "Trendyol" },
        { k: "Mağaza puanı", v: "9,8 / 10" },
        { k: "Takipçi", v: "256" },
        { k: "Kapsam", v: "Görsel + metin düzeni" },
      ],
      en: [
        { k: "Channel", v: "Trendyol" },
        { k: "Store rating", v: "9.8 / 10" },
        { k: "Followers", v: "256" },
        { k: "Scope", v: "Imagery + copy" },
      ],
    },
    shots: 3,
    links: [
      { kind: "trendyol", url: "https://www.trendyol.com/magaza/aysquilt-m-1070133" },
      { kind: "instagram", url: "https://www.instagram.com/aysquilt/" },
    ],
  },
];

/** Ana sayfada gösterilecek öne çıkanlar. */
export const featuredSlugs = ["pofu", "snappet", "date-for-dead"] as const;

export function serviceOf(project: Project): ServiceSlug {
  return project.service;
}
