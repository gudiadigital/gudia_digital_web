import type { Locale } from "@/i18n/config";

/**
 * Markalı oyun hizmet sayfasındaki oyun videoları: hyper-casual oyun
 * denemelerimizin TikTok/Facebook reklam kurguları ve oynanış kayıtları.
 *
 * Dosyalar public/oyun-videolari/<slug>.mp4 (H.264, en uzun kenar ≤960px,
 * kaynaktan küçültüldü) ve aynı adla bir .webp kapak karesi. `w` ve `h`
 * videonun piksel boyutu; kutunun yeri video inmeden ayrılıyor.
 */
export type GameVideo = {
  slug: string;
  title: string;
  /** Videonun türü; kartta başlığın altında yazıyor. */
  kind: "tiktok" | "facebook" | "gameplay";
  w: number;
  h: number;
};

export const gameVideoKind: Record<GameVideo["kind"], Record<Locale, string>> = {
  tiktok: { tr: "TikTok reklamı", en: "TikTok ad" },
  facebook: { tr: "Facebook reklamı", en: "Facebook ad" },
  gameplay: { tr: "Oynanış videosu", en: "Gameplay video" },
};

export const gameVideos: GameVideo[] = [
  { slug: "busted-kiss", title: "Busted Kiss", kind: "tiktok", w: 540, h: 960 },
  { slug: "ball-run", title: "Ball Run", kind: "tiktok", w: 540, h: 960 },
  { slug: "face-filters", title: "Face Filters", kind: "tiktok", w: 540, h: 960 },
  { slug: "material-girls", title: "Material Girls", kind: "tiktok", w: 540, h: 960 },
  { slug: "mystery-buttons", title: "Mystery Buttons", kind: "tiktok", w: 540, h: 960 },
  { slug: "stack-girls", title: "Stack Girls", kind: "tiktok", w: 540, h: 960 },
  { slug: "hyper-fighter", title: "Hyper Fighter", kind: "tiktok", w: 540, h: 960 },
  { slug: "video-3", title: "Video 3", kind: "tiktok", w: 540, h: 960 },
  { slug: "angel-run", title: "Angel Run", kind: "tiktok", w: 540, h: 960 },
  { slug: "sticks-to-build", title: "Sticks to Build", kind: "tiktok", w: 540, h: 960 },
  { slug: "love-challenge", title: "I Love This Challenge", kind: "facebook", w: 768, h: 960 },
  { slug: "vlog-run", title: "Vlog Run", kind: "tiktok", w: 540, h: 960 },
  { slug: "tower-defense", title: "Tower Defense", kind: "gameplay", w: 960, h: 458 },
  { slug: "surviving-the-deadlands", title: "Surviving the Deadlands", kind: "gameplay", w: 854, h: 480 },
];
