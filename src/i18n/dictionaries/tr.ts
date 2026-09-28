/** KVKK aydınlatma metninde bir başlık: paragraf, madde listesi, ek paragraf. */
export type PrivacySection = {
  title: string;
  body?: string[];
  items?: string[];
  after?: string[];
};

/** Bir iddianın resmî kaynağı; sayfada "Kaynak" satırı olarak çıkıyor. */
export type SourceLink = { label: string; url: string };

/**
 * Hizmet sayfasındaki bir soru-cevap. Cevap bağlamından koparılıp
 * alıntılandığında da anlaşılır olmalı. Yapılandırılmış verideki (FAQPage)
 * soru ve cevap bu alanlardan birebir okunuyor; sayfada görünenden farklı
 * bir metin yazılmıyor.
 *
 * Her cevap depodaki bir ifadeye (hizmetin kendi alanları, projects.ts) ya
 * da `sources`'taki resmî kaynağa dayanıyor. Fiyat, süre, sektör ve müşteri
 * adı sahibinden gelmeden SSS'ye girmiyor.
 */
export type ServiceFaq = {
  q: string;
  a: string;
  /** Cevabın andığı projeler (projects.ts slug'ı); cevabın altında bağlantı olarak çıkıyor. */
  projects?: string[];
  sources?: SourceLink[];
};

/** Hizmet sayfasındaki kanıt satırı: kullandığımız teknik ve onu gösteren proje. */
export type ServiceProof = { text: string; project: string };

/**
 * Hizmet sayfasının metinleri. Sözlük türü `typeof tr`'den çıktığı için her
 * hizmet kendi alanlarıyla çıkarılıyor; bileşen bu türle okuyup isteğe bağlı
 * alanlara (sources, proof) güvenle erişiyor.
 */
export type ServiceItem = {
  title: string;
  seo: { title: string; description: string };
  short: string;
  /**
   * Başlığın hemen altındaki iki cümle: hizmet nedir, kimler için. Kısa
   * tanım (short) ve girişten (intro) türetildi; kartlarda short kalıyor.
   */
  answer: string;
  intro: string;
  /**
   * Girişteki sayı ya da kuralın resmî kaynağı; girişin altında "Kaynak"
   * satırı olarak çıkıyor. Doğrulanamayan iddia metne girmiyor.
   */
  sources?: SourceLink[];
  /** "Kimler için?" listesi: sektör değil, durum. Sektörler sahibinden gelecek. */
  forWhom: string[];
  /** Yalnızca kendi uygulamalarımızda gösterilebilen teknikler (şimdilik mobilde). */
  proof?: ServiceProof[];
  features: string[];
  deliverables: string[];
  faq: ServiceFaq[];
};

/**
 * Hakkımızda'daki kurucu. `id` iki dilde aynı: sayfadaki çapa
 * (/hakkimizda/#gurkan-sevilmis) ve yapılandırılmış verideki kişi kimliği.
 */
export type Founder = {
  id: string;
  name: string;
  role: string;
  bio: string;
  /** Kişinin kendi profilleri (LinkedIn, GitHub…); yapılandırılmış veride sameAs. Boşken yazılmıyor. */
  profiles: string[];
  /** Başka yerlerde geçen adı (ör. mağazalardaki tam adı); yalnızca kişinin onayıyla. */
  alternateName?: string;
};

