import { locales, type Locale, type ServiceSlug } from "@/i18n/config";
import type { SourceLink } from "@/i18n/dictionaries";
import { projects } from "./projects";

/**
 * Rehber yazıları: /tr/rehber/<slug>/, /en/guides/<slug>/.
 *
 * Her rehberi bir kurucu yazıyor ve sahibi onaylamadan yayına girmiyor.
 * `published: false` olan rehber hiçbir yerde görünmüyor: sayfası
 * üretilmiyor, sitemap'e, footer'a ve hizmet sayfalarına girmiyor. Yayında
 * tek rehber yokken rehber dizini (/tr/rehber/) de üretilmiyor.
 *
 * Bu dosya yalnızca sunucu tarafında içe aktarılmalı. İstemci bileşeni
 * (Header) buradan bir şey alırsa taslakların metni tarayıcı paketine,
 * yani yayına giriyor; Header'a layout yalnızca yayındaki rehberlerin
 * slug'larını veriyor.
 *
 * Metindeki her kural ve tarih `sources`'taki resmî sayfalara dayanıyor.
 * Gudia'nın kendi süreciyle ilgili tek iddia ücretsiz inceleme (sitede
 * zaten yazan). Fiyat, süre ve müşteri adı sahibinden gelmeden yazılmıyor.
 */
export type GuideSection = {
  /** Soru biçiminde ara başlık. */
  h2: string;
  /** Başlığın hemen altındaki 1–2 cümlelik doğrudan cevap; tek başına alıntılanabilir olmalı. */
  answer: string;
  /** Cevabın ayrıntısı; her paragraf bir dizi elemanı. */
  body: string[];
};

export type Guide = {
  id: string;
  /** Dile göre görünen slug; dil değiştirici aynı rehberin öbür dildekine gidiyor. */
  slug: Record<Locale, string>;
  /** Rehberin bağlandığı hizmet; hizmet sayfasında "İlgili rehberler"de çıkıyor. */
  service: ServiceSlug;
  /** Sayfadaki H1; uzun olabilir. */
  title: Record<Locale, string>;
  /**
   * Arama başlığı ve içerik haritasındaki ad. <title>'a " · Gudia Dijital"
   * eki geliyor ve toplam 70 karakteri geçmemeli (check:seo); H1 buna
   * sığmadığı için ayrı.
   */
  shortTitle: Record<Locale, string>;
  /** Meta açıklama ve başlığın altındaki özet; 120–155 karakter (check:seo 155 üstünü uyarıyor). */
  description: Record<Locale, string>;
  sections: Record<Locale, GuideSection[]>;
  /** Hakkımızda'daki kurucu kimliği (about.founders[].id); imza oraya bağlanıyor. */
  author: "gurkan-sevilmis" | "dilara-isman";
  /** YYYY-MM-DD. Yayına alınırken gerçek yayın tarihi yazılmalı. */
  publishedAt: string;
  /** YYYY-MM-DD. Yalnızca metin gerçekten değiştiğinde ilerletilir; tarih oynatılmaz. */
  updatedAt: string;
  published: boolean;
  sources: SourceLink[];
  /** projects.ts slug'ları. */
  relatedProjects?: string[];
};

