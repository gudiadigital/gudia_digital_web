import type { Locale } from "@/i18n/config";

/**
 * Dijital ürün iyileştirme hizmetinde gösterilen örnekler.
 *
 * Bunlar proje kartı değil: aynı ürünlerin proje sayfaları ayrıca var.
 * Burada anlatılan, o ürünlerin mağaza tarafında ve sürüm çizgisinde
 * yapılan iyileştirme; yani hizmetin kendisinin somut örneği.
 *
 * Rakamlar 23 Eylül 2026'da App Store Türkiye vitrininden okundu.
 */
export type Improvement = {
  /** İlgili projenin slug'ı — proje sayfasına bağlanmak için. */
  project: string;
  title: string;
  /** public/projeler/ altındaki ikon. */
  icon: string;
  /** Ölçülebilir durum: sürüm, dil sayısı, puan. */
  metrics: Record<Locale, { k: string; v: string }[]>;
  /** Yapılan iş. */
  items: Record<Locale, string[]>;
};

export const improvements: Improvement[] = [
  {
    project: "ikra",
    title: "İkra",
    icon: "icon-ikra.webp",
    metrics: {
      tr: [
        { k: "Sürüm", v: "2.0.7" },
        { k: "Mağaza dili", v: "21" },
        { k: "App Store puanı", v: "4,5 · 87 oy" },
      ],
      en: [
        { k: "Version", v: "2.0.7" },
        { k: "Store languages", v: "21" },
        { k: "App Store rating", v: "4.5 · 87 ratings" },
      ],
    },
    items: {
      tr: [
        "Mağaza künyesi yirmi bir dile çevrildi; uygulama Türkiye dışındaki vitrinlerde de listeleniyor.",
        "Mağaza görselleri her dil için ayrı set hâlinde üretildi, telefon ve tablet ölçülerinde.",
        "iOS'un yanına Android sürümü eklendi; iki mağaza aynı sürüm çizgisinde ilerliyor.",
        "Uygulama 2.0 serisine taşındı: namaz vakti, Kur'an, kıble, zikir ve hadis tek akışta toplandı.",
      ],
      en: [
        "The store listing was translated into twenty-one languages, so the app is listed outside Türkiye too.",
        "Store screenshots were produced as a separate set per language, in both phone and tablet sizes.",
        "An Android build joined the iOS one, and both stores now move along the same version line.",
        "The app moved to the 2.0 series: prayer times, Quran, qibla, dhikr and hadith were brought into one flow.",
      ],
    },
  },
  {
    project: "pofu",
    title: "Pofu",
    icon: "icon-pofu.webp",
    metrics: {
      tr: [
        { k: "Sürüm", v: "2.0.4" },
        { k: "Mağaza dili", v: "6" },
        { k: "App Store puanı", v: "5,0 · 2 oy" },
      ],
      en: [
        { k: "Version", v: "2.0.4" },
        { k: "Store languages", v: "6" },
        { k: "App Store rating", v: "5.0 · 2 ratings" },
      ],
    },
    items: {
      tr: [
        "Mağaza künyesi ve görselleri altı dile çevrildi.",
        "Uygulama 2.0 serisine taşındı; ana akış tabağın fotoğrafından kalori ve makro çıkarmak üzerine kuruldu.",
        "HealthKit ve Apple Watch entegrasyonu, ana ekran widget'ları ve bağımsız saat uygulaması ürünün parçası.",
        "Sabit hedef yerine iştah, su tutma ve enerji dalgalanmasını hesaba katan bir takip modeli kuruldu.",
      ],
      en: [
        "The store listing and its screenshots were translated into six languages.",
        "The app moved to the 2.0 series, with the main flow built around reading calories and macros from a photo of the plate.",
        "HealthKit and Apple Watch integration, Home Screen widgets and a standalone watch app are part of the product.",
        "Instead of a fixed target, the tracking model accounts for appetite, water retention and energy swings.",
      ],
    },
  },
];
