import type { MetadataRoute } from "next";
import { getDictionary } from "@/i18n/dictionaries";

// Statik export: dosya derleme sırasında bir kez üretilir.
export const dynamic = "force-static";

// Android'de ana ekrana eklenince ve Chrome'un uygulama listesinde görünen ikon.
// Manifest tek dilli; sitenin varsayılan dili Türkçe.
export default function manifest(): MetadataRoute.Manifest {
  const { meta } = getDictionary("tr");
  return {
    name: meta.siteName,
    short_name: "Gudia",
    description: meta.description,
    // Kök adres (/) dil seçip yönlendiren boş bir sayfa; ana ekrandan
    // açılınca doğrudan Türkçe ana sayfa gelsin. `id` kimliği sabit tutuyor:
    // start_url ileride değişse de tarayıcı aynı uygulama saysın.
    id: "/",
    start_url: "/tr/",
    lang: "tr",
    display: "browser",
    background_color: "#0a0b12",
    theme_color: "#0a0b12",
    icons: [
      { src: "/brand/icon-192.png?v=2", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png?v=2", sizes: "512x512", type: "image/png" },
    ],
  };
}