export const tr = {
  meta: {
    siteName: "Gudia Dijital",
    // Ana sayfanın arama başlığı. Alt sayfalarınki kendi bölümlerindeki
    // `seo` alanında; layout onların sonuna " · Gudia Dijital" ekliyor.
    title: "Gudia Dijital — Mobil Uygulama, Web Sitesi ve Markalı Oyun Stüdyosu",
    description:
      "Markaların dijital ürünlerini oluşturuyor, iyileştiriyor ve büyütüyoruz: mobil uygulama, web sitesi, markalı oyun, sosyal medya içeriği ve e-ticaret.",
    /*
     * Stüdyonun gerçekten var olan kendi profilleri (LinkedIn şirket
     * sayfası, dolu bir GitHub hesabı…). Yapılandırılmış verideki sameAs
     * buradan geliyor; boşken hiç yazılmıyor. Kurucuların kişisel
     * profilleri buraya değil, kendi kayıtlarına. İki dilde aynı olmalı.
     */
    profiles: [] as string[],
  },

  nav: {
    home: "Ana Sayfa",
    about: "Hakkımızda",
    services: "Hizmetler",
    projects: "Projeler",
    contact: "İletişim",
    cta: "Ücretsiz İnceleme",
    menu: "Menü",
    close: "Kapat",
    langLabel: "Dil",
  },

  hero: {
    // Başlığın hemen üstünde marka adı ve ne olduğu; başlık markayı anmıyor.
    eyebrow: "Gudia Dijital · Dijital Ürün ve Büyüme Stüdyosu",
    title: [
      { text: "Markaların dijital ürünlerini ", accent: false },
      { text: "oluşturuyor", accent: true },
      { text: ", ", accent: false },
      { text: "iyileştiriyor", accent: true },
      { text: " ve ", accent: false },
      { text: "büyütüyoruz", accent: true },
      { text: ".", accent: false },
    ],
    pillars: ["Web", "Mobil", "İnteraktif", "İçerik", "E-ticaret"],
    subtitle:
      "Sıfırdan ürün kuruyoruz, elinizdeki dijital varlıkları toparlıyoruz ve satışa hazır hale getiriyoruz. Küçük bir ekibiz — aracı yok, ajans katmanı yok, ürünü kuran kişilerle konuşursunuz.",
    ctaPrimary: "Ücretsiz İnceleme İsteyin",
    ctaSecondary: "Hizmetlerimiz",
  },

  home: {
    aboutTitle: "Gudia Dijital hakkında",
    aboutLink: "Kurucular ve hikâyemiz",
  },

  story: {
    chapter: "Bölüm",
    progress: "İlerleme",
  },

  approach: {
    eyebrow: "Çalışma modelimiz",
    title: "Kur, iyileştir, büyüt",
    subtitle:
      "Her markanın ihtiyacı aynı noktada değil. Kimi sıfırdan ürün kurar, kimi elindekini toparlar, kimi de var olanı satışa dönüştürmek ister. Üçüne de aynı ekip bakıyor.",
    groups: {
      build: {
        label: "Kur",
        title: "Sıfırdan ürün",
        text: "Ortada bir şey yoksa baştan kuruyoruz: mobil uygulama, web sitesi, markalı oyun ve interaktif deneyimler.",
        specs: [
          { k: "Platform", v: "iOS · Android · Web · PC" },
          { k: "Teslim", v: "Kaynak kodun tamamı size ait" },
          { k: "Süreç", v: "Aşamalı, her aşamada çalışan sürüm" },
        ],
      },
      improve: {
        label: "İyileştir",
        title: "Elindekini toparla",
        text: "Uygulamanız eski, siteniz yavaş ya da tasarım geride kalmışsa yeniden yazmadan onarıyor, hızlandırıyor ve güncel tutuyoruz.",
        specs: [
          { k: "Başlangıç", v: "Ücretsiz inceleme raporu" },
          { k: "Yöntem", v: "Yeniden yazmadan onarım" },
          { k: "Sonrası", v: "Aylık teknik bakım" },
        ],
      },
      grow: {
        label: "Büyüt",
        title: "Görünür ve satılabilir yap",
        text: "Ürün iyi olsa bile içerik ve mağaza düzeni olmadan satmıyor. Sosyal medya içeriğini ve e-ticaret sayfalarınızı biz üretiyoruz.",
        specs: [
          { k: "İçerik", v: "Aylık plan, üretim ve paylaşım" },
          { k: "Pazaryeri", v: "Ürün sayfası ve görsel düzeni" },
          { k: "Ölçüm", v: "Aylık performans raporu" },
        ],
      },
    },
  },

  services: {
    /*
     * Arama sonucu ve paylaşım kartındaki başlık ve açıklama. Sayfadaki
     * H1'e dokunmuyor; H1 marka dilinde kalırken arama başlığı hizmetin
     * adını taşıyor. Açıklamalar olduğu gibi kullanılıyor, kısaltılmıyor:
     * 160 karakteri geçmemeli.
     */
    seo: {
      title: "Hizmetler: Mobil Uygulama, Web, Oyun ve E-Ticaret",
      description:
        "Mobil uygulama, web sitesi, markalı oyun, dijital ürün iyileştirme, sosyal medya içeriği ve Trendyol mağaza optimizasyonu. Her hizmetin kapsamı baştan net.",
    },
    eyebrow: "Hizmetler",
    title: "Uçtan uca dijital üretim",
    subtitle:
      "Tek bir ürün için de, markanızın tüm dijital varlığı için de çalışıyoruz. Her hizmetin kapsamı ve süreci net — sürpriz maliyet çıkmaz.",
    allLink: "Tüm hizmetler",
    detailLink: "Detayları gör",
    groupLabels: {
      build: "Kur",
      improve: "İyileştir",
      grow: "Büyüt",
    },
    // Hizmetler sayfasında kartlardan önce: çalışma modelinin üç adımı ve
    // her adımın hizmetleri (approach.subtitle ve approach.groups).
    chooserTitle: "Hangi hizmet size uygun?",
    forWhomTitle: "Kimler için?",
    proofTitle: "Yayındaki uygulamalarımızda kullandıklarımız",
    faqTitle: "Sık sorulan sorular",
    faqProjects: "İlgili projeler",
    items: {
      "mobil-uygulama": {
        title: "Mobil Uygulama Geliştirme",
        seo: {
          title: "iOS ve Android Mobil Uygulama Geliştirme",
          description:
            "iOS ve Android için işletmenize özel uygulama: rezervasyon, üyelik, sadakat ve ödeme akışları. Kaynak kod sizin; App Store ve Google Play yayını dahil.",
        },
        short:
          "iOS ve Android için sıfırdan uygulama: rezervasyon, üyelik, sadakat, ödeme ve müşteri paneli gibi işinize özel çözümler.",
        // short + intro ("operasyonuna ya da satışına dokunan") + features (mağaza yayını)
        answer:
          "Mobil uygulama geliştirme hizmetimizde işletmenize özel iOS ve Android uygulamasını sıfırdan kuruyor, App Store ve Google Play'de yayına alıyoruz. Rezervasyon, üyelik, sadakat, ödeme ya da müşteri paneli gibi doğrudan operasyonuna veya satışına dokunan bir uygulamaya ihtiyaç duyan işletmelere yönelik.",
        intro:
          "Amacımız sadece bir uygulama teslim etmek değil; işletmenin gerçekten kullandığı, operasyonuna ya da satışına dokunan bir ürün kurmak. Kurucumuz Gürkan'ın iOS geliştirici geçmişi sayesinde Apple ekosisteminde özellikle derinlikli çalışıyoruz.",
        // short ve features'tan; intro'daki Apple ekosistemi vurgusu son maddede.
        forWhom: [
          "Rezervasyon, üyelik ya da sadakat programını bir uygulamaya taşımak isteyen işletmeler",
          "Müşterilerinden uygulama üzerinden ödeme almak isteyenler",
          "Müşteri paneline ya da şirket içi operasyon ekranlarına ihtiyaç duyanlar",
          "Swift ve SwiftUI ile geliştirilmiş, native bir iOS uygulaması isteyenler",
        ],
        // projects.ts: pofu.summary, habitile.detail[1], ikra.detail[2], snappet.detail[2]
        proof: [
          { text: "HealthKit ve Apple Watch entegrasyonu, ana ekran widget'ları ve saat uygulaması", project: "pofu" },
          { text: "Etkileşimli widget'lar, Live Activity ve watchOS için saat uygulaması", project: "habitile" },
          { text: "iOS ve Android'de yayında; mağaza metinleri 21 dile çevrildi", project: "ikra" },
          { text: "iOS ve Android'de, 11 dilde yayında", project: "snappet" },
        ] as ServiceProof[],
        features: [
          "iOS için Swift / SwiftUI ile native geliştirme",
          "Android ve çapraz platform seçenekleri",
          "Rezervasyon, üyelik, sadakat programı ve ödeme akışları",
          "Müşteri paneli ve şirket içi operasyon ekranları",
          "Push bildirim, analitik ve uygulama içi satın alma",
          "App Store & Google Play yayın ve sürüm yönetimi",
        ],
        deliverables: [
          "Kaynak kodun tamamı size ait",
          "Tasarım dosyaları ve bileşen kütüphanesi",
          "TestFlight dağıtımı ve yayın sonrası destek süresi",
        ],
        // Süre, fiyat, Android teknolojisi ve destek süresi sahibinden
        // gelmeden eklenmiyor.
        faq: [
          {
            // deliverables[0-1] + about.values "Sahiplik sizde"
            q: "Uygulamanın kaynak kodu kime ait olacak?",
            a: "Kaynak kodun tamamı size ait. Tasarım dosyaları ve bileşen kütüphanesi de teslimle birlikte size geçiyor; kimseye bağımlı kalmazsınız.",
          },
          {
            // features[5] + deliverables[2]
            q: "App Store ve Google Play yayınını siz mi yapıyorsunuz?",
            a: "Evet. Mağaza yayınını ve sonraki sürümlerin yönetimini biz üstleniyoruz. iOS sürümünü yayından önce TestFlight üzerinden size dağıtıyoruz.",
          },
          {
            // features[0] + about.founders[0].bio
            q: "iOS uygulamalarını hangi teknolojiyle geliştiriyorsunuz?",
            a: "iOS uygulamalarını Swift ve SwiftUI ile native olarak geliştiriyoruz. Bu tarafı kurucu ortağımız Gürkan Sevilmiş yürütüyor; App Store yayın süreçleri ve mimari kararlar da onun sorumluluğunda.",
          },
          {
            // features[1] + projects.ts (ikra, snappet: playstore)
            q: "Android uygulaması da yapıyor musunuz?",
            a: "Evet, Android ve çapraz platform seçenekleri de bu hizmetin kapsamında. Kendi uygulamalarımızdan İkra ve SnapPet hem iOS'ta hem Android'de yayında.",
            projects: ["ikra", "snappet"],
          },
          {
            // deliverables[2] + process.steps[3]
            q: "Yayından sonra destek veriyor musunuz?",
            a: "Evet. Teslimin bir parçası olarak yayın sonrası bir destek süresi var; sonrasında da bakım paketiyle desteğe devam edebiliyoruz.",
          },
          {
            // about.entity
            q: "Hangi uygulamaları geliştirdiniz?",
            a: "Kendi uygulamalarımız Pofu, SnapPet, Habitile ve İkra App Store'da yayında; SnapPet ile İkra Google Play'de de var.",
            projects: ["pofu", "snappet", "habitile", "ikra"],
          },
        ] as ServiceFaq[],
      },
      "web-sitesi": {
        title: "Web Sitesi Geliştirme",
        seo: {
          title: "Kurumsal Web Sitesi ve Açılış Sayfası",
          description:
            "Hazır şablon kullanmadan markanıza özel kurumsal site ve açılış sayfası: mobil uyumlu, hızlı açılan, teknik SEO'su yapılmış ve alan adınızda yayında.",
        },
        short:
          "Hızlı açılan, aramada görünen, telefonda da masaüstünde de düzgün çalışan kurumsal siteler ve açılış sayfaları.",
        // short + intro (site türleri) + deliverables[0] (alan adında yayın)
        answer:
          "Web sitesi geliştirme hizmetimizde markanıza özel kurumsal site, tanıtım sitesi ya da açılış sayfası tasarlıyor, alan adınızda yayına alıyoruz. Hızlı açılan, aramada görünen ve telefonda da masaüstünde de düzgün çalışan bir site isteyen markalara yönelik.",
        intro:
          "Hazır şablon kurmuyoruz. Markanıza özel tasarlanan, ölçülebilir hedefi olan siteler kuruyoruz: tanıtım sitesi, kurumsal site, açılış sayfası ya da içinde rezervasyon veya müşteri paneli olan bir web uygulaması.",
        // intro ve features[0], [3]'ten
        forWhom: [
          "Şablon görünümünde değil, markasına özel bir site isteyenler",
          "Bir ürünü ya da kampanyayı tek bir açılış sayfasında anlatmak isteyenler",
          "Sitesinden WhatsApp, form ya da rezervasyonla müşteri almak isteyenler",
          "İçinde rezervasyon ya da müşteri paneli olan bir web uygulamasına ihtiyaç duyanlar",
        ],
        features: [
          "Markaya özel arayüz ve tasarım sistemi",
          "Mobil öncelikli, tüm ekranlara uyumlu yapı",
          "Teknik SEO, hız ve erişilebilirlik optimizasyonu",
          "WhatsApp, form ve rezervasyon gibi dönüşüm noktaları",
          "İçerik yönetim paneli ve çok dilli yapı (isteğe bağlı)",
          "Alan adı, hosting ve yayın kurulumu",
        ],
        deliverables: [
          "Yayına alınmış site ve alan adı bağlantısı",
          "İçerik güncelleme eğitimi",
          "Performans ve SEO raporu",
        ],
        // Süre, fiyat, alan adının kimin adına alındığı ve yıllık maliyet
        // sahibinden gelmeden eklenmiyor.
        faq: [
          {
            // intro + features[0] + webShowcase.subtitle ("Altısının da sayfa iskeleti ayrı")
            q: "Hazır şablon ya da tema kullanıyor musunuz?",
            a: "Hayır, hazır şablon kurmuyoruz; arayüzü ve tasarım sistemini markanıza özel tasarlıyoruz. Kendi uygulamalarımız için kurduğumuz altı sitenin de sayfa iskeleti birbirinden farklı.",
          },
          {
            // features[4] + projects.ts (life-planner: 7 dil, divonia: TR/EN)
            q: "Çok dilli site yapıyor musunuz?",
            a: "Evet, çok dilli yapı isteğe bağlı olarak kurulabiliyor. Life Planner'ın tanıtım sitesi yedi dilde, Divonia Studios'un sitesi Türkçe ve İngilizce yayında.",
            projects: ["life-planner", "divonia"],
          },
          {
            // deliverables[1] + features[4]
            q: "Siteyi sonradan kendim güncelleyebilir miyim?",
            a: "Evet. Teslimde içeriği nasıl güncelleyeceğinizi gösteren bir eğitim veriyoruz; isterseniz siteye bir içerik yönetim paneli de ekliyoruz.",
          },
          {
            // features[2] + deliverables[2]
            q: "Arama motoru optimizasyonu (SEO) dahil mi?",
            a: "Teknik SEO, hız ve erişilebilirlik çalışması kapsamda. Teslimde bir performans ve SEO raporu da veriyoruz.",
          },
          {
            // features[5] + deliverables[0]
            q: "Alan adı ve hosting kurulumunu siz mi yapıyorsunuz?",
            a: "Evet. Alan adı, hosting ve yayın kurulumunu biz yapıyoruz; siteyi alan adınıza bağlanmış ve yayında olarak teslim ediyoruz.",
          },
        ] as ServiceFaq[],
      },
      "markali-oyunlar": {
        title: "Markalı Oyun & İnteraktif Deneyim",
        seo: {
          title: "Markaya Özel Oyun: Fuar ve Etkinlik Oyunları",
          description:
            "Fuar, etkinlik ve kampanyalar için markaya özel oyun ve interaktif deneyimler. Tablet, kiosk, web ve mobilde çalışır; liderlik tablosu ve ödül eklenebilir.",
        },
        short:
          "Etkinlikler, kampanyalar ve fuarlar için markaya özel oyunlar ve interaktif aktivasyonlar.",
        // short + intro ("Standart bir reklam yerine insanların oynadığı bir şey")
        answer:
          "Markalı oyun hizmetimizde etkinlik, kampanya ve fuarlar için markanıza özel oyunlar ve interaktif deneyimler tasarlayıp geliştiriyoruz. Standında ya da kampanyasında insanların yalnızca izlediği değil, oynadığı bir deneyim isteyen markalara yönelik.",
        intro:
          "Standart bir reklam yerine insanların oynadığı bir şey. Fuar standında kuyruk oluşturan bir yarışma, kampanyaya bağlı bir çark, eğitim amaçlı bir simülasyon ya da markanızın dünyasında geçen küçük bir oyun — kapsamı birlikte belirliyoruz.",
        // intro'daki örnekler ve features[4-5]'ten; sektörler sahibinden gelecek.
        forWhom: [
          "Fuar standına ziyaretçi çekmek isteyen markalar",
          "Kampanyasına çark ya da yarışma gibi interaktif bir katman eklemek isteyenler",
          "Bir eğitimi simülasyonla ya da oyunla anlatmak isteyen kurumlar",
          "Etkinlikte katılımcı verisi toplayıp sonrasında rapor almak isteyenler",
        ],
        features: [
          "Etkinlik ve fuar için oyunlaştırma (gamification)",
          "Kampanyaya bağlı interaktif deneyimler",
          "Markaya özel karakter, görsel dil ve oynanış",
          "Tablet, kiosk, web ve mobil üzerinde çalışma",
          "Liderlik tablosu, ödül ve katılımcı verisi toplama",
          "Etkinlik sonrası raporlama",
        ],
        deliverables: [
          "Oynanabilir prototip",
          "Etkinliğe hazır kurulum ve yedek plan",
          "Katılım ve etkileşim raporu",
        ],
        // Süre, fiyat, oyun motoru ve KVKK'ya uygun veri toplama sahibinden
        // gelmeden eklenmiyor. Örneklerde rolümüz söylenmiyor; roller netleşince
        // proje sayfalarıyla birlikte güncellenecek.
        faq: [
          {
            // short + intro
            q: "Markalı oyun (advergame) nedir, nerede kullanılır?",
            a: "Markalı oyun, bir markanın dünyasında geçen ve reklam yerine insanların oynadığı özel bir oyun ya da interaktif deneyimdir. Etkinliklerde, kampanyalarda ve fuarlarda kullanılıyor: fuar standında bir yarışma, kampanyaya bağlı bir çark ya da eğitim amaçlı bir simülasyon olabilir.",
          },
          {
            // features[3] + intro ("kapsamı birlikte belirliyoruz")
            q: "Oyun hangi cihazlarda çalışıyor?",
            a: "Tablet, kiosk, web ya da mobilde çalışacak şekilde geliştiriyoruz. Hangisinin kullanılacağını kapsamla birlikte belirliyoruz.",
          },
          {
            // features[4] + deliverables[2]
            q: "Liderlik tablosu ve ödül eklenebilir mi?",
            a: "Evet. Liderlik tablosu, ödül ve katılımcı verisi toplama eklenebiliyor; etkinlikten sonra katılım ve etkileşim raporunu gönderiyoruz.",
          },
          {
            // projects.ts: logo-kidzania.summary, photosensia.detail[0]
            q: "Örnek görebilir miyim?",
            a: "Örnek olarak KidZania İstanbul'daki Logo Yazılım'ın Yazılım Geliştirme Merkezi için kurgulanan interaktif deneyimin ve çocuklara fotoğrafçılığı oyunla öğreten PhotoSensia Kids'in proje sayfalarına bakabilirsiniz.",
            projects: ["logo-kidzania", "photosensia"],
          },
        ] as ServiceFaq[],
      },
      "dijital-urun-iyilestirme": {
        title: "Dijital Ürün İyileştirme",
        seo: {
          title: "Uygulama ve Web Sitesi Bakım ve İyileştirme",
          description:
            "Eski, yavaş ya da çalışmayan uygulama ve siteleri sıfırdan yazmadan toparlıyoruz: ücretsiz inceleme raporu, App Store uyumluluğu ve aylık teknik bakım.",
        },
        short:
          "Elinizde zaten bir uygulama veya site var ama eski, yavaş ya da çalışmıyor. Sıfırdan yazmadan toparlıyoruz.",
        // short + approach.groups.improve.text ("onarıyor, hızlandırıyor ve güncel tutuyoruz")
        answer:
          "Dijital ürün iyileştirme hizmetimizde eski, yavaş ya da çalışmayan uygulama ve siteleri sıfırdan yazmadan onarıyor, hızlandırıyor ve güncel tutuyoruz. Elinde zaten bir uygulama ya da site olan ama onu yeniden yaptırmak istemeyen işletmelere yönelik.",
        intro:
          "Çoğu işletmenin ihtiyacı yeni bir ürün değil, var olanın düzgün çalışması. Önce ücretsiz bir inceleme yapıp somut olarak neyin düzeltilmesi gerektiğini yazıyoruz; kapsamı siz seçiyorsunuz. Apple, üç yıldır güncellenmeyen ve son 12 ayda hiç ya da çok az indirilen uygulamaların geliştiricisini uyarıyor: 90 gün içinde güncelleme gönderilmezse uygulama App Store'dan kaldırılıyor. Bu iş ertelenecek bir iş değil.",
        sources: [
          {
            label: "Apple Developer: App Store Improvements",
            url: "https://developer.apple.com/support/app-store-improvements/",
          },
        ],
        // short ve features'tan
        forWhom: [
          "Uygulaması uzun süredir güncellenmemiş olanlar",
          "Sitesi yavaş açılan ya da telefonda bozuk görünenler",
          "Uygulaması çöken ya da App Store uyumluluğu için güncellenmesi gerekenler",
          "Sitesindeki formu çalışmayan ya da WhatsApp, rezervasyon gibi dönüşüm noktaları eksik olanlar",
        ],
        features: [
          "Uygulama incelemesi: çökme, performans ve kullanım analizi",
          "Arayüz yenileme ve kullanıcı akışı düzeltmeleri",
          "Swift ve kütüphane güncellemeleri, App Store uyumluluğu",
          "Web sitesi yenileme: mobil uyum, hız, SSL ve form onarımı",
          "Eksik dönüşüm noktalarının eklenmesi (WhatsApp, form, rezervasyon)",
          "Aylık teknik bakım: yedek, güncelleme, güvenlik, küçük değişiklikler",
        ],
        deliverables: [
          "Yazılı inceleme raporu ve öncelik listesi",
          "Düzeltilmiş ve yayına alınmış sürüm",
          "Öncesi / sonrası performans karşılaştırması",
        ],
        // İnceleme raporunun kaç günde geldiği, başkasının yazdığı ürünü
        // devralma ve bakımın fiyatı sahibinden gelmeden eklenmiyor.
        faq: [
          {
            // cta.subtitle + deliverables[0] + intro ("kapsamı siz seçiyorsunuz")
            q: "Ücretsiz inceleme neleri kapsıyor?",
            a: "Uygulamanıza, sitenize ya da mağazanıza bakıp somut olarak neyin düzeltilmesi gerektiğini yazılı bir inceleme raporu ve öncelik listesi olarak gönderiyoruz. İnceleme ücretsiz ve hiçbir yükümlülük getirmiyor; hangi işlerin yapılacağını siz seçiyorsunuz.",
          },
          {
            // short + approach.groups.improve.text + intro
            q: "Sıfırdan yeniden yazmak gerekiyor mu?",
            a: "Bu hizmetin amacı tam da bundan kaçınmak: var olan uygulamayı ya da siteyi sıfırdan yazmadan onarıyor, hızlandırıyor ve güncel tutuyoruz. Neyin düzeltilmesi gerektiğini önce ücretsiz incelemede yazıyoruz.",
          },
          {
            // Kaynak sayfada 28 Eylül 2026'da doğrulandı.
            q: "Apple uygulamamı App Store'dan kaldırır mı?",
            a: "Apple, son üç yılda güncellenmemiş ve son 12 ayda hiç ya da çok az indirilmiş uygulamaların geliştiricisine e-postayla bildirim gönderiyor. 90 gün içinde güncelleme gönderilmezse uygulama, yeni bir sürüm onaylanana kadar App Store'dan kaldırılıyor; uygulamayı yüklemiş kullanıcılar kullanmaya devam edebiliyor. Açılışta çöken uygulamalar ise hemen kaldırılıyor.",
            sources: [
              {
                label: "Apple Developer: App Store Improvements",
                url: "https://developer.apple.com/support/app-store-improvements/",
              },
            ],
          },
          {
            // Kaynak sayfada 28 Eylül 2026'da doğrulandı (sayfanın kendi
            // güncelleme tarihi 16 Eylül 2026). Tarihler eskiyor: 1 Kasım
            // 2026'dan sonra ve Google 2027 şartını açıkladığında bu cevap
            // İngilizcesiyle birlikte güncellenmeli.
            q: "Google Play'den “hedef API seviyesi” uyarısı aldım, bu ne demek?",
            a: "Google Play, uygulamaların güncel Android sürümlerini hedeflemesini istiyor. 31 Ağustos 2026'dan beri yeni uygulamalar ve güncellemeler Android 16'yı (API 36) hedeflemek zorunda; en az Android 15'i (API 35) hedeflemeyen mevcut uygulamalar ise daha yeni Android sürümlü cihazlarda yeni kullanıcılara görünmüyor. Daha fazla süre gerekiyorsa 1 Kasım 2026'ya kadar uzatma istenebiliyor.",
            sources: [
              {
                label: "Android Developers: Google Play hedef API seviyesi şartı",
                url: "https://developer.android.com/google/play/requirements/target-sdk",
              },
            ],
          },
          {
            // features[5] + approach.groups.improve.specs ("Sonrası: Aylık teknik bakım")
            q: "Aylık bakım neleri kapsıyor?",
            a: "Aylık teknik bakımda yedekleme, güncellemeler, güvenlik ve küçük değişiklikler var. İyileştirme bittikten sonra ürünün güncel kalması için isterseniz bu bakımla devam ediyoruz.",
          },
        ] as ServiceFaq[],
      },
      "sosyal-medya-icerik": {
        title: "Sosyal Medya İçerik Üretimi",
        seo: {
          title: "Sosyal Medya İçerik Üretimi: Reels, Post, Story",
          description:
            "Aylık Reels, görsel ve story üretimi: içerik planı, kısa senaryolar, kurgu, kapak tasarımı ve açıklama metinleri; paylaşım ve aylık etkileşim raporu dahil.",
        },
        short:
          "Aylık Reels, görsel ve story üretimi — içerik planı, senaryo ve kapak tasarımlarıyla birlikte.",
        // short + intro ("kurgudan tasarıma ve paylaşıma kadar")
        answer:
          "Sosyal medya içerik üretimi hizmetimizde her ay Reels, görsel ve story içeriklerinizi planlıyor, kurguluyor, tasarlıyor ve paylaşıyoruz. Düzenli paylaşım yapmak isteyen ama kurgu ve tasarıma vakit ayıramayan işletmelere yönelik.",
        intro:
          "Düzenli içerik üretmek çoğu işletme için en zor kısım. Görselleri siz gönderiyorsunuz, kurgudan tasarıma ve paylaşıma kadar kalan işi biz yapıyoruz. Abartılı vaat yok: profesyonel çekim, oyuncu ve mekân bu kapsamın dışında.",
        // intro, features[0] ve deliverables[2]'den
        forWhom: [
          "Düzenli paylaşım yapmakta zorlanan işletmeler",
          "Elinde görsel olan ama kurgu ve tasarıma vakit ayıramayanlar",
          "Aylık bir içerik planı ve paylaşım takvimiyle çalışmak isteyenler",
          "Paylaşımlarının etkileşimini her ay bir raporla görmek isteyenler",
        ],
        features: [
          "Aylık içerik planı ve paylaşım takvimi",
          "Reels kurgusu, fikir ve kısa senaryolar",
          "Görsel ve carousel post tasarımı",
          "Kapak tasarımları ve açıklama metinleri",
          "Story tasarımları",
          "İçeriklerin planlanması ve paylaşılması",
        ],
        deliverables: [
          "Aylık içerik takvimi",
          "Paylaşıma hazır Reels, görsel ve story setleri",
          "Aylık etkileşim raporu",
        ],
        // Aylık içerik sayısı, platformlar, reklam yönetimi, raporun hangi
        // ölçümleri içerdiği ve fiyat sahibinden gelmeden eklenmiyor.
        faq: [
          {
            // intro
            q: "Çekimleri kim yapıyor?",
            a: "Görselleri siz gönderiyorsunuz; kurgudan tasarıma ve paylaşıma kadar kalan işi biz yapıyoruz. Profesyonel çekim, oyuncu ve mekân bu hizmetin kapsamında değil.",
          },
          {
            // features[1], [3]
            q: "Fikir ve senaryoyu da siz mi hazırlıyorsunuz?",
            a: "Evet. Reels için fikir ve kısa senaryoları, kapak tasarımlarını ve açıklama metinlerini biz hazırlıyoruz.",
          },
          {
            // features[0], [5]
            q: "Paylaşımları da siz mi yapıyorsunuz?",
            a: "Evet. İçerikleri aylık paylaşım takvimine göre planlayıp paylaşıyoruz.",
          },
          {
            // deliverables
            q: "Her ay neler teslim ediyorsunuz?",
            a: "Her ay bir içerik takvimi, paylaşıma hazır Reels, görsel ve story setleri ve o ay paylaşılan içeriklerin etkileşimini gösteren bir rapor teslim ediyoruz.",
          },
        ] as ServiceFaq[],
      },
      "e-ticaret-optimizasyonu": {
        title: "E-Ticaret Optimizasyonu",
        seo: {
          title: "Trendyol Mağaza Optimizasyonu",
          description:
            "Trendyol mağazanızın ürün görsellerini, başlık ve açıklama metinlerini, kategori ve varyant yapısını dönüşüm için yeniden düzenliyoruz.",
        },
        short:
          "Trendyol mağazanızın ürün sayfalarını, görsellerini ve metinlerini dönüşüm için yeniden düzenliyoruz.",
        // short + seo.description + approach.groups.grow.text ("Ürün iyi olsa bile … satmıyor")
        answer:
          "E-ticaret optimizasyonu hizmetimizde Trendyol mağazanızın ürün görsellerini, başlık ve açıklama metinlerini, kategori ve varyant yapısını dönüşüm için yeniden düzenliyoruz. Ürünü iyi olduğu halde mağazası aramada görünmeyen ya da ziyaretçisini satışa çeviremeyen satıcılara yönelik.",
        intro:
          "Ticaret Bakanlığı'na göre 2025'te Türkiye'de 634.611 işletme e-ticaret yaptı. Aralarındaki fark çoğu zaman üründe değil, ürün sayfasında. Mağazanızı inceleyip hangi ürünlerde hızlı kazanım olduğunu gösteriyoruz, sonra öncesi/sonrası olarak uyguluyoruz.",
        sources: [
          {
            label: "Ticaret Bakanlığı, Türkiye'de E-Ticaretin Görünümü (12 Mayıs 2026)",
            url: "https://ticaret.gov.tr/duyurular/turkiyede-e-ticaretin-gorunumu-raporu-yayinlandi-12-05-2026",
          },
        ],
        // approach.groups.grow.text ve features'tan
        forWhom: [
          "Ürünü iyi olduğu halde mağazası görünmeyen ya da satmayan Trendyol satıcıları",
          "Ürün ve kapak görselleri dağınık ya da eksik olan mağazalar",
          "Kategori ve varyant düzeni karışmış mağazalar",
          "Çok sayıda ürünü toplu olarak yüklemek ya da güncellemek isteyenler",
        ],
        features: [
          "Ürün görselleri ve kapak görseli düzenlemesi",
          "SEO uyumlu ürün başlığı ve açıklama metinleri",
          "Infographic ve ölçü/özellik görselleri",
          "Kategori ve varyant düzeninin toparlanması",
          "Mağaza kapak görselleri ve vitrin düzeni",
          "Ürün yükleme ve toplu güncelleme",
        ],
        deliverables: [
          "Öncesi / sonrası karşılaştırma görselleri",
          "Düzenlenmiş ve yayında ürün sayfaları",
          "Satış ve görüntülenme raporu",
        ],
        // Diğer pazaryerleri, sonucun ne zaman görüleceği, fiyat ve mağaza
        // paneline erişim sahibinden gelmeden eklenmiyor. Sonuç vaadi yok.
        faq: [
          {
            // features
            q: "Trendyol mağaza optimizasyonu neleri kapsıyor?",
            a: "Ürün ve kapak görsellerinin düzenlenmesini, SEO uyumlu ürün başlığı ve açıklama metinlerini, infografik ve ölçü/özellik görsellerini, kategori ve varyant düzenini, mağaza kapak görsellerini ve vitrin düzenini kapsıyor. Ürün yükleme ve toplu güncellemeyi de biz yapıyoruz.",
          },
          {
            // intro
            q: "Çalışma nasıl başlıyor?",
            a: "Önce mağazanızı inceleyip hangi ürünlerde hızlı kazanım olduğunu gösteriyoruz. Ardından değişiklikleri öncesi/sonrası olarak uyguluyoruz.",
          },
          {
            // deliverables
            q: "Sonuçları nasıl görüyorum?",
            a: "Neyin değiştiğini öncesi/sonrası karşılaştırma görselleriyle, sonucunu da satış ve görüntülenme raporuyla görüyorsunuz. Düzenlenen ürün sayfaları doğrudan mağazanızda yayında oluyor.",
          },
          {
            // projects.ts: aysquilt.detail[1] (edilgen; rol iddiası yok)
            q: "Örnek bir mağaza var mı?",
            a: "AysQuilt'in Trendyol mağazasında ürün görselleri, başlık ve açıklama metinleri dönüşüm için yeniden düzenlendi; ayrıntılar proje sayfasında.",
            projects: ["aysquilt"],
          },
        ] as ServiceFaq[],
      },
    },
  },

  process: {
    eyebrow: "Nasıl çalışıyoruz",
    title: "Dört adımda net bir süreç",
    subtitle:
      "Sürprizi sevmiyoruz. Ne zaman ne teslim edileceği baştan yazılı olarak belli oluyor.",
    steps: [
      {
        title: "İnceleme",
        text: "Mevcut uygulamanıza, sitenize veya mağazanıza bakıyoruz. Ne yapmak istediğinizi dinleyip işin gerçekten neye ihtiyacı olduğunu çıkarıyoruz.",
      },
      {
        title: "Kapsam ve teklif",
        text: "Yapılacak işi maddeler halinde, süre ve bütçesiyle yazıyoruz. Onaylamadan hiçbir şey başlamıyor.",
      },
      {
        title: "Üretim",
        text: "İşi aşamalara bölüp ilerliyoruz. Her aşamada elinizde gerçekten çalışan, görebileceğiniz bir sürüm oluyor.",
      },
      {
        title: "Yayın ve sonrası",
        text: "Mağaza yayını, alan adı, sunucu — hepsini biz hallediyoruz. Teslimden sonra da bakım paketiyle destek verebiliyoruz.",
      },
    ],
  },

  about: {
    seo: {
      title: "Hakkımızda: Gürkan Sevilmiş ve Dilara İşman",
      description:
        "Gudia Dijital, Gürkan Sevilmiş ve Dilara İşman'ın Türkiye'den uzaktan yürüttüğü iki kişilik dijital ürün ve büyüme stüdyosu.",
    },
    eyebrow: "Hakkımızda",
    title: "İki kişilik bir ekip, doğrudan iletişim",
    /*
     * Stüdyonun kim, ne, nerede ve kimlerden oluştuğunu tek yerde söyleyen
     * paragraf: Hakkımızda'da başlığın altında, ana sayfada iletişim
     * çağrısının üstünde aynen çıkıyor. Alıntılanabilir olması için her
     * cümle tek başına anlaşılır yazıldı. Sayılar projects.ts ile aynı
     * olmalı; stüdyo kayıtlı bir şirket olmadığı için "şirket" denmiyor.
     */
    entity:
      "Gudia Dijital, Türkiye'den uzaktan çalışan iki kişilik bir dijital ürün ve büyüme stüdyosudur. Stüdyoyu kurucu ortaklar Gürkan Sevilmiş ve Dilara İşman birlikte yürütüyor: Gürkan, Swift ve SwiftUI ile iOS uygulamaları geliştiriyor; Dilara ise oyun geliştirmenin yanı sıra proje yönetimini ve müşteri iletişimini üstleniyor. Gudia Dijital, küçük ve orta ölçekli markalar için mobil uygulama, web sitesi, markalı oyun ve interaktif deneyim geliştiriyor; var olan uygulama ve siteleri sıfırdan yazmadan iyileştiriyor, sosyal medya içeriği üretiyor ve Trendyol mağazalarını dönüşüm için yeniden düzenliyor. Ekip kendi uygulamalarını da geliştirip yayınlıyor: İkra iOS ve Android'de 21 dilde, SnapPet iOS ve Android'de 11 dilde, Pofu ve Habitile ise App Store'da yayında.",
    // Alt başlık tanımı tekrar etmiyor; tanım hemen altındaki entity'de.
    lead:
      "Büyük ajansların araya koyduğu katmanlar bizde yok — projenizi kim yapıyorsa onunla konuşursunuz.",
    story: [
      "Gudia Dijital'i, yıllarca farklı projelerde gördüğümüz aynı sorundan yola çıkarak kurduk: müşteri bir şey anlatıyor, araya üç kişi giriyor, ortaya bambaşka bir ürün çıkıyor.",
      "Biz küçük kalmayı tercih ediyoruz. İşi alan, yapan ve teslim eden aynı kişiler. Bu yüzden ne söz verdiysek onu teslim ediyoruz; yapamayacağımız işi de baştan söylüyoruz.",
      "Çalışma şeklimiz üç başlıkta toplanıyor: kurmak, iyileştirmek ve büyütmek. Bazı markalarla sıfırdan bir uygulama kuruyoruz, bazılarının elindeki siteyi toparlıyoruz, bazılarının da ürünü hazır olduğu halde görünmeyen mağazasını düzenliyoruz. Ortak nokta şu: her işin sonunda gerçekten yayında olan, insanların kullandığı bir şey oluyor.",
    ],
    missionTitle: "Misyonumuz",
    mission:
      "Küçük ve orta ölçekli markaların, büyük bütçeler olmadan da iyi tasarlanmış ve düzgün çalışan dijital ürünlere sahip olmasını sağlamak.",
    visionTitle: "Vizyonumuz",
    vision:
      "Türkiye'den çıkan, kendi ürünlerini de geliştiren; hem müşteri projelerinde hem kendi uygulama ve oyunlarında referans gösterilen bir dijital stüdyo olmak.",
    valuesTitle: "Değerlerimiz",
    values: [
      {
        title: "Açık iletişim",
        text: "Gecikme olacaksa önceden söyleriz. Bilmediğimiz bir konuda bildiğimizi iddia etmeyiz.",
      },
      {
        title: "Teslim edilen iş",
        text: "Sunum değil, çalışan ürün. Her aşamada elle tutulur bir çıktı olur.",
      },
      {
        title: "Sahiplik sizde",
        text: "Kaynak kod, tasarım dosyaları, hesaplar — hepsi size ait. Kimseye bağımlı kalmazsınız.",
      },
      {
        title: "Ölçülü fiyat",
        text: "Yapılan işe göre fiyat. Gizli kalem, sonradan eklenen maliyet yok.",
      },
    ],
    foundersTitle: "Kurucular",
    founders: [
      {
        id: "gurkan-sevilmis",
        name: "Gürkan Sevilmiş",
        role: "Kurucu Ortak · iOS Geliştirici",
        bio: "Mobil uygulama geliştirme ve ürün iyileştirme tarafını yürütüyor. Swift ve SwiftUI ile native iOS uygulamaları geliştiriyor; App Store yayın süreçleri, mimari kararlar ve teknik üretimden sorumlu.",
        profiles: [],
      },
      {
        id: "dilara-isman",
        name: "Dilara İşman",
        role: "Kurucu Ortak · Oyun Geliştirici",
        bio: "Oyun geliştirme, proje yönetimi ve müşteri iletişimini yürütüyor. Markalı oyun ve interaktif deneyim projelerinin geliştirilmesinden, işlerin planlanıp zamanında teslim edilmesinden ve müşteriyle günlük iletişimden sorumlu.",
        profiles: [],
      },
    ] as Founder[],
  },

  projects: {
    // Web sitesi işleri Projeler sayfasında ayrı bir alt bölümde, en sonda
    // duruyor (asıl vitrinleri Web Sitesi hizmetinde). Arama başlığı 70
    // karakter sınırına sığsın diye ana kümeleri sayıyor.
    seo: {
      title: "Projeler: Uygulamalar, Oyunlar ve E-Ticaret",
      description:
        "Üzerinde çalıştığımız projeler: Pofu, SnapPet, Habitile ve İkra gibi mobil uygulamalar, markalı oyun ve interaktif deneyimler, bir Trendyol mağazası.",
    },
    eyebrow: "Projeler",
    title: "Üzerinde çalıştıklarımız",
    subtitle:
      "Mobil uygulamalar, oyunlar, interaktif deneyimler ve e-ticaret işleri. Liste büyüdükçe burayı güncelliyoruz.",
    empty:
      "İlk projelerimizi yayına hazırlıyoruz. Bu bölüm çok yakında güncellenecek — bu arada aklınızdaki projeyi konuşmak isterseniz bize yazın.",
    emptyCta: "Bize yazın",
    viewProject: "Projeyi gör",
    featuredEyebrow: "Öne çıkan işler",
    featuredTitle: "Uygulamalardan oyunlara",
    featuredSubtitle:
      "Kendi ürünlerimiz ve markalar için kurduğumuz deneyimler arasından bir seçki.",
    allProjects: "Tüm projeler",
    // {service}: hizmetin adı (services.items[slug].title)
    referencesTitle: "{service} alanında yaptığımız işler",
    // Projeler sayfasının sonundaki alt bölüm: hizmeti web sitesi olan işler.
    websitesTitle: "Web siteleri",
    backToProjects: "Tüm projelere dön",
    detailTitle: "Proje hakkında",
    screensTitle: "Mağaza görselleri",
    screensTitleSite: "Ekran görüntüleri",
    factsTitle: "Künye",
    linksTitle: "Nereden ulaşılır",
    ratingLabel: "App Store puanı",
    ratingCount: "oy",
    ratingAsOf: "itibarıyla",
    otherProjects: "Diğer projeler",
    linkLabels: {
      appstore: "App Store",
      playstore: "Google Play",
      steam: "Steam",
      web: "Web sitesi",
      trendyol: "Trendyol",
      instagram: "Instagram",
    },
  },

  cta: {
    title: "Mevcut ürününüze bakalım mı?",
    subtitle:
      "Uygulamanızı, sitenizi ya da mağazanızı inceleyip somut olarak neyin düzeltilebileceğini yazılı gönderiyoruz — ücretsiz, hiçbir yükümlülük yok. Henüz bir ürününüz yoksa da yazın; ilk görüşmede fikrin yapılabilirliğini konuşalım.",
    button: "Ücretsiz İnceleme İsteyin",
  },

  contact: {
    seo: {
      title: "İletişim ve Ücretsiz İnceleme",
      description:
        "Uygulamanız, siteniz veya mağazanız için ücretsiz inceleme isteyin, projenizi anlatın ya da e-posta gönderin. Hafta içi 24 saat içinde dönüş yapıyoruz.",
    },
    eyebrow: "İletişim",
    title: "Konuşalım",
    subtitle:
      "Ücretsiz inceleme isteyebilir, projenizi anlatabilir ya da doğrudan e-posta gönderebilirsiniz. Hafta içi 24 saat içinde dönüş yapıyoruz.",
    emailLabel: "E-posta",
    email: "contact@gudiadigital.com",
    responseLabel: "Yanıt süresi",
    responseValue: "Hafta içi 24 saat içinde",
    locationLabel: "Konum",
    locationValue: "Türkiye · Uzaktan çalışıyoruz",
    /*
     * Sitenin ana çağrısı olan ücretsiz incelemenin üç adımı; yalnızca
     * sitede zaten yazan bilgiden kuruldu: ne gönderileceği (formdaki
     * konular), yanıt süresi (responseValue) ve incelemenin çıktısı
     * (dijital ürün iyileştirmenin ilk teslimi). Raporun kaç günde geldiği
     * ve kimin yanıt verdiği sahibinden gelmeden yazılmıyor.
     * {subject}: formdaki "ücretsiz inceleme" konusu (form.subjectReview).
     */
    review: {
      title: "Ücretsiz inceleme nasıl işler?",
      steps: [
        {
          title: "Bağlantıyı gönderin",
          text: "Formda “{subject}” konusunu seçip uygulamanızın App Store ya da Google Play bağlantısını, sitenizin adresini veya Trendyol mağazanızın bağlantısını yazın. Dilerseniz doğrudan e-posta da gönderebilirsiniz.",
        },
        {
          title: "Size dönüyoruz",
          text: "Mesajınıza hafta içi 24 saat içinde dönüş yapıyoruz.",
        },
        {
          title: "Yazılı raporu alın",
          text: "Somut olarak neyin düzeltilebileceğini yazılı bir inceleme raporu ve öncelik listesi olarak gönderiyoruz. İnceleme ücretsiz ve hiçbir yükümlülük getirmiyor; hangi işlerin yapılacağına siz karar veriyorsunuz.",
        },
      ],
    },
    formTitle: "Ya da formu doldurun",
    form: {
      name: "Ad Soyad",
      namePlaceholder: "Adınız",
      email: "E-posta",
      emailPlaceholder: "ornek@sirket.com",
      phone: "Telefon",
      phonePlaceholder: "05xx xxx xx xx",
      contactHint: "Size nereden dönelim? E-posta ya da telefondan birini yazmanız yeterli.",
      contactRequired: "E-posta ya da telefondan en az birini yazın",
      invalidPhone: "Geçerli bir telefon numarası girin",
      subject: "Konu",
      subjectReview: "Ücretsiz inceleme istiyorum",
      subjectOther: "Diğer",
      message: "Mesajınız",
      messagePlaceholder: "Projenizden kısaca bahsedin: ne yapmak istiyorsunuz, ne zamana kadar?",
      submit: "Mesajı Gönder",
      // Gönder düğmesinin altında: "<before><link><after>"
      privacyNotice: {
        before: "Gönderdiğiniz bilgilerin nasıl işlendiğini ",
        link: "KVKK Aydınlatma Metni",
        after: "’nde okuyabilirsiniz.",
      },
      submitting: "Gönderiliyor…",
      success: {
        title: "Mesajınız alındı",
        text: "En kısa sürede dönüş yapacağız.",
        close: "Tamam",
      },
      error: "Mesaj gönderilemedi. Aşağıdaki seçeneklerden biriyle bize ulaştırabilirsiniz.",
      required: "Bu alan zorunlu",
      invalidEmail: "Geçerli bir e-posta adresi girin",
      // Gönder'e basınca açılan seçim paneli. Windows'ta çoğu zaman
      // varsayılan e-posta uygulaması kurulu olmuyor; mailto bağlantısı
      // hiçbir şey açmıyordu. Web postası ve kopyalama her yerde çalışıyor.
      send: {
        title: "Mesajınız hazır",
        hint: "Nereden göndermek istediğinizi seçin. Bilgisayarınızda e-posta uygulaması kurulu değilse Gmail ya da Outlook ile gönderin veya mesajı kopyalayıp adresimize yapıştırın.",
        gmail: "Gmail ile gönder",
        outlook: "Outlook ile gönder",
        app: "E-posta uygulamasında aç",
        copy: "Mesajı kopyala",
        copied: "Kopyalandı",
        copyFailed: "Kopyalanamadı; mesajı elle kopyalayın.",
        to: "Alıcı",
      },
    },
  },

  improvements: {
    eyebrow: "Örnekler",
    title: "Kendi ürünlerimizde yaptığımız iyileştirmeler",
    subtitle:
      "Bu hizmetin ne demek olduğunu en iyi kendi uygulamalarımız gösteriyor. İkisi de yayındayken elden geçirildi; aşağıda hangi aşamada ne yapıldığı sırasıyla yazıyor.",
    projectLink: "Proje sayfası",
  },

  privacy: {
    seo: {
      title: "KVKK Aydınlatma Metni",
      description:
        "6698 sayılı Kişisel Verilerin Korunması Kanunu'nun 10. maddesi uyarınca, bu sitede ve bizimle yazışırken kişisel verilerinizin nasıl işlendiğini açıklıyoruz.",
    },
    title: "KVKK Aydınlatma Metni",
    lead: "6698 sayılı Kişisel Verilerin Korunması Kanunu'nun 10. maddesi uyarınca, bu sitede ve bizimle yazışırken kişisel verilerinizin nasıl işlendiğini açıklıyoruz.",
    updated: "Son güncelleme: 28 Eylül 2026",
    sections: [
      {
        title: "Veri sorumlusu",
        body: [
          "Kişisel verileriniz, Gudia Dijital adıyla birlikte çalışan Gürkan Sevilmiş ve Dilara İşman tarafından veri sorumlusu sıfatıyla işlenir. Bize contact@gudiadigital.com adresinden ulaşabilirsiniz.",
        ],
      },
      {
        title: "Hangi verileri işliyoruz",
        items: [
          "Kimlik bilgisi: adınız ve soyadınız",
          "İletişim bilgisi: e-posta adresiniz ve/veya telefon numaranız",
          "Talep bilgisi: seçtiğiniz konu ve mesajınızda paylaştığınız bilgiler",
          "İşlem güvenliği bilgisi: siteyi ziyaret ettiğinizde ya da formu gönderdiğinizde barındırma ve form hizmetlerinin teknik olarak kaydettiği IP adresi ve tarayıcı bilgisi",
        ],
        after: [
          "Sitede çerez, analitik veya reklam takibi yoktur. Mesajınızda sağlık, din, etnik köken gibi özel nitelikli kişisel veri paylaşmamanızı rica ederiz.",
        ],
      },
      {
        title: "Hangi amaçlarla işliyoruz",
        items: [
          "Sorunuza, proje talebinize veya ücretsiz inceleme isteğinize yanıt vermek",
          "Teklif hazırlamak ve proje görüşmesi yapmak",
          "Kurulan iş ilişkisini yürütmek",
          "Sitenin ve iletişim formunun güvenliğini sağlamak, istenmeyen gönderimleri (spam) önlemek",
        ],
      },
      {
        title: "Toplama yöntemi ve hukuki sebep",
        body: [
          "Verileriniz, iletişim formu veya e-posta aracılığıyla elektronik ortamda, doğrudan sizden toplanır. Kanun'un 5. maddesinin 2. fıkrasındaki şu hukuki sebeplere dayanılır:",
        ],
        items: [
          "(c) Bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması — teklif, proje görüşmesi ve iş ilişkisi için",
          "(f) Temel hak ve özgürlüklerinize zarar vermemek kaydıyla meşru menfaatimiz için zorunlu olması — genel sorulara yanıt vermek ve site güvenliği için",
        ],
      },
      {
        title: "Kimlere aktarıyoruz",
        body: [
          "Verilerinizi satmıyor, reklam veya pazarlama amacıyla kimseyle paylaşmıyoruz. Yalnızca sitenin ve yazışmanın çalışması için aşağıdaki hizmet sağlayıcılarını kullanıyoruz. Bu hizmetlerin sunucuları yurt dışında bulunduğu için verileriniz Kanun'un 9. maddesi kapsamında yurt dışına aktarılmış olur:",
        ],
        items: [
          "Web3Forms — iletişim formundaki mesajınızı bize e-posta olarak iletir",
          "Google Workspace (Google LLC) — e-posta hesabımızı barındırır; mesajınız ve yazışmalarımız burada saklanır",
          "GitHub Pages (GitHub, Inc.) — siteyi barındırır; ziyaret sırasında IP adresinizi güvenlik amacıyla kaydedebilir",
        ],
        after: [
          "Bunun dışında verileriniz yalnızca yasal bir zorunluluk olduğunda, talep eden yetkili kamu kurum ve kuruluşlarıyla paylaşılabilir.",
        ],
      },
      {
        title: "Ne kadar süre saklıyoruz",
        body: [
          "Mesajınız ve yazışmalarımız, talebiniz sonuçlandıktan sonra en fazla 1 yıl saklanır. Aramızda bir iş ilişkisi kurulursa bu ilişki süresince ve yasal saklama süreleri boyunca tutulur. Süre dolduğunda veriler silinir.",
        ],
      },
      {
        title: "Haklarınız",
        body: ["Kanun'un 11. maddesi uyarınca şu haklara sahipsiniz:"],
        items: [
          "Kişisel verilerinizin işlenip işlenmediğini öğrenme",
          "İşlenmişse buna ilişkin bilgi talep etme",
          "İşlenme amacını ve verilerin amacına uygun kullanılıp kullanılmadığını öğrenme",
          "Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme",
          "Eksik veya yanlış işlenmişse düzeltilmesini isteme",
          "Kanun'un 7. maddesindeki şartlar çerçevesinde silinmesini veya yok edilmesini isteme",
          "Düzeltme, silme ve yok etme işlemlerinin verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme",
          "Yalnızca otomatik sistemlerle analiz edilmesi sonucunda aleyhinize bir sonuç çıkmasına itiraz etme",
          "Kanuna aykırı işleme nedeniyle zarara uğramanız halinde zararın giderilmesini talep etme",
        ],
      },
      {
        title: "Başvuru",
        body: [
          "Bu haklarınızı kullanmak için, bize daha önce yazdığınız e-posta adresinden aşağıdaki adrese yazabilirsiniz. Başvurunuzu en geç 30 gün içinde ücretsiz olarak yanıtlarız. Yanıtımızdan memnun kalmazsanız Kişisel Verileri Koruma Kurulu'na şikâyette bulunabilirsiniz.",
        ],
      },
    ] as PrivacySection[],
  },

  footer: {
    tagline: "Dijital ürün ve büyüme stüdyosu. Kur, iyileştir, büyüt.",
    servicesTitle: "Hizmetler",
    contactTitle: "İletişim",
    rights: "Tüm hakları saklıdır.",
    privacyTitle: "Verileriniz",
    privacyLink: "Aydınlatma metni",
    privacyNote:
      "Bu sitede çerez, analitik veya takip kodu bulunmuyor. İletişim formuna yazdıklarınız yalnızca bize e-posta olarak ulaştırılmak üzere Web3Forms hizmeti üzerinden gönderilir; bu site hiçbir veri saklamaz.",
  },

  webShowcase: {
    eyebrow: "Yayında olan siteler",
    title: "Kendi uygulamalarımız için kurduğumuz siteler",
    subtitle:
      "Altısının da sayfa iskeleti ayrı — aynı şablonun rengi değiştirilmiş hâli değil. Ana ekranları burada; kartlara tıklayınca sitenin kendisi açılıyor.",
    visit: "Siteyi aç",
    // Kart görselinin alternatif metni; {title}: sitenin adı.
    imageAlt: "{title} sitesinin ana ekranı",
    // {title}: projenin adı. Bağlantı metni nereye gittiğini söylesin diye
    // "Projeyi gör" yerine.
    project: "{title} proje sayfası",
  },

  common: {
    backToServices: "Tüm hizmetlere dön",
    // Sayfanın üstündeki içerik haritasının (breadcrumb) ekran okuyucu adı.
    breadcrumb: "Konum",
    // Soru biçimli başlıklar; {service} hizmetin adı. "Proje sonunda" denmedi:
    // sosyal medya aylık bir hizmet, teslim edilenler de her ay geliyor.
    whatWeDo: "{service} hizmetine neler dahil?",
    whatYouGet: "Elinize neler geçecek?",
    source: "Kaynak",
    skipToContent: "İçeriğe geç",
  },
};

export type Dictionary = typeof tr;
