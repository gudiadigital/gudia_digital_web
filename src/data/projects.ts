import type { Locale, ServiceSlug } from "@/i18n/config";

export type Project = {
  slug: string;
  title: string;
  /** Kısa tanıtım — her dil için ayrı. */
  summary: Record<Locale, string>;
  service: ServiceSlug;
  year: number;
  tags: string[];
  /** Yayında olan uygulama / site bağlantısı. */
  url?: string;
};

/**
 * İlk projeler yayına alındıkça buraya eklenecek.
 * Liste boşken Projeler sayfası otomatik olarak boş durum metnini gösterir.
 */
export const projects: Project[] = [];
