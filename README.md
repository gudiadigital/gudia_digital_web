# Gudia Dijital — gudiadigital.com

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · TR/EN çok dilli.
Statik site olarak derlenir, GitHub Pages'te yayınlanır.

Konumlandırma: dijital ürün ve büyüme stüdyosu. Hizmetler **kur / iyileştir /
büyüt** olarak üç gruba ayrılır; gruplama `src/i18n/config.ts` içindeki
`servicesByGroup` tablosunda tanımlıdır.

## Yayın

`main` dalına her push, `.github/workflows/deploy.yml` üzerinden siteyi derleyip
otomatik yayınlar. Elle yapılacak bir şey yok. Yayının durumu deponun
**Actions** sekmesinde görünür.

## Çalıştırma

```bash
npm run dev     # http://localhost:3000 — geliştirme
npm run build   # statik siteyi out/ klasörüne üretir
npm run lint
```

`out/` klasörü derleme çıktısıdır, depoya girmez.

## Yapı

```
src/
  app/[locale]/          Kök layout burada; html lang dile göre ayarlanır
    page.tsx             Ana sayfa
    [page]/page.tsx      Hakkımızda / Hizmetler / Projeler / İletişim
    [page]/[slug]/       Hizmet detay sayfaları
  components/
    pages/               Sayfa içerikleri (route dosyaları bunları çağırır)
    sections/            Ana sayfa bölümleri
    Motion.tsx           Tek istemci adası: kaydırma açılışları + imleç efektleri
    Aurora.tsx           Hero arkasındaki canlı ışık katmanı (saf CSS)
  i18n/
    config.ts            Diller ve hizmet slug listesi
    routes.ts            Dile göre URL üretimi — TEK kaynak
    dictionaries/        tr.ts (kaynak) · en.ts (tr'nin tipine uymak zorunda)
  data/projects.ts       Portfolyo listesi (şu an boş)
public/
  index.html             Kök adres (/) için dil algılayan yönlendirme
  CNAME                  Özel alan adı — GitHub Pages bunu okur
  .nojekyll              Pages'in _next klasörünü atlamasını engeller
```

## Sık yapılacak işler

**Metin değiştirmek** → `src/i18n/dictionaries/tr.ts` ve `en.ts`. İkisi aynı
yapıda olmak zorundadır; `en.ts` eksik alan bırakırsa derleme hata verir.

**Proje eklemek** → `src/data/projects.ts` içindeki diziye bir nesne ekle.
Liste boş olduğu sürece Projeler sayfası boş durum metnini gösterir.

**Renk değiştirmek** → `src/app/globals.css` içindeki `:root` blokları.
Koyu mod varsayılan; açık mod `prefers-color-scheme: light` ile otomatik.

**Logo değiştirmek** → `public/brand/` altındaki PNG'ler: `mark-dark.png` /
`mark-light.png` (header–footer, moda göre seçilir), `favicon-dark.png` /
`favicon-light.png`, `apple-touch-icon.png`. `src/app/favicon.ico` eski
tarayıcılar için lacivert zeminli yedek. Kullanım yerleri değişmez.

**Yeni sayfa eklemek** → `src/i18n/routes.ts` içindeki `pageSegments` tablosuna
iki dildeki URL parçasını ekle, `pageKeys`'e anahtarı ekle, içeriği
`src/components/pages/` altına yaz ve `[page]/page.tsx` içindeki `switch`'e bağla.
URL'ler oradan üretildiği için başka yere dokunmak gerekmez.

## URL şeması

| Sayfa    | TR                            | EN                            |
| -------- | ----------------------------- | ----------------------------- |
| Ana      | `/tr/`                        | `/en/`                        |
| Hizmetler| `/tr/hizmetler/`              | `/en/services/`               |
| Hizmet   | `/tr/hizmetler/markali-oyunlar/` | `/en/services/branded-games/` |
| Hakkında | `/tr/hakkimizda/`             | `/en/about/`                  |

