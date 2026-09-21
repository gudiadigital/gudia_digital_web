# Gudia Dijital — gudiadijital.com

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · TR/EN çok dilli.

## Çalıştırma

```bash
npm run dev     # http://localhost:3000 → /tr veya /en'e yönlendirir
npm run build   # üretim derlemesi
npm run lint
```

## Yapı

```
src/
  app/[locale]/          Tüm sayfalar (kök layout burada, html lang dile göre)
    page.tsx             Ana sayfa — hero + hizmetler + hakkımızda + süreç + CTA
    about|services|projects|contact/
    services/[slug]/     5 hizmet detay sayfası
  components/            Header, Footer, Logo, ContactForm, bölümler
  i18n/
    config.ts            Diller ve hizmet slug listesi
    routes.ts            Dile göre URL üretimi ve çözümlemesi
    dictionaries/        tr.ts (kaynak) · en.ts (tr'nin tipine uymak zorunda)
  data/projects.ts       Portfolyo listesi (şu an boş)
next.config.ts           Dil yönlendirmesi + yerelleşen URL rewrite tablosu
```

## Sık yapılacak işler

**Metin değiştirmek** → `src/i18n/dictionaries/tr.ts` ve `en.ts`. İkisi aynı yapıda
olmak zorundadır; `en.ts` eksik alan bırakırsa `npx tsc --noEmit` hata verir.

**Proje eklemek** → `src/data/projects.ts` içindeki diziye bir nesne ekle.
Liste boş olduğu sürece Projeler sayfası boş durum metnini gösterir.

**Renk değiştirmek** → `src/app/globals.css` içindeki `:root` blokları.
Koyu mod varsayılan; açık mod `prefers-color-scheme: light` ile otomatik.

**Logo değiştirmek** → `src/components/Logo.tsx` içindeki `<svg>` bloğu.
Kullanım yerleri (header, footer) değişmez.

## URL şeması

| Sayfa   | TR                    | EN                      |
| ------- | --------------------- | ----------------------- |
| Ana     | `/tr`                 | `/en`                   |
| Hizmet  | `/tr/hizmetler/...`   | `/en/services/...`      |
| Hakkında| `/tr/hakkimizda`      | `/en/about`             |

Yeni bir sayfa eklerken klasör adı İngilizce (canonical) olur, görünen Türkçe
yol ise **iki yere birden** yazılır: `src/i18n/routes.ts` (bağlantı üretimi) ve
`next.config.ts` (rewrite tablosu). İkisi aynı kalmazsa bağlantı 404 verir.

Site kasıtlı olarak middleware/proxy kullanmaz; yönlendirmeler `next.config.ts`
içinde statik tanımlıdır, böylece her hosting sağlayıcısında aynı çalışır.

## İletişim formu

Şu an ziyaretçinin e-posta uygulamasında hazır mesaj açıyor (`mailto:`).
Sunucu tarafı gönderim eklenecekse `src/components/ContactForm.tsx` içindeki
`handleSubmit` değiştirilir.
