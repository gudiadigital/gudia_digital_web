import type { Locale, ServiceSlug } from "@/i18n/config";

export type ProjectLinkKind =
  | "appstore"
  | "playstore"
  | "steam"
  | "web"
  | "trendyol"
  | "instagram";

export type ProjectLink = { kind: ProjectLinkKind; url: string };

export type ShotSize = { w: number; h: number };

/** Mağaza puanı. Statik site olduğu için ölçüm tarihiyle birlikte tutulur. */
export type ProjectRating = {
  score: number;
  count: number;
  /** Hangi mağazadan okundu (şu an yalnızca App Store TR vitrini). */
  store: "appstore";
  /** YYYY-MM-DD — sayfada "… itibarıyla" olarak gösterilir. */
  asOf: string;
};

/**
 * İşin yapılandırılmış verideki karşılığı (schema.org). Sayfada görünen
 * bilgiden fazlasını söylemiyor.
 *
 * `relation` Gudia Dijital'in işle ilişkisi: kendi uygulamalarımızda
 * sourceOrganization, kendi yaptığımız tanıtım sitelerinde creator. Rolün
 * henüz netleşmediği işlerde (PhotoSensia, KidZania, Date For Dead,
 * Divonia, AysQuilt) boş; boşken hiçbir ilişki iddia edilmiyor.
 *
 * Mağaza puanı, fiyat, yayın tarihi ve sürüm bilerek burada yok: Google
 * başka sitelerden alınmış puanın işaretlenmesine izin vermiyor, mağaza
 * bilgisi de statik sitede sessizce eskiyor.
 */
export type ProjectSchema = {
  type: string | string[];
  /** Düğümün adı proje adından farklıysa (ör. "… Trendyol mağazası"). */
  name?: Record<Locale, string>;
  applicationCategory?: string;
  operatingSystem?: string;
  gamePlatform?: string | string[];
  relation?: "sourceOrganization" | "creator" | "contributor";
  /** Mağaza kaydındaki geliştirici ve yayıncı başka bir stüdyoysa. */
  authorOrg?: "divonia";
  /** İşin konusu olan marka; marka düğümünün sameAs'ı projenin bağlantıları. */
  aboutBrand?: string;
};

export type Project = {
  slug: string;
  title: string;
  /** Kısa tanıtım — her dil için ayrı. */
  summary: Record<Locale, string>;
  /**
   * Arama sonucu ve paylaşım kartı için başlık ve açıklama. Başlık yoksa
   * proje adı, açıklama yoksa `summary`'den kısaltılan metin kullanılır.
   * Sayfadaki H1 hep proje adı kalır.
   */
  seo?: Record<Locale, { title?: string; description?: string }>;
  /** Detay sayfasındaki uzun anlatım; her paragraf bir dizi elemanı. */
  detail?: Record<Locale, string[]>;
  /**
   * Detay sayfasındaki künye satırları (sürüm, platform, dil sayısı…).
   * Sürüm, App Store'daki son sürümün tarihiyle yazılıyor: statik sitede
   * tarihsiz sürüm bir sonraki güncellemede sessizce eskiyor.
   */
  facts?: Record<Locale, { k: string; v: string }[]>;
  rating?: ProjectRating;
  /**
   * public/projeler/<slug>/ altındaki ekran görüntüsü sayısı.
   * Dosyalar ss-1.webp … ss-N.webp olarak adlandırılır.
   */
  shots?: number;
  /**
   * Ekran görüntülerinin piksel boyutu; <img>'nin width/height'ı. Tarayıcı
   * görsel inmeden yerini ayırıyor, şerit yüklenirken yana kaymıyor.
   * `sips -g pixelWidth -g pixelHeight public/projeler/<slug>/ss-1.webp`
   * ile ölçülüyor. Klasördeki görseller farklı boyuttaysa sırayla her biri.
   */
  shotSize?: ShotSize | ShotSize[];
  /** Projenin ana hizmet alanı; kartta bu yazıyor. */
  service: ServiceSlug;
  /**
   * Ek hizmet alanları. Bir iş birden fazla kapsama girebiliyor; hizmet
   * sayfasındaki referans listesi hem `service` hem buradakilere bakıyor.
   */
  alsoServices?: ServiceSlug[];
  year: number;
  /** public/projeler/ altındaki görsel adı; yoksa kart tipografik görünür. */
  image?: string;
  /** true ise kart görseli ikon gibi (kare, ortalanmış) gösterilir. */
  iconStyle?: boolean;
  links: ProjectLink[];
  schema: ProjectSchema;
};

