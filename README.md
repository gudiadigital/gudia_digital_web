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
    [page]/page.tsx      Hakkımızda / Hizmetler / Projeler / İletişim / KVKK
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
  data/projects.ts       Portfolyo listesi (proje kartları ve detay sayfaları)
public/
  index.html             Kök adres (/) için dil algılayan yönlendirme
  CNAME                  Özel alan adı — GitHub Pages bunu okur
  .nojekyll              Pages'in _next klasörünü atlamasını engeller
```

## Sık yapılacak işler

**Metin değiştirmek** → `src/i18n/dictionaries/tr.ts` ve `en.ts`. İkisi aynı
yapıda olmak zorundadır; `en.ts` eksik alan bırakırsa derleme hata verir.

**Proje eklemek** → `src/data/projects.ts` içindeki diziye bir nesne ekle.
Detay sayfası (`/tr/projeler/<slug>/`) ve site haritası kaydı otomatik
üretilir. Ekran görüntülerini `public/projeler/<slug>/` altına `ss-1.jpg`,
`ss-2.jpg`… olarak koyup `tools/optimize-images.sh` ile WebP'ye çevir.

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
| KVKK     | `/tr/kvkk/`                   | `/en/privacy/`                |

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

## Arka plan sahnesi (ScrollStory)

Açılış bölümünün arka planı bir video değil, WebGL ile ışın yürütülerek
(raymarching) çizilen 3B sahne: `src/components/StoryScene.tsx`. Tek bir
fragment shader; ortada bir çekirdek, çevresinde yörüngedeki düğümler.
Kaydırma ilerledikçe düğümler doğar, yörüngeleri genişler ve çekirdekle
kaynaşır — "kur / iyileştir / büyüt" anlatısının görsel karşılığı.

Neden video değil:

- Dosya yok; shader birkaç KB. Önceki video 1.6 MB idi.
- Renkler CSS değişkenlerinden (`--space`, `--accent`, `--accent-2`,
  `--accent-3`) okunur, yani açık/koyu mod ve palet değişiklikleri sahneye
  kendiliğinden yansır.
- Kare araması yok. Videoda kaydırma `currentTime`'a yazıyordu ve bu asenkron
  bir arama başlattığı için her karenin anahtar kare olması (`-g 1`) ve
  sunucunun HTTP Range desteklemesi şarttı. Sahnede böyle bir kısıt yok.

**Ayarlar** shader'ın içinde, `map()` ve `main()` başındaki sabitlerde:
düğüm sayısı (`for (int i = 0; i < 7; i++)`), kaynaşma yumuşaklığı (`k`),
kamera mesafesi (`dist`) ve yapının yatay konumu (`uv.x -= 0.30` — metin
panelleri solda durduğu için sahne sağa kaydırılmıştır).

**Başarım:** ışın yürütme piksel başına pahalıdır, bu yüzden tuval tam
çözünürlükte çizilmez — DPR 1.5'te ve toplam 1.1 milyon piksel sınırında
tutulur (`MAX_PIXELS`). Sahne yumuşak olduğu için fark gözle seçilmiyor.
Bölüm ekrandan çıkınca ya da sekme arka plana alınınca döngü durur.

**Geri düşme:** WebGL yoksa veya `prefers-reduced-motion: reduce` seçiliyse
tuval hiç kurulmaz; `.story-canvas` üzerindeki CSS degradesi görünür kalır ve
bölüm boş görünmez.

## Kısıtlar

Site tamamen statiktir — sunucu tarafında çalışan kod yoktur. Bu yüzden
iletişim formu mesajı dışarıdan bir servis olan Web3Forms'a gönderir; Web3Forms
da onu contact@gudiadigital.com adresine e-posta olarak iletir
(`src/components/ContactForm.tsx`). Gönderim başarısız olursa form, mesajı
Gmail, Outlook, e-posta uygulaması ya da kopyalama ile göndermeyi önerir.

Form kişisel veri topladığı için KVKK aydınlatma metni (`/tr/kvkk/`) formun
altında ve footer'da bağlantılıdır. Forma yeni bir alan eklenir ya da yeni bir
hizmet sağlayıcı (analitik, farklı form servisi vb.) kullanılmaya başlanırsa
metin `tr.ts` / `en.ts` içindeki `privacy` bölümünde güncellenmelidir.
