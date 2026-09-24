import type { MetadataRoute } from "next";

// Statik export: dosya derleme sırasında bir kez üretilir.
export const dynamic = "force-static";

// Android'de ana ekrana eklenince ve Chrome'un uygulama listesinde görünen ikon.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gudia Dijital",
    short_name: "Gudia",
    start_url: "/",
    display: "browser",
    background_color: "#0a0b12",
    theme_color: "#0a0b12",
    icons: [
      { src: "/brand/icon-192.png?v=2", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png?v=2", sizes: "512x512", type: "image/png" },
    ],
  };
}