/** n. ekran görüntüsünün boyutu (1'den başlıyor); bilinmiyorsa undefined. */
export function shotSizeOf(project: Project, n: number): ShotSize | undefined {
  const size = project.shotSize;
  return Array.isArray(size) ? size[n - 1] : size;
}

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
    alsoServices: ["sosyal-medya-icerik"],
    year: 2026,
    image: "icon-pofu.webp",
    iconStyle: true,
    summary: {
      tr: "Kadınlara özel kalori ve beslenme takibi. HealthKit ve Apple Watch entegrasyonu, ana ekran widget'ları ve saat uygulamasıyla birlikte.",
      en: "Calorie and nutrition tracking built for women, with HealthKit and Apple Watch integration, home screen widgets and a watch app.",
    },
    seo: {
      tr: { title: "Pofu: Kadınlara Özel Kalori Takip Uygulaması" },
      en: { title: "Pofu: Calorie Tracker Built for Women" },
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
        { k: "Sürüm", v: "2.0.5 (25 Eylül 2026 itibarıyla)" },
        { k: "Platform", v: "iOS" },
        { k: "Dil", v: "6" },
        { k: "Kategori", v: "Sağlık & Fitness" },
      ],
      en: [
        { k: "Version", v: "2.0.5 (as of 25 September 2026)" },
        { k: "Platform", v: "iOS" },
        { k: "Languages", v: "6" },
        { k: "Category", v: "Health & Fitness" },
      ],
    },
    rating: { score: 5.0, count: 2, store: "appstore", asOf: "2026-09-23" },
    shots: 6,
    shotSize: { w: 498, h: 1080 },
    links: [
      { kind: "appstore", url: "https://apps.apple.com/app/id6778044605" },
      { kind: "instagram", url: "https://www.instagram.com/pofu.app/" },
      { kind: "web", url: "https://gurkansvlms.github.io/nutrition-legal-site/" },
    ],
    schema: {
      type: "MobileApplication",
      applicationCategory: "HealthApplication",
      operatingSystem: "iOS",
      relation: "sourceOrganization",
    },
  },
  {
    slug: "snappet",
    title: "SnapPet",
    service: "mobil-uygulama",
    alsoServices: ["sosyal-medya-icerik"],
    year: 2026,
    image: "icon-snappet.webp",
    iconStyle: true,
    summary: {
      tr: "Sokakta gördüğünüz kedi ve köpekleri fotoğraflayıp koleksiyona dönüştüren kamera tabanlı kart oyunu. iOS ve Android sürümleri var.",
      en: "A camera-based card game that turns the cats and dogs you meet on the street into a collection. Available on iOS and Android.",
    },
    seo: {
      tr: { title: "SnapPet: Kamera Tabanlı Kedi ve Köpek Kart Oyunu" },
      en: { title: "SnapPet: Camera-Based Cat and Dog Card Game" },
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
        { k: "Sürüm", v: "1.0.8 (1 Ağustos 2026 itibarıyla)" },
        { k: "Platform", v: "iOS + Android" },
        { k: "Dil", v: "11" },
        { k: "Kategori", v: "Oyun" },
      ],
      en: [
        { k: "Version", v: "1.0.8 (as of 1 August 2026)" },
        { k: "Platform", v: "iOS + Android" },
        { k: "Languages", v: "11" },
        { k: "Category", v: "Games" },
      ],
    },
    rating: { score: 5.0, count: 9, store: "appstore", asOf: "2026-09-23" },
    shots: 6,
    shotSize: { w: 498, h: 1080 },
    links: [
      { kind: "appstore", url: "https://apps.apple.com/app/id6784579838" },
      { kind: "playstore", url: "https://play.google.com/store/apps/details?id=com.easestack.snappet" },
      { kind: "instagram", url: "https://www.instagram.com/playsnappet/" },
      { kind: "web", url: "https://gurkansvlms.github.io/SnapPetWeb/" },
    ],
    schema: {
      type: ["MobileApplication", "VideoGame"],
      applicationCategory: "GameApplication",
      operatingSystem: "iOS, Android",
      gamePlatform: ["iOS", "Android"],
      relation: "sourceOrganization",
    },
  },
  {
    slug: "habitile",
    title: "Habitile",
    service: "mobil-uygulama",
    year: 2026,
    image: "icon-habitile.webp",
    iconStyle: true,
    summary: {
      tr: "Sakin ve widget öncelikli alışkanlık takibi. Ana ekrandan, kilit ekranından veya Apple Watch'tan tek dokunuşla işaretliyorsunuz; affeden seriler bir günü kaçırınca ilerlemeyi silmiyor. Altı dilde yayında.",
      en: "A calm, widget-first habit tracker. Check habits with one tap from the Home Screen, Lock Screen or Apple Watch, and forgiving streaks mean one missed day won't wipe your progress. Live in six languages.",
    },
    seo: {
      tr: {
        title: "Habitile: Widget Öncelikli Alışkanlık Takibi",
        description:
          "Habitile, widget öncelikli alışkanlık takip uygulaması: her alışkanlığı ana ekrandan, kilit ekranından veya Apple Watch'tan tek dokunuşla işaretliyorsunuz.",
      },
      en: {
        title: "Habitile: Widget-First Habit Tracker",
        description:
          "Habitile is a calm, widget-first habit tracker: check habits with one tap from the Home Screen, Lock Screen or Apple Watch. Live in six languages.",
      },
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
        { k: "Sürüm", v: "1.0 (10 Temmuz 2026 itibarıyla)" },
        { k: "Platform", v: "iOS + watchOS" },
        { k: "Dil", v: "6" },
        { k: "Kategori", v: "Verimlilik" },
      ],
      en: [
        { k: "Version", v: "1.0 (as of 10 July 2026)" },
        { k: "Platform", v: "iOS + watchOS" },
        { k: "Languages", v: "6" },
        { k: "Category", v: "Productivity" },
      ],
    },
    shots: 6,
    shotSize: { w: 498, h: 1080 },
    links: [
      { kind: "appstore", url: "https://apps.apple.com/app/id6779264379" },
      { kind: "web", url: "https://gurkansvlms.github.io/widgetai-habit-legal-site/" },
    ],
    // Mağaza türü Verimlilik; Google'ın uygulama kategorilerinde karşılığı
    // olmadığı için en yakını seçildi.
    schema: {
      type: "MobileApplication",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "iOS",
      relation: "sourceOrganization",
    },
  },
  {
    slug: "ikra",
    title: "İkra",
    service: "mobil-uygulama",
    year: 2026,
    image: "icon-ikra.webp",
    iconStyle: true,
    summary: {
      tr: "Namaz vakitleri, Kur'an okuma, kıble ve günlük zikir takibiyle İslami yaşam asistanı. iOS ve Android'de, yirmi bir dilde yayında.",
      en: "An Islamic lifestyle companion with prayer times, Quran reading, qibla and daily dhikr tracking. Live on iOS and Android in twenty-one languages.",
    },
    seo: {
      tr: { title: "İkra: Namaz Vakitleri ve Kur'an Uygulaması" },
      en: { title: "İkra: Prayer Times and Quran App" },
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
        { k: "Sürüm", v: "2.0.7 (18 Eylül 2026 itibarıyla)" },
        { k: "Platform", v: "iOS + Android" },
        { k: "Dil", v: "21" },
        { k: "Kategori", v: "Referans" },
      ],
      en: [
        { k: "Version", v: "2.0.7 (as of 18 September 2026)" },
        { k: "Platform", v: "iOS + Android" },
        { k: "Languages", v: "21" },
        { k: "Category", v: "Reference" },
      ],
    },
    rating: { score: 4.5, count: 87, store: "appstore", asOf: "2026-09-23" },
    shots: 6,
    shotSize: { w: 608, h: 1080 },
    links: [
      // Yalnızca TR mağazasında; ülkesiz bağlantı yurt dışından açılınca 404 veriyor.
      { kind: "appstore", url: "https://apps.apple.com/tr/app/id6756602687" },
      { kind: "playstore", url: "https://play.google.com/store/apps/details?id=com.gurkan.ikra" },
      { kind: "instagram", url: "https://www.instagram.com/ikra.mobile/" },
      { kind: "web", url: "https://ikraapp.netlify.app" },
    ],
    schema: {
      type: "MobileApplication",
      applicationCategory: "ReferenceApplication",
      operatingSystem: "iOS, Android",
      relation: "sourceOrganization",
    },
  },
  {
    slug: "photosensia",
    title: "PhotoSensia Kids",
    service: "markali-oyunlar",
    year: 2026,
    image: "icon-photosensia.webp",
    iconStyle: true,
    summary: {
      tr: "Çocuklar için tasarlanmış, sade ve güvenli bir fotoğraf uygulaması. App Store ve Google Play'de yayında.",
      en: "A simple, safe photo app designed for children. Live on the App Store and Google Play.",
    },
    seo: {
      tr: {
        title: "PhotoSensia Kids: Çocuklar İçin Fotoğraf Eğitimi",
        description:
          "PhotoSensia Kids, çocuklara fotoğrafçılığı oyunla öğreten bir eğitim uygulaması: her bölüm bir çekim tekniğini anlatıyor. iOS ve Android'de yayında.",
      },
      en: {
        title: "PhotoSensia Kids: Photography App for Children",
        description:
          "PhotoSensia Kids is an educational app that teaches children photography through play, one shooting technique per mission. Live on iOS and Android.",
      },
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
        { k: "Sürüm", v: "4.1.4 (6 Temmuz 2025 itibarıyla)" },
        { k: "Platform", v: "iOS + Android" },
        { k: "Kategori", v: "Eğitim" },
        { k: "Tavsiye", v: "TFSF" },
      ],
      en: [
        { k: "Version", v: "4.1.4 (as of 6 July 2025)" },
        { k: "Platform", v: "iOS + Android" },
        { k: "Category", v: "Education" },
        { k: "Endorsed by", v: "TFSF" },
      ],
    },
    rating: { score: 5.0, count: 8, store: "appstore", asOf: "2026-09-23" },
    shots: 6,
    shotSize: { w: 498, h: 1080 },
    links: [
      { kind: "appstore", url: "https://apps.apple.com/app/id6624305795" },
      { kind: "playstore", url: "https://play.google.com/store/apps/details?id=com.photosensia.photosensiaforkids" },
    ],
    schema: {
      type: "MobileApplication",
      applicationCategory: "EducationalApplication",
      operatingSystem: "iOS, Android",
    },
  },
  {
    slug: "logo-kidzania",
    title: "Logo Yazılım × KidZania İstanbul",
    service: "markali-oyunlar",
    year: 2026,
    image: "logo-kidzania.webp",
    summary: {
      tr: "KidZania İstanbul'daki Logo Yazılım'ın Yazılım Geliştirme Merkezi için kurgulanan interaktif deneyim. Çocuklar gerçek bir yazılım ekibi gibi çalışıp kendi projelerini üretiyor.",
      en: "An interactive experience built for the Logo Yazılım Software Development Centre at KidZania İstanbul, where children work like a real software team and ship their own projects.",
    },
    seo: {
      tr: {
        title: "Logo Yazılım × KidZania: İnteraktif Deneyim",
        description:
          "KidZania İstanbul'daki Logo Yazılım'ın Yazılım Geliştirme Merkezi için kurgulanan interaktif deneyim: çocuklar gerçek bir yazılım ekibi gibi çalışıyor.",
      },
      en: {
        title: "Logo Yazılım × KidZania: Interactive Experience",
        description:
          "An interactive experience for the Logo Yazılım Software Development Centre at KidZania İstanbul, where children work like a real software team.",
      },
    },
    detail: {
      tr: [
        "KidZania İstanbul'daki Logo Yazılım'ın Yazılım Geliştirme Merkezi için kurgulanan interaktif deneyim.",
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
    shotSize: [
      { w: 1600, h: 1000 },
      { w: 1600, h: 640 },
      { w: 942, h: 1000 },
    ],
    links: [{ kind: "web", url: "https://istanbul.kidzania.com/yazilim-gelistirme-merkezi" }],
    schema: { type: "CreativeWork" },
  },
  {
    slug: "date-for-dead",
    title: "Date For Dead",
    service: "markali-oyunlar",
    year: 2026,
    image: "date-for-dead.webp",
    summary: {
      tr: "Steam sayfası yayında olan, mezarlıkta geçen kara mizahlı bir flört oyunu. Elle çizilmiş sanat yönetimi ve kendine özgü oynanış döngüsü.",
      en: "A darkly comic dating game set in a graveyard, with its Steam page now live. Hand-drawn art direction and a gameplay loop of its own.",
    },
    seo: {
      tr: { title: "Date For Dead: Kara Mizahlı Flört Oyunu (PC)" },
      en: { title: "Date For Dead: Darkly Comic Dating Game (PC)" },
    },
    detail: {
      tr: [
        "Mezarlıkta geçen kara mizahlı bir flört oyunu.",
        "Elle çizilmiş sanat yönetimi ve kendine özgü bir oynanış döngüsü var; hikâye seçimlerle ilerliyor.",
      ],
      en: [
        "A darkly comic dating game set in a graveyard.",
        "It has hand-drawn art direction and a gameplay loop of its own, with a story that moves forward through choices.",
      ],
    },
    facts: {
      tr: [
        { k: "Platform", v: "PC (Steam)" },
        // Steam oyunu "yakında" olarak listeliyor (28 Eylül 2026); çıkış
        // tarihi açıklanınca özet ve bu satır birlikte güncellenmeli.
        { k: "Durum", v: "Steam sayfası yayında, çıkış tarihi duyurulacak" },
        { k: "Tür", v: "Görsel roman" },
        { k: "Yıl", v: "2026" },
      ],
      en: [
        { k: "Platform", v: "PC (Steam)" },
        { k: "Status", v: "Steam page live, release date to be announced" },
        { k: "Genre", v: "Visual novel" },
        { k: "Year", v: "2026" },
      ],
    },
    shots: 6,
    shotSize: { w: 1080, h: 608 },
    links: [{ kind: "steam", url: "https://store.steampowered.com/app/4622170/Date_For_Dead/" }],
    // Steam kaydında geliştirici ve yayıncı Divonia Studios.
    schema: {
      type: ["VideoGame", "SoftwareApplication"],
      applicationCategory: "GameApplication",
      gamePlatform: "PC",
      authorOrg: "divonia",
    },
  },
  {
    slug: "divonia",
    title: "Divonia Studios",
    service: "web-sitesi",
    year: 2026,
    image: "icon-divonia.webp",
    iconStyle: true,
    summary: {
      tr: "Bağımsız bir oyun stüdyosunun web sitesi: logodaki piksel kalpten üretilen 3B voksel sahne, oynanabilir kart destesi ve oyun diliyle yazılmış sayfalar.",
      en: "Website for an independent game studio: a 3D voxel scene built from the logo's pixel heart, a playable card deck and pages written like a game.",
    },
    seo: {
      tr: { title: "Divonia Studios: Oyun Stüdyosu Web Sitesi" },
      en: { title: "Divonia Studios: Game Studio Website" },
    },
    detail: {
      tr: [
        "Bağımsız bir oyun stüdyosunun web sitesi: logodaki piksel kalpten üretilen 3B voksel sahne, oynanabilir kart destesi ve oyun diliyle yazılmış sayfalar.",
        "Ana sayfada kalp, kaydırdıkça seviye seviye dağılıp yeniden toplanıyor. Hemen altındaki Date For Dead bölümünde, oyunun kendisi gibi sağa kaydırılan bir eşleşme destesi var; hizmetler bir yetenek ağacı olarak, 404 sayfası da bir GAME OVER ekranı olarak tasarlandı.",
        "Site Türkçe ve İngilizce, gece ve gündüz modlu. Statik olarak üretiliyor; sunucu gerektirmeden hızlı açılıyor.",
      ],
      en: [
        "Website for an independent game studio: a 3D voxel scene built from the logo's pixel heart, a playable card deck and pages written like a game.",
        "On the home page the heart breaks apart and reassembles level by level as you scroll. Just below, the Date For Dead section has a swipe-right match deck like the game itself; services are laid out as a skill tree and the 404 page is a GAME OVER screen.",
        "The site is in Turkish and English with light and dark modes. It is generated statically, so it loads fast without a server.",
      ],
    },
    facts: {
      tr: [
        { k: "Tür", v: "Stüdyo sitesi" },
        { k: "Dil", v: "Türkçe, İngilizce" },
        { k: "Yıl", v: "2026" },
      ],
      en: [
        { k: "Type", v: "Studio website" },
        { k: "Languages", v: "Turkish, English" },
        { k: "Year", v: "2026" },
      ],
    },
    shots: 4,
    shotSize: { w: 1600, h: 1000 },
    links: [{ kind: "web", url: "https://divoniastudios.com" }],
    schema: { type: "WebSite" },
  },
  {
    slug: "deyimo",
    title: "Deyimo",
    service: "web-sitesi",
    year: 2026,
    image: "deyimo.webp",
    summary: {
      tr: "Türkçe deyim ve atasözlerini ezberletmeden öğreten uygulamanın tanıtım sitesi. 2.617 ifade, çevrimdışı kullanım.",
      en: "The marketing site for an app that teaches Turkish idioms and proverbs without rote memorisation. 2,617 expressions, works offline.",
    },
    seo: {
      tr: { title: "Deyimo: Deyim ve Atasözü Uygulamasının Sitesi" },
      en: { title: "Deyimo: Site for a Turkish Idioms App" },
    },
    detail: {
      tr: [
        "Türkçe deyim ve atasözlerini ezberleterek değil, kullanıldığı yerde göstererek öğreten uygulamanın tanıtım sitesi.",
        "Site ürünün nasıl çalıştığını adım adım anlatıyor, örnek kullanımları gösteriyor ve sık sorulanlara yanıt veriyor. İki dilde yayında.",
        "Uygulama 2.617 ifade içeriyor ve internet bağlantısı olmadan da çalışıyor.",
      ],
      en: [
        "The marketing site for an app that teaches Turkish idioms and proverbs by showing them in use rather than drilling them.",
        "The site walks through how the product works, shows example usages and answers common questions. Published in two languages.",
        "The app carries 2,617 expressions and works without an internet connection.",
      ],
    },
    facts: {
      tr: [
        { k: "Tür", v: "Ürün tanıtım sitesi" },
        { k: "İfade", v: "2.617" },
        { k: "Dil", v: "Türkçe + İngilizce" },
      ],
      en: [
        { k: "Type", v: "Product marketing site" },
        { k: "Expressions", v: "2,617" },
        { k: "Languages", v: "Turkish + English" },
      ],
    },
    shots: 4,
    shotSize: { w: 1600, h: 1000 },
    links: [{ kind: "web", url: "https://gurkansvlms.github.io/IdiomWeb" }],
    schema: { type: "WebSite", relation: "creator" },
  },
  {
    slug: "life-planner",
    title: "Life Planner",
    service: "web-sitesi",
    year: 2026,
    image: "life-planner.webp",
    summary: {
      tr: "iPhone için günlük planlayıcının tanıtım sitesi: iş, alışkanlık ve sağlık takibini tek günlük akışta toplayan uygulamayı anlatıyor. Yedi dilde.",
      en: "The marketing site for an iPhone daily planner that brings work, habits and health into one daily flow. Published in seven languages.",
    },
    seo: {
      tr: { title: "Life Planner: Günlük Planlayıcı Tanıtım Sitesi" },
      en: { title: "Life Planner: Daily Planner App Website" },
    },
    detail: {
      tr: [
        "İş planlaması, alışkanlıklar ve beslenme/vücut takibini tek bir günlük akışta toplayan iPhone uygulamasının tanıtım sitesi.",
        "Site ürünün widget tarafını öne çıkarıyor: plan uygulamayı açmadan da ana ekranda görünüyor. Gizlilik bölümünde verinin mümkün olduğunca cihazda kaldığı anlatılıyor.",
        "Yedi dilde yayında: İngilizce, Türkçe, Almanca, İspanyolca, Fransızca, İtalyanca ve Brezilya Portekizcesi.",
      ],
      en: [
        "The marketing site for an iPhone app that brings work planning, habits and meal and body tracking into a single daily flow.",
        "The site leads with the widget side of the product: the plan stays visible on the Home Screen without opening the app. A privacy section explains that personal data stays on the device wherever possible.",
        "Published in seven languages: English, Turkish, German, Spanish, French, Italian and Brazilian Portuguese.",
      ],
    },
    facts: {
      tr: [
        { k: "Tür", v: "Ürün tanıtım sitesi" },
        { k: "Dil", v: "7" },
        { k: "Platform", v: "iPhone uygulaması için" },
      ],
      en: [
        { k: "Type", v: "Product marketing site" },
        { k: "Languages", v: "7" },
        { k: "Platform", v: "For an iPhone app" },
      ],
    },
    shots: 3,
    shotSize: { w: 1600, h: 1000 },
    links: [{ kind: "web", url: "https://gurkansvlms.github.io/widgetai-legal-site/" }],
    schema: { type: "WebSite", relation: "creator" },
  },
  {
    slug: "aysquilt",
    title: "AysQuilt",
    service: "e-ticaret-optimizasyonu",
    alsoServices: ["sosyal-medya-icerik"],
    year: 2026,
    image: "aysquilt.webp",
    summary: {
      tr: "El yapımı çanta charm ve aksesuar markasının Trendyol mağazası: ürün görselleri, başlık ve açıklama metinleri dönüşüm için yeniden düzenlendi.",
      en: "A handmade bag charm and accessory brand's Trendyol store: product imagery, titles and descriptions rebuilt around conversion.",
    },
    seo: {
      tr: { title: "AysQuilt Trendyol Mağazası" },
      en: { title: "AysQuilt Trendyol Store" },
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
    shotSize: { w: 1600, h: 1000 },
    links: [
      { kind: "trendyol", url: "https://www.trendyol.com/magaza/aysquilt-m-1070133" },
      { kind: "instagram", url: "https://www.instagram.com/aysquilt/" },
    ],
    schema: {
      type: "CreativeWork",
      name: { tr: "AysQuilt Trendyol mağazası", en: "AysQuilt Trendyol store" },
      aboutBrand: "AysQuilt",
    },
  },
];

/**
 * Projeler sayfasının ana ızgarasında ve ana sayfadaki öne çıkanlarda
 * listelenen işler.
 *
 * Web sitesi işleri bu ızgarada çıkmıyor: asıl vitrinleri Hizmetler > Web
 * Sitesi Geliştirme sayfası. Projeler sayfasında ise en sonda kendi alt
 * bölümleri var (webProjects).
 */
export const listedProjects = projects.filter(
  (project) => project.service !== "web-sitesi",
);

/** Projeler sayfasının sonundaki "Web siteleri" alt bölümü. */
export const webProjects = projects.filter(
  (project) => project.service === "web-sitesi",
);

/** Ana sayfada gösterilecek öne çıkanlar. */
export const featuredSlugs = ["pofu", "snappet", "date-for-dead"] as const;

export function serviceOf(project: Project): ServiceSlug {
  return project.service;
}