const guides: Guide[] = [
  {
    // Taslak: Gürkan'ın imzası ve metin sahibi onayını bekliyor. Kurallar ve
    // tarihler 28 Eylül 2026'da dört kaynak sayfada tek tek doğrulandı.
    // Yayına alırken publishedAt/updatedAt'i yayın günüyle değiştirin ve
    // tarihleri kaynaklarda yeniden kontrol edin (Play'in ek süresi 1 Kasım
    // 2026'da bitiyor; Apple'ın bir sonraki SDK şartı duyurulunca da).
    id: "store-update-requirements",
    slug: {
      tr: "app-store-google-play-guncelleme-zorunluluklari",
      en: "app-store-google-play-update-requirements",
    },
    service: "dijital-urun-iyilestirme",
    title: {
      tr: "App Store ve Google Play güncelleme zorunlulukları: Uygulamanız neden kaldırılır, ne yapmalısınız? (2026)",
      en: "App Store and Google Play update requirements: why apps get removed and what to do (2026)",
    },
    shortTitle: {
      tr: "App Store ve Google Play Güncelleme Zorunluluğu",
      en: "App Store and Google Play Update Requirements",
    },
    description: {
      tr: "Apple'ın Xcode 26 şartı ve güncellenmeyen uygulamaları kaldırması, Google Play'in API 36 ve API 35 şartı, 1 Kasım 2026 ek süresi: ne demek, ne yapmalı?",
      en: "Apple's Xcode 26 rule and outdated-app removals, Google Play's API 36 and API 35 targets and the November 1, 2026 extension: what they mean, what to do.",
    },
    sections: {
      tr: [
        {
          h2: "App Store'da güncelleme zorunlu mu?",
          answer:
            "Apple güncellemeyi belirli bir takvime bağlamıyor; düzenli güncellemeyi iyi bir alışkanlık olarak öneriyor. Ama uzun süredir güncellenmeyen ve çok az indirilen uygulamalar mağazadan kaldırılabiliyor, gönderdiğiniz her yeni sürüm de o günkü teknik şartlara uymak zorunda.",
          body: [
            "Apple, App Store'daki uygulamaları sürekli değerlendiriyor: artık amaçlandığı gibi çalışmayan, güncel inceleme kurallarına uymayan ya da eskimiş uygulamaları mağazadan kaldırıyor. Bu değerlendirme bütün kategorilerdeki uygulamaları kapsıyor.",
            "Teknik şartlar ise App Store Connect'e yüklenen yeni sürümler için geçerli. Bu yüzden uzun süredir dokunulmamış bir uygulamada ilk güncelleme, projeyi önce bugünkü şartlara uygun hâle getirmeyi gerektiriyor.",
          ],
        },
        {
          h2: "Xcode 26 / iOS 26 SDK şartı ne demek?",
          answer:
            "28 Nisan 2026'dan beri App Store Connect'e yüklenen uygulamaların Xcode 26 ya da daha yeni bir sürümle, iOS 26, iPadOS 26, tvOS 26, visionOS 26 veya watchOS 26 SDK'sı kullanılarak derlenmesi gerekiyor. Daha eski bir Xcode ile derlenmiş sürüm bu şartı karşılamıyor.",
          body: [
            "SDK (yazılım geliştirme kiti), uygulamanın derlendiği Apple kütüphaneleri ve araçlarıdır. Şart, uygulamanın nasıl derlendiğiyle ilgili; kullanıcılarınızın iOS 26'ya geçmiş olması gerekmiyor. 9 Eylül 2026'dan beri yüklenen iOS ve iPadOS uygulamalarının en az iOS 13'ü hedeflemesi yeterli.",
            "Uzun süredir güncellenmeyen bir projede ilk iş, projeyi Xcode 26 ile derlenir hâle getirmek.",
          ],
        },
        {
          h2: "Apple hangi uygulamaları neden kaldırıyor, 90 günde ne yapılmalı?",
          answer:
            "Son üç yılda güncellenmemiş ve 12 aylık dönemde hiç ya da çok az indirilmiş uygulamaların geliştiricisine, uygulamanın kaldırılabileceğini bildiren bir e-posta gönderiliyor. 90 gün içinde güncelleme gönderilmezse uygulama, yeni sürüm gönderilip onaylanana kadar App Store'dan kaldırılıyor.",
          body: [
            "Açılışta çöken uygulamalar ise beklenmeden, hemen kaldırılıyor. Artık amaçlandığı gibi çalışmayan ya da güncel inceleme kurallarına uymayan uygulamalar için App Store ekibi geliştiriciden gerekli değişiklikleri istiyor.",
            "90 gün içinde yapılması gereken, App Store incelemesinden geçecek bir güncelleme göndermek. Bu güncelleme de bugünkü şartlara uymalı: Xcode 26 ve iOS 26 SDK'sıyla derlenmiş olmalı ve en az iOS 13'ü hedeflemeli.",
            "Süre kaçarsa her şey bitmiyor. Kaldırılan uygulama hesabınızdan silinmiyor, adı da size ait kalıyor; uygulamayı daha önce indirmiş kullanıcılar onu kullanmaya ve uygulama içi satın alma yapmaya devam edebiliyor. Apple Developer Program üyeliğiniz etkin olduğu sürece güncellemeyi istediğiniz zaman gönderebilirsiniz; güncelleme onaylanınca uygulama mağazaya geri dönüyor. Kaldırma kararına itiraz etmek de mümkün.",
          ],
        },
        {
          h2: "Google Play “hedef API seviyesi” uyarısı ne demek (API 36 / API 35)?",
          answer:
            "Hedef API seviyesi (targetSdkVersion), uygulamanın farklı Android sürümlerinde nasıl çalışacağını belirleyen ayardır. 31 Ağustos 2026'dan beri Google Play'e gönderilen yeni uygulamalar ve güncellemeler Android 16'yı (API 36) hedeflemek zorunda; yayındaki uygulamaların yeni kullanıcılara görünmeye devam etmesi için ise en az Android 15'i (API 35) hedeflemesi gerekiyor.",
          body: [
            "API 34 ya da daha düşük bir seviyeyi hedefleyen uygulama Google Play'den kaldırılmıyor ama görünürlüğü daralıyor: telefonunda uygulamanın hedeflediğinden daha yeni bir Android sürümü olan yeni kullanıcılar onu bulamıyor ve yükleyemiyor. Uygulamayı daha önce yüklemiş olanlar etkilenmiyor; bulmaya, yeniden yüklemeye ve kullanmaya devam edebiliyor. Yeni cihazlardaki yeni kullanıcılar uygulamayı indiremediği için indirme sayıları düşebiliyor.",
            "Wear OS ve Android Automotive OS uygulamalarında yeni uygulama ve güncelleme şartı API 35, Android TV ve Android XR uygulamalarında API 34. Belirli bir kuruluşun kullanıcılarıyla sınırlı ve yalnızca şirket içinde dağıtılan, kalıcı olarak özel uygulamalar bu şartlardan muaf.",
          ],
        },
        {
          h2: "1 Kasım 2026'ya kadar ek süre nasıl istenir?",
          answer:
            "Hedef API şartını karşılamayan uygulamalar için Google Play Console'da politika uyarısı çıkıyor; ek süre formuna, Politika durumu sayfasındaki bu uyarının ayrıntılar sayfasından ulaşılıyor. Ek süre verilen uygulama 1 Kasım 2026'ya kadar Google Play'deki bütün kullanıcılara dağıtılmaya devam ediyor.",
          body: [
            "Google, form bağlantısını etkilenen uygulamalar için Play Console'un Bildirimler bölümüne de gönderiyor. Ek süre şartı kaldırmıyor, yalnızca zaman kazandırıyor: bu sürede göndereceğiniz güncellemenin de Android 16'yı (API 36) hedeflemesi gerekiyor.",
          ],
        },
        {
          h2: "Geliştiriciniz yoksa ne yapabilirsiniz?",
          answer:
            "Güncelleme, uygulamanın yayınlandığı App Store Connect ve Google Play Console hesaplarından gönderiliyor; bu yüzden ilk adım, bu hesaplara ve uygulamanın kaynak koduna erişiminiz olup olmadığını kontrol etmek. Ardından uygulamanın bugünkü şartlara ne kadar uzak olduğunu görmek için bir inceleme yaptırabilirsiniz.",
          body: [
            "Gudia Dijital'e uygulamanızın App Store ya da Google Play bağlantısını gönderirseniz uygulamayı ücretsiz inceleyip neyin güncellenmesi gerektiğini yazılı olarak iletiyoruz. İnceleme hiçbir yükümlülük getirmiyor.",
          ],
        },
      ],
      en: [
        {
          h2: "Do you have to update an app on the App Store?",
          answer:
            "Apple doesn't put updates on a fixed schedule; it recommends updating regularly as a best practice. But apps that go years without an update and are rarely downloaded can be removed, and every new version you submit has to meet the technical requirements in force that day.",
          body: [
            "Apple evaluates apps on the App Store on an ongoing basis and removes apps that no longer function as intended, don't follow the current review guidelines or are outdated. This applies to apps in every category.",
            "The technical requirements apply to new builds uploaded to App Store Connect. So for an app nobody has touched in a long time, the first update means bringing the project up to today's requirements first.",
          ],
        },
        {
          h2: "What does the Xcode 26 / iOS 26 SDK requirement mean?",
          answer:
            "Since April 28, 2026, apps uploaded to App Store Connect must be built with Xcode 26 or later, using the iOS 26, iPadOS 26, tvOS 26, visionOS 26 or watchOS 26 SDK. A build made with an older Xcode doesn't meet this requirement.",
          body: [
            "The SDK (software development kit) is the set of Apple frameworks and tools an app is built with. The requirement is about how the app is built, not about which iOS version your users run: since September 9, 2026, iOS and iPadOS apps uploaded to App Store Connect only need to target iOS 13 or later.",
            "For a project that hasn't been updated in a long time, the first job is getting it to build with Xcode 26.",
          ],
        },
        {
          h2: "Which apps does Apple remove, and what should you do within 90 days?",
          answer:
            "Developers of apps that haven't been updated in the last three years and were downloaded not at all or extremely few times over a rolling 12-month period get an email saying the app may be removed. If no update is submitted within 90 days, the app is removed from the App Store until an update is submitted and approved.",
          body: [
            "Apps that crash on launch are removed immediately. For apps that no longer work as intended or don't follow the current review guidelines, the App Store team asks the developer to make the necessary changes.",
            "What you need to do within those 90 days is submit an update that passes App Review. That update has to meet today's requirements too: built with Xcode 26 and the iOS 26 SDK, targeting iOS 13 or later.",
            "Missing the deadline isn't the end. A removed app isn't deleted from your account and its name stays yours; people who already downloaded it can keep using it and can still make in-app purchases. As long as your Apple Developer Program membership is active, you can submit an update at any time, and the app returns to the store once the update is approved. You can also appeal a removal.",
          ],
        },
        {
          h2: "What does Google Play's “target API level” warning mean (API 36 / API 35)?",
          answer:
            "The target API level (targetSdkVersion) is the setting that determines how an app behaves on different Android versions. Since August 31, 2026, new apps and updates submitted to Google Play must target Android 16 (API level 36), and existing apps must target at least Android 15 (API level 35) to stay available to new users.",
          body: [
            "An app that targets API level 34 or lower isn't taken off Google Play, but its reach shrinks: new users whose phones run a newer Android version than the app targets can't find or install it. People who already installed it aren't affected and can keep finding, reinstalling and using it. Because new users on newer devices can't download the app, download numbers can drop.",
            "For Wear OS and Android Automotive OS apps, the requirement for new apps and updates is API level 35; for Android TV and Android XR apps it is API level 34. Permanently private apps that are restricted to users in a specific organization and distributed internally are exempt.",
          ],
        },
        {
          h2: "How do you request an extension to November 1, 2026?",
          answer:
            "Apps that don't meet the target API level requirement get a policy warning in Google Play Console, and the extension form is reached from that warning's details page on the Policy status page. With an extension, the app stays available to all users on Google Play until November 1, 2026.",
          body: [
            "Google also sends affected apps a link to the extension form through Play Console notifications. The extension doesn't lift the requirement, it only buys time: the update you submit in the meantime still has to target Android 16 (API level 36).",
          ],
        },
        {
          h2: "What can you do if you don't have a developer?",
          answer:
            "Updates are submitted from the App Store Connect and Google Play Console accounts the app is published under, so the first step is checking that you have access to those accounts and to the app's source code. After that, a review can show how far the app is from today's requirements.",
          body: [
            "Send Gudia Digital your app's App Store or Google Play link and we'll review it for free and tell you in writing what needs to be updated. The review comes with no obligation.",
          ],
        },
      ],
    },
    author: "gurkan-sevilmis",
    publishedAt: "2026-09-28",
    updatedAt: "2026-09-28",
    published: false,
    // Play Yardım makalesi hl parametresiz: ziyaretçinin dilinde açılıyor.
    sources: [
      {
        label: "Apple Developer: Upcoming Requirements",
        url: "https://developer.apple.com/news/upcoming-requirements/",
      },
      {
        label: "Apple Developer: App Store Improvements",
        url: "https://developer.apple.com/support/app-store-improvements/",
      },
      {
        label: "Android Developers: Meet Google Play's target API level requirement",
        url: "https://developer.android.com/google/play/requirements/target-sdk",
      },
      {
        label: "Play Console Help: Target API level requirements for Google Play apps",
        url: "https://support.google.com/googleplay/android-developer/answer/11926878",
      },
    ],
  },
];

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Yazım hatası derlemeyi durdursun, sessizce bozuk sayfa çıkmasın:
 * tekrarlanan kimlik ya da slug, geçersiz tarih, bilinmeyen proje.
 * Taslaklar da denetleniyor; yayına alındığı gün sürpriz çıkmasın.
 */
