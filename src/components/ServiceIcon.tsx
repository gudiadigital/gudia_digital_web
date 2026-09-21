import type { ServiceSlug } from "@/i18n/config";

const paths: Record<ServiceSlug, React.ReactNode> = {
  "mobil-uygulama": (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 5.5h3" />
      <path d="M12 18.2h.01" />
    </>
  ),
  "web-sitesi": (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="M2.5 9h19" />
      <path d="M5.8 6.75h.01M8.3 6.75h.01M10.8 6.75h.01" />
    </>
  ),
  "markali-oyunlar": (
    <>
      <path d="M7.2 7.5h9.6a4.2 4.2 0 0 1 4.1 3.3l1 4.6a2.6 2.6 0 0 1-4.7 2l-1.5-2.1H8.3l-1.5 2.1a2.6 2.6 0 0 1-4.7-2l1-4.6A4.2 4.2 0 0 1 7.2 7.5Z" />
      <path d="M6.8 11.6h2.6M8.1 10.3v2.6" />
      <circle cx="15.7" cy="11" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="17.6" cy="12.7" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  "dijital-urun-iyilestirme": (
    <>
      <path d="M20.5 12a8.5 8.5 0 0 1-14.2 6.3" />
      <path d="M3.5 12a8.5 8.5 0 0 1 14.2-6.3" />
      <path d="M17.9 2.4v3.4h-3.4M6.1 21.6v-3.4h3.4" />
      <path d="M12 9.2l1 2.1 2.1 1-2.1 1-1 2.1-1-2.1-2.1-1 2.1-1z" />
    </>
  ),
  "sosyal-medya-icerik": (
    <>
      <rect x="2.5" y="5" width="14" height="14" rx="3" />
      <path d="M16.5 10.2l4-2.3a.7.7 0 0 1 1 .6v7a.7.7 0 0 1-1 .6l-4-2.3z" />
      <path d="M8 9.8l3.4 2.2L8 14.2z" fill="currentColor" stroke="none" />
    </>
  ),
  "e-ticaret-optimizasyonu": (
    <>
      <path d="M3.5 5.5h2.2l2 10.2a2 2 0 0 0 2 1.6h7.1a2 2 0 0 0 2-1.5l1.4-5.6H6.4" />
      <circle cx="10.2" cy="20" r="1.3" />
      <circle cx="17" cy="20" r="1.3" />
      <path d="M13.2 3.2v4.4M11.3 5.1l1.9-1.9 1.9 1.9" />
    </>
  ),
};

export function ServiceIcon({
  slug,
  className = "",
}: {
  slug: ServiceSlug;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[slug]}
    </svg>
  );
}
