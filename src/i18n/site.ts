/** Sitenin yayındaki adresi; kanonik, site haritası ve yapılandırılmış veri buradan okuyor. */
export const SITE_URL = "https://gudiadigital.com";

/**
 * Site içi yolu mutlak adrese çevirir: "/tr/hakkimizda" →
 * "https://gudiadigital.com/tr/hakkimizda/".
 *
 * pathFor() ve projectPath() sonu / olmadan dönüyor, sayfaların kanonik
 * adresi ise trailingSlash yüzünden / ile bitiyor. Yapılandırılmış verideki
 * adresler kanonikle birebir aynı olmalı; yoksa aynı sayfa iki ayrı şey
 * gibi görünüyor.
 */
export function absoluteUrl(path: string): string {
  const clean = path.replace(/\/+$/, "");
  return clean ? `${SITE_URL}${clean}/` : `${SITE_URL}/`;
}
