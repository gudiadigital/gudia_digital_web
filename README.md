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

**Logo değiştirmek** → `src/components/Logo.tsx` içindeki `<svg>` bloğu.
Kullanım yerleri (header, footer) değişmez.

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

## Kısıtlar

Site tamamen statiktir — sunucu tarafında çalışan kod yoktur. Bu yüzden
iletişim formu ziyaretçinin e-posta uygulamasında hazır mesaj açar
(`src/components/ContactForm.tsx`). Gerçek form gönderimi istenirse Formspree
gibi dışarıdan bir servis eklenmelidir.