function validate(list: Guide[]): Guide[] {
  const ids = new Set<string>();
  const paths = new Set<string>();
  for (const guide of list) {
    const where = `src/data/guides.ts "${guide.id}"`;
    if (ids.has(guide.id)) throw new Error(`${where}: id iki kez kullanılmış`);
    ids.add(guide.id);
    for (const locale of locales) {
      const slug = guide.slug[locale];
      if (!SLUG.test(slug)) throw new Error(`${where}: geçersiz ${locale} slug'ı "${slug}"`);
      if (paths.has(`${locale}/${slug}`)) throw new Error(`${where}: ${locale} slug'ı başka rehberde de var`);
      paths.add(`${locale}/${slug}`);
      if (guide.sections[locale].length === 0) throw new Error(`${where}: ${locale} bölümü boş`);
    }
    if (!ISO_DATE.test(guide.publishedAt) || !ISO_DATE.test(guide.updatedAt)) {
      throw new Error(`${where}: tarih YYYY-MM-DD olmalı`);
    }
    if (guide.updatedAt < guide.publishedAt) {
      throw new Error(`${where}: updatedAt, publishedAt'ten önce olamaz`);
    }
    for (const slug of guide.relatedProjects ?? []) {
      if (!projects.some((project) => project.slug === slug)) {
        throw new Error(`${where}: bilinmeyen proje "${slug}"`);
      }
    }
  }
  return list;
}

/** Yayındaki rehberler, en yenisi önde. Sayfalar, sitemap ve bağlantılar yalnızca bunu okuyor. */
export const publishedGuides: Guide[] = validate(guides)
  .filter((guide) => guide.published)
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

/** Görünen slug'dan yayındaki rehberi bulur. */
export function guideBySlug(locale: Locale, slug: string): Guide | undefined {
  return publishedGuides.find((guide) => guide.slug[locale] === slug);
}

/** Hizmet sayfasındaki "İlgili rehberler": aynı hizmete bağlı, yayındaki en fazla üç rehber. */
export function guidesForService(service: ServiceSlug, limit = 3): Guide[] {
  return publishedGuides.filter((guide) => guide.service === service).slice(0, limit);
}
