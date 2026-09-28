/** KVKK aydınlatma metninde bir başlık: paragraf, madde listesi, ek paragraf. */
export type PrivacySection = {
  title: string;
  body?: string[];
  items?: string[];
  after?: string[];
};

export const tr = {
  meta: {
    siteName: "Gudia Dijital",
    title: "Gudia Dijital — Dijital Ürün ve Büyüme Stüdyosu",
    description:
      "Markaların dijital ürünlerini oluşturuyor, iyileştiriyor ve büyütüyoruz: mobil uygulama, web sitesi, markalı oyun, sosyal medya içeriği ve e-ticaret.",
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
    eyebrow: "Digital Products & Growth Studio",
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
    items: {
      "mobil-uygulama": {
        title: "Mobil Uygulama Geliştirme",
        short:
          "iOS ve Android için sıfırdan uygulama: rezervasyon, üyelik, sadakat, ödeme ve müşteri paneli gibi işinize özel çözümler.",
        intro:
          "Amacımız sadece bir uygulama teslim etmek değil; işletmenin gerçekten kullandığı, operasyonuna ya da satışına dokunan bir ürün kurmak. Kurucumuz Gürkan'ın iOS geliştirici geçmişi sayesinde Apple ekosisteminde özellikle derinlikli çalışıyoruz.",
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
      },
      "web-sitesi": {
        title: "Web Sitesi Geliştirme",
        short:
          "Hızlı açılan, aramada görünen, telefonda da masaüstünde de düzgün çalışan kurumsal siteler ve açılış sayfaları.",
        intro:
          "Hazır şablon kurmuyoruz. Markanıza özel tasarlanan, ölçülebilir hedefi olan siteler kuruyoruz: tanıtım sitesi, kurumsal site, açılış sayfası ya da içinde rezervasyon veya müşteri paneli olan bir web uygulaması.",
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
      },
      "markali-oyunlar": {
        title: "Markalı Oyun & İnteraktif Deneyim",
        short:
          "Etkinlikler, kampanyalar ve fuarlar için markaya özel oyunlar ve interaktif aktivasyonlar.",
        intro:
          "Standart bir reklam yerine insanların oynadığı bir şey. Fuar standında kuyruk oluşturan bir yarışma, kampanyaya bağlı bir çark, eğitim amaçlı bir simülasyon ya da markanızın dünyasında geçen küçük bir oyun — kapsamı birlikte belirliyoruz.",
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
      },
      "dijital-urun-iyilestirme": {
        title: "Dijital Ürün İyileştirme",
        short:
          "Elinizde zaten bir uygulama veya site var ama eski, yavaş ya da çalışmıyor. Sıfırdan yazmadan toparlıyoruz.",
        intro:
          "Çoğu işletmenin ihtiyacı yeni bir ürün değil, var olanın düzgün çalışması. Önce ücretsiz bir inceleme yapıp somut olarak neyin düzeltilmesi gerektiğini yazıyoruz; kapsamı siz seçiyorsunuz. Uzun süredir güncellenmeyen uygulamalar App Store tarafından kaldırılma sürecine bile girebiliyor — bu iş ertelenecek bir iş değil.",
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
      },
      "sosyal-medya-icerik": {
        title: "Sosyal Medya İçerik Üretimi",
        short:
          "Aylık Reels, görsel ve story üretimi — içerik planı, senaryo ve kapak tasarımlarıyla birlikte.",
        intro:
          "Düzenli içerik üretmek çoğu işletme için en zor kısım. Görselleri siz gönderiyorsunuz, kurgudan tasarıma ve paylaşıma kadar kalan işi biz yapıyoruz. Abartılı vaat yok: profesyonel çekim, oyuncu ve mekân bu kapsamın dışında.",
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
      },
      "e-ticaret-optimizasyonu": {
        title: "E-Ticaret Optimizasyonu",
        short:
          "Trendyol mağazanızın ürün sayfalarını, görsellerini ve metinlerini dönüşüm için yeniden düzenliyoruz.",
        intro:
          "Türkiye'de 600 binden fazla işletme pazaryerlerinde satış yapıyor; aradaki fark çoğu zaman üründe değil, ürün sayfasında. Mağazanızı inceleyip hangi ürünlerde hızlı kazanım olduğunu gösteriyoruz, sonra öncesi/sonrası olarak uyguluyoruz.",
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
    eyebrow: "Hakkımızda",
    title: "İki kişilik bir ekip, doğrudan iletişim",
    lead:
      "Gudia Dijital bir dijital ürün ve büyüme stüdyosu. Büyük ajansların araya koyduğu katmanları kaldırmak için kuruldu — projenizi kim yapıyorsa onunla konuşursunuz.",
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
        name: "Gürkan Sevilmiş",
        role: "Kurucu Ortak · iOS Geliştirici",
        bio: "Mobil uygulama geliştirme ve ürün iyileştirme tarafını yürütüyor. Swift ve SwiftUI ile native iOS uygulamaları geliştiriyor; App Store yayın süreçleri, mimari kararlar ve teknik üretimden sorumlu.",
      },
      {
        name: "Dilara İşman",
        role: "Kurucu Ortak · Oyun Geliştirici",
        bio: "Oyun geliştirme, proje yönetimi ve müşteri iletişimini yürütüyor. Markalı oyun ve interaktif deneyim projelerinin geliştirilmesinden, işlerin planlanıp zamanında teslim edilmesinden ve müşteriyle günlük iletişimden sorumlu.",
      },
    ],
  },

  projects: {
    eyebrow: "Projeler",
    title: "Üzerinde çalıştıklarımız",
    subtitle:
      "Yayına aldığımız ve geliştirmeye devam ettiğimiz işler. Liste büyüdükçe burayı güncelliyoruz.",
    empty:
      "İlk projelerimizi yayına hazırlıyoruz. Bu bölüm çok yakında güncellenecek — bu arada aklınızdaki projeyi konuşmak isterseniz bize yazın.",
    emptyCta: "Bize yazın",
    viewProject: "Projeyi gör",
    featuredEyebrow: "Öne çıkan işler",
    featuredTitle: "Yayında olan projeler",
    featuredSubtitle:
      "Markalar için kurduğumuz deneyimlerden kendi uygulamalarımıza kadar, gerçekten yayında olan işler.",
    allProjects: "Tüm projeler",
    referencesTitle: "Bu alandaki işlerimiz",
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
    project: "Projeyi gör",
  },

  common: {
    backToServices: "Tüm hizmetlere dön",
    whatWeDo: "Kapsam",
    whatYouGet: "Teslim edilenler",
    skipToContent: "İçeriğe geç",
  },
};

export type Dictionary = typeof tr;