Kök adres (`/`) tarayıcı diline bakıp `/tr/` veya `/en/`'e yönlendirir.

## Hareket / animasyon

Animasyonların tamamı CSS'te (`globals.css` sonundaki "Hareket katmanı").
JavaScript yalnızca iki şey yapar: bir bölüm görünür olduğunda `is-visible`
sınıfını ekler ve imleç konumunu `--px` / `--py` değişkenlerine yazar.

Bir bölümün kaydırınca belirmesi için ona `data-reveal` eklemek yeterli;
`data-reveal-delay="120"` ile sıralama gecikmesi verilir. Kart üzerinde imleci
takip eden ışık için `data-spotlight` ve `spotlight` sınıfı eklenir.

İki bilinçli tercih:

- Bölüm açılışları `IntersectionObserver` yerine doğrudan konum ölçümüyle,
  kısıtlama da `requestAnimationFrame` yerine `setTimeout` ile yapılıyor.
  İkisi de arka plandaki sekmelerde tarayıcı tarafından askıya alınıyor ve
  bu durumda bölümler görünmez kalıyordu.
- JavaScript çalışmazsa hiçbir şey gizlenmez; `data-reveal-root` işareti
  konmadığı için tüm içerik normal şekilde görünür.

`prefers-reduced-motion: reduce` seçili cihazlarda tüm hareket kapanır ve
içerik doğrudan görünür gelir.

## Arka plan videosu (ScrollStory)

Ana sayfadaki kaydırmalı bölümün videosu `public/video/story.mp4`.
Kaydırma ilerlemesi doğrudan videonun zamanına bağlanır; paneller ilerlemeyi
eşit dilimlere bölerek sırayla devreye girer.

**Videoyu değiştirmek:** ham dosyayı hazırlama betiğine ver, gerisini o yapar:

```bash
tools/prepare-video.sh ~/Downloads/yeni-video.mp4
```

Betik sesi kaldırır, rengi markaya çeker, her kareyi anahtar kare yapar,
1152px'e indirir ve posteri üretir. Elle yapmak istersen iki koşul var:

1. **Her kare anahtar kare olmalı** (all-intra), yoksa kaydırma takılır —
   ara karelere atlarken tarayıcı geriye gidip çözmek zorunda kalıyor.
   Kodlarken: `-g 1 -keyint_min 1 -sc_threshold 0 -movflags +faststart`
   Kare hızını düşürmek (15 fps) boyutu dengeler; kaydırmada hızı zaten
   kullanıcı belirlediği için 15 fps yeterli.
2. Sunucunun **HTTP Range** desteklemesi gerekir (GitHub Pages destekliyor).
   Desteklemezse tarayıcı videoda konum değiştiremez ve video ilk karede donar.

Poster görseli `public/video/story-poster.jpg` — video yüklenene kadar görünür,
ilk karesiyle aynı olmalı.

Gösterilen an bileşen içinde ayrı bir değişkende tutulur, videodan geri
okunmaz: `video.currentTime`'a yazmak asenkron bir arama başlatır ve hemen geri
okunduğunda eski değer döner. Geri okunursa fark hiç kapanmaz, video kaydırma
boyunca donar ve kaydırma durunca biriken farkı tek hamlede atlar.

Dar ekranlarda ve `prefers-reduced-motion` açıkken video kaydırmaya bağlanmaz;
mobilde normal döngüde oynar, hareket azaltmada bölüm normal yüksekliğe döner
ve paneller alt alta sıralanır.

## Kısıtlar

Site tamamen statiktir — sunucu tarafında çalışan kod yoktur. Bu yüzden
iletişim formu ziyaretçinin e-posta uygulamasında hazır mesaj açar
(`src/components/ContactForm.tsx`). Gerçek form gönderimi istenirse Formspree
gibi dışarıdan bir servis eklenmelidir.
