import type { Locale } from "@/i18n/config";

/**
 * Dijital ürün iyileştirme hizmetinde anlatılan örnekler.
 *
 * Bunlar proje kartı değil: aynı ürünlerin proje sayfaları ayrıca var.
 * Burada anlatılan, o ürünler yayındayken üzerlerinde yapılan iş — yani
 * hizmetin kendisi. Bölüm bilinçli olarak yalnızca metin: görsel, rozet
 * ya da sayı kutusu yok, hangi aşamada ne yapıldığı sırasıyla yazıyor.
 *
 * Künye satırlarındaki sürüm ve dil sayıları projects.ts ile aynı kaynaktan.
 */
export type Improvement = {
  /** İlgili projenin slug'ı — proje sayfasına bağlanmak için. */
  project: string;
  title: string;
  /** Ürünün bugünkü künyesi; tek satır. */
  standing: Record<Locale, string>;
  /** Sırayla aşamalar: başlık + ne yapıldığı. */
  stages: Record<Locale, { k: string; v: string }[]>;
};

export const improvements: Improvement[] = [
  {
    project: "ikra",
    title: "İkra",
    standing: {
      tr: "iOS ve Android'de yayında · Sürüm 2.0.7 · Mağaza künyesi 21 dilde",
      en: "Live on iOS and Android · Version 2.0.7 · Store listing in 21 languages",
    },
    stages: {
      tr: [
        {
          k: "Akışın toparlanması",
          v: "Namaz vakitleri, Kur'an okuma ve dinleme, kıble, dua, zikir, hadis ve İslami takvim ayrı ayrı durmak yerine tek bir günlük akışta toplandı. Uygulama bu düzenlemeyle 2.0 serisine geçti; bugünkü sürüm 2.0.7.",
        },
        {
          k: "Gün boyu kullanım",
          v: "Esmaü'l-Hüsna, günün ayeti ve ibadet takibi gibi bölümler aynı akışın parçası oldu. İkra bir günde bir kez değil, defalarca açılan bir uygulama; bölümler buna göre kurgulandı.",
        },
        {
          k: "İkinci platform",
          v: "iOS tarafı tek başınayken yanına Android sürümü eklendi. İki mağaza aynı sürüm çizgisinde ilerliyor, yani bir özellik iki tarafta da karşılığını buluyor.",
        },
        {
          k: "Mağaza künyesi",
          v: "Künye metinleri yirmi bir dile çevrildi; uygulama artık Türkiye dışındaki vitrinlerde de listeleniyor. Mağaza görselleri her dil için ayrı set hâlinde, telefon ve tablet ölçülerinde üretildi.",
        },
      ],
      en: [
        {
          k: "Pulling the flow together",
          v: "Prayer times, Quran reading and listening, qibla, duas, dhikr, hadith and the Islamic calendar stopped being separate corners and came into one daily flow. That work moved the app to the 2.0 series; the current release is 2.0.7.",
        },
        {
          k: "Built for all-day use",
          v: "Sections like the 99 Names, the verse of the day and worship tracking became part of the same flow. Ikra is opened many times a day rather than once, and the sections were arranged for that.",
        },
        {
          k: "A second platform",
          v: "iOS stood alone until an Android build joined it. Both stores now move along the same version line, so a feature lands on both sides.",
        },
        {
          k: "The store listing",
          v: "The listing was translated into twenty-one languages, so the app is listed outside Türkiye too. Store screenshots were produced as a separate set per language, in both phone and tablet sizes.",
        },
      ],
    },
  },
  {
    project: "pofu",
    title: "Pofu",
    standing: {
      tr: "iOS'ta yayında · Sürüm 2.0.4 · Mağaza künyesi 6 dilde",
      en: "Live on iOS · Version 2.0.4 · Store listing in 6 languages",
    },
    stages: {
      tr: [
        {
          k: "Ana akışın yeniden kurulması",
          v: "Ürün 2.0 serisine taşınırken ana akış tek bir işin etrafında toplandı: tabağın fotoğrafını çek, kalorisi ve makroları çıksın. Bugünkü sürüm 2.0.4.",
        },
        {
          k: "Takip modeli",
          v: "Herkese aynı sabit hedefi veren kurgu bırakıldı. Yerine iştah, su tutma ve enerji dalgalanmalarını hesaba katan bir takip modeli kuruldu — her sabah düşmesi beklenen bir tartı yerine değişkenliği kabul eden bir ölçüm.",
        },
        {
          k: "Apple tarafı",
          v: "HealthKit ve Apple Watch entegrasyonu, ana ekran widget'ları ve bağımsız bir saat uygulaması ürünün parçası oldu. Günlük takip böylece telefon dışında da sürüyor.",
        },
        {
          k: "Mağaza künyesi",
          v: "Künye metinleri ve mağaza görselleri altı dile çevrildi.",
        },
      ],
      en: [
        {
          k: "Rebuilding the main flow",
          v: "As the product moved to the 2.0 series, the main flow gathered around a single job: photograph the plate, get its calories and macros. The current release is 2.0.4.",
        },
        {
          k: "The tracking model",
          v: "The one-rulebook-for-everyone setup was dropped. In its place came a model that accounts for appetite, water retention and energy swings — a measurement that admits variation instead of a scale expected to drop every morning.",
        },
        {
          k: "The Apple side",
          v: "HealthKit and Apple Watch integration, Home Screen widgets and a standalone watch app became part of the product, so daily tracking continues away from the phone.",
        },
        {
          k: "The store listing",
          v: "The listing and its screenshots were translated into six languages.",
        },
      ],
    },
  },
];
