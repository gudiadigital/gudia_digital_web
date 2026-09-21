import path from "node:path";
import type { NextConfig } from "next";

/**
 * Dil yönlendirmeleri ve yerelleşen URL'ler burada statik olarak tanımlı.
 * Böylece site middleware/proxy'e bağımlı olmadan her hosting sağlayıcısında
 * aynı şekilde çalışır.
 *
 * Bu tablo src/i18n/routes.ts ile aynı olmak zorunda — oradaki pageSegments
 * veya serviceSegments değişirse burası da güncellenmeli.
 */
const nextConfig: NextConfig = {
  // Ev dizinindeki alakasız bir package-lock.json'ın kök olarak seçilmesini engeller.
  turbopack: { root: path.resolve(__dirname) },

  async redirects() {
    return [
      // Tarayıcısı İngilizce olan ziyaretçi /en'e, diğer herkes /tr'ye gider.
      {
        source: "/",
        has: [
          {
            type: "header",
            key: "accept-language",
            value: "en(?:-[A-Za-z]{2,4})?(?:;q=[\\d.]+)?(?:,.*)?",
          },
        ],
        destination: "/en",
        permanent: false,
      },
      { source: "/", destination: "/tr", permanent: false },
    ];
  },

  async rewrites() {
    return [
      // Türkçe sayfa adresleri
      { source: "/tr/hakkimizda", destination: "/tr/about" },
      { source: "/tr/hizmetler", destination: "/tr/services" },
      { source: "/tr/hizmetler/:slug", destination: "/tr/services/:slug" },
      { source: "/tr/projeler", destination: "/tr/projects" },
      { source: "/tr/iletisim", destination: "/tr/contact" },

      // İngilizce hizmet adresleri (sayfa adları zaten İngilizce)
      { source: "/en/services/mobile-app", destination: "/en/services/mobil-uygulama" },
      { source: "/en/services/web-development", destination: "/en/services/web-sitesi" },
      { source: "/en/services/mobile-game", destination: "/en/services/mobil-oyun" },
      { source: "/en/services/pc-game", destination: "/en/services/pc-oyun" },
      {
        source: "/en/services/ecommerce-social",
        destination: "/en/services/trendyol-sosyal-medya",
      },
    ];
  },
};

export default nextConfig;
